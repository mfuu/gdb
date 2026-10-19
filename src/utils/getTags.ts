import type { CollectionEntry } from 'astro:content';
import slugify from './slugify';

interface Tag {
  tag: string;
  tagName: string;
}

function getUniqueTags(posts: CollectionEntry<'posts'>[]) {
  const tags: Tag[] = posts
    .flatMap(post => post.data.tags)
    .map(tag => ({ tag: slugify(tag), tagName: tag }))
    .filter((value, index, self) => self.findIndex(tag => tag.tag === value.tag) === index)
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));

  return tags;
}

export default getUniqueTags;
