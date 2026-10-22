// Import a WordPress export (Tools → Export → All content) into src/content.
// Usage: node scripts/import-wxr.mjs path/to/export.xml [--keep-demo]
import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const [file, ...flags] = process.argv.slice(2);
if (!file) {
  console.error('Usage: node scripts/import-wxr.mjs export.xml [--keep-demo]');
  process.exit(1);
}

const ARTICLES = 'src/content/articles';
const PAGES = 'src/content/pages';
// WordPress page slug -> menu label and order in the main menu.
const MENU = {
  skills: ['Skills/Expertise', 1],
  experience: ['Projects/Assignments', 2],
  'customers-employers': ['Customers/Employers', 3],
  'it4it-atlas': ['IT4IT Atlas', 4],
};
// Pages that have their own template and are not imported as content pages.
const SKIP_PAGES = new Set(['home', 'articles', 'contact-me', 'sample-page']);

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@',
  cdataPropName: false,
  isArray: (name) => ['item', 'category', 'wp:postmeta'].includes(name),
});
const xml = parser.parse(fs.readFileSync(file, 'utf8'));
const items = xml.rss.channel.item ?? [];

const text = (v) => (v == null ? '' : typeof v === 'object' ? String(v['#text'] ?? '') : String(v));
const meta = (item, key) => (item['wp:postmeta'] ?? []).find((m) => text(m['wp:meta_key']) === key)?.['wp:meta_value'];

const attachments = new Map(
  items.filter((i) => text(i['wp:post_type']) === 'attachment').map((i) => [text(i['wp:post_id']), text(i['wp:attachment_url'])]),
);

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-', emDelimiter: '*' });
td.use(gfm);
// Keep embeds and media as raw HTML so nothing is lost.
td.keep(['iframe', 'video', 'audio', 'object', 'embed', 'figure', 'details', 'summary']);

// Minimal wpautop: classic-editor posts store paragraphs as blank-line separated text.
function autop(html) {
  if (/<p[\s>]/i.test(html)) return html;
  return html
    .split(/\n\s*\n/)
    .map((p) => (/^\s*<(h\d|ul|ol|table|blockquote|pre|figure|div|iframe|hr)/i.test(p) ? p : `<p>${p.replace(/\n/g, '<br>')}</p>`))
    .join('\n');
}

function toMarkdown(html) {
  const cleaned = autop(
    html
      .replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '') // Gutenberg block markers
      .replace(/\[\/?(fusion_|vc_|et_pb_)[^\]]*\]/g, '') // page-builder shortcodes (Avada, WPBakery, Divi)
      .replace(/<figure class="wp-block-table[^"]*">([\s\S]*?)<\/figure>/g, '$1') // let tables become Markdown
      .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g, '<figure>$1</figure>'),
  );
  return td.turndown(cleaned).replace(/\n{3,}/g, '\n\n').trim();
}

const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#8217;/g, '’').replace(/&quot;/g, '"');

// The WordPress excerpt if set, otherwise the first 40 words of the opening paragraphs.
function excerptOf(item, html) {
  const ex = decode(text(item['excerpt:encoded']).replace(/<[^>]+>/g, '')).trim();
  if (ex) return ex;
  const paras = [...autop(html).matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => m[1]).join(' ');
  return decode(paras.replace(/\[[^\]]*\]/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim().split(' ').slice(0, 40).join(' ');
}

const yaml = (s) => JSON.stringify(s); // JSON strings are valid YAML scalars

if (!flags.includes('--keep-demo')) {
  for (const f of fs.readdirSync(ARTICLES)) if (f !== 'what-an-article-can-hold.md') fs.rmSync(path.join(ARTICLES, f));
}

let posts = 0, pages = 0;
const skipped = [];
for (const item of items) {
  const type = text(item['wp:post_type']);
  const status = text(item['wp:status']);
  const slug = decodeURIComponent(text(item['wp:post_name']) || text(item['wp:post_id']));
  const title = text(item.title).trim() || slug;
  if (status !== 'publish' || !['post', 'page'].includes(type)) continue;

  const md = toMarkdown(text(item['content:encoded']));
  const words = md.split(/\s+/).length;

  if (type === 'post') {
    const cats = (item.category ?? []).filter((c) => c['@domain'] === 'category').map((c) => text(c));
    const thumb = attachments.get(text(meta(item, '_thumbnail_id')));
    const fm = [
      '---',
      `title: ${yaml(title)}`,
      `date: ${text(item['wp:post_date']).slice(0, 10)}`,
      `categories: ${JSON.stringify(cats.length ? cats : ['Uncategorized'])}`,
      `excerpt: ${yaml(excerptOf(item, text(item['content:encoded'])))}`,
      thumb && `image: ${yaml(thumb)}`,
      `readingTime: ${Math.max(1, Math.round(words / 200))}`,
      '---',
    ].filter(Boolean);
    fs.writeFileSync(path.join(ARTICLES, `${slug}.md`), `${fm.join('\n')}\n\n${md}\n`);
    posts++;
  } else {
    if (SKIP_PAGES.has(slug)) { skipped.push(slug); continue; }
    const [menu, order] = MENU[slug] ?? [];
    const fm = ['---', `title: ${yaml(title)}`, menu && `menu: ${yaml(menu)}`, order && `order: ${order}`, '---'].filter(Boolean);
    fs.writeFileSync(path.join(PAGES, `${slug}.md`), `${fm.join('\n')}\n\n${md}\n`);
    pages++;
  }
}
console.log(`Imported ${posts} articles and ${pages} pages.${skipped.length ? ` Skipped template pages: ${skipped.join(', ')}.` : ''}`);
