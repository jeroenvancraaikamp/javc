// Gartner Magic Quadrant placement of the IT4IT Atlas tools (Leader, Challenger, Visionary, Niche Player), shown on
// /it4it-atlas/gartner/. Run by the GitHub Action "Update IT4IT Atlas" after maintain-atlas.mjs. Per Magic Quadrant with
// tools whose placement is missing (or was not found more than 30 days ago), Claude looks the placement up with web search
// in public sources: Gartner's own pages and the vendors' own announcements ("named a Leader in the 2026 ..."). Every
// placement keeps the URL that states it. The MQ graphics themselves are Gartner's copyright and are never copied.
//   node scripts/atlas-mq-placement.mjs           needs ANTHROPIC_API_KEY
//   node scripts/atlas-mq-placement.mjs --dry     only list the Magic Quadrants that would be looked up
import { readFileSync, writeFileSync } from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-sonnet-5-5';
const MAX_MQ = Number(process.env.ATLAS_MQ || 40); // Magic Quadrants looked up in one run
const PARALLEL = 3;
const DRY = process.argv.includes('--dry');
const TODAY = new Date().toISOString().slice(0, 10);
const RETRY_DAYS = 30;
const PLACEMENTS = ['Leader', 'Challenger', 'Visionary', 'Niche Player', 'unknown'];

const catalogue = JSON.parse(readFileSync('atlas/tools.json', 'utf8'));
const daysAgo = (d) => (Date.parse(TODAY) - Date.parse(d)) / 864e5;
const due = (g) => !g.placement || (g.placement === 'unknown' && (!g.placementCheckedAt || daysAgo(g.placementCheckedAt) > RETRY_DAYS));

// Magic Quadrants (market + year) with at least one listed tool whose placement is due.
const mqs = new Map();
for (const t of catalogue) {
  if (t.status !== 'listed') continue;
  for (const g of t.gartnerMagicQuadrants ?? []) {
    const key = `${g.market}|${g.year}`;
    if (!mqs.has(key)) mqs.set(key, { market: g.market, year: g.year, url: g.sourceUrl, entries: [] });
    mqs.get(key).entries.push({ tool: t, g });
  }
}
const todo = [...mqs.values()].filter((q) => q.entries.some((e) => due(e.g))).slice(0, MAX_MQ);
console.log(`Look up the placement in ${todo.length} Magic Quadrants: ${todo.map((q) => q.market).join('; ')}`);
if (DRY || !todo.length) process.exit(0);
if (!process.env.ANTHROPIC_API_KEY) {
  console.log('::warning::ANTHROPIC_API_KEY is not set, so no Magic Quadrant placements were looked up.');
  process.exit(0);
}

const client = new Anthropic();
const SYSTEM = `You look up where vendors are placed in a Gartner Magic Quadrant, for the IT4IT Atlas on javc.nl.
Rules:
- Use web search and web fetch. Only accept a placement that a source states explicitly for this Magic Quadrant and year: Gartner's own pages, or the vendor's own announcement or press release ("X named a Leader in the 2026 Gartner Magic Quadrant for ..."). Credible press coverage that quotes the placement may be used when the vendor has no announcement.
- Placements are one of: "Leader", "Challenger", "Visionary", "Niche Player". If no source states the placement, answer "unknown". Never guess from market share or from other years or other Magic Quadrants.
- Give the exact https URL of the page that states each placement (one you actually opened or found in search results).`;

async function lookUp(q) {
  const vendors = [...new Map(q.entries.map((e) => [e.g.vendor || e.tool.vendor, e.tool.name])).entries()];
  const messages = [{ role: 'user', content: `Magic Quadrant: "${q.market}", ${q.year} edition${q.url ? ` (Gartner document: ${q.url})` : ''}.
For each vendor below (with one of its products in this Magic Quadrant), find its placement in this edition.

${vendors.map(([v, p]) => `- ${v} (product: ${p})`).join('\n')}

Answer with a JSON array between <json> and </json>: [{"vendor": exactly as given above, "placement": "Leader" | "Challenger" | "Visionary" | "Niche Player" | "unknown", "sourceUrl": "https://..." or null}].` }];
  for (let round = 0; round < 6; round++) {
    const msg = await client.beta.messages.stream({
      model: MODEL,
      max_tokens: 32000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'medium' },
      system: SYSTEM,
      tools: [
        { type: 'web_search_20260209', name: 'web_search', max_uses: Math.min(30, vendors.length * 2 + 4) },
        { type: 'web_fetch_20260209', name: 'web_fetch', max_uses: Math.min(30, vendors.length * 2 + 4) },
      ],
      messages,
    }).finalMessage();
    if (msg.stop_reason === 'pause_turn') { messages.push({ role: 'assistant', content: msg.content }); continue; }
    if (msg.stop_reason !== 'end_turn') throw new Error(`stopped: ${msg.stop_reason}`);
    const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    const m = text.match(/<json>\s*([\s\S]*?)\s*<\/json>(?![\s\S]*<json>)/);
    if (!m) throw new Error('no <json> in the answer');
    return JSON.parse(m[1]);
  }
  throw new Error('lookup did not finish');
}

const https = (u) => { try { const x = new URL(u); return x.protocol === 'https:' && !x.username && !x.password; } catch { return false; } };
let found = 0, unknown = 0, failed = 0;
async function run(q) {
  try {
    const answer = await lookUp(q);
    const byVendor = new Map((Array.isArray(answer) ? answer : []).map((a) => [String(a.vendor).toLowerCase(), a]));
    for (const { tool, g } of q.entries) {
      if (!due(g)) continue;
      const a = byVendor.get(String(g.vendor || tool.vendor).toLowerCase());
      const ok = a && PLACEMENTS.includes(a.placement) && a.placement !== 'unknown' && https(a.sourceUrl);
      g.placement = ok ? a.placement : 'unknown';
      if (ok) g.placementSource = a.sourceUrl; else delete g.placementSource;
      g.placementCheckedAt = TODAY;
      ok ? found++ : unknown++;
    }
    console.log(`${q.market}: done`);
  } catch (e) {
    failed++;
    console.log(`::warning::${q.market}: ${e.message}`);
  }
}
const queue = [...todo];
await Promise.all(Array.from({ length: PARALLEL }, async () => { while (queue.length) await run(queue.shift()); }));

writeFileSync('atlas/tools.json', '[\n' + catalogue.map((t) => JSON.stringify(t)).join(',\n') + '\n]\n');
console.log(`Placements found: ${found}, not found: ${unknown}, Magic Quadrants failed: ${failed}`);
