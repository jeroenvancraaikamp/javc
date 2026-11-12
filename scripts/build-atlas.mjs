// Builds the data for the IT4IT Atlas page (/it4it-atlas/) from atlas/tools.json, the catalogue itself
// (one tool per line, all fields as in the original Atlas app):
//   public/atlas/tools.json   the tools as the page loads them in the browser (logos: public/atlas-logos/, chosen with atlas/logos.json)
//   src/data/atlas-meta.json  edition, number of tools, tools per subcategory and the latest weekly update, used when building the pages
// Runs before every build (npm run build). atlas/tools.json is kept up to date every week by
// scripts/maintain-atlas.mjs (GitHub Action "Update IT4IT Atlas"); it can also be replaced by an Excel export of the
// original Atlas app (same columns; the column "Complete attributes (JSON)" holds everything that is used):
//   node scripts/build-atlas.mjs --import export.xlsx
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';

// --- a minimal .xlsx reader: unzip, shared strings, cells of the first sheet ---------------------------

function unzip(buf) {
  const files = {};
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('not an .xlsx file');
  let p = buf.readUInt32LE(eocd + 16);
  for (let n = buf.readUInt16LE(eocd + 10); n > 0; n--) {
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extra = buf.readUInt16LE(p + 30);
    const comment = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const data = buf.subarray(start, start + size);
    files[name] = (method === 8 ? inflateRawSync(data) : data).toString('utf8');
    p += 46 + nameLen + extra + comment;
  }
  return files;
}

const unescape = (s) =>
  s.replace(/&(lt|gt|quot|apos|amp|#(\d+)|#x([0-9a-f]+));/gi, (_, e, d, h) =>
    d ? String.fromCodePoint(+d) : h ? String.fromCodePoint(parseInt(h, 16)) : { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' }[e]);

const text = (xml) => unescape([...xml.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((m) => m[1]).join(''));

function readSheet(files) {
  const shared = [...(files['xl/sharedStrings.xml'] ?? '').matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => text(m[1]));
  const rows = [];
  for (const [, row] of files['xl/worksheets/sheet1.xml'].matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const cells = {};
    for (const [, attrs, body] of row.matchAll(/<c ([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const col = attrs.match(/r="([A-Z]+)/)[1];
      const type = attrs.match(/t="(\w+)"/)?.[1];
      const v = body?.match(/<v>([\s\S]*?)<\/v>/)?.[1];
      cells[col] = type === 's' ? shared[+v] : type === 'inlineStr' ? text(body) : v !== undefined ? unescape(v) : '';
    }
    rows.push(cells);
  }
  return rows;
}

// --- import from Excel ---------------------------------------------------------------------------------

export const writeCatalogue = (list) =>
  writeFileSync('atlas/tools.json', '[\n' + list.map((t) => JSON.stringify(t)).join(',\n') + '\n]\n');

const at = process.argv.indexOf('--import');
if (at > 0) {
  const file = process.argv[at + 1];
  const [head, ...rows] = readSheet(unzip(readFileSync(file)));
  const col = Object.keys(head).find((c) => head[c] === 'Complete attributes (JSON)');
  if (!col) throw new Error(`${file}: no column "Complete attributes (JSON)"`);
  const list = rows.filter((r) => r[col]).map((r) => JSON.parse(r[col]));
  writeCatalogue(list);
  console.log(`IT4IT Atlas: imported ${list.length} tools from ${file} into atlas/tools.json`);
}

// --- tools -------------------------------------------------------------------------------------------

const TAXONOMY = JSON.parse(readFileSync('src/data/atlas-taxonomy.json', 'utf8'));
const SUB = {};
for (const s of TAXONOMY.sections) for (const g of s.groups) for (const x of g.subs) SUB[x.id] = { section: s.id, csdm: x.csdm ?? [], streams: (x.streams ?? '').split('·')[1]?.split(',').map((v) => v.trim()).filter(Boolean) ?? [] };

// Logos copied from the original Atlas app: by product name, then by producer name or website.
const LOGOS = JSON.parse(readFileSync('atlas/logos.json', 'utf8'));
const norm = (s) => String(s ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const host = (u) => { try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; } };
const logo = (a) => (LOGOS.products[norm(a.name)] ?? LOGOS.vendors[norm(a.vendor)] ?? LOGOS.domains[host(a.url)])?.src.replace('/logos/', '/atlas-logos/');

const catalogue = JSON.parse(readFileSync('atlas/tools.json', 'utf8'));
const tools = catalogue
  .filter((a) => !['removed', 'discontinued'].includes(a.status))
  .map((a) => {
    const subs = a.subcategoryIds.filter((s) => SUB[s]);
    // Sections follow from the subcategories; value streams too, for tools that have none of their own.
    const views = [...new Set(subs.map((s) => SUB[s].section))];
    const streams = a.it4itValueStreams?.length ? a.it4itValueStreams : views.includes('it4it') ? [...new Set(subs.flatMap((s) => SUB[s].streams))] : [];
    return {
      id: a.id,
      name: a.name,
      vendor: a.vendor,
      url: a.url,
      source: a.sourceUrl,
      checked: a.verifiedAt,
      description: a.description,
      descSource: a.descriptionSource,
      note: a.sourceNote,
      logo: logo(a),
      subs,
      tags: a.tags ?? [],
      views,
      streams,
      // CSDM 5 domains follow from the subcategories (src/data/atlas-taxonomy.json).
      domains: [...new Set(subs.flatMap((s) => SUB[s].csdm))],
      gartner: (a.gartnerMagicQuadrants ?? []).map((g) => ({ market: g.market, vendor: g.vendor, year: g.year, url: g.sourceUrl })),
    };
  })
  .filter((t) => t.subs.length)
  .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

const counts = {};
for (const t of tools) for (const s of t.subs) counts[s] = (counts[s] ?? 0) + 1;
const domains = {};
for (const t of tools) for (const d of t.domains) domains[d] = (domains[d] ?? 0) + 1;
const views = {};
for (const t of tools) for (const v of t.views) views[v] = (views[v] ?? 0) + 1;
const imported = catalogue.map((a) => a.importDate).filter(Boolean).sort().pop();
// Daily updates (scripts/maintain-atlas.mjs), newest first.
const activity = existsSync('atlas/activity.json') ? JSON.parse(readFileSync('atlas/activity.json', 'utf8')) : [];

mkdirSync('public/atlas', { recursive: true });
writeFileSync('public/atlas/tools.json', JSON.stringify(tools));
// The latest report, which the Worker e-mails (worker/atlas-subscribers.js). Each tool gets its producer, its website
// and whether it is on the site (listed), so the mail can link to its profile on javc.nl and to the producer.
const byId = new Map(catalogue.map((a) => [a.id, a]));
const shown = new Set(tools.map((t) => t.id));
const withLinks = (list) => (list ?? []).map((x) => ({ ...x, vendor: x.vendor ?? byId.get(x.id)?.vendor, url: byId.get(x.id)?.url, listed: shown.has(x.id) }));
const report = activity[0] ? { ...activity[0], added: withLinks(activity[0].added), updated: withLinks(activity[0].updated), discontinued: withLinks(activity[0].discontinued) } : null;
writeFileSync('public/atlas/report.json', JSON.stringify(report));
writeFileSync('src/data/atlas-meta.json', JSON.stringify({
  tools: tools.length,
  imported,
  checked: tools.map((t) => t.checked).filter(Boolean).sort().pop(),
  gartner: tools.filter((t) => t.gartner.length).length,
  views,
  domains,
  counts,
  activity,
}, null, 2) + '\n');
console.log(`IT4IT Atlas: ${tools.length} tools from atlas/tools.json`);
