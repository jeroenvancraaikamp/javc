// Statistics: page views and chatbot questions are logged in a Cloudflare D1 database (binding DB),
// and /stats shows them together with the latest site revisions from GitHub.
// /stats is only shown to the owner of the repository, signed in to the CMS (see cmsUser).
//
// Page views are counted without cookies: a visitor is a hash of IP address + browser + day,
// so the same person is counted once per day and no IP address is stored.

const REPO = 'jeroenvancraaikamp/javc';
const KEEP_DAYS = 400;
const BOT = /bot|crawl|spider|slurp|preview|monitor|curl|wget|python|headless|lighthouse/i;

let schema;
export function db(env) {
  if (!env.DB) return null;
  schema ??= env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS hits (ts INTEGER, day TEXT, path TEXT, ref TEXT, country TEXT, device TEXT, visitor TEXT)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS hits_day ON hits (day)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS chats (ts INTEGER, day TEXT, question TEXT, model TEXT, sources TEXT, ms INTEGER, ok INTEGER, country TEXT)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS chats_day ON chats (day)'),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER, slug TEXT, name TEXT, email TEXT, body TEXT, status TEXT DEFAULT 'pending')"),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS comments_slug ON comments (slug, status)'),
  ])
    // Browser language (added later): add the column to an existing table; fails harmlessly when it is already there.
    .then(() => env.DB.prepare('ALTER TABLE hits ADD COLUMN blang TEXT').run().catch(() => {}))
    .catch((err) => { schema = undefined; throw err; });
  return schema.then(() => env.DB);
}

const today = () => new Date().toISOString().slice(0, 10);

export async function sha(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf).slice(0, 8)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function device(ua) {
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile';
  return 'desktop';
}

// First language of the browser's Accept-Language header, e.g. "nl-NL,nl;q=0.9,en;q=0.8" -> "nl".
function browserLang(request) {
  const m = (request.headers.get('accept-language') || '').trim().match(/^([a-z]{2,3})\b/i);
  return m ? m[1].toLowerCase() : '';
}

// Site language from the path: Dutch under /nl/, Chinese under /cn/, English everywhere else.
const SITE_LANG = "CASE WHEN path = '/nl' OR path LIKE '/nl/%' THEN 'nl' WHEN path = '/cn' OR path LIKE '/cn/%' THEN 'cn' ELSE 'en' END";
const SITE_LANGS = { en: 'English', nl: 'Dutch', cn: 'Chinese' };
const langName = new Intl.DisplayNames(['en'], { type: 'language' });
const blangName = (code) => { try { return code ? `${langName.of(code)} (${code})` : '(unknown)'; } catch { return code; } };

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
  await d.prepare('INSERT INTO hits (ts, day, path, ref, country, device, visitor, blang) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(Date.now(), day, path, ref, request.cf?.country || '', device(ua), visitor, browserLang(request)).run();
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

// Signed in to the CMS? The page sends the GitHub token the CMS keeps in this browser
// (localStorage "sveltia-cms.user"); it must belong to the owner of the repository.
// A successful check is remembered for 10 minutes (by a hash of the token, never the token itself).
export async function cmsUser(request) {
  const token = (request.headers.get('authorization') || '').match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!token) return false;
  const key = new Request(`https://stats-auth.javc.nl/${await sha(`auth|${token}`)}`);
  if (await caches.default.match(key)) return true;
  const res = await fetch('https://api.github.com/user', {
    headers: { authorization: `Bearer ${token}`, 'user-agent': 'javc.nl stats', accept: 'application/vnd.github+json' },
  });
  if (!res.ok) return false;
  const { login } = await res.json();
  if (String(login).toLowerCase() !== REPO.split('/')[0].toLowerCase()) return false;
  await caches.default.put(key, new Response('ok', { headers: { 'cache-control': 'max-age=600' } }));
  return true;
}

// Latest commits: GitHub's API first (often rate-limited from Cloudflare's shared addresses),
// then the public Atom feed of the repository. Cached for 5 minutes.
async function cached(url, accept) {
  const key = new Request(url);
  let res = await caches.default.match(key);
  if (!res) {
    res = await fetch(url, { headers: { 'user-agent': 'javc.nl stats', accept } });
    if (!res.ok) { console.error('revisions', url, res.status); return null; }
    res = new Response(res.body, res);
    res.headers.set('cache-control', 'max-age=300');
    await caches.default.put(key, res.clone());
  }
  return res;
}

async function revisions() {
  const api = await cached(`https://api.github.com/repos/${REPO}/commits?per_page=40`, 'application/vnd.github+json');
  if (api) {
    return (await api.json()).map((x) => ({ ts: Date.parse(x.commit.author.date), msg: x.commit.message.split('\n')[0], url: x.html_url, sha: x.sha }));
  }
  const feed = await cached(`https://github.com/${REPO}/commits/main.atom`, 'application/atom+xml');
  if (!feed) return null;
  const unxml = (t) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  return [...(await feed.text()).matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    ts: Date.parse(e.match(/<updated>([^<]+)/)?.[1]),
    msg: unxml((e.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '').trim()),
    url: e.match(/<link[^>]+href="([^"]+)"/)?.[1] || '',
    sha: e.match(/Commit\/([0-9a-f]+)/)?.[1] || '',
  }));
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nf = new Intl.NumberFormat('en-GB');
const when = (ts) => new Date(ts).toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function bars(rows, days, keys) {
  const byDay = new Map(rows.map((r) => [r.day, r]));
  const list = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    list.push(byDay.get(day) || { day });
  }
  const max = Math.max(1, ...list.flatMap((r) => keys.map((k) => r[k] || 0)));
  return `<div class="bars">${list.map((r) => `<div class="bar" title="${r.day}: ${keys.map((k) => `${r[k] || 0} ${k}`).join(', ')}">
    ${keys.map((k, i) => `<span class="b${i}" style="height:${((r[k] || 0) / max) * 100}%"></span>`).join('')}</div>`).join('')}</div>
    <div class="axis"><span>${list[0].day.slice(5)}</span><span>${list[list.length - 1].day.slice(5)}</span></div>`;
}

function table(rows, cols) {
  if (!rows.length) return '<p class="muted">No data yet.</p>';
  return `<table><tr>${cols.map((c) => `<th${c.num ? ' class="n"' : ''}>${c.label}</th>`).join('')}</tr>${rows.map((r) =>
    `<tr>${cols.map((c) => `<td${c.num ? ' class="n"' : ''}>${c.html ? c.html(r) : esc(r[c.key])}</td>`).join('')}</tr>`).join('')}</table>`;
}

const tile = (label, value) => `<div class="tile"><div class="v">${value}</div><div class="l">${label}</div></div>`;

// GET /api/stats: the statistics as an HTML fragment, only for the signed-in CMS user.
export async function statsData(request, env) {
  if (!(await cmsUser(request))) {
    if (request.headers.get('authorization') && env.CONTACT_LIMITER) {
      const { success } = await env.CONTACT_LIMITER.limit({ key: `stats:${request.headers.get('cf-connecting-ip')}` });
      if (!success) return new Response('Too many attempts', { status: 429 });
    }
    return new Response('Not signed in', { status: 401 });
  }

  const days = [1, 7, 30, 90, 365].includes(+new URL(request.url).searchParams.get('days')) ? +new URL(request.url).searchParams.get('days') : 30;
  const from = new Date(Date.now() - (days - 1) * 864e5).toISOString().slice(0, 10);
  const d = await db(env).catch((err) => { console.error('stats db', err); return null; });

  let site = '<p class="muted">The database is not available yet.</p>', bot = site;
  if (d) {
    await d.prepare('DELETE FROM hits WHERE ts < ?').bind(Date.now() - KEEP_DAYS * 864e5).run();
    const q = (sql) => d.prepare(sql).bind(from);
    const [tot, daily, langs, langDaily, blangs, pages, refs, countries, devices, ctot, cdaily, cmodels, csources, recent] = (await d.batch([
      q('SELECT COUNT(*) views, (SELECT SUM(n) FROM (SELECT COUNT(DISTINCT visitor) n FROM hits WHERE day >= ?1 GROUP BY day)) visitors FROM hits WHERE day >= ?1'),
      q('SELECT day, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY day'),
      q(`SELECT ${SITE_LANG} lang, COUNT(*) views, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY views DESC`),
      q(`SELECT day, SUM(${SITE_LANG} = 'en') en, SUM(${SITE_LANG} = 'nl') nl, SUM(${SITE_LANG} = 'cn') cn FROM hits WHERE day >= ? GROUP BY day`),
      q("SELECT COALESCE(blang, '') blang, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY visitors DESC LIMIT 15"),
      q('SELECT path, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY path ORDER BY views DESC LIMIT 25'),
      q("SELECT CASE ref WHEN '' THEN '(direct / unknown)' ELSE ref END ref, COUNT(*) views FROM hits WHERE day >= ? GROUP BY 1 ORDER BY views DESC LIMIT 15"),
      q("SELECT CASE country WHEN '' THEN '?' ELSE country END country, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY visitors DESC LIMIT 15"),
      q('SELECT device, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY device ORDER BY visitors DESC'),
      q('SELECT COUNT(*) questions, SUM(1 - ok) errors, ROUND(AVG(ms) / 1000.0, 1) secs FROM chats WHERE day >= ?'),
      q('SELECT day, COUNT(*) questions FROM chats WHERE day >= ? GROUP BY day'),
      q('SELECT model, COUNT(*) n FROM chats WHERE day >= ? GROUP BY model ORDER BY n DESC'),
      q("SELECT sources FROM chats WHERE day >= ? AND sources != ''"),
      q('SELECT ts, question, sources, ms, ok, country FROM chats WHERE day >= ? ORDER BY ts DESC LIMIT 100'),
    ])).map((r) => r.results);

    const t = tot[0] || {};
    site = `<div class="tiles">${tile('Page views', nf.format(t.views || 0))}${tile('Visitors (counted per day)', nf.format(t.visitors || 0))}
      ${tile('Pages per visitor', t.visitors ? (t.views / t.visitors).toFixed(1) : '0')}</div>
      ${days > 1 ? `<h3>Per day <small><i class="k b0"></i>views <i class="k b1"></i>visitors</small></h3>${bars(daily, days, ['views', 'visitors'])}` : ''}
      <div class="grid"><div><h3>Site language</h3>${table(langs.map((r) => ({ ...r, share: t.views ? `${Math.round((r.views / t.views) * 100)}%` : '' })), [
        { label: 'Language', html: (r) => `${esc(SITE_LANGS[r.lang])} <span class="muted">/${r.lang === 'en' ? '' : `${r.lang}/`}</span>` },
        { label: 'Views', key: 'views', num: true }, { label: 'Share', key: 'share', num: true }, { label: 'Visitors', key: 'visitors', num: true }])}
      ${days > 1 && langs.length ? `<h3>Views per language per day <small><i class="k b0"></i>English <i class="k b1"></i>Dutch <i class="k b2"></i>Chinese</small></h3>${bars(langDaily, days, ['en', 'nl', 'cn'])}` : ''}</div>
      <div><h3>Browser language</h3>${blangs.some((r) => r.blang) ? table(blangs, [
        { label: 'Language', html: (r) => esc(blangName(r.blang)) }, { label: 'Visitors', key: 'visitors', num: true }])
        : '<p class="muted">Collected from now on; no data yet.</p>'}</div></div>
      <div class="grid"><div><h3>Most viewed pages</h3>${table(pages, [
        { label: 'Page', html: (r) => `<a href="${esc(r.path)}">${esc(r.path)}</a>` },
        { label: 'Views', key: 'views', num: true }, { label: 'Visitors', key: 'visitors', num: true }])}</div>
      <div><h3>Referrers</h3>${table(refs, [{ label: 'Website', key: 'ref' }, { label: 'Views', key: 'views', num: true }])}
      <h3>Countries</h3>${table(countries, [{ label: 'Country', key: 'country' }, { label: 'Visitors', key: 'visitors', num: true }])}
      <h3>Devices</h3>${table(devices, [{ label: 'Device', key: 'device' }, { label: 'Visitors', key: 'visitors', num: true }])}</div></div>`;

    const c = ctot[0] || {};
    const cited = new Map();
    for (const r of csources) for (const u of r.sources.split(' ')) cited.set(u, (cited.get(u) || 0) + 1);
    const top = [...cited].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([url, n]) => ({ url, n }));
    bot = `<div class="tiles">${tile('Questions', nf.format(c.questions || 0))}${tile('Failed', nf.format(c.errors || 0))}
      ${tile('Avg. response time', `${c.secs || 0} s`)}${tile('Model', esc(cmodels.map((m) => `${m.model} (${m.n})`).join(', ') || '-'))}</div>
      ${days > 1 ? `<h3>Questions per day</h3>${bars(cdaily, days, ['questions'])}` : ''}
      <div class="grid"><div><h3>Latest questions</h3>${table(recent, [
        { label: 'Time', html: (r) => esc(when(r.ts)) },
        { label: 'Question', html: (r) => `${esc(r.question)}${r.ok ? '' : ' <span class="err">failed</span>'}` },
        { label: 'Country', key: 'country' }])}</div>
      <div><h3>Most used sources</h3>${table(top, [
        { label: 'Source', html: (r) => `<a href="${esc(r.url)}">${esc(r.url)}</a>` }, { label: 'Times', key: 'n', num: true }])}</div></div>`;
  }

  const commits = await revisions().catch(() => null);
  const revs = commits ? table(commits.map((x) => ({
    ...x, sha: x.sha.slice(0, 7), cms: /^(Bijgewerkt|Nieuw|Verwijderd|Afbeelding|Create|Update|Delete|Upload) /.test(x.msg),
  })), [
    { label: 'Time', html: (r) => esc(when(r.ts)) },
    { label: 'Change', html: (r) => `${r.cms ? '<span class="tag">CMS</span> ' : ''}${esc(r.msg)}` },
    { label: '', html: (r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${r.sha}</a>` },
  ]) : '<p class="muted">GitHub cannot be reached right now.</p>';

  const tabs = [1, 7, 30, 90, 365].map((n) => `<a href="?days=${n}"${n === days ? ' class="on"' : ''}>${n === 1 ? 'Today' : `${n} days`}</a>`).join('');
  const html = `<div class="ranges">${tabs}</div>
<section><h2>1. Website statistics</h2>${site}</section>
<section><h2>2. Chatbot statistics</h2>${bot}</section>
<section><h2>3. Site revisions</h2>${revs}</section>
<p class="muted">Your own visits are not counted in this browser. Visitors are counted without cookies.</p>`;
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex',
      'set-cookie': 'javc_me=1; Path=/; Max-Age=31536000; Secure; SameSite=Lax; HttpOnly',
    },
  });
}
