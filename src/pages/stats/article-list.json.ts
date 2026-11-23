// The list of blog articles with their title in every language, read by the Worker for /stats/articles/ (worker/stats.js).
import { getArticles } from '../../lib';
import { LANGS } from '../../i18n';

export async function GET() {
  const byLang = await Promise.all(LANGS.map((l) => getArticles(l)));
  const items = byLang[0].map((a, i) => ({
    slug: a.id,
    date: a.data.date.toISOString().slice(0, 10),
    titles: Object.fromEntries(LANGS.map((l, j) => [l, byLang[j][i].data.title])),
  }));
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
