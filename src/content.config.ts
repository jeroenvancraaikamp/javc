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
    // Link to the LinkedIn post about this article: shows a "Discuss on LinkedIn" button under the article.
    linkedin: z.string().url().optional().or(z.literal('')),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    menu: z.string().optional(),
    wide: z.boolean().default(false),
    layout: z.enum(['default', 'columns']).default('default'),
    banner: z.string().optional(),
  }),
});

export const collections = { articles, pages };
