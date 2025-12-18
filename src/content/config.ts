// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content', // Указываем, что это контент (MD/MDX)
  schema: ({ image }) =>
    z.object({
      title: z.object({
        ru: z.string(),
        en: z.string(),
      }),
      description: z.object({
        ru: z.string(),
        en: z.string(),
      }),
      // 'details' удалено, так как контент теперь в теле файла MDX
      tags: z.array(z.string()),

      coverImage: image().optional(), // Point 6: image helper
      gallery: z.array(image()).optional(),

      demoUrl: z.string().optional(),
      repoUrl: z.string().optional(),
      pubDate: z.date(),
      featured: z.boolean().default(false),
      status: z.enum(['completed', 'in-progress', 'archived', 'private']).default('completed'),
      type: z.enum(['web', 'mobile', 'desktop', 'bot', 'ml', 'library']).default('web'),
    }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.object({
        ru: z.string(),
        en: z.string().optional(),
      }),
      excerpt: z.object({
        ru: z.string(),
        en: z.string().optional(),
      }),
      // TL;DR
      tldr: z
        .object({
          ru: z.string().optional(),
          en: z.string().optional(),
        })
        .optional(),
      pubDate: z.date(),
      tags: z.array(z.string()),
      coverImage: image().optional(),
      draft: z.boolean().default(false),
      readingTime: z.string().optional(),
    }),
});

export const collections = {
  projects: projectsCollection, // Ваша существующая
  blog: blogCollection, // Новая
};
