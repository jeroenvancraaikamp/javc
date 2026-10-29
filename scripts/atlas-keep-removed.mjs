// Run by the GitHub Action "Update IT4IT Atlas" just before it commits: tools that were removed from the Atlas on the
// site (the bin on a card, status "removed") while the daily update ran stay removed. Takes the version of
// atlas/tools.json on main and copies its removed entries into the local atlas/tools.json.
//   git show origin/main:atlas/tools.json > main.json && node scripts/atlas-keep-removed.mjs main.json
import { readFileSync, writeFileSync } from 'node:fs';

const main = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const removed = new Map(main.filter((t) => t.status === 'removed').map((t) => [t.id, t]));
const ours = JSON.parse(readFileSync('atlas/tools.json', 'utf8'));
let n = 0;
const list = ours.map((t) => (removed.has(t.id) && t.status !== 'removed' ? (n++, removed.get(t.id)) : t));
if (n) {
  writeFileSync('atlas/tools.json', '[\n' + list.map((t) => JSON.stringify(t)).join(',\n') + '\n]\n'); // same layout as maintain-atlas.mjs
  console.log(`Kept ${n} tool(s) removed on the site in the meantime.`);
}
