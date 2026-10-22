import { getArticles } from '../lib';
export async function GET() {
  const items = (await getArticles()).map((a) => ({
    url: `/${a.id}/`, title: a.data.title, excerpt: a.data.excerpt,
    categories: a.data.categories, date: a.data.date.toISOString(), text: a.body ?? '',
  }));
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
