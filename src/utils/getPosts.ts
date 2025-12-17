import type { CollectionEntry } from 'astro:content';
import { slugifyAll } from './slugify';

export function getSortedPosts(posts: CollectionEntry<'blog'>[]) {
  const sortedPosts = posts.sort(
    (a, b) =>
      Math.floor(new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000) -
      Math.floor(new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000)
  );
  const pinnedPosts = sortedPosts.filter(({ data }) => data.pinned);
  const recentPosts = sortedPosts.filter(({ data }) => !data.pinned);
  return [...pinnedPosts, ...recentPosts];
}

export function getPostsByTag(posts: CollectionEntry<'blog'>[], tag: string) {
  return getSortedPosts(posts.filter(post => slugifyAll(post.data.tags).includes(tag)));
}
