import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import config from "@/config";
import getPath from "@/utils/getPath";
import { getSortedPosts } from "@/utils/getPosts";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: config.title,
    description: config.description,
    site: config.site,
    items: sortedPosts.map(({ data, slug }) => ({
      link: getPath(slug),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
