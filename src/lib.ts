import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export const SITE = {
  name: 'JAVC Management & Consultancy',
  short: 'JAVC',
  author: 'Jeroen van Craaikamp',
  linkedin: 'https://www.linkedin.com/',
  perPage: 6,
};

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getCategories() {
  const counts = new Map<string, number>();
  for (const a of await getArticles())
    for (const c of a.data.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, slug: slugify(name), count }));
}

export async function getArchives() {
  const months = new Map<string, { year: number; month: number; count: number }>();
  for (const a of await getArticles()) {
    const d = a.data.date;
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    const m = months.get(key) ?? { year: d.getFullYear(), month: d.getMonth() + 1, count: 0 };
    m.count++;
    months.set(key, m);
  }
  return [...months.values()].sort((a, b) => b.year - a.year || b.month - a.month);
}

export const monthName = (m: number) =>
  new Date(2000, m - 1, 1).toLocaleString('en-GB', { month: 'long' });

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const pad = (n: number) => String(n).padStart(2, '0');
