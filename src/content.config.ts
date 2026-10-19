import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import siteConfig from '@/site.config';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    author: z.string().default(siteConfig.author),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional(),
    title: z.string(),
    pinned: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(['others']),
    description: z.string(),
    canonicalURL: z.string().optional(),
    discussionNumber: z.number(),
  }),
});

export const collections = { posts };
