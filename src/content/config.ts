import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    date: z.date(),
    tags: z.array(z.string()).optional().default([]),
    coverImage: z.string().url().optional(),
    author: z.object({
      name: z.string().optional(),
      avatar: z.string().url().optional(),
    }).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
};
