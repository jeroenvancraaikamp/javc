// Builds the data for the IT4IT Atlas page (/it4it-atlas/) from the Excel export in atlas/IT4IT-Atlas.xlsx:
//   public/atlas/tools.json   every tool, loaded by the page in the browser (logos: public/atlas-logos/, chosen with atlas/logos.json)
//   src/data/atlas-meta.json  edition, number of tools and tools per subcategory, used when building the page
// Runs before every build (npm run build). To update the Atlas, replace atlas/IT4IT-Atlas.xlsx with a new
// export (same columns; the column "Complete attributes (JSON)" holds everything that is used here).
//   node scripts/build-atlas.mjs [file.xlsx]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';

const file = process.argv[2] ?? 'atlas/IT4IT-Atlas.xlsx';

// --- a minimal .xlsx reader: unzip, shared strings, cells of the first sheet ---------------------------

function unzip(buf) {
  const files = {};
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error(`${file} is not an .xlsx file`);
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

// --- tools -------------------------------------------------------------------------------------------

const [head, ...rows] = readSheet(unzip(readFileSync(file)));
const col = Object.keys(head).find((c) => head[c] === 'Complete attributes (JSON)');
if (!col) throw new Error(`${file}: no column "Complete attributes (JSON)"`);

// Logos copied from the original Atlas app: by product name, then by producer name or website.
const LOGOS = JSON.parse(readFileSync('atlas/logos.json', 'utf8'));
const norm = (s) => String(s ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const host = (u) => { try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; } };
const logo = (a) => (LOGOS.products[norm(a.name)] ?? LOGOS.vendors[norm(a.vendor)] ?? LOGOS.domains[host(a.url)])?.src.replace('/logos/', '/atlas-logos/');

const tools = rows
  .filter((r) => r[col])
  .map((r) => JSON.parse(r[col]))
  .filter((a) => a.status !== 'removed')
  .map((a) => ({
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
    subs: a.subcategoryIds,
    tags: a.tags,
    views: a.catalogueViewIds,
    streams: a.it4itValueStreams,
    gartner: (a.gartnerMagicQuadrants ?? []).map((g) => ({ market: g.market, vendor: g.vendor, year: g.year, url: g.sourceUrl })),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

const counts = {};
for (const t of tools) for (const s of t.subs) counts[s] = (counts[s] ?? 0) + 1;
const views = {};
for (const t of tools) for (const v of t.views) views[v] = (views[v] ?? 0) + 1;
const imported = rows.map((r) => r[col] && JSON.parse(r[col]).importDate).filter(Boolean).sort().pop();

mkdirSync('public/atlas', { recursive: true });
writeFileSync('public/atlas/tools.json', JSON.stringify(tools));
writeFileSync('src/data/atlas-meta.json', JSON.stringify({
  tools: tools.length,
  imported,
  checked: tools.map((t) => t.checked).filter(Boolean).sort().pop(),
  gartner: tools.filter((t) => t.gartner.length).length,
  views,
  counts,
}, null, 2) + '\n');
console.log(`IT4IT Atlas: ${tools.length} tools from ${file}`);
