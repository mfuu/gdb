import type { CollectionEntry } from 'astro:content';
import slugify from './slugify';

export function getSortedPosts(posts: CollectionEntry<'posts'>[]) {
  const sortedPosts = posts.sort(
    (a, b) =>
      Math.floor(new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000) -
      Math.floor(new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000)
  );
  const pinnedPosts = sortedPosts.filter(({ data }) => data.pinned);
  const recentPosts = sortedPosts.filter(({ data }) => !data.pinned);
  return [...pinnedPosts, ...recentPosts];
}

export function getPostsByTag(posts: CollectionEntry<'posts'>[], tag: string) {
  return getSortedPosts(posts.filter(post => slugify(post.data.tags).includes(tag)));
}
