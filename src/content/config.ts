import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()).optional().default([]),
    coverImage: z.string().refine(
      (value) => value.startsWith('/') || z.string().url().safeParse(value).success,
      'Cover image must be an absolute URL or a site-local path'
    ).optional(),
    imageCredit: z.object({
      name: z.string().optional(),
      url: z.string().url().optional(),
    }).optional(),
    author: z.object({
      name: z.string().optional(),
      avatar: z.string().url().optional(),
    }).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
