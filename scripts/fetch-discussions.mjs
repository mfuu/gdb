import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { graphql } from "@octokit/graphql";

const gql = String.raw;
const blogPath = "src/content/blog";

// npm run fetch --repository "${{github.repository}}"
const repository = process.argv.slice(2)[0] || '';
const [owner, repo] = repository.split('/');

if (!owner || !repo) {
  console.error("Invalid github repository");
  process.exit(1);
}

function getGiscus(discussionNumber) {
  return `
    <script src="https://giscus.app/client.js"
      data-repo="${owner}/${repo}"
      data-mapping="number"
      data-term="${discussionNumber}"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="transparent_dark"
      data-lang="zh-CN"
      data-loading="lazy"
      crossorigin="anonymous"
      async
    ></script>
  `;
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
  const { nodes, pageInfo } = res.repository.discussion;

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

    // Extract frontmatter data from discussion Markdown
    const { content: body, data: frontmatter } = matter(discussion.body);

    // Construct post data object
    Object.assign(frontmatter, {
      title: discussion.title,
      pubDatetime: discussion.createdAt,
      modDatetime: discussion.updatedAt,
      tags: discussion.labels.nodes.map(label => label.name),
      featured: pinnedNumbers.includes(discussion.number),
      description: discussion.title,
    });
    const giscus = getGiscus(discussion.number);

    // Construct the post Markdown content
    const markdown = `
      ---
      ${Object.keys(frontmatter)
        .map(key => `${key}: ${frontmatter[key]}`)
        .join("\n")}
      ---

      ${body}
      ${giscus}
    `.replace(/\r/g, "");

    // Save new formatted Markdown to a file under "src/content/blog"
    const dir = path.join(blogPath, category);
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, `${discussion.number}.md`), markdown);
  });
}

writeDiscussion();
