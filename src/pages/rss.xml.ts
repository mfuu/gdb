import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import siteConfig from '@/site.config';
import getPath from '@/utils/getPath';
import { getSortedPosts } from '@/utils/getPosts';

export async function GET() {
  const posts = await getCollection('posts');
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.site,
    items: sortedPosts.map(({ data, id }) => ({
      link: getPath(`/posts/${id}`),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
