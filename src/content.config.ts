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
    // Sveltia CMS writes `readingTime: null` when the field is left empty.
    readingTime: z.number().nullish().transform((v) => v ?? undefined),
    popular: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Link to the LinkedIn post about this article: shows a "Discuss on LinkedIn" button under the article.
    linkedin: z.string().url().optional().or(z.literal('')),
    // Language the article is written in; the other languages are translations in src/content/translations.
    lang: z.enum(['en', 'nl', 'cn', 'fr', 'de']).default('en'),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    menu: z.string().optional(),
    wide: z.boolean().default(false),
    layout: z.enum(['default', 'columns', 'atlas']).default('default'),
    banner: z.string().optional(),
    lang: z.enum(['en', 'nl', 'cn', 'fr', 'de']).default('en'),
    // Legal text: a translation says the original language prevails.
    legal: z.boolean().default(false),
  }),
});

// Translations of articles and pages, made by scripts/translate.mjs (GitHub Action "Translate").
// File name: <articles|pages>/<slug>.<lang>.md, so the id is e.g. "articles/hello-ai.nl".
const translations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/translations', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    menu: z.string().optional(),
    // Hash of the original this was translated from; when the original changes, the Action translates it again.
    source: z.string().optional(),
    // Set when you corrected the translation yourself: the Action then leaves it alone.
    locked: z.boolean().default(false),
  }),
});

export const collections = { articles, pages, translations };
