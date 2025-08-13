import config from '@/config';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional(),
      title: z.string(),
      pinned: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(['others']),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      discussionNumber: z.number(),
    }),
});

export const collections = { blog };
