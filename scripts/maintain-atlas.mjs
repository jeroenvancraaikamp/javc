// Daily maintenance of the IT4IT Atlas (atlas/tools.json), run by the GitHub Action "Update IT4IT Atlas"
// every morning; the result goes live straight away. With Claude and web search it:
//   - re-checks the tools whose last check is oldest (ATLAS_CHECK, default 40): description, producer, links, source,
//     classification; a product that has clearly been discontinued is hidden (status "discontinued", kept in the data);
//   - looks for notable products missing from the subcategories that were searched longest ago (ATLAS_NEW_SUBS, default 3);
//   - records what changed in atlas/activity.json (shown on /it4it-atlas/changes/) and, when SMTP2GO_API_KEY is set,
//     e-mails the daily report to ATLAS_REPORT_TO (default Info@JAVC.nl).
// Same source policy as the original Atlas: producer content first, then credible third-party sources; exact products,
// no invented descriptions; the evidence URL, research date and a source note are kept for every tool.
//   node scripts/maintain-atlas.mjs           needs ANTHROPIC_API_KEY
//   node scripts/maintain-atlas.mjs --dry     only list what would be checked
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-sonnet-5-5';
const CHECK = Number(process.env.ATLAS_CHECK || 40);
const NEW_SUBS = Number(process.env.ATLAS_NEW_SUBS || 3);
const PER_CALL = 5; // tools re-checked in one conversation with Claude
const PARALLEL = 3;
const DRY = process.argv.includes('--dry');
const TODAY = new Date().toISOString().slice(0, 10);

const catalogue = JSON.parse(readFileSync('atlas/tools.json', 'utf8'));
const TAXONOMY = JSON.parse(readFileSync('src/data/atlas-taxonomy.json', 'utf8'));
const SUBS = TAXONOMY.sections.flatMap((s) => s.groups.flatMap((g) => g.subs.map((x) => ({ ...x, group: g.name, section: s.id, sectionName: s.name }))));
const SUB = Object.fromEntries(SUBS.map((x) => [x.id, x]));
const state = existsSync('atlas/maintenance.json') ? JSON.parse(readFileSync('atlas/maintenance.json', 'utf8')) : { searched: {} };
const activity = existsSync('atlas/activity.json') ? JSON.parse(readFileSync('atlas/activity.json', 'utf8')) : [];
const norm = (s) => String(s ?? '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

// --- what to do today ----------------------------------------------------------------------------------
const listed = catalogue.filter((t) => t.status === 'listed');
const lastLook = (t) => [t.verifiedAt, t.lastChecked].filter(Boolean).sort().pop() ?? '';
const toCheck = [...listed].sort((a, b) => lastLook(a).localeCompare(lastLook(b)) || a.id.localeCompare(b.id)).slice(0, CHECK);
const toSearch = [...SUBS].sort((a, b) => (state.searched[a.id] ?? '').localeCompare(state.searched[b.id] ?? '') || a.id.localeCompare(b.id)).slice(0, NEW_SUBS);

console.log(`Re-check ${toCheck.length} tools (last checked ${lastLook(toCheck[0]) || 'never'} … ${lastLook(toCheck.at(-1)) || 'never'})`);
console.log(`Look for missing tools in: ${toSearch.map((x) => x.name).join('; ')}`);
if (DRY) process.exit(0);
if (!process.env.ANTHROPIC_API_KEY) {
  console.log('::warning::ANTHROPIC_API_KEY is not set, so the Atlas was not updated. Add it as a repository secret.');
  process.exit(0);
}

// --- Claude with web search ------------------------------------------------------------------------------
const client = new Anthropic();
const taxonomyText = SUBS.map((x) => `${x.id}: ${x.sectionName} › ${x.group} › ${x.name} (${x.desc})`).join('\n');
const SYSTEM = `You maintain the IT4IT Atlas on javc.nl, a directory of IT management tools, business applications, workplace platforms and technology platforms for IT architects and consultants.

Source policy:
- Research the actual product with web search and web fetch. Use the producer's own website and official documentation first; use credible specialist publications or clearly identifiable software directories only when producer information is unavailable or insufficient.
- Match the exact product and producer. Never substitute a generic category description and never invent features.
- Descriptions are short, factual English paraphrases of what the product does (one to three sentences, at most 450 characters), not marketing copy.
- Record the exact page that supports the description (sourceUrl), whether it is the producer's own content (descriptionSource "producer") or a third party's ("third-party"), and a sourceNote: what was checked, on which page, and any limitations (for example an acquisition or a renamed product). The note must not claim independent testing.
- Keep the producer's website in url (https). Only use https URLs that you actually opened or found in search results.
- Classify by the product's supported purpose, using only subcategory ids from the taxonomy below. A product may have several subcategories when it clearly serves each of them.
- A missing or moved page alone is not a reason to call a product discontinued; only clear evidence (an end-of-life notice, a statement by the producer) is.

Taxonomy (subcategory id: section › group › subcategory):
${taxonomyText}`;

async function research(prompt, maxUses) {
  const messages = [{ role: 'user', content: prompt }];
  for (let round = 0; round < 6; round++) {
    const msg = await client.beta.messages.stream({
      model: MODEL,
      max_tokens: 64000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'medium' },
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      tools: [
        { type: 'web_search_20260209', name: 'web_search', max_uses: maxUses },
        { type: 'web_fetch_20260209', name: 'web_fetch', max_uses: maxUses },
      ],
      messages,
    }).finalMessage();
    if (msg.stop_reason === 'pause_turn') { messages.push({ role: 'assistant', content: msg.content }); continue; }
    if (msg.stop_reason === 'refusal') throw new Error('declined by the model');
    if (msg.stop_reason === 'max_tokens') throw new Error('answer too long');
    const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    const m = text.match(/<json>\s*([\s\S]*?)\s*<\/json>(?![\s\S]*<json>)/);
    if (!m) throw new Error('no <json> in the answer');
    return JSON.parse(m[1]);
  }
  throw new Error('research did not finish');
}

// --- checking answers before they go into the catalogue ---------------------------------------------------
const https = (u) => { try { const x = new URL(u); return x.protocol === 'https:' && x.hostname.includes('.') && !x.username && !x.password; } catch { return false; } };
const text = (s, max) => typeof s === 'string' && s.trim().length > 0 && s.length <= max;
function fields(answer, base) {
  const r = Object.fromEntries(Object.entries(answer).filter(([, v]) => v !== null && v !== ''));
  const out = {};
  if (r.name !== undefined) { if (!text(r.name, 200)) throw new Error('bad name'); out.name = r.name.trim(); }
  if (r.vendor !== undefined) { if (!text(r.vendor, 200)) throw new Error('bad vendor'); out.vendor = r.vendor.trim(); }
  if (r.url !== undefined) { if (!https(r.url)) throw new Error('bad url'); out.url = r.url; }
  if (r.sourceUrl !== undefined) { if (!https(r.sourceUrl)) throw new Error('bad sourceUrl'); out.sourceUrl = r.sourceUrl; }
  if (r.description !== undefined) { if (!text(r.description, 600)) throw new Error('bad description'); out.description = r.description.trim(); }
  if (r.descriptionSource !== undefined) { if (!['producer', 'third-party'].includes(r.descriptionSource)) throw new Error('bad descriptionSource'); out.descriptionSource = r.descriptionSource; }
  if (r.sourceNote !== undefined) { if (!text(r.sourceNote, 1500)) throw new Error('bad sourceNote'); out.sourceNote = r.sourceNote.trim(); }
  if (r.subcategoryIds !== undefined) {
    const ids = [...new Set(r.subcategoryIds)].filter((s) => SUB[s]);
    if (!ids.length) throw new Error('no valid subcategory');
    out.subcategoryIds = ids;
  }
  const merged = { ...base, ...out };
  out.catalogueViewIds = [...new Set(merged.subcategoryIds.map((s) => SUB[s].section))];
  return out;
}
const brief = (t) => ({ id: t.id, name: t.name, vendor: t.vendor, url: t.url, sourceUrl: t.sourceUrl, description: t.description, subcategoryIds: t.subcategoryIds, verifiedAt: t.verifiedAt });

const report = { date: TODAY, checked: 0, confirmed: 0, unverified: 0, updated: [], added: [], discontinued: [], errors: 0 };

async function checkBatch(batch) {
  const answer = await research(`Re-check these ${batch.length} catalogue entries (JSON). For each, research the product now and decide:
- "confirmed": the entry is still correct (you may still give a better sourceUrl/sourceNote);
- "updated": something is wrong or outdated; give only the corrected fields (name, vendor, url, sourceUrl, description, descriptionSource, sourceNote, subcategoryIds);
- "discontinued": clear evidence that the product is no longer offered;
- "unverified": you could not find reliable information.
Always give "change": one short English sentence on what you found or changed (shown in the public daily report).

Entries:
${JSON.stringify(batch.map(brief), null, 1)}

Answer with a JSON array between <json> and </json>, one object per entry: {"id", "verdict", "change", ...corrected fields}.`, batch.length * 4);
  for (const r of Array.isArray(answer) ? answer : []) {
    const t = catalogue.find((x) => x.id === r.id && batch.includes(x));
    if (!t) continue;
    try {
      t.lastChecked = TODAY;
      const change = text(r.change, 400) ? r.change.trim() : '';
      if (r.verdict === 'confirmed') {
        try { Object.assign(t, fields({ sourceUrl: r.sourceUrl, sourceNote: r.sourceNote, descriptionSource: r.descriptionSource }, t)); } catch { /* keep the old evidence */ }
        t.verifiedAt = TODAY;
        report.confirmed++;
      } else if (r.verdict === 'updated') {
        const before = { name: t.name, description: t.description };
        Object.assign(t, fields(r, t), { verifiedAt: TODAY });
        report.updated.push({ id: t.id, name: t.name, was: before.name !== t.name ? before.name : undefined, change });
      } else if (r.verdict === 'discontinued') {
        Object.assign(t, { status: 'discontinued', verifiedAt: TODAY }, text(r.sourceNote, 1500) ? { sourceNote: r.sourceNote.trim() } : {});
        report.discontinued.push({ id: t.id, name: t.name, change });
      } else report.unverified++;
      report.checked++;
    } catch (err) {
      report.errors++;
      console.log(`::warning::${t.name}: ${err.message}`);
    }
  }
}

async function searchSub(sub) {
  const known = catalogue.filter((t) => t.subcategoryIds.includes(sub.id)).map((t) => `${t.name} (${t.vendor})`);
  const answer = await research(`Find up to 3 notable, currently offered products that belong in the subcategory "${sub.name}" (${sub.id}: ${sub.desc}) and are missing from the catalogue. Prefer widely used or recognised products. Skip anything already listed below, also under another name or edition.

Already in this subcategory:
${known.join('\n') || '(none)'}

All other product names in the catalogue (also skip these):
${catalogue.filter((t) => !t.subcategoryIds.includes(sub.id)).map((t) => t.name).join('; ')}

Answer with a JSON array between <json> and </json> (empty when nothing notable is missing), each {"name", "vendor", "url", "sourceUrl", "description", "descriptionSource", "sourceNote", "subcategoryIds", "change"} where "change" is one short English sentence on why it was added.`, 10);
  const names = new Set(catalogue.map((t) => norm(t.name)));
  for (const r of (Array.isArray(answer) ? answer : []).slice(0, 3)) {
    try {
      if (!text(r.name, 200) || names.has(norm(r.name))) continue;
      const base = { subcategoryIds: [sub.id] };
      const f = fields({ ...r, subcategoryIds: r.subcategoryIds ?? [sub.id] }, base);
      for (const k of ['name', 'vendor', 'url', 'sourceUrl', 'description', 'sourceNote']) if (!f[k]) throw new Error(`missing ${k}`);
      const t = {
        id: createHash('sha256').update(`${norm(f.name)}|${norm(f.vendor)}`).digest('hex').slice(0, 16),
        ...f,
        descriptionSource: f.descriptionSource ?? 'producer',
        tags: f.subcategoryIds.map((s) => SUB[s].name),
        status: 'listed',
        verifiedAt: TODAY,
        addedAt: TODAY,
        gartnerMagicQuadrants: [],
        it4itValueStreams: [],
      };
      catalogue.push(t);
      names.add(norm(t.name));
      report.added.push({ id: t.id, name: t.name, vendor: t.vendor, sub: sub.name, change: text(r.change, 400) ? r.change.trim() : '' });
    } catch (err) {
      report.errors++;
      console.log(`::warning::new tool in ${sub.name}: ${err.message}`);
    }
  }
  state.searched[sub.id] = TODAY;
}

const jobs = [];
for (let i = 0; i < toCheck.length; i += PER_CALL) jobs.push(() => checkBatch(toCheck.slice(i, i + PER_CALL)));
for (const sub of toSearch) jobs.push(() => searchSub(sub));
await Promise.all(Array.from({ length: PARALLEL }, async () => {
  for (let job; (job = jobs.shift());) {
    try { await job(); } catch (err) { report.errors++; console.log(`::warning::${err.message}`); }
  }
}));

// --- save -----------------------------------------------------------------------------------------------
catalogue.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
writeFileSync('atlas/tools.json', '[\n' + catalogue.map((t) => JSON.stringify(t)).join(',\n') + '\n]\n');
writeFileSync('atlas/maintenance.json', JSON.stringify(state, null, 2) + '\n');
report.searched = toSearch.map((x) => x.name);
report.summary = `Checked ${report.checked} tools: ${report.confirmed} confirmed, ${report.updated.length} updated, ${report.discontinued.length} discontinued, ${report.unverified} could not be verified. Searched ${report.searched.join(', ')} for missing products: ${report.added.length} added.`;
activity.unshift(report);
writeFileSync('atlas/activity.json', JSON.stringify(activity.slice(0, 52), null, 2) + '\n');
console.log(report.summary);
if (report.errors) console.log(`${report.errors} problems, see the warnings above.`);

// --- e-mail the report -----------------------------------------------------------------------------------
if (process.env.SMTP2GO_API_KEY) {
  const line = (x) => `- ${x.name}${x.vendor ? ` (${x.vendor})` : ''}${x.was ? ` (was: ${x.was})` : ''}${x.sub ? ` [${x.sub}]` : ''}: ${x.change}`;
  const body = [
    `Wekelijkse update van de IT4IT Atlas, ${TODAY}`, '',
    report.summary, '',
    `Toegevoegd (${report.added.length}):`, ...report.added.map(line), '',
    `Bijgewerkt (${report.updated.length}):`, ...report.updated.map(line), '',
    `Niet meer leverbaar, verborgen (${report.discontinued.length}):`, ...report.discontinued.map(line), '',
    'De wijzigingen staan al live: https://javc.nl/it4it-atlas/changes/',
  ].join('\n');
  const res = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'X-Smtp2go-Api-Key': process.env.SMTP2GO_API_KEY },
    body: JSON.stringify({
      sender: process.env.ATLAS_REPORT_FROM || 'JAVC website <info@javc.nl>',
      to: [process.env.ATLAS_REPORT_TO || 'Info@JAVC.nl'],
      subject: `IT4IT Atlas: ${report.updated.length} bijgewerkt, ${report.added.length} toegevoegd (${TODAY})`,
      text_body: body,
    }),
  }).catch(() => null);
  const data = res ? await res.json().catch(() => ({})) : {};
  console.log(res?.ok && data?.data?.succeeded ? 'Report e-mailed.' : `::warning::The report could not be e-mailed (${res?.status ?? 'no connection'}).`);
}
