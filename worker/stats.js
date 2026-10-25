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

// Site language from the path: Dutch under /nl/, Chinese under /cn/, French under /fr/, German under /de/, English everywhere else.
const SITE_LANGS = ['en', 'nl', 'cn', 'fr', 'de'];
const SITE_LANG = `CASE ${SITE_LANGS.slice(1).map((l) => `WHEN path = '/${l}' OR path LIKE '/${l}/%' THEN '${l}'`).join(' ')} ELSE 'en' END`;

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

// Texts of /stats in the languages of the site (/stats/, /nl/stats/, /cn/stats/, /fr/stats/, /de/stats/).
const LOCALE = { en: 'en-GB', nl: 'nl-NL', cn: 'zh-CN', fr: 'fr-FR', de: 'de-DE' };
const TEXT = {
  en: {
    views: 'views', visitors: 'visitors', questions: 'questions', noData: 'No data yet.', noDb: 'The database is not available yet.',
    pageViews: 'Page views', visitorsDay: 'Visitors (counted per day)', perVisitor: 'Pages per visitor', perDay: 'Per day',
    siteLang: 'Site language', language: 'Language', viewsH: 'Views', share: 'Share', visitorsH: 'Visitors',
    langNames: { en: 'English', nl: 'Dutch', cn: 'Chinese', fr: 'French', de: 'German' }, langPerDay: 'Views per language per day',
    browserLang: 'Browser language', unknown: '(unknown)', noBrowserLang: 'Collected from now on; no data yet.',
    topPages: 'Most viewed pages', page: 'Page', referrers: 'Referrers', website: 'Website', direct: '(direct / unknown)',
    countries: 'Countries', country: 'Country', devices: 'Devices', device: 'Device',
    deviceNames: { desktop: 'desktop', mobile: 'mobile', tablet: 'tablet' },
    questionsH: 'Questions', failedH: 'Failed', avgTime: 'Avg. response time', model: 'Model', qPerDay: 'Questions per day',
    latest: 'Latest questions', time: 'Time', question: 'Question', failed: 'failed', sources: 'Most used sources', source: 'Source', times: 'Times',
    change: 'Change', noGithub: 'GitHub cannot be reached right now.', today: 'Today', days: (n) => `${n} days`,
    site: 'Website statistics', bot: 'Chatbot statistics', revs: 'Site revisions',
    note: 'Your own visits are not counted in this browser. Visitors are counted without cookies.',
  },
  nl: {
    views: 'weergaven', visitors: 'bezoekers', questions: 'vragen', noData: 'Nog geen gegevens.', noDb: 'De database is nog niet beschikbaar.',
    pageViews: 'Paginaweergaven', visitorsDay: 'Bezoekers (per dag geteld)', perVisitor: "Pagina's per bezoeker", perDay: 'Per dag',
    siteLang: 'Taal van de site', language: 'Taal', viewsH: 'Weergaven', share: 'Aandeel', visitorsH: 'Bezoekers',
    langNames: { en: 'Engels', nl: 'Nederlands', cn: 'Chinees', fr: 'Frans', de: 'Duits' }, langPerDay: 'Weergaven per taal per dag',
    browserLang: 'Taal van de browser', unknown: '(onbekend)', noBrowserLang: 'Wordt vanaf nu verzameld; nog geen gegevens.',
    topPages: "Meest bekeken pagina's", page: 'Pagina', referrers: 'Verwijzende sites', website: 'Website', direct: '(direct / onbekend)',
    countries: 'Landen', country: 'Land', devices: 'Apparaten', device: 'Apparaat',
    deviceNames: { desktop: 'desktop', mobile: 'mobiel', tablet: 'tablet' },
    questionsH: 'Vragen', failedH: 'Mislukt', avgTime: 'Gem. antwoordtijd', model: 'Model', qPerDay: 'Vragen per dag',
    latest: 'Laatste vragen', time: 'Tijd', question: 'Vraag', failed: 'mislukt', sources: 'Meest gebruikte bronnen', source: 'Bron', times: 'Keer',
    change: 'Wijziging', noGithub: 'GitHub is nu niet bereikbaar.', today: 'Vandaag', days: (n) => `${n} dagen`,
    site: 'Statistieken van de website', bot: 'Statistieken van de chatbot', revs: 'Wijzigingen aan de site',
    note: 'Je eigen bezoeken worden in deze browser niet geteld. Bezoekers worden geteld zonder cookies.',
  },
  cn: {
    views: '浏览量', visitors: '访客', questions: '问题', noData: '暂无数据。', noDb: '数据库暂不可用。',
    pageViews: '页面浏览量', visitorsDay: '访客（按天计算）', perVisitor: '每位访客浏览页数', perDay: '每天',
    siteLang: '网站语言', language: '语言', viewsH: '浏览量', share: '占比', visitorsH: '访客',
    langNames: { en: '英文', nl: '荷兰语', cn: '中文', fr: '法语', de: '德语' }, langPerDay: '每天各语言浏览量',
    browserLang: '浏览器语言', unknown: '（未知）', noBrowserLang: '从现在开始收集，暂无数据。',
    topPages: '最多浏览的页面', page: '页面', referrers: '来源网站', website: '网站', direct: '（直接访问 / 未知）',
    countries: '国家', country: '国家', devices: '设备', device: '设备',
    deviceNames: { desktop: '桌面', mobile: '手机', tablet: '平板' },
    questionsH: '问题', failedH: '失败', avgTime: '平均响应时间', model: '模型', qPerDay: '每天问题数',
    latest: '最新问题', time: '时间', question: '问题', failed: '失败', sources: '最常用来源', source: '来源', times: '次数',
    change: '更改', noGithub: '暂时无法连接 GitHub。', today: '今天', days: (n) => `${n} 天`,
    site: '网站统计', bot: '聊天机器人统计', revs: '网站修订记录',
    note: '在此浏览器中，您自己的访问不计入统计。访客统计不使用 Cookie。',
  },
  fr: {
    views: 'vues', visitors: 'visiteurs', questions: 'questions', noData: 'Pas encore de données.', noDb: "La base de données n'est pas encore disponible.",
    pageViews: 'Pages vues', visitorsDay: 'Visiteurs (comptés par jour)', perVisitor: 'Pages par visiteur', perDay: 'Par jour',
    siteLang: 'Langue du site', language: 'Langue', viewsH: 'Vues', share: 'Part', visitorsH: 'Visiteurs',
    langNames: { en: 'Anglais', nl: 'Néerlandais', cn: 'Chinois', fr: 'Français', de: 'Allemand' }, langPerDay: 'Vues par langue et par jour',
    browserLang: 'Langue du navigateur', unknown: '(inconnue)', noBrowserLang: 'Collectée à partir de maintenant ; pas encore de données.',
    topPages: 'Pages les plus vues', page: 'Page', referrers: 'Sites référents', website: 'Site', direct: '(direct / inconnu)',
    countries: 'Pays', country: 'Pays', devices: 'Appareils', device: 'Appareil',
    deviceNames: { desktop: 'ordinateur', mobile: 'mobile', tablet: 'tablette' },
    questionsH: 'Questions', failedH: 'Échecs', avgTime: 'Temps de réponse moyen', model: 'Modèle', qPerDay: 'Questions par jour',
    latest: 'Dernières questions', time: 'Heure', question: 'Question', failed: 'échec', sources: 'Sources les plus utilisées', source: 'Source', times: 'Fois',
    change: 'Modification', noGithub: 'GitHub est injoignable pour le moment.', today: "Aujourd'hui", days: (n) => `${n} jours`,
    site: 'Statistiques du site', bot: 'Statistiques du chatbot', revs: 'Modifications du site',
    note: 'Vos propres visites ne sont pas comptées dans ce navigateur. Les visiteurs sont comptés sans cookies.',
  },
  de: {
    views: 'Aufrufe', visitors: 'Besucher', questions: 'Fragen', noData: 'Noch keine Daten.', noDb: 'Die Datenbank ist noch nicht verfügbar.',
    pageViews: 'Seitenaufrufe', visitorsDay: 'Besucher (pro Tag gezählt)', perVisitor: 'Seiten pro Besucher', perDay: 'Pro Tag',
    siteLang: 'Sprache der Website', language: 'Sprache', viewsH: 'Aufrufe', share: 'Anteil', visitorsH: 'Besucher',
    langNames: { en: 'Englisch', nl: 'Niederländisch', cn: 'Chinesisch', fr: 'Französisch', de: 'Deutsch' }, langPerDay: 'Aufrufe pro Sprache und Tag',
    browserLang: 'Sprache des Browsers', unknown: '(unbekannt)', noBrowserLang: 'Wird ab jetzt erfasst; noch keine Daten.',
    topPages: 'Meistbesuchte Seiten', page: 'Seite', referrers: 'Verweisende Websites', website: 'Website', direct: '(direkt / unbekannt)',
    countries: 'Länder', country: 'Land', devices: 'Geräte', device: 'Gerät',
    deviceNames: { desktop: 'Desktop', mobile: 'Mobil', tablet: 'Tablet' },
    questionsH: 'Fragen', failedH: 'Fehlgeschlagen', avgTime: 'Durchschn. Antwortzeit', model: 'Modell', qPerDay: 'Fragen pro Tag',
    latest: 'Neueste Fragen', time: 'Zeit', question: 'Frage', failed: 'fehlgeschlagen', sources: 'Meistgenutzte Quellen', source: 'Quelle', times: 'Mal',
    change: 'Änderung', noGithub: 'GitHub ist gerade nicht erreichbar.', today: 'Heute', days: (n) => `${n} Tage`,
    site: 'Website-Statistiken', bot: 'Chatbot-Statistiken', revs: 'Änderungen an der Website',
    note: 'Ihre eigenen Besuche werden in diesem Browser nicht gezählt. Besucher werden ohne Cookies gezählt.',
  },
};

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const when = (ts, lang) => new Date(ts).toLocaleString(LOCALE[lang], { timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function bars(rows, days, keys, labels = keys) {
  const byDay = new Map(rows.map((r) => [r.day, r]));
  const list = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    list.push(byDay.get(day) || { day });
  }
  const max = Math.max(1, ...list.flatMap((r) => keys.map((k) => r[k] || 0)));
  return `<div class="bars">${list.map((r) => `<div class="bar" title="${r.day}: ${keys.map((k, i) => `${r[k] || 0} ${labels[i]}`).join(', ')}">
    ${keys.map((k, i) => `<span class="b${i}" style="height:${((r[k] || 0) / max) * 100}%"></span>`).join('')}</div>`).join('')}</div>
    <div class="axis"><span>${list[0].day.slice(5)}</span><span>${list[list.length - 1].day.slice(5)}</span></div>`;
}

function table(rows, cols, T) {
  if (!rows.length) return `<p class="muted">${T.noData}</p>`;
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

  const params = new URL(request.url).searchParams;
  const lang = Object.hasOwn(TEXT, params.get('lang')) ? params.get('lang') : 'en';
  const T = TEXT[lang];
  const nf = new Intl.NumberFormat(LOCALE[lang]);
  const langName = new Intl.DisplayNames([LOCALE[lang]], { type: 'language' });
  const blangName = (code) => { try { return code ? `${langName.of(code)} (${code})` : T.unknown; } catch { return code; } };
  const days = [1, 7, 30, 90, 365].includes(+new URL(request.url).searchParams.get('days')) ? +new URL(request.url).searchParams.get('days') : 30;
  const from = new Date(Date.now() - (days - 1) * 864e5).toISOString().slice(0, 10);
  const d = await db(env).catch((err) => { console.error('stats db', err); return null; });

  let site = `<p class="muted">${T.noDb}</p>`, bot = site;
  if (d) {
    await d.prepare('DELETE FROM hits WHERE ts < ?').bind(Date.now() - KEEP_DAYS * 864e5).run();
    const q = (sql) => d.prepare(sql).bind(from);
    const [tot, daily, langs, langDaily, blangs, pages, refs, countries, devices, ctot, cdaily, cmodels, csources, recent] = (await d.batch([
      q('SELECT COUNT(*) views, (SELECT SUM(n) FROM (SELECT COUNT(DISTINCT visitor) n FROM hits WHERE day >= ?1 GROUP BY day)) visitors FROM hits WHERE day >= ?1'),
      q('SELECT day, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY day'),
      q(`SELECT ${SITE_LANG} lang, COUNT(*) views, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY views DESC`),
      q(`SELECT day, ${SITE_LANGS.map((l) => `SUM(${SITE_LANG} = '${l}') ${l}`).join(', ')} FROM hits WHERE day >= ? GROUP BY day`),
      q("SELECT COALESCE(blang, '') blang, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY visitors DESC LIMIT 15"),
      q('SELECT path, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY path ORDER BY views DESC LIMIT 25'),
      q("SELECT ref, COUNT(*) views FROM hits WHERE day >= ? GROUP BY 1 ORDER BY views DESC LIMIT 15"),
      q("SELECT CASE country WHEN '' THEN '?' ELSE country END country, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY visitors DESC LIMIT 15"),
      q('SELECT device, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY device ORDER BY visitors DESC'),
      q('SELECT COUNT(*) questions, SUM(1 - ok) errors, ROUND(AVG(ms) / 1000.0, 1) secs FROM chats WHERE day >= ?'),
      q('SELECT day, COUNT(*) questions FROM chats WHERE day >= ? GROUP BY day'),
      q('SELECT model, COUNT(*) n FROM chats WHERE day >= ? GROUP BY model ORDER BY n DESC'),
      q("SELECT sources FROM chats WHERE day >= ? AND sources != ''"),
      q('SELECT ts, question, sources, ms, ok, country FROM chats WHERE day >= ? ORDER BY ts DESC LIMIT 100'),
    ])).map((r) => r.results);

    const t = tot[0] || {};
    const L = T.langNames;
    site = `<div class="tiles">${tile(T.pageViews, nf.format(t.views || 0))}${tile(T.visitorsDay, nf.format(t.visitors || 0))}
      ${tile(T.perVisitor, t.visitors ? (t.views / t.visitors).toLocaleString(LOCALE[lang], { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : '0')}</div>
      ${days > 1 ? `<h3>${T.perDay} <small><i class="k b0"></i>${T.views} <i class="k b1"></i>${T.visitors}</small></h3>${bars(daily, days, ['views', 'visitors'], [T.views, T.visitors])}` : ''}
      <div class="grid"><div><h3>${T.siteLang}</h3>${table(langs.map((r) => ({ ...r, share: t.views ? `${Math.round((r.views / t.views) * 100)}%` : '' })), [
        { label: T.language, html: (r) => `${esc(L[r.lang])} <span class="muted">/${r.lang === 'en' ? '' : `${r.lang}/`}</span>` },
        { label: T.viewsH, key: 'views', num: true }, { label: T.share, key: 'share', num: true }, { label: T.visitorsH, key: 'visitors', num: true }], T)}
      ${days > 1 && langs.length ? `<h3>${T.langPerDay} <small>${SITE_LANGS.map((l, i) => `<i class="k b${i}"></i>${L[l]}`).join(' ')}</small></h3>${bars(langDaily, days, SITE_LANGS, SITE_LANGS.map((l) => L[l]))}` : ''}</div>
      <div><h3>${T.browserLang}</h3>${blangs.some((r) => r.blang) ? table(blangs, [
        { label: T.language, html: (r) => esc(blangName(r.blang)) }, { label: T.visitorsH, key: 'visitors', num: true }], T)
        : `<p class="muted">${T.noBrowserLang}</p>`}</div></div>
      <div class="grid"><div><h3>${T.topPages}</h3>${table(pages, [
        { label: T.page, html: (r) => `<a href="${esc(r.path)}">${esc(r.path)}</a>` },
        { label: T.viewsH, key: 'views', num: true }, { label: T.visitorsH, key: 'visitors', num: true }], T)}</div>
      <div><h3>${T.referrers}</h3>${table(refs, [{ label: T.website, html: (r) => esc(r.ref || T.direct) }, { label: T.viewsH, key: 'views', num: true }], T)}
      <h3>${T.countries}</h3>${table(countries, [{ label: T.country, key: 'country' }, { label: T.visitorsH, key: 'visitors', num: true }], T)}
      <h3>${T.devices}</h3>${table(devices, [{ label: T.device, html: (r) => esc(T.deviceNames[r.device] || r.device) }, { label: T.visitorsH, key: 'visitors', num: true }], T)}</div></div>`;

    const c = ctot[0] || {};
    const cited = new Map();
    for (const r of csources) for (const u of r.sources.split(' ')) cited.set(u, (cited.get(u) || 0) + 1);
    const top = [...cited].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([url, n]) => ({ url, n }));
    bot = `<div class="tiles">${tile(T.questionsH, nf.format(c.questions || 0))}${tile(T.failedH, nf.format(c.errors || 0))}
      ${tile(T.avgTime, `${(c.secs || 0).toLocaleString(LOCALE[lang])} s`)}${tile(T.model, esc(cmodels.map((m) => `${m.model} (${m.n})`).join(', ') || '-'))}</div>
      ${days > 1 ? `<h3>${T.qPerDay}</h3>${bars(cdaily, days, ['questions'], [T.questions])}` : ''}
      <div class="grid"><div><h3>${T.latest}</h3>${table(recent, [
        { label: T.time, html: (r) => esc(when(r.ts, lang)) },
        { label: T.question, html: (r) => `${esc(r.question)}${r.ok ? '' : ` <span class="err">${T.failed}</span>`}` },
        { label: T.country, key: 'country' }], T)}</div>
      <div><h3>${T.sources}</h3>${table(top, [
        { label: T.source, html: (r) => `<a href="${esc(r.url)}">${esc(r.url)}</a>` }, { label: T.times, key: 'n', num: true }], T)}</div></div>`;
  }

  const commits = await revisions().catch(() => null);
  const revs = commits ? table(commits.map((x) => ({
    ...x, sha: x.sha.slice(0, 7), cms: /^(Bijgewerkt|Nieuw|Verwijderd|Afbeelding|Create|Update|Delete|Upload) /.test(x.msg),
  })), [
    { label: T.time, html: (r) => esc(when(r.ts, lang)) },
    { label: T.change, html: (r) => `${r.cms ? '<span class="tag">CMS</span> ' : ''}${esc(r.msg)}` },
    { label: '', html: (r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${r.sha}</a>` },
  ], T) : `<p class="muted">${T.noGithub}</p>`;

  const tabs = [1, 7, 30, 90, 365].map((n) => `<a href="?days=${n}"${n === days ? ' class="on"' : ''}>${n === 1 ? T.today : T.days(n)}</a>`).join('');
  const html = `<div class="ranges">${tabs}</div>
<section><h2>1. ${T.site}</h2>${site}</section>
<section><h2>2. ${T.bot}</h2>${bot}</section>
<section><h2>3. ${T.revs}</h2>${revs}</section>
<p class="muted">${T.note}</p>`;
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex',
      'set-cookie': 'javc_me=1; Path=/; Max-Age=31536000; Secure; SameSite=Lax; HttpOnly',
    },
  });
}
