// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.object({
      ru: z.string(),
      en: z.string(),
    }),
    description: z.object({
      ru: z.string(),
      en: z.string(),
    }),
    details: z.object({
      ru: z.string().optional(),
      en: z.string().optional(),
    }).optional(),
    tags: z.array(z.string()),
    coverImage: z.string().optional(), 
    gallery: z.array(z.string()).optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    pubDate: z.date(),
    featured: z.boolean().default(false),
    status: z.enum(['completed', 'in-progress', 'archived', 'private']).default('completed'),
    type: z.enum(['web', 'mobile', 'desktop', 'bot', 'ml', 'library']).default('web'),
  }),
});

export const collections = {
  'projects': projectsCollection,
};