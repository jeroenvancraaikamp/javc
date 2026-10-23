// Statistics: page views and chatbot questions are logged in a Cloudflare D1 database (binding DB),
// and /stats shows them together with the latest site revisions from GitHub.
// /stats is protected with a password: the Worker secret STATS_PASSWORD (any user name works).
//
// Page views are counted without cookies: a visitor is a hash of IP address + browser + day,
// so the same person is counted once per day and no IP address is stored.

const REPO = 'jeroenvancraaikamp/javc';
const KEEP_DAYS = 400;
const BOT = /bot|crawl|spider|slurp|preview|monitor|curl|wget|python|headless|lighthouse/i;

let schema;
function db(env) {
  if (!env.DB) return null;
  schema ??= env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS hits (ts INTEGER, day TEXT, path TEXT, ref TEXT, country TEXT, device TEXT, visitor TEXT)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS hits_day ON hits (day)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS chats (ts INTEGER, day TEXT, question TEXT, model TEXT, sources TEXT, ms INTEGER, ok INTEGER, country TEXT)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS chats_day ON chats (day)'),
  ]).catch((err) => { schema = undefined; throw err; });
  return schema.then(() => env.DB);
}

const today = () => new Date().toISOString().slice(0, 10);

async function sha(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf).slice(0, 8)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function device(ua) {
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile';
  return 'desktop';
}

// POST /api/hit {p: path, r: referrer}, sent by a small script on every page (src/layouts/Base.astro).
export async function logHit(request, env) {
  const ua = request.headers.get('user-agent') || '';
  const origin = request.headers.get('origin');
  const host = new URL(request.url).host;
  // Ignore bots, other sites, and Jeroen himself (cookie set when /stats is opened).
  if (request.method !== 'POST' || BOT.test(ua) || !origin || new URL(origin).host !== host
    || /(^|;\s*)javc_me=1/.test(request.headers.get('cookie') || '')) return new Response(null, { status: 204 });
  const d = await db(env);
  if (!d) return new Response(null, { status: 204 });
  let b = {};
  try { b = await request.json(); } catch { /* empty */ }
  const path = typeof b.p === 'string' ? b.p.slice(0, 300) : '/';
  let ref = '';
  try { const r = new URL(b.r); if (r.host !== host) ref = r.host.replace(/^www\./, ''); } catch { /* none */ }
  const day = today();
  const visitor = await sha(`${day}|${request.headers.get('cf-connecting-ip')}|${ua}|${env.STATS_PASSWORD || ''}`);
  await d.prepare('INSERT INTO hits VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(Date.now(), day, path, ref, request.cf?.country || '', device(ua), visitor).run();
  return new Response(null, { status: 204 });
}

// Called by the chatbot after each question.
export async function logChat(env, request, { question, model, sources, ms, ok }) {
  const d = await db(env).catch((err) => console.error('stats db', err));
  if (!d) return;
  await d.prepare('INSERT INTO chats VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(Date.now(), today(), question.slice(0, 500), model, sources.join(' '), ms, ok ? 1 : 0, request.cf?.country || '').run();
}

// --- /stats -------------------------------------------------------------------

async function authorized(request, env) {
  const m = (request.headers.get('authorization') || '').match(/^Basic\s+(.+)$/i);
  if (!m) return false;
  let pass = '';
  try { pass = atob(m[1]).split(':').slice(1).join(':'); } catch { return false; }
  const a = new TextEncoder().encode(await sha(pass));
  const b = new TextEncoder().encode(await sha(env.STATS_PASSWORD));
  return crypto.subtle.timingSafeEqual(a, b);
}

async function revisions() {
  const cache = caches.default;
  const key = new Request(`https://api.github.com/repos/${REPO}/commits?per_page=40`);
  let res = await cache.match(key);
  if (!res) {
    res = await fetch(key, { headers: { 'user-agent': 'javc.nl stats', accept: 'application/vnd.github+json' } });
    if (!res.ok) return null;
    res = new Response(res.body, res);
    res.headers.set('cache-control', 'max-age=300');
    await cache.put(key, res.clone());
  }
  return res.json();
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nf = new Intl.NumberFormat('nl-NL');
const when = (ts) => new Date(ts).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function bars(rows, days, keys) {
  const byDay = new Map(rows.map((r) => [r.day, r]));
  const list = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    list.push(byDay.get(day) || { day });
  }
  const max = Math.max(1, ...list.map((r) => r[keys[0]] || 0));
  return `<div class="bars">${list.map((r) => `<div class="bar" title="${r.day}: ${keys.map((k) => `${r[k] || 0} ${k}`).join(', ')}">
    ${keys.map((k, i) => `<span class="b${i}" style="height:${((r[k] || 0) / max) * 100}%"></span>`).join('')}</div>`).join('')}</div>
    <div class="axis"><span>${list[0].day.slice(5)}</span><span>${list[list.length - 1].day.slice(5)}</span></div>`;
}

function table(rows, cols) {
  if (!rows.length) return '<p class="muted">Nog geen gegevens.</p>';
  return `<table><tr>${cols.map((c) => `<th${c.num ? ' class="n"' : ''}>${c.label}</th>`).join('')}</tr>${rows.map((r) =>
    `<tr>${cols.map((c) => `<td${c.num ? ' class="n"' : ''}>${c.html ? c.html(r) : esc(r[c.key])}</td>`).join('')}</tr>`).join('')}</table>`;
}

const tile = (label, value) => `<div class="tile"><div class="v">${value}</div><div class="l">${label}</div></div>`;

export async function statsPage(request, env) {
  if (!env.STATS_PASSWORD) return new Response('Stats are not set up yet: add the Worker secret STATS_PASSWORD.', { status: 503 });
  if (!(await authorized(request, env))) {
    // Slow down password guessing with the contact-form rate limit (3 tries per minute).
    if (request.headers.get('authorization') && env.CONTACT_LIMITER) {
      const { success } = await env.CONTACT_LIMITER.limit({ key: `stats:${request.headers.get('cf-connecting-ip')}` });
      if (!success) return new Response('Too many attempts, wait a minute.', { status: 429 });
    }
    return new Response('Login required', { status: 401, headers: { 'www-authenticate': 'Basic realm="javc stats", charset="UTF-8"' } });
  }

  const days = [1, 7, 30, 90, 365].includes(+new URL(request.url).searchParams.get('days')) ? +new URL(request.url).searchParams.get('days') : 30;
  const from = new Date(Date.now() - (days - 1) * 864e5).toISOString().slice(0, 10);
  const d = await db(env).catch((err) => { console.error('stats db', err); return null; });

  let site = '<p class="muted">De database is nog niet beschikbaar.</p>', bot = site;
  if (d) {
    await d.prepare('DELETE FROM hits WHERE ts < ?').bind(Date.now() - KEEP_DAYS * 864e5).run();
    const q = (sql) => d.prepare(sql).bind(from);
    const [tot, daily, pages, refs, countries, devices, ctot, cdaily, cmodels, csources, recent] = (await d.batch([
      q('SELECT COUNT(*) views, (SELECT SUM(n) FROM (SELECT COUNT(DISTINCT visitor) n FROM hits WHERE day >= ?1 GROUP BY day)) visitors FROM hits WHERE day >= ?1'),
      q('SELECT day, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY day'),
      q('SELECT path, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY path ORDER BY views DESC LIMIT 25'),
      q("SELECT CASE ref WHEN '' THEN '(direct / onbekend)' ELSE ref END ref, COUNT(*) views FROM hits WHERE day >= ? GROUP BY 1 ORDER BY views DESC LIMIT 15"),
      q("SELECT CASE country WHEN '' THEN '?' ELSE country END country, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY visitors DESC LIMIT 15"),
      q('SELECT device, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY device ORDER BY visitors DESC'),
      q('SELECT COUNT(*) questions, SUM(1 - ok) errors, ROUND(AVG(ms) / 1000.0, 1) secs FROM chats WHERE day >= ?'),
      q('SELECT day, COUNT(*) questions FROM chats WHERE day >= ? GROUP BY day'),
      q('SELECT model, COUNT(*) n FROM chats WHERE day >= ? GROUP BY model ORDER BY n DESC'),
      q("SELECT sources FROM chats WHERE day >= ? AND sources != ''"),
      q('SELECT ts, question, sources, ms, ok, country FROM chats WHERE day >= ? ORDER BY ts DESC LIMIT 100'),
    ])).map((r) => r.results);

    const t = tot[0] || {};
    site = `<div class="tiles">${tile('Paginaweergaven', nf.format(t.views || 0))}${tile('Bezoekers (per dag geteld)', nf.format(t.visitors || 0))}
      ${tile('Pagina’s per bezoeker', t.visitors ? (t.views / t.visitors).toFixed(1) : '0')}</div>
      ${days > 1 ? `<h3>Per dag <small><i class="k b0"></i>weergaven <i class="k b1"></i>bezoekers</small></h3>${bars(daily, days, ['views', 'visitors'])}` : ''}
      <div class="grid"><div><h3>Meest bekeken pagina’s</h3>${table(pages, [
        { label: 'Pagina', html: (r) => `<a href="${esc(r.path)}">${esc(r.path)}</a>` },
        { label: 'Weergaven', key: 'views', num: true }, { label: 'Bezoekers', key: 'visitors', num: true }])}</div>
      <div><h3>Herkomst</h3>${table(refs, [{ label: 'Website', key: 'ref' }, { label: 'Weergaven', key: 'views', num: true }])}
      <h3>Landen</h3>${table(countries, [{ label: 'Land', key: 'country' }, { label: 'Bezoekers', key: 'visitors', num: true }])}
      <h3>Apparaten</h3>${table(devices, [{ label: 'Apparaat', key: 'device' }, { label: 'Bezoekers', key: 'visitors', num: true }])}</div></div>`;

    const c = ctot[0] || {};
    const cited = new Map();
    for (const r of csources) for (const u of r.sources.split(' ')) cited.set(u, (cited.get(u) || 0) + 1);
    const top = [...cited].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([url, n]) => ({ url, n }));
    bot = `<div class="tiles">${tile('Vragen', nf.format(c.questions || 0))}${tile('Mislukt', nf.format(c.errors || 0))}
      ${tile('Gem. antwoordtijd', `${c.secs || 0} s`)}${tile('Model', esc(cmodels.map((m) => `${m.model} (${m.n})`).join(', ') || '-'))}</div>
      ${days > 1 ? `<h3>Vragen per dag</h3>${bars(cdaily, days, ['questions'])}` : ''}
      <div class="grid"><div><h3>Laatste vragen</h3>${table(recent, [
        { label: 'Tijd', html: (r) => esc(when(r.ts)) },
        { label: 'Vraag', html: (r) => `${esc(r.question)}${r.ok ? '' : ' <span class="err">mislukt</span>'}` },
        { label: 'Land', key: 'country' }])}</div>
      <div><h3>Meest gebruikte bronnen</h3>${table(top, [
        { label: 'Bron', html: (r) => `<a href="${esc(r.url)}">${esc(r.url)}</a>` }, { label: 'Keer', key: 'n', num: true }])}</div></div>`;
  }

  const commits = await revisions().catch(() => null);
  const revs = commits ? table(commits.map((x) => ({
    ts: Date.parse(x.commit.author.date), msg: x.commit.message.split('\n')[0], url: x.html_url, sha: x.sha.slice(0, 7),
    cms: /^Bijgewerkt|^Nieuw|^Verwijderd|^Create|^Update|^Delete/.test(x.commit.message),
  })), [
    { label: 'Tijd', html: (r) => esc(when(r.ts)) },
    { label: 'Wijziging', html: (r) => `${r.cms ? '<span class="tag">CMS</span> ' : ''}${esc(r.msg)}` },
    { label: '', html: (r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${r.sha}</a>` },
  ]) : '<p class="muted">GitHub is nu niet bereikbaar.</p>';

  const tabs = [1, 7, 30, 90, 365].map((n) => `<a href="?days=${n}"${n === days ? ' class="on"' : ''}>${n === 1 ? 'Vandaag' : `${n} dagen`}</a>`).join('');
  const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Stats – javc.nl</title><style>
:root{--bg:#f6f7f9;--card:#fff;--fg:#1d2327;--mut:#6b7280;--line:#e5e7eb;--a:#2271b1;--b0:#2271b1;--b1:#9ec5e8}
@media (prefers-color-scheme:dark){:root{--bg:#15171a;--card:#1f2226;--fg:#e6e6e6;--mut:#9aa0a6;--line:#30343a;--a:#72aee6;--b0:#72aee6;--b1:#2c5a85}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1100px;margin:0 auto;padding:16px}a{color:var(--a)}h1{font-size:24px;margin:8px 0}h2{margin:0 0 12px;font-size:20px}
h3{font-size:15px;margin:18px 0 8px}h3 small{font-weight:400;color:var(--mut);margin-left:8px}.k{display:inline-block;width:10px;height:10px;margin:0 4px 0 10px;border-radius:2px}
nav{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 16px}nav a{padding:6px 12px;border-radius:999px;background:var(--card);border:1px solid var(--line);text-decoration:none;color:var(--fg)}
nav a.on{background:var(--a);border-color:var(--a);color:#fff}section{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:16px;margin-bottom:16px}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px}.tile{border:1px solid var(--line);border-radius:8px;padding:10px 12px}
.tile .v{font-size:22px;font-weight:700}.tile .l{color:var(--mut);font-size:13px}.grid{display:grid;grid-template-columns:3fr 2fr;gap:20px}
@media (max-width:760px){.grid{grid-template-columns:1fr}}table{width:100%;border-collapse:collapse;font-size:14px}
th,td{text-align:left;padding:5px 6px;border-bottom:1px solid var(--line);vertical-align:top;overflow-wrap:anywhere}th{color:var(--mut);font-weight:600}.n{text-align:right;white-space:nowrap}
.bars{display:flex;align-items:flex-end;gap:2px;height:120px;border-bottom:1px solid var(--line)}.bar{flex:1;height:100%;display:flex;align-items:flex-end;gap:1px}
.bar span{flex:1;min-height:1px;border-radius:2px 2px 0 0}.b0{background:var(--b0)}.b1{background:var(--b1)}
.axis{display:flex;justify-content:space-between;color:var(--mut);font-size:12px}.muted{color:var(--mut)}
.err{color:#d63638;font-size:12px}.tag{font-size:11px;padding:1px 6px;border-radius:4px;background:var(--line)}
</style></head><body><main><h1>Stats javc.nl</h1><nav>${tabs}</nav>
<section><h2>1. Websitestatistieken</h2>${site}</section>
<section><h2>2. Chatbotstatistieken</h2>${bot}</section>
<section><h2>3. Sitewijzigingen</h2>${revs}</section>
<p class="muted">Je eigen bezoeken worden niet meegeteld in deze browser. Bezoekers worden zonder cookies geteld.</p></main></body></html>`;
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex',
      'set-cookie': 'javc_me=1; Path=/; Max-Age=31536000; Secure; SameSite=Lax; HttpOnly',
    },
  });
}
