// Builds worker/knowledge.json: the articles, pages and documents in knowledge/
// cut into small chunks, so the chatbot can look up relevant passages.
// Runs before every build (npm run build), so new articles are picked up automatically.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const MAX = 1400; // characters per chunk

function frontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return [{}, src];
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return [data, src.slice(m[0].length)];
}

function clean(md) {
  return md
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')          // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')        // links: keep the text
    .replace(/<[^>]+>/g, ' ')                       // html tags
    .replace(/^\s*\|?\s*:?-{3,}.*$/gm, '')          // table separator rows
    .replace(/\*\*|__|`/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function chunk(text) {
  const parts = text.split(/\n\s*\n/);
  const out = [];
  let cur = '';
  for (let p of parts) {
    p = p.trim();
    if (!p) continue;
    while (p.length > MAX) {
      const cut = p.lastIndexOf(' ', MAX);
      if (cur) { out.push(cur); cur = ''; }
      out.push(p.slice(0, cut > 0 ? cut : MAX));
      p = p.slice(cut > 0 ? cut + 1 : MAX);
    }
    if ((cur + '\n\n' + p).length > MAX && cur) { out.push(cur); cur = p; }
    else cur = cur ? cur + '\n\n' + p : p;
  }
  if (cur) out.push(cur);
  return out;
}

const chunks = [];
function add(title, url, kind, date, text) {
  chunk(clean(text)).forEach((t) => chunks.push({ title, url, kind, date, text: t }));
}

for (const f of readdirSync('src/content/articles').filter((f) => f.endsWith('.md'))) {
  const [d, body] = frontmatter(readFileSync(join('src/content/articles', f), 'utf8'));
  if (d.draft === 'true') continue;
  add(d.title, `/${basename(f, '.md')}/`, 'article', d.date, `${d.title}\n\n${body}`);
}
for (const f of readdirSync('src/content/pages').filter((f) => f.endsWith('.md'))) {
  const [d, body] = frontmatter(readFileSync(join('src/content/pages', f), 'utf8'));
  add(d.title, `/${basename(f, '.md')}/`, 'page', undefined, `${d.title}\n\n${body}`);
}
const sources = JSON.parse(readFileSync('knowledge/sources.json', 'utf8'));
for (const f of readdirSync('knowledge').filter((f) => f.endsWith('.txt') || f.endsWith('.md'))) {
  const title = sources[f]?.title ?? basename(f).replace(/\.\w+$/, '');
  const text = readFileSync(join('knowledge', f), 'utf8')
    .replace(/\f/g, '\n\n')
    .replace(/^\s*Page \d+ of \d+\s*$/gm, '')
    .replace(/([^\n.:;!?])\n(?=[^\n])/g, '$1 '); // join lines inside paragraphs
  add(title, sources[f]?.url ?? null, 'document', undefined, text);
}

mkdirSync('worker', { recursive: true });
writeFileSync('worker/knowledge.json', JSON.stringify(chunks));
console.log(`knowledge: ${chunks.length} chunks`);
