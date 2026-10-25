import { getCollection, type CollectionEntry } from 'astro:content';
import CATEGORY_LIST from './data/categories.json';
import { locale, url, type Lang } from './i18n';

// An article or page as shown in one language: the original, or its translation when the original
// is in the other language (falls back to the original while there is no translation yet).
export type Localized<T extends 'articles' | 'pages'> = {
  id: string;
  lang: Lang;
  data: CollectionEntry<T>['data'];
  body: string;
  // What to render: the original entry or the translation entry.
  entry: CollectionEntry<T> | CollectionEntry<'translations'>;
  translated: boolean;
};
export type Article = Localized<'articles'>;
export type Page = Localized<'pages'>;

export const SITE = {
  name: 'JAVC Management & Consultancy',
  short: 'JAVC',
  author: 'Jeroen van Craaikamp',
  linkedin: 'https://www.linkedin.com/in/jeroenvancraaikamp/',
  // Google Analytics measurement ID (G-...); leave empty to load no analytics
  gaId: '',
  perPage: 6,
};

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let translationsCache: Map<string, CollectionEntry<'translations'>> | undefined;
async function translations() {
  translationsCache ??= new Map((await getCollection('translations')).map((e) => [e.id, e]));
  return translationsCache;
}

async function localize<T extends 'articles' | 'pages'>(kind: T, list: CollectionEntry<T>[], lang: Lang): Promise<Localized<T>[]> {
  const tr = await translations();
  return list.map((e) => {
    const x = e.data.lang !== lang ? tr.get(`${kind}/${e.id}.${lang}`) : undefined;
    if (!x) return { id: e.id, lang, data: e.data, body: e.body ?? '', entry: e, translated: false };
    const data = { ...e.data, title: x.data.title } as any;
    if (x.data.excerpt) data.excerpt = x.data.excerpt;
    if (kind === 'pages' && e.data.menu) data.menu = x.data.menu || e.data.menu;
    return { id: e.id, lang, data, body: x.body ?? '', entry: x, translated: true };
  });
}

export async function getArticles(lang: Lang = 'en'): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return localize('articles', all, lang);
}

export async function getPages(lang: Lang = 'en'): Promise<Page[]> {
  return localize('pages', await getCollection('pages'), lang);
}

export async function getCategories(lang: Lang = 'en') {
  const counts = new Map<string, number>();
  for (const a of await getArticles(lang))
    for (const c of a.data.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  // Order as in the CMS list (src/data/categories.json); categories not in that list come last, A–Z.
  const order = CATEGORY_LIST.categories.map((c) => c.name);
  const rank = (n: string) => (order.includes(n) ? order.indexOf(n) : order.length);
  return [...counts.entries()]
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, slug: slugify(name), count }));
}

export async function getArchives(lang: Lang = 'en') {
  const months = new Map<string, { year: number; month: number; count: number }>();
  for (const a of await getArticles(lang)) {
    const d = a.data.date;
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    const m = months.get(key) ?? { year: d.getFullYear(), month: d.getMonth() + 1, count: 0 };
    m.count++;
    months.set(key, m);
  }
  return [...months.values()].sort((a, b) => b.year - a.year || b.month - a.month);
}

export const monthName = (m: number, lang: Lang = 'en') =>
  new Date(2000, m - 1, 1).toLocaleString(locale[lang], { month: 'long' });

export const formatDate = (d: Date, lang: Lang = 'en') =>
  d.toLocaleDateString(locale[lang], { day: 'numeric', month: 'long', year: 'numeric' });

export const pad = (n: number) => String(n).padStart(2, '0');

// --- route lists, shared by the English pages and their Dutch copies under src/pages/nl/ ---------

export async function entryPaths(lang: Lang) {
  const articles = await getArticles(lang);
  return [
    ...articles.map((item) => ({ params: { slug: item.id }, props: { item, kind: 'article', all: articles } })),
    ...(await getPages(lang)).map((item) => ({ params: { slug: item.id }, props: { item, kind: 'page' } })),
  ];
}

export async function articlePages(paginate: any, lang: Lang) {
  return paginate(await getArticles(lang), { pageSize: SITE.perPage });
}

export async function categoryPages(paginate: any, lang: Lang) {
  const articles = await getArticles(lang);
  return (await getCategories(lang)).flatMap((c) =>
    paginate(articles.filter((a) => a.data.categories.includes(c.name)), {
      pageSize: SITE.perPage, params: { cat: c.slug }, props: { name: c.name },
    }),
  );
}

export async function archivePaths(lang: Lang) {
  const articles = await getArticles(lang);
  return (await getArchives(lang)).map((m) => ({
    params: { year: String(m.year), month: pad(m.month) },
    props: {
      label: `${monthName(m.month, lang)} ${m.year}`,
      data: articles.filter((a) => a.data.date.getFullYear() === m.year && a.data.date.getMonth() + 1 === m.month),
    },
  }));
}

export async function searchIndex(lang: Lang) {
  const items = (await getArticles(lang)).map((a) => ({
    url: url(lang, `/${a.id}/`), title: a.data.title, excerpt: a.data.excerpt,
    categories: a.data.categories, date: a.data.date.toISOString(), text: a.body,
  }));
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
