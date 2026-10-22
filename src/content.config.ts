import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default(['Uncategorized']),
    excerpt: z.string(),
    image: z.string().optional(),
    readingTime: z.number().optional(),
    popular: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    menu: z.string().optional(),
    wide: z.boolean().default(false),
  }),
});

export const collections = { articles, pages };
