import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { graphql } from "@octokit/graphql";
import giscusConfig from "../giscus.config.mjs";

const gql = String.raw;

// npm run fetch --repository "${{github.repository}}"
const repository = process.argv.slice(2)[0] || "";
const [owner, repo] = repository.split("/");

if (!owner || !repo) {
  console.error("Invalid github repository");
  process.exit(1);
}

function getGiscus(discussionNumber) {
  if (!giscusConfig.enable) {
    return "";
  }

  const {
    lang,
    theme,
    lazyLoading,
    inputPosition,
    emitMetadata,
    reactionsEnabled,
  } = giscusConfig;

  return `<script src="https://giscus.app/client.js" data-repo="${owner}/${repo}" data-mapping="number" data-term="${discussionNumber}" data-reactions-enabled="${reactionsEnabled}" data-emit-metadata="${emitMetadata}" data-input-position="${inputPosition}" data-theme="${theme}" data-lang="${lang}" ${lazyLoading && 'data-loading="lazy"'} crossorigin="anonymous" async></script>`;
}

async function fetchData(query) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const graphqlAuth = graphql.defaults({
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const res = await graphqlAuth(gql`
    query {
      repository(owner: "${owner}", name: "${repo}") {
        ${query}
      }
    }
  `);

  return res;
}

function formatMarkdownBody(discussion, pinnedNumbers) {
  // Extract frontmatter data from discussion Markdown
  const { content: body, data: frontmatter } = matter(discussion.body);

  // Construct post data object
  Object.assign(frontmatter, {
    title: discussion.title,
    pubDatetime: discussion.createdAt,
    modDatetime: discussion.updatedAt,
    tags: discussion.labels.nodes.map(label => label.name) || ["test"],
    featured: pinnedNumbers.includes(discussion.number),
    description: discussion.title,
  });
  const giscus = getGiscus(discussion.number);

  // Construct the post Markdown content
  const markdown = ["---"];
  Object.keys(frontmatter).forEach(key => {
    const value = frontmatter[key];
    if (Array.isArray(value) && value.length) {
      markdown.push(`${key}:`);
      for (let v of value) {
        markdown.push(`  - ${v}`);
      }
    } else {
      markdown.push(`${key}: ${value}`);
    }
  });
  markdown.push(...["---", body, "", giscus]);

  return markdown.join("\n").replace(/\r/g, "");
}

// get all discussions
async function fetchDiscussions(discussions, after) {
  const res = await fetchData(`
    discussions(first: 100, ${after ? `after: "${after}",` : ""} orderBy: {field: CREATED_AT, direction: DESC}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        number
        title
        url
        body
        createdAt
        updatedAt
        category{
          slug
        }
        labels(last: 10) {
          nodes {
            name
            color
          }
        }
      }
    }
  `);
  const { nodes, pageInfo } = res.repository.discussions;

  discussions = discussions.concat(nodes);

  if (pageInfo.hasNextPage) {
    await fetchDiscussions(discussions, pageInfo.endCursor);
  }

  return discussions;
}

async function writeDiscussion() {
  const pinnedRes = await fetchData(`
    pinnedDiscussions(last: 100) {
      nodes {
        discussion {
          id
          number
        }
      }
    }
  `);
  const pinnedDiscussions = pinnedRes.repository.pinnedDiscussions;
  const pinnedNumbers = pinnedDiscussions.nodes.map(
    node => node.discussion.number
  );

  const discussions = await fetchDiscussions([]);

  discussions.forEach(discussion => {
    const category = discussion.category.slug;
    const categories = JSON.parse(process.env.FETCH_CATEGORIES || "[]");
    if (!categories.includes(category)) {
      return;
    }

    const markdown = formatMarkdownBody(discussion, pinnedNumbers);

    const slug = (
      discussion.title.match(/[a-zA-Z0-9\u4e00-\u9fa5_-]/g) || []
    ).join("");
    const filename = `${discussion.number}_${slug}.md`;

    // Save new formatted Markdown to a file under "src/content/blog"
    const dist = path.join(process.cwd(), "src/content/blog");

    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }

    fs.writeFile(`${dist}/${filename}`, markdown, err => {
      if (err) {
        console.error(`Write discussion ${discussion.number} failed: ${err}`);
      } else {
        console.log(`Saved discussion ${discussion.number} to ${filename}`);
      }
    });
  });
}

writeDiscussion();
