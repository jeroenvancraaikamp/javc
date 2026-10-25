// Keeps the site's translations up to date: every article and page is written in one language
// (field `lang`, English by default) and gets a translation in each of the other languages in
// src/content/translations/<articles|pages>/<slug>.<lang>.md; the homepage text (src/data/home.json)
// gets src/data/home.nl.json and src/data/home.zh.json.
//
// A translation remembers a hash of the original it was made from (`source`). When the original
// changes, it is translated again, with Claude (needs ANTHROPIC_API_KEY). A translation without a
// `source` (written by hand) is adopted as up to date; one with `locked: true` is never touched.
// Translations whose original was deleted are removed.
//
// Runs in the GitHub Action "Translate" after every change on main. Locally:
//   node scripts/translate.mjs           translate what is new or changed
//   node scripts/translate.mjs --dry     only list what would be translated
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';
import yaml from 'js-yaml';
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-5-5';
const PARALLEL = 4;
const DRY = process.argv.includes('--dry');
const NAME = { en: 'English', nl: 'Dutch', zh: 'Simplified Chinese' };
const LANGS = Object.keys(NAME);

// --- files ----------------------------------------------------------------------
function readMd(path) {
  const src = readFileSync(path, 'utf8');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: src };
  return { data: yaml.load(m[1], { schema: yaml.JSON_SCHEMA }) ?? {}, body: src.slice(m[0].length) };
}
function writeMd(path, data, body) {
  const fm = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`)
    .join('\n');
  writeFileSync(path, `---\n${fm}\n---\n\n${body.replace(/^\n+/, '').trimEnd()}\n`);
}
const hash = (obj) => createHash('sha256').update(JSON.stringify(obj)).digest('hex').slice(0, 16);

// Links to site pages point to the same language: /skills/ → /nl/skills/, /zh/skills/ (not images, files or the API).
function localizeLinks(text, lang) {
  const fix = (p) => {
    if (p.startsWith('//') || /^\/(wp-content|images|media|files|api|admin|cms)\//.test(p) || /\.\w{2,5}([?#].*)?$/.test(p)) return p;
    const base = p.replace(/^\/(nl|zh)(?=\/)/, '');
    return lang === 'en' ? base : `/${lang}${base}`;
  };
  return text
    .replace(/(\]\()(\/[^)\s]*)/g, (_, a, p) => a + fix(p))
    .replace(/(href=["'])(\/[^"']*)/g, (_, a, p) => a + fix(p));
}

// --- work list --------------------------------------------------------------------
const jobs = [];
const keep = new Set();

for (const kind of ['articles', 'pages']) {
  const dir = `src/content/${kind}`;
  const outDir = `src/content/translations/${kind}`;
  mkdirSync(outDir, { recursive: true });
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const slug = basename(f, '.md');
    const { data, body } = readMd(join(dir, f));
    if (data.draft === true) continue;
    const from = LANGS.includes(data.lang) ? data.lang : 'en';
    const fields = { title: data.title, ...(kind === 'articles' ? { excerpt: data.excerpt } : {}), ...(data.menu ? { menu: data.menu } : {}) };
    const source = hash({ ...fields, body });
    for (const to of LANGS.filter((l) => l !== from)) {
      const out = join(outDir, `${slug}.${to}.md`);
      keep.add(out);
      const old = existsSync(out) ? readMd(out) : null;
      if (old?.data.locked) continue;
      if (old && !old.data.source) { // written by hand: adopt it as the translation of the current original
        if (!DRY) writeMd(out, { ...old.data, source }, old.body);
        console.log(`adopted   ${out}`);
        continue;
      }
      if (old?.data.source === source) continue;
      jobs.push({ label: out, from, to, fields, body, save: (t) => writeMd(out, { ...t.fields, source }, localizeLinks(t.body, to)) });
    }
  }
}

// Homepage: always from English.
for (const to of LANGS.filter((l) => l !== 'en')) {
  const home = JSON.parse(readFileSync('src/data/home.json', 'utf8'));
  const out = `src/data/home.${to}.json`;
  const source = hash(home);
  const old = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : null;
  if (old && !old.source) {
    if (!DRY) writeFileSync(out, JSON.stringify({ ...old, source }, null, 2) + '\n');
    console.log(`adopted   ${out}`);
  } else if (!old?.locked && old?.source !== source) {
    jobs.push({ label: out, from: 'en', to, json: home, save: (t) => writeFileSync(out, JSON.stringify({ ...t.json, source }, null, 2) + '\n') });
  }
}

// Translations of deleted (or draft, or now other-language) originals.
for (const kind of ['articles', 'pages']) {
  const dir = `src/content/translations/${kind}`;
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const p = join(dir, f);
    if (keep.has(p) || readMd(p).data.locked) continue;
    console.log(`removed   ${p}`);
    if (!DRY) unlinkSync(p);
  }
}

if (!jobs.length) { console.log('All translations are up to date.'); process.exit(0); }
for (const j of jobs) console.log(`to do     ${j.label} (${j.from} → ${j.to})`);
if (DRY) process.exit(0);
if (!process.env.ANTHROPIC_API_KEY) {
  console.log('::warning::ANTHROPIC_API_KEY is not set, so nothing was translated. Add it as a repository secret.');
  process.exit(0);
}

// --- translating -------------------------------------------------------------------
const client = new Anthropic();
const system = (from, to) => `You translate content of javc.nl, the website of Jeroen van Craaikamp (JAVC Management & Consultancy), a freelance ServiceNow and IT service management consultant in Amstelveen, the Netherlands, from ${NAME[from]} into ${NAME[to]}.

- Translate faithfully and completely, in natural, professional ${NAME[to]} as a native writer would write it. Do not summarise, shorten, add or comment.
- Keep the Markdown and HTML structure exactly as it is: headings, lists, tables, emphasis, line breaks, HTML tags and attributes, iframes, code and code blocks. Translate visible text only, including link texts and image alt texts.
- Never change URLs, link targets, image paths, e-mail addresses, phone numbers or file names.
- Keep product names, company names and established IT terms the way ${NAME[to]}-speaking IT professionals use them (ServiceNow, CMDB, CSDM, ITIL, IT4IT, TBM, ESM, product owner, change management and the like). Keep names of people and organisations.
${to === 'nl' ? "- Address the reader with 'je'/'jij', unless the original is formal (such as legal text): then use 'u'." : ''}${to === 'zh' ? "- Write Simplified Chinese as used in mainland China, with Chinese punctuation. Keep English product names and IT terms that Chinese IT professionals use in English (ServiceNow, CMDB, ITIL and the like); you may add the Chinese term in brackets the first time where that helps. Write Dutch place names and organisations as they are, with a Chinese explanation in brackets where useful." : ''}
- Reply with the translation only, in exactly the requested format.`;

async function ask(job) {
  let prompt;
  if (job.json) {
    prompt = `Translate the text values of this JSON. Keep the keys, and keep every "link" value unchanged. Return the JSON between <json> and </json>.\n\n<json>\n${JSON.stringify(job.json, null, 2)}\n</json>`;
  } else {
    const parts = Object.entries(job.fields).map(([k, v]) => `<${k}>${v}</${k}>`).join('\n');
    prompt = `Translate this ${job.label.includes('/pages/') ? 'page' : 'article'}. Return the same tags (${Object.keys(job.fields).map((k) => `<${k}>`).join(', ')}, <body>) with the translated content.\n\n${parts}\n<body>\n${job.body}\n</body>`;
  }
  const msg = await client.beta.messages.stream({
    model: MODEL,
    max_tokens: 64000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: system(job.from, job.to),
    messages: [{ role: 'user', content: prompt }],
  }).finalMessage();
  if (msg.stop_reason === 'refusal') throw new Error('declined by the model');
  if (msg.stop_reason === 'max_tokens') throw new Error('answer too long');
  const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  const tag = (k) => {
    const m = text.match(new RegExp(`<${k}>\\n?([\\s\\S]*?)\\n?</${k}>(?![\\s\\S]*</${k}>)`));
    if (!m) throw new Error(`no <${k}> in the answer`);
    return m[1];
  };
  if (job.json) {
    const json = JSON.parse(tag('json'));
    json.blocks?.forEach((b, i) => { b.link = job.json.blocks[i]?.link ?? b.link; });
    return { json };
  }
  const fields = Object.fromEntries(Object.keys(job.fields).map((k) => [k, tag(k).trim()]));
  return { fields, body: tag('body') };
}

let failed = 0;
const queue = [...jobs];
await Promise.all(Array.from({ length: PARALLEL }, async () => {
  for (let job; (job = queue.shift());) {
    try {
      job.save(await ask(job));
      console.log(`translated ${job.label}`);
    } catch (err) {
      failed++;
      console.log(`::error::${job.label}: ${err.message}`);
    }
  }
}));
console.log(`${jobs.length - failed} of ${jobs.length} translated.`);
if (failed) process.exitCode = 1;
