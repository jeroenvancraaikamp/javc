// Download every image the content still loads from the old WordPress site into
// public/wp-content/uploads/, and point the content at the local copy.
// The paths stay the same, so old image links keep working after the switch.
import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['src/content', 'src/pages', 'src/components', 'src/layouts'];
const URL_RE = /https?:\/\/(?:www\.)?javc\.nl(\/wp-content\/uploads\/[^"'\s)<>]+)/g;

const files = ROOTS.flatMap(function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : /\.(md|mdx|astro|ts)$/.test(e.name) ? [p] : [];
  });
});

const wanted = new Set();
for (const f of files) for (const m of fs.readFileSync(f, 'utf8').matchAll(URL_RE)) wanted.add(m[1]);
console.log(`${wanted.size} images referenced`);

const failed = new Set();
for (const rel of wanted) {
  const dest = path.join('public', decodeURIComponent(rel));
  if (fs.existsSync(dest)) continue;
  try {
    const res = await fetch(`https://javc.nl${rel}`, { headers: { 'User-Agent': 'javc-site-migration' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  } catch (err) {
    failed.add(rel);
    console.warn(`Failed: ${rel} (${err.message})`);
  }
}

let changed = 0;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const t = s.replace(URL_RE, (m, rel) => (failed.has(rel) ? m : rel));
  if (t !== s) { fs.writeFileSync(f, t); changed++; }
}
console.log(`Downloaded ${wanted.size - failed.size}, failed ${failed.size}, updated ${changed} files`);
