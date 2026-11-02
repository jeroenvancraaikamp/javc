// Statistics: page views and chatbot questions are logged in a Cloudflare D1 database (binding DB),
// and /stats shows them together with the latest site revisions from GitHub.
// /stats is only shown to the owner of the repository, signed in to the CMS (see cmsUser).
//
// Page views are counted without cookies: a visitor is a hash of IP address + browser + day,
// so the same person is counted once per day and no IP address is stored.

import { subscriberList, removeSubscriber } from './atlas-subscribers.js';

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
    env.DB.prepare('CREATE TABLE IF NOT EXISTS contacts (ts INTEGER, name TEXT, email TEXT, phone TEXT, message TEXT, lang TEXT, country TEXT, city TEXT, ip TEXT)'),
    // Requests for pages that do not exist: kind 'probe' (looks like a hack attempt, with IP address) or 'notfound' (without IP address).
    env.DB.prepare('CREATE TABLE IF NOT EXISTS probes (ts INTEGER, day TEXT, kind TEXT, ip TEXT, country TEXT, city TEXT, org TEXT, method TEXT, path TEXT, ref TEXT, ua TEXT, status INTEGER)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS probes_ts ON probes (ts)'),
  ])
    // Browser language and place (added later): add the columns to an existing table; fails harmlessly when they are already there.
    .then(() => env.DB.prepare('ALTER TABLE hits ADD COLUMN blang TEXT').run().catch(() => {}))
    .then(() => env.DB.prepare('ALTER TABLE hits ADD COLUMN city TEXT').run().catch(() => {}))
    .then(() => Promise.all(['answer TEXT', 'lang TEXT', 'turns INTEGER', 'city TEXT', 'ip TEXT']
      .map((c) => env.DB.prepare(`ALTER TABLE chats ADD COLUMN ${c}`).run().catch(() => {}))))
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
  await d.prepare('INSERT INTO hits (ts, day, path, ref, country, device, visitor, blang, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(Date.now(), day, path, ref, request.cf?.country || '', device(ua), visitor, browserLang(request), request.cf?.city || '').run();
  return new Response(null, { status: 204 });
}

// --- hack attempts -------------------------------------------------------------
// Requests for pages that do not exist (and the old WordPress login addresses) are logged by worker/index.js.
// Addresses that look like an attack (WordPress or PHP files, .env, .git, config and backup files, admin tools)
// are kept with IP address, place, country and provider; other missing pages only with the page and where it was linked from.
// Everything is deleted after PROBE_DAYS days (see cleanProbes, run by the cron trigger).
const PROBE_DAYS = 30;
const SUSPICIOUS = new RegExp([
  String.raw`\.(php\d?|phtml|asp|aspx|jsp|cgi|pl|env|ini|conf|cfg|sql|bak|old|orig|swp|log|ya?ml|sh|bash|py|rb|key|pem|zip|tar|gz|rar|7z|db|sqlite|mdb)(\b|$)`,
  String.raw`(^|/)\.(?!well-known/(security\.txt|change-password))`, // hidden files and folders: .env, .git, .aws, .ssh, .vscode ...
  'wp-|wordpress|xmlrpc|phpmyadmin|pma|adminer|cgi-bin|vendor/|actuator|boaform|hnap|owa/|ecp/|autodiscover|telescope|_ignition|solr|jenkins|console|manager/html|setup|install|backup|config|shell|passwd|etc/',
].join('|'), 'i');
const probeCount = new Map(); // per IP per minute, in this Worker instance: stops one scanner from filling the database
let probeMinute = 0;

export function isSuspicious(path) {
  try { path = decodeURIComponent(path); } catch { /* keep as is */ }
  return SUSPICIOUS.test(path);
}

export async function logProbe(env, request, status) {
  if (/(^|;\s*)javc_me=1/.test(request.headers.get('cookie') || '')) return; // Jeroen himself
  const url = new URL(request.url);
  const path = (url.pathname + url.search).slice(0, 300);
  const kind = isSuspicious(path) || !['GET', 'HEAD'].includes(request.method) ? 'probe' : 'notfound';
  const ip = request.headers.get('cf-connecting-ip') || '';
  const minute = Math.floor(Date.now() / 60000);
  if (minute !== probeMinute) { probeCount.clear(); probeMinute = minute; }
  const n = (probeCount.get(ip) || 0) + 1;
  probeCount.set(ip, n);
  if (n > 30 || probeCount.size > 500) return;
  const d = await db(env).catch((err) => console.error('stats db', err));
  if (!d) return;
  const cf = request.cf || {};
  let ref = '';
  try { ref = new URL(request.headers.get('referer')).href.slice(0, 300); } catch { /* none */ }
  const probe = kind === 'probe';
  await d.prepare('INSERT INTO probes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(Date.now(), today(), kind, probe ? ip : '', cf.country || '', probe ? cf.city || '' : '', probe ? cf.asOrganization || '' : '',
      request.method, path, ref, probe ? (request.headers.get('user-agent') || '').slice(0, 300) : '', status).run();
}

// Deletes logged hack attempts and missing pages older than PROBE_DAYS days, wipes the IP address of older chat questions and deletes chat questions older than KEEP_DAYS days (called by the cron trigger).
export async function cleanProbes(env) {
  const d = await db(env);
  if (!d) return;
  const before = Date.now() - PROBE_DAYS * 864e5;
  await d.batch([
    d.prepare('DELETE FROM probes WHERE ts < ?').bind(before),
    d.prepare("UPDATE chats SET ip = '' WHERE ts < ? AND ip != ''").bind(before),
    d.prepare('DELETE FROM chats WHERE ts < ?').bind(Date.now() - KEEP_DAYS * 864e5),
  ]);
}

// Called by the contact form after the message was e-mailed, for the "Contact requests" page.
export async function logContact(env, request, { name, email, phone, message, lang }) {
  const d = await db(env).catch((err) => console.error('stats db', err));
  if (!d) return;
  await d.prepare('INSERT INTO contacts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(Date.now(), name, email, phone, message, lang, request.cf?.country || '', request.cf?.city || '', request.headers.get('cf-connecting-ip') || '').run();
}

// Called by the chatbot after each question.
// The answer, page language, earlier messages in the conversation, place and IP address are kept for the "Chat conversations"
// page, to spot misuse such as prompt injection; the IP address is wiped after PROBE_DAYS days (see cleanProbes).
export async function logChat(env, request, { question, answer = '', lang = '', turns = 0, model, sources, ms, ok }) {
  const d = await db(env).catch((err) => console.error('stats db', err));
  if (!d) return;
  await d.prepare('INSERT INTO chats (ts, day, question, model, sources, ms, ok, country, answer, lang, turns, city, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(Date.now(), today(), question.slice(0, 2000), model, sources.join(' '), ms, ok ? 1 : 0, request.cf?.country || '',
      answer.slice(0, 4000), lang, turns, request.cf?.city || '', request.headers.get('cf-connecting-ip') || '').run();
}

// Questions that try to make the chatbot leave its role (prompt injection) or probe it; shown with a label on the "Chat conversations" page.
const INJECTION = new RegExp([
  // leave the role / show the instructions
  String.raw`ignore (all |any |the |your )?(previous|prior|above|earlier)|disregard|forget (all|everything|your)|override|jailbreak|developer mode|debug(ging)? mode|for debugging|\bDAN\b`,
  String.raw`system ?prompt|developer (message|instructions)|your (instructions|prompt|rules|guidelines|configuration|context)|verbatim|first \d+ (lines|words)|repeat (everything|the text) above`,
  String.raw`pretend (to be|you)|act as|you are now|role ?play|i am (the |a )?(site |website )?(admin|administrator|owner|developer)|administrator here|admin here`,
  String.raw`<\/?(system|passage|passages|instructions?)>|\[(system|inst)\]`,
  // ask for secrets, internals or other people's data
  String.raw`reveal|api[ _-]?keys?|tokens?\b|secrets?\b|credentials?|password|connection strings?|environment variables?|env vars?|\.env\b|base64`,
  String.raw`data ?sources?|databases? (tables?|names?|schema)|databases? (you|can)|or databases|\btables? (names?|and)|its columns|columns? (of|in|names?)|schema|endpoints?|tools?,? functions|functions? (you|or)|can (you )?(access|query)|have access to`,
  String.raw`e-?mail addresses|subscribers?\b|contact (form )?(submissions|requests)|visitors?'? (data|ip)|ip address|personal data|members? list`,
  // Dutch
  String.raw`negeer|vergeet (alle|je)|je instructies|systeemprompt|beheerder|wachtwoord|omgevingsvariabelen|databank|tabellen|e-?mailadressen|abonnees|persoonsgegevens`,
  // code
  String.raw`<script|select .* from|union select|\.\.\/`,
].join('|'), 'i');

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
    chatsT: "Chat conversations", oddH: "Suspicious questions", oddTag: "suspicious", showOdd: "Show only suspicious questions", showAll: "Show all questions", answer: "Answer", followUp: (n) => `follow-up question (${n} earlier)`, noAnswer: "No answer saved (from before 2 November 2026, or the chatbot failed).", chatsNote: "The latest 200 questions to the chatbot with its answer. \"Suspicious\" marks questions that try to make the chatbot leave its role (prompt injection, asking for its instructions or keys). Answers, place and IP address are saved from 2 November 2026; the IP address is wiped after 30 days.",
    visitsT: "Visits", visitsH: "Visits", oneBounce: "Left after one page", avgPages: "Pages per visit", avgDur: "Average duration", entry: "Entry pages", exit: "Exit pages", latestVisits: "Latest visits", pagesN: (n) => (n === 1 ? '1 page' : `${n} pages`), visitsNote: "A visit is a series of pages viewed by the same visitor (recognised without cookies, for one day at most) with less than 30 minutes between them. The duration is the time from the first to the last page: the time spent on the last page cannot be measured, so a visit of one page has no duration. The latest 300 visits are shown; the place is known from 2 November 2026.", secT: "Hack attempts", attempts: "Suspicious requests", ips: "IP addresses", topIps: "Most active IP addresses", provider: "Provider", lastSeen: "Last seen", tried: "Most tried addresses", address: "Address", latestAttempts: "Latest attempts", method: "Method", browser: "Browser / tool", notFound: "Other pages not found (possible broken links)", linkedFrom: "Linked from", count: "Times", noAttempts: "No suspicious requests in this period.", secNote: "Requests for addresses that do not exist on this site and look like an attack (such as wp-login.php, xmlrpc.php, .env or .git) are logged with IP address, place, country and provider, and deleted after 30 days. Click an IP address to look it up at AbuseIPDB. Other pages that were not found are logged without IP address. Your own visits in this browser are not logged. Logging started on 2 November 2026.",
    remove: 'Remove from the list', removeQ: (n, e) => `Remove ${n} (${e}) from the list of subscribers? They will not receive the daily update any more.`,
    contacts: 'Contact requests', noContacts: 'No contact requests yet. Messages sent with the contact form are kept here from now on.', contactsNote: 'The latest 200 messages; messages older than 400 days are deleted.', name: 'Name', email: 'E-mail', city: 'City', status: 'Status', statusNames: { active: 'Subscribed', pending: 'Not confirmed yet' }, subscribed: 'Requested', confirmed: 'Confirmed', lastSent: 'Last update sent', subs: 'IT4IT Atlas subscribers', export: 'Export to Excel', subsNote: 'Unconfirmed requests are deleted after 7 days; unsubscribing deletes the details straight away.',
    views: 'views', visitors: 'visitors', questions: 'questions', noData: 'No data yet.', noDb: 'The database is not available yet.',
    pageViews: 'Page views', visitorsDay: 'Visitors (counted per day)', perVisitor: 'Pages per visitor', perDay: 'Per day',
    siteLang: 'Site language', language: 'Language', viewsH: 'Views', share: 'Share', visitorsH: 'Visitors',
    langNames: { en: 'English', nl: 'Dutch', cn: 'Chinese', fr: 'French', de: 'German' }, langPerDay: 'Views per language per day',
    browserLang: 'Browser language', unknown: '(unknown)', noBrowserLang: 'Collected from now on; no data yet.',
    topPages: 'Most viewed pages', page: 'Page', referrers: 'Referrers', website: 'Website', direct: '(direct / unknown)',
    countries: 'Countries', country: 'Country', devices: 'Devices', device: 'Device',
    countryDay: 'Visitors per country per day', other: 'Other', day: 'Day', cdNote: 'visitors (views)',
    deviceNames: { desktop: 'desktop', mobile: 'mobile', tablet: 'tablet' },
    questionsH: 'Questions', failedH: 'Failed', avgTime: 'Avg. response time', model: 'Model', qPerDay: 'Questions per day',
    latest: 'Latest questions', time: 'Time', question: 'Question', failed: 'failed', sources: 'Most used sources', source: 'Source', times: 'Times',
    change: 'Change', noGithub: 'GitHub cannot be reached right now.', today: 'Today', days: (n) => `${n} days`,
    site: 'Website statistics', bot: 'Chatbot statistics', revs: 'Site revisions',
    note: 'Your own visits are not counted in this browser. Visitors are counted without cookies.',
  },
  nl: {
    chatsT: "Chatgesprekken", oddH: "Verdachte vragen", oddTag: "verdacht", showOdd: "Alleen verdachte vragen", showAll: "Alle vragen tonen", answer: "Antwoord", followUp: (n) => `vervolgvraag (${n} eerder)`, noAnswer: "Geen antwoord bewaard (van vóór 2 november 2026, of de chatbot gaf een fout).", chatsNote: "De laatste 200 vragen aan de chatbot met het antwoord. \"Verdacht\" staat bij vragen die de chatbot uit zijn rol proberen te halen (prompt injection, vragen naar zijn instructies of sleutels). Antwoorden, plaats en IP-adres worden bewaard vanaf 2 november 2026; het IP-adres wordt na 30 dagen gewist.",
    visitsT: "Bezoeken", visitsH: "Bezoeken", oneBounce: "Na één pagina weg", avgPages: "Pagina's per bezoek", avgDur: "Gemiddelde duur", entry: "Eerste pagina's", exit: "Laatste pagina's", latestVisits: "Laatste bezoeken", pagesN: (n) => (n === 1 ? '1 pagina' : `${n} pagina's`), visitsNote: "Een bezoek is een reeks pagina's die dezelfde bezoeker (herkend zonder cookies, hooguit één dag) bekijkt met minder dan 30 minuten ertussen. De duur is de tijd van de eerste tot de laatste pagina: hoe lang iemand op de laatste pagina blijft is niet te meten, dus een bezoek van één pagina heeft geen duur. De laatste 300 bezoeken staan hier; de plaats is bekend vanaf 2 november 2026.", secT: "Hackpogingen", attempts: "Verdachte verzoeken", ips: "IP-adressen", topIps: "Meest actieve IP-adressen", provider: "Provider", lastSeen: "Laatst gezien", tried: "Meest geprobeerde adressen", address: "Adres", latestAttempts: "Laatste pogingen", method: "Methode", browser: "Browser / programma", notFound: "Andere niet-gevonden pagina's (mogelijk kapotte links)", linkedFrom: "Gelinkt vanaf", count: "Keer", noAttempts: "Geen verdachte verzoeken in deze periode.", secNote: "Verzoeken om adressen die niet op deze site bestaan en op een aanval lijken (zoals wp-login.php, xmlrpc.php, .env of .git) worden bewaard met IP-adres, plaats, land en provider, en na 30 dagen verwijderd. Klik op een IP-adres om het op te zoeken bij AbuseIPDB. Andere niet-gevonden pagina's worden zonder IP-adres bewaard. Je eigen bezoeken in deze browser worden niet vastgelegd. Het vastleggen is begonnen op 2 november 2026.",
    remove: 'Verwijderen van de lijst', removeQ: (n, e) => `${n} (${e}) verwijderen van de lijst met abonnees? Die ontvangt de dagelijkse update dan niet meer.`,
    contacts: 'Contactaanvragen', noContacts: 'Nog geen contactaanvragen. Berichten via het contactformulier worden vanaf nu hier bewaard.', contactsNote: 'De laatste 200 berichten; berichten ouder dan 400 dagen worden verwijderd.', name: 'Naam', email: 'E-mail', city: 'Plaats', status: 'Status', statusNames: { active: 'Aangemeld', pending: 'Nog niet bevestigd' }, subscribed: 'Aangevraagd', confirmed: 'Bevestigd', lastSent: 'Laatste update verstuurd', subs: 'Abonnees IT4IT Atlas', export: 'Exporteer naar Excel', subsNote: 'Niet-bevestigde aanvragen worden na 7 dagen verwijderd; bij afmelden worden de gegevens direct verwijderd.',
    views: 'weergaven', visitors: 'bezoekers', questions: 'vragen', noData: 'Nog geen gegevens.', noDb: 'De database is nog niet beschikbaar.',
    pageViews: 'Paginaweergaven', visitorsDay: 'Bezoekers (per dag geteld)', perVisitor: "Pagina's per bezoeker", perDay: 'Per dag',
    siteLang: 'Taal van de site', language: 'Taal', viewsH: 'Weergaven', share: 'Aandeel', visitorsH: 'Bezoekers',
    langNames: { en: 'Engels', nl: 'Nederlands', cn: 'Chinees', fr: 'Frans', de: 'Duits' }, langPerDay: 'Weergaven per taal per dag',
    browserLang: 'Taal van de browser', unknown: '(onbekend)', noBrowserLang: 'Wordt vanaf nu verzameld; nog geen gegevens.',
    topPages: "Meest bekeken pagina's", page: 'Pagina', referrers: 'Verwijzende sites', website: 'Website', direct: '(direct / onbekend)',
    countries: 'Landen', country: 'Land', devices: 'Apparaten', device: 'Apparaat',
    countryDay: 'Bezoekers per land per dag', other: 'Overig', day: 'Dag', cdNote: 'bezoekers (weergaven)',
    deviceNames: { desktop: 'desktop', mobile: 'mobiel', tablet: 'tablet' },
    questionsH: 'Vragen', failedH: 'Mislukt', avgTime: 'Gem. antwoordtijd', model: 'Model', qPerDay: 'Vragen per dag',
    latest: 'Laatste vragen', time: 'Tijd', question: 'Vraag', failed: 'mislukt', sources: 'Meest gebruikte bronnen', source: 'Bron', times: 'Keer',
    change: 'Wijziging', noGithub: 'GitHub is nu niet bereikbaar.', today: 'Vandaag', days: (n) => `${n} dagen`,
    site: 'Statistieken van de website', bot: 'Statistieken van de chatbot', revs: 'Wijzigingen aan de site',
    note: 'Je eigen bezoeken worden in deze browser niet geteld. Bezoekers worden geteld zonder cookies.',
  },
  cn: {
    chatsT: "聊天记录", oddH: "可疑问题", oddTag: "可疑", showOdd: "只显示可疑问题", showAll: "显示所有问题", answer: "回答", followUp: (n) => `追问（之前 ${n} 个）`, noAnswer: "未保存回答（2026 年 11 月 2 日之前，或聊天机器人出错）。", chatsNote: "向聊天机器人提出的最近 200 个问题及其回答。“可疑”标记试图让聊天机器人脱离角色的问题（提示注入、索要其指令或密钥）。回答、城市和 IP 地址从 2026 年 11 月 2 日起保存；IP 地址 30 天后清除。",
    visitsT: "访问", visitsH: "访问次数", oneBounce: "只看一页就离开", avgPages: "每次访问页数", avgDur: "平均时长", entry: "入口页面", exit: "退出页面", latestVisits: "最近的访问", pagesN: (n) => `${n} 页`, visitsNote: "一次访问是指同一访客（不使用 Cookie 识别，最多一天）浏览的一系列页面，页面之间间隔少于 30 分钟。时长是从第一页到最后一页的时间：无法测量在最后一页停留的时间，因此只有一页的访问没有时长。此处显示最近 300 次访问；城市从 2026 年 11 月 2 日起记录。", secT: "入侵尝试", attempts: "可疑请求", ips: "IP 地址", topIps: "最活跃的 IP 地址", provider: "提供商", lastSeen: "最后出现", tried: "最常尝试的地址", address: "地址", latestAttempts: "最近的尝试", method: "方法", browser: "浏览器 / 工具", notFound: "其他未找到的页面（可能是失效链接）", linkedFrom: "来源链接", count: "次数", noAttempts: "此期间没有可疑请求。", secNote: "对本网站上不存在且看似攻击的地址的请求（例如 wp-login.php、xmlrpc.php、.env 或 .git）会连同 IP 地址、城市、国家和提供商一起记录，30 天后删除。点击 IP 地址可在 AbuseIPDB 上查询。其他未找到的页面不记录 IP 地址。您在此浏览器中的访问不会被记录。从 2026 年 11 月 2 日开始记录。",
    remove: '从列表中删除', removeQ: (n, e) => `要将 ${n}（${e}）从订阅者列表中删除吗？对方将不再收到每日更新。`,
    contacts: '联系请求', noContacts: '暂无联系请求。从现在起，通过联系表单发送的消息将保存在这里。', contactsNote: '最近 200 条消息；超过 400 天的消息将被删除。', name: '姓名', email: '电子邮件', city: '城市', status: '状态', statusNames: { active: '已订阅', pending: '尚未确认' }, subscribed: '申请时间', confirmed: '确认时间', lastSent: '最近发送的更新', subs: 'IT4IT Atlas 订阅者', export: '导出到 Excel', subsNote: '未确认的申请 7 天后删除；退订后数据立即删除。',
    views: '浏览量', visitors: '访客', questions: '问题', noData: '暂无数据。', noDb: '数据库暂不可用。',
    pageViews: '页面浏览量', visitorsDay: '访客（按天计算）', perVisitor: '每位访客浏览页数', perDay: '每天',
    siteLang: '网站语言', language: '语言', viewsH: '浏览量', share: '占比', visitorsH: '访客',
    langNames: { en: '英文', nl: '荷兰语', cn: '中文', fr: '法语', de: '德语' }, langPerDay: '每天各语言浏览量',
    browserLang: '浏览器语言', unknown: '（未知）', noBrowserLang: '从现在开始收集，暂无数据。',
    topPages: '最多浏览的页面', page: '页面', referrers: '来源网站', website: '网站', direct: '（直接访问 / 未知）',
    countries: '国家', country: '国家', devices: '设备', device: '设备',
    countryDay: '每日各国访客', other: '其他', day: '日期', cdNote: '访客（浏览量）',
    deviceNames: { desktop: '桌面', mobile: '手机', tablet: '平板' },
    questionsH: '问题', failedH: '失败', avgTime: '平均响应时间', model: '模型', qPerDay: '每天问题数',
    latest: '最新问题', time: '时间', question: '问题', failed: '失败', sources: '最常用来源', source: '来源', times: '次数',
    change: '更改', noGithub: '暂时无法连接 GitHub。', today: '今天', days: (n) => `${n} 天`,
    site: '网站统计', bot: '聊天机器人统计', revs: '网站修订记录',
    note: '在此浏览器中，您自己的访问不计入统计。访客统计不使用 Cookie。',
  },
  fr: {
    chatsT: "Conversations du chatbot", oddH: "Questions suspectes", oddTag: "suspect", showOdd: "Seulement les questions suspectes", showAll: "Toutes les questions", answer: "Réponse", followUp: (n) => `question de suivi (${n} avant)`, noAnswer: "Pas de réponse enregistrée (avant le 2 novembre 2026, ou le chatbot a échoué).", chatsNote: "Les 200 dernières questions posées au chatbot avec sa réponse. « Suspect » signale les questions qui tentent de faire sortir le chatbot de son rôle (injection de prompt, demande de ses instructions ou de clés). Les réponses, la ville et l'adresse IP sont enregistrées depuis le 2 novembre 2026 ; l'adresse IP est effacée après 30 jours.",
    visitsT: "Visites", visitsH: "Visites", oneBounce: "Parti après une page", avgPages: "Pages par visite", avgDur: "Durée moyenne", entry: "Pages d'entrée", exit: "Pages de sortie", latestVisits: "Dernières visites", pagesN: (n) => (n === 1 ? '1 page' : `${n} pages`), visitsNote: "Une visite est une suite de pages vues par le même visiteur (reconnu sans cookies, pendant un jour au maximum) avec moins de 30 minutes d'intervalle. La durée est le temps entre la première et la dernière page : le temps passé sur la dernière page ne peut pas être mesuré, donc une visite d'une seule page n'a pas de durée. Les 300 dernières visites sont affichées ; la ville est connue depuis le 2 novembre 2026.", secT: "Tentatives de piratage", attempts: "Requêtes suspectes", ips: "Adresses IP", topIps: "Adresses IP les plus actives", provider: "Fournisseur", lastSeen: "Vu en dernier", tried: "Adresses les plus tentées", address: "Adresse", latestAttempts: "Dernières tentatives", method: "Méthode", browser: "Navigateur / outil", notFound: "Autres pages introuvables (liens peut-être cassés)", linkedFrom: "Lien depuis", count: "Fois", noAttempts: "Aucune requête suspecte sur cette période.", secNote: "Les requêtes vers des adresses qui n'existent pas sur ce site et ressemblent à une attaque (comme wp-login.php, xmlrpc.php, .env ou .git) sont enregistrées avec l'adresse IP, la ville, le pays et le fournisseur, et supprimées après 30 jours. Cliquez sur une adresse IP pour la vérifier sur AbuseIPDB. Les autres pages introuvables sont enregistrées sans adresse IP. Vos propres visites dans ce navigateur ne sont pas enregistrées. L'enregistrement a commencé le 2 novembre 2026.",
    remove: 'Retirer de la liste', removeQ: (n, e) => `Retirer ${n} (${e}) de la liste des abonnés ? Cette personne ne recevra plus la mise à jour quotidienne.`,
    contacts: 'Demandes de contact', noContacts: 'Pas encore de demandes de contact. Les messages envoyés via le formulaire de contact sont désormais conservés ici.', contactsNote: 'Les 200 derniers messages ; les messages de plus de 400 jours sont supprimés.', name: 'Nom', email: 'E-mail', city: 'Ville', status: 'Statut', statusNames: { active: 'Abonné', pending: 'Pas encore confirmé' }, subscribed: 'Demandé', confirmed: 'Confirmé', lastSent: 'Dernière mise à jour envoyée', subs: 'Abonnés IT4IT Atlas', export: 'Exporter vers Excel', subsNote: 'Les demandes non confirmées sont supprimées après 7 jours ; le désabonnement supprime les données immédiatement.',
    views: 'vues', visitors: 'visiteurs', questions: 'questions', noData: 'Pas encore de données.', noDb: "La base de données n'est pas encore disponible.",
    pageViews: 'Pages vues', visitorsDay: 'Visiteurs (comptés par jour)', perVisitor: 'Pages par visiteur', perDay: 'Par jour',
    siteLang: 'Langue du site', language: 'Langue', viewsH: 'Vues', share: 'Part', visitorsH: 'Visiteurs',
    langNames: { en: 'Anglais', nl: 'Néerlandais', cn: 'Chinois', fr: 'Français', de: 'Allemand' }, langPerDay: 'Vues par langue et par jour',
    browserLang: 'Langue du navigateur', unknown: '(inconnue)', noBrowserLang: 'Collectée à partir de maintenant ; pas encore de données.',
    topPages: 'Pages les plus vues', page: 'Page', referrers: 'Sites référents', website: 'Site', direct: '(direct / inconnu)',
    countries: 'Pays', country: 'Pays', devices: 'Appareils', device: 'Appareil',
    countryDay: 'Visiteurs par pays et par jour', other: 'Autres', day: 'Jour', cdNote: 'visiteurs (vues)',
    deviceNames: { desktop: 'ordinateur', mobile: 'mobile', tablet: 'tablette' },
    questionsH: 'Questions', failedH: 'Échecs', avgTime: 'Temps de réponse moyen', model: 'Modèle', qPerDay: 'Questions par jour',
    latest: 'Dernières questions', time: 'Heure', question: 'Question', failed: 'échec', sources: 'Sources les plus utilisées', source: 'Source', times: 'Fois',
    change: 'Modification', noGithub: 'GitHub est injoignable pour le moment.', today: "Aujourd'hui", days: (n) => `${n} jours`,
    site: 'Statistiques du site', bot: 'Statistiques du chatbot', revs: 'Modifications du site',
    note: 'Vos propres visites ne sont pas comptées dans ce navigateur. Les visiteurs sont comptés sans cookies.',
  },
  de: {
    chatsT: "Chatverläufe", oddH: "Verdächtige Fragen", oddTag: "verdächtig", showOdd: "Nur verdächtige Fragen", showAll: "Alle Fragen anzeigen", answer: "Antwort", followUp: (n) => `Folgefrage (${n} vorher)`, noAnswer: "Keine Antwort gespeichert (vor dem 2. November 2026 oder der Chatbot ist fehlgeschlagen).", chatsNote: "Die letzten 200 Fragen an den Chatbot mit seiner Antwort. „Verdächtig“ markiert Fragen, die den Chatbot aus seiner Rolle bringen wollen (Prompt-Injection, Fragen nach seinen Anweisungen oder Schlüsseln). Antworten, Ort und IP-Adresse werden ab dem 2. November 2026 gespeichert; die IP-Adresse wird nach 30 Tagen gelöscht.",
    visitsT: "Besuche", visitsH: "Besuche", oneBounce: "Nach einer Seite weg", avgPages: "Seiten pro Besuch", avgDur: "Durchschnittliche Dauer", entry: "Einstiegsseiten", exit: "Ausstiegsseiten", latestVisits: "Letzte Besuche", pagesN: (n) => (n === 1 ? '1 Seite' : `${n} Seiten`), visitsNote: "Ein Besuch ist eine Folge von Seiten, die derselbe Besucher (ohne Cookies erkannt, höchstens einen Tag lang) mit weniger als 30 Minuten Abstand ansieht. Die Dauer ist die Zeit von der ersten bis zur letzten Seite: Die Zeit auf der letzten Seite lässt sich nicht messen, daher hat ein Besuch mit nur einer Seite keine Dauer. Angezeigt werden die letzten 300 Besuche; der Ort ist ab dem 2. November 2026 bekannt.", secT: "Hackversuche", attempts: "Verdächtige Anfragen", ips: "IP-Adressen", topIps: "Aktivste IP-Adressen", provider: "Provider", lastSeen: "Zuletzt gesehen", tried: "Am häufigsten versuchte Adressen", address: "Adresse", latestAttempts: "Letzte Versuche", method: "Methode", browser: "Browser / Programm", notFound: "Andere nicht gefundene Seiten (möglicherweise defekte Links)", linkedFrom: "Verlinkt von", count: "Mal", noAttempts: "Keine verdächtigen Anfragen in diesem Zeitraum.", secNote: "Anfragen nach Adressen, die es auf dieser Website nicht gibt und die wie ein Angriff aussehen (etwa wp-login.php, xmlrpc.php, .env oder .git), werden mit IP-Adresse, Ort, Land und Provider gespeichert und nach 30 Tagen gelöscht. Klicken Sie auf eine IP-Adresse, um sie bei AbuseIPDB nachzuschlagen. Andere nicht gefundene Seiten werden ohne IP-Adresse gespeichert. Ihre eigenen Besuche in diesem Browser werden nicht erfasst. Die Erfassung hat am 2. November 2026 begonnen.",
    remove: 'Von der Liste entfernen', removeQ: (n, e) => `${n} (${e}) von der Abonnentenliste entfernen? Die Person erhält das tägliche Update dann nicht mehr.`,
    contacts: 'Kontaktanfragen', noContacts: 'Noch keine Kontaktanfragen. Nachrichten über das Kontaktformular werden ab jetzt hier gespeichert.', contactsNote: 'Die letzten 200 Nachrichten; Nachrichten, die älter als 400 Tage sind, werden gelöscht.', name: 'Name', email: 'E-Mail', city: 'Ort', status: 'Status', statusNames: { active: 'Angemeldet', pending: 'Noch nicht bestätigt' }, subscribed: 'Angefragt', confirmed: 'Bestätigt', lastSent: 'Letztes Update gesendet', subs: 'IT4IT-Atlas-Abonnenten', export: 'Nach Excel exportieren', subsNote: 'Unbestätigte Anfragen werden nach 7 Tagen gelöscht; bei Abmeldung werden die Daten sofort gelöscht.',
    views: 'Aufrufe', visitors: 'Besucher', questions: 'Fragen', noData: 'Noch keine Daten.', noDb: 'Die Datenbank ist noch nicht verfügbar.',
    pageViews: 'Seitenaufrufe', visitorsDay: 'Besucher (pro Tag gezählt)', perVisitor: 'Seiten pro Besucher', perDay: 'Pro Tag',
    siteLang: 'Sprache der Website', language: 'Sprache', viewsH: 'Aufrufe', share: 'Anteil', visitorsH: 'Besucher',
    langNames: { en: 'Englisch', nl: 'Niederländisch', cn: 'Chinesisch', fr: 'Französisch', de: 'Deutsch' }, langPerDay: 'Aufrufe pro Sprache und Tag',
    browserLang: 'Sprache des Browsers', unknown: '(unbekannt)', noBrowserLang: 'Wird ab jetzt erfasst; noch keine Daten.',
    topPages: 'Meistbesuchte Seiten', page: 'Seite', referrers: 'Verweisende Websites', website: 'Website', direct: '(direkt / unbekannt)',
    countries: 'Länder', country: 'Land', devices: 'Geräte', device: 'Gerät',
    countryDay: 'Besucher pro Land und Tag', other: 'Andere', day: 'Tag', cdNote: 'Besucher (Aufrufe)',
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

// Bars per day: side by side, or stacked (one bar per day, keys stacked from the bottom up).
function bars(rows, days, keys, labels = keys, stacked = false) {
  const byDay = new Map(rows.map((r) => [r.day, r]));
  const list = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    list.push(byDay.get(day) || { day });
  }
  const max = Math.max(1, ...list.flatMap((r) => (stacked ? [keys.reduce((n, k) => n + (r[k] || 0), 0)] : keys.map((k) => r[k] || 0))));
  return `<div class="bars${stacked ? ' stacked' : ''}">${list.map((r) => `<div class="bar" title="${r.day}: ${keys.map((k, i) => `${r[k] || 0} ${labels[i]}`).join(', ')}">
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
  // The pages of the Statistics menu: site (page views and chatbot), visits (page paths), security (hack attempts), changes, contacts, subscribers.
  const part = ['site', 'visits', 'security', 'chats', 'changes', 'contacts', 'subscribers'].includes(params.get('part')) ? params.get('part') : 'site';
  const done = (html) => new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex',
      'set-cookie': 'javc_me=1; Path=/; Max-Age=31536000; Secure; SameSite=Lax; HttpOnly',
    },
  });
  const fullTime = (ts) => new Date(ts).toLocaleString(LOCALE[lang], { timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (part === 'changes') {
    const commits = await revisions().catch(() => null);
    return done(`<section><h2>${T.revs}</h2>${commits ? table(commits.map((x) => ({
      ...x, sha: x.sha.slice(0, 7), cms: /^(Bijgewerkt|Nieuw|Verwijderd|Afbeelding|Create|Update|Delete|Upload) /.test(x.msg),
    })), [
      { label: T.time, html: (r) => esc(when(r.ts, lang)) },
      { label: T.change, html: (r) => `${r.cms ? '<span class="tag">CMS</span> ' : ''}${esc(r.msg)}` },
      { label: '', html: (r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${r.sha}</a>` },
    ], T) : `<p class="muted">${T.noGithub}</p>`}</section>`);
  }

  if (part === 'contacts') {
    if (!d) return done(`<section><p class="muted">${T.noDb}</p></section>`);
    await d.prepare('DELETE FROM contacts WHERE ts < ?').bind(Date.now() - KEEP_DAYS * 864e5).run();
    const rows = (await d.prepare('SELECT * FROM contacts ORDER BY ts DESC LIMIT 200').all()).results;
    return done(`<section><h2>${T.contacts}</h2>${rows.length ? `<div class="contact-list">${rows.map((r) => `<article>
      <div class="meta"><b>${esc(r.name)}</b> · <a href="mailto:${esc(r.email)}">${esc(r.email)}</a>${r.phone ? ` · <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a>` : ''}</div>
      <div class="muted"><small>${esc(fullTime(r.ts))} · ${esc(T.langNames[r.lang] || r.lang)} · ${esc([r.city, r.country].filter(Boolean).join(', ') || T.unknown)} · IP ${esc(r.ip || '—')}</small></div>
      <p>${esc(r.message).replace(/\n/g, '<br>')}</p></article>`).join('')}</div>` : `<p class="muted">${T.noContacts}</p>`}
      <p class="muted"><small>${T.contactsNote}</small></p></section>`);
  }

  // Visits and hack attempts: periods of 1, 7 or 30 days (7 by default; hack attempts are kept for 30 days).
  const shortDays = [1, 7, 30].includes(+params.get('days')) ? +params.get('days') : 7;
  const shortFrom = new Date(Date.now() - (shortDays - 1) * 864e5).toISOString().slice(0, 10);
  const shortTabs = `<div class="ranges">${[1, 7, 30].map((n) => `<a href="?days=${n}"${n === shortDays ? ' class="on"' : ''}>${n === 1 ? T.today : T.days(n)}</a>`).join('')}</div>`;
  const regionName = new Intl.DisplayNames([LOCALE[lang]], { type: 'region' });
  const flag = (c) => (/^[A-Z]{2}$/.test(c || '') ? String.fromCodePoint(...[...c].map((x) => 0x1f1a5 + x.charCodeAt(0))) : '');
  const place = (city, c) => { let n = c; try { n = c ? regionName.of(c) : ''; } catch { /* code */ } return [city, n].filter(Boolean).join(', ') || T.unknown; };
  const secs = (ms) => { const t = Math.round(ms / 1000); return t < 60 ? `${t} s` : `${Math.floor(t / 60)} min ${String(t % 60).padStart(2, '0')} s`; };

  if (part === 'visits') {
    if (!d) return done(`<section><p class="muted">${T.noDb}</p></section>`);
    // A visit: page views with the same visitor code (per day) and less than 30 minutes between them.
    const rows = (await d.prepare('SELECT ts, day, visitor, path, ref, country, city, device FROM hits WHERE day >= ? ORDER BY ts LIMIT 50000').bind(shortFrom).all()).results;
    const open = new Map(), visits = [];
    for (const r of rows) {
      const key = r.day + r.visitor;
      let v = open.get(key);
      if (!v || r.ts - v.pages[v.pages.length - 1].ts > 30 * 60000) {
        v = { start: r.ts, ref: r.ref, country: r.country, city: r.city, device: r.device, pages: [] };
        open.set(key, v);
        visits.push(v);
      }
      v.pages.push({ ts: r.ts, path: r.path });
      if (!v.city && r.city) v.city = r.city;
    }
    const n = visits.length;
    const multi = visits.filter((v) => v.pages.length > 1);
    const durOf = (v) => v.pages[v.pages.length - 1].ts - v.start;
    const count = (pick) => [...visits.reduce((m, v) => m.set(pick(v), (m.get(pick(v)) || 0) + 1), new Map())]
      .sort((a, b) => b[1] - a[1]).slice(0, 15).map(([path, visits]) => ({ path, visits }));
    const pageCols = [{ label: T.page, html: (r) => `<a href="${esc(r.path)}">${esc(r.path)}</a>` }, { label: T.visitsH, key: 'visits', num: true }];
    const list = visits.slice(-300).reverse().map((v) => `<article>
      <div class="meta"><b>${esc(fullTime(v.start))}</b> · ${flag(v.country)} ${esc(place(v.city, v.country))} · ${esc(T.deviceNames[v.device] || v.device)} · ${esc(v.ref || T.direct)}
        · ${esc(T.pagesN(v.pages.length))}${v.pages.length > 1 ? ` · ${secs(durOf(v))}` : ''}</div>
      <ol class="path">${v.pages.map((p) => `<li><span class="muted">${p.ts === v.start ? '0:00' : `+${secs(p.ts - v.start)}`}</span> <a href="${esc(p.path)}">${esc(p.path)}</a></li>`).join('')}</ol></article>`).join('');
    return done(`${shortTabs}<section><h2>${T.visitsT}</h2>
      <div class="tiles">${tile(T.visitsH, nf.format(n))}${tile(T.avgPages, n ? (rows.length / n).toLocaleString(LOCALE[lang], { maximumFractionDigits: 1 }) : '0')}
      ${tile(T.oneBounce, n ? `${Math.round(((n - multi.length) / n) * 100)}%` : '-')}
      ${tile(T.avgDur, multi.length ? secs(multi.reduce((t, v) => t + durOf(v), 0) / multi.length) : '-')}</div>
      <div class="grid"><div><h3>${T.entry}</h3>${table(count((v) => v.pages[0].path), pageCols, T)}</div>
      <div><h3>${T.exit}</h3>${table(count((v) => v.pages[v.pages.length - 1].path), pageCols, T)}</div></div>
      <h3>${T.latestVisits}</h3>${n ? `<div class="visit-list">${list}</div>` : `<p class="muted">${T.noData}</p>`}
      <p class="muted"><small>${T.visitsNote}</small></p></section>`);
  }

  if (part === 'security') {
    if (!d) return done(`<section><p class="muted">${T.noDb}</p></section>`);
    const q = (sql) => d.prepare(sql).bind(shortFrom);
    const [tot, ips, paths, recent, missing] = (await d.batch([
      q("SELECT COUNT(*) n, COUNT(DISTINCT ip) ips, COUNT(DISTINCT country) countries FROM probes WHERE day >= ? AND kind = 'probe'"),
      q("SELECT ip, MAX(country) country, MAX(city) city, MAX(org) org, COUNT(*) n, MAX(ts) last FROM probes WHERE day >= ? AND kind = 'probe' GROUP BY ip ORDER BY n DESC LIMIT 25"),
      q("SELECT CASE WHEN instr(path, '?') THEN substr(path, 1, instr(path, '?') - 1) ELSE path END path, COUNT(*) n, COUNT(DISTINCT ip) ips FROM probes WHERE day >= ? AND kind = 'probe' GROUP BY 1 ORDER BY n DESC LIMIT 25"),
      q("SELECT ts, ip, country, city, org, method, path, ua, status FROM probes WHERE day >= ? AND kind = 'probe' ORDER BY ts DESC LIMIT 200"),
      q("SELECT path, COUNT(*) n, MAX(ref) ref, MAX(ts) last FROM probes WHERE day >= ? AND kind = 'notfound' GROUP BY path ORDER BY n DESC LIMIT 25"),
    ])).map((r) => r.results);
    const t = tot[0] || {};
    const ipLink = (ip) => (ip ? `<a href="https://www.abuseipdb.com/check/${encodeURIComponent(ip)}" target="_blank" rel="noopener noreferrer">${esc(ip)}</a>` : '—');
    const where = (r) => `<span class="nw">${flag(r.country)} ${esc(place(r.city, r.country))}</span>`;
    return done(`${shortTabs}<section><h2>${T.secT}</h2>
      <div class="tiles">${tile(T.attempts, nf.format(t.n || 0))}${tile(T.ips, nf.format(t.ips || 0))}${tile(T.countries, nf.format(t.countries || 0))}</div>
      ${t.n ? `<div class="grid"><div><h3>${T.topIps}</h3>${table(ips, [
        { label: 'IP', html: (r) => ipLink(r.ip) }, { label: T.city, html: where }, { label: T.provider, key: 'org' },
        { label: T.count, key: 'n', num: true }, { label: T.lastSeen, html: (r) => `<span class="nw">${esc(when(r.last, lang))}</span>` }], T)}</div>
      <div><h3>${T.tried}</h3>${table(paths, [{ label: T.address, html: (r) => `<code>${esc(r.path)}</code>` },
        { label: T.count, key: 'n', num: true }, { label: T.ips, key: 'ips', num: true }], T)}</div></div>
      <h3>${T.latestAttempts}</h3>${table(recent, [
        { label: T.time, html: (r) => `<span class="nw">${esc(when(r.ts, lang))}</span>` }, { label: 'IP', html: (r) => ipLink(r.ip) },
        { label: T.city, html: where }, { label: T.provider, key: 'org' },
        { label: T.address, html: (r) => `${r.method === 'GET' ? '' : `<span class="tag">${esc(r.method)}</span> `}<code>${esc(r.path)}</code>` },
        { label: T.browser, html: (r) => `<small class="muted">${esc(r.ua)}</small>` }], T)}` : `<p class="muted">${T.noAttempts}</p>`}
      <h3>${T.notFound}</h3>${table(missing, [{ label: T.page, html: (r) => `<code>${esc(r.path)}</code>` },
        { label: T.linkedFrom, html: (r) => (r.ref ? `<small>${esc(r.ref)}</small>` : '') }, { label: T.count, key: 'n', num: true }], T)}
      <p class="muted"><small>${T.secNote}</small></p></section>`);
  }

  if (part === 'chats') {
    if (!d) return done(`<section><p class="muted">${T.noDb}</p></section>`);
    const rows = (await d.prepare('SELECT ts, question, answer, lang, turns, model, sources, ms, ok, country, city, ip FROM chats WHERE day >= ? ORDER BY ts DESC LIMIT 200').bind(shortFrom).all()).results
      .map((r) => ({ ...r, odd: INJECTION.test(r.question) }));
    const odd = rows.filter((r) => r.odd).length;
    const shown = params.get('only') === 'odd' ? rows.filter((r) => r.odd) : rows;
    const toggle = `<p><a class="btn" href="?days=${shortDays}${params.get('only') === 'odd' ? '' : '&only=odd'}">${params.get('only') === 'odd' ? T.showAll : T.showOdd}</a></p>`;
    const ipLink = (ip) => (ip ? `<a href="https://www.abuseipdb.com/check/${encodeURIComponent(ip)}" target="_blank" rel="noopener noreferrer">${esc(ip)}</a>` : '');
    return done(`${shortTabs}<section><h2>${T.chatsT}</h2>
      <div class="tiles">${tile(T.questionsH, nf.format(rows.length))}${tile(T.oddH, nf.format(odd))}${tile(T.failedH, nf.format(rows.filter((r) => !r.ok).length))}</div>
      ${toggle}${shown.length ? `<div class="contact-list chat-list">${shown.map((r) => `<article${r.odd ? ' class="odd"' : ''}>
        <div class="meta"><b>${esc(fullTime(r.ts))}</b> · ${flag(r.country)} ${esc(place(r.city, r.country))}${r.ip ? ` · IP ${ipLink(r.ip)}` : ''}
          ${r.lang ? ` · ${esc(T.langNames[r.lang] || r.lang)}` : ''}${r.turns ? ` · ${esc(T.followUp(Math.ceil(r.turns / 2)))}` : ''}
          ${r.odd ? ` <span class="err">${T.oddTag}</span>` : ''}${r.ok ? '' : ` <span class="err">${T.failed}</span>`}</div>
        <p class="q"><b>${T.question}:</b> ${esc(r.question).replace(/\n/g, '<br>')}</p>
        ${r.answer ? `<details><summary>${T.answer} <span class="muted">(${esc(r.model)}, ${(r.ms / 1000).toLocaleString(LOCALE[lang], { maximumFractionDigits: 1 })} s)</span></summary><p>${esc(r.answer).replace(/\n/g, '<br>')}</p></details>`
          : `<p class="muted"><small>${T.noAnswer}</small></p>`}</article>`).join('')}</div>` : `<p class="muted">${T.noData}</p>`}
      <p class="muted"><small>${T.chatsNote}</small></p></section>`);
  }

  if (part === 'subscribers' && request.method === 'DELETE') {
    const ok = await removeSubscriber(env, params.get('email') || '').catch((err) => { console.error('remove subscriber', err); return false; });
    return new Response(null, { status: ok ? 204 : 404 });
  }
  if (part === 'subscribers') {
    const list = await subscriberList(env).catch((err) => { console.error('subscribers', err); return null; });
    if (!list) return done(`<section><p class="muted">${T.noDb}</p></section>`);
    const day = (ts) => (ts ? new Date(ts).toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Amsterdam' }) : '');
    const rows = list.map((r) => ({ ...r, statusName: T.statusNames[r.status] || r.status, langName: T.langNames[r.lang] || r.lang, createdDay: day(r.created), confirmedDay: day(r.confirmed) }));
    const head = [T.name, T.email, T.language, T.status, T.subscribed, T.confirmed, T.lastSent, T.country, T.city, 'IP'];
    const data = rows.map((r) => [r.name || '', r.email, r.langName, r.statusName, r.createdDay, r.confirmedDay, r.last_report || '', r.country || '', r.city || '', r.ip || '']);
    const n = (st) => list.filter((r) => r.status === st).length;
    return done(`<section><h2>${T.subs}</h2>
      <div class="tiles">${tile(T.statusNames.active, nf.format(n('active')))}${tile(T.statusNames.pending, nf.format(n('pending')))}</div>
      <p><button type="button" class="btn" id="subs-export"${list.length ? '' : ' disabled'}>${T.export}</button></p>
      ${table(rows, [
        { label: T.name, key: 'name' }, { label: T.email, html: (r) => `<a href="mailto:${esc(r.email)}">${esc(r.email)}</a>` },
        { label: T.language, key: 'langName' }, { label: T.status, key: 'statusName' }, { label: T.subscribed, key: 'createdDay' },
        { label: T.confirmed, key: 'confirmedDay' }, { label: T.lastSent, key: 'last_report' },
        { label: T.country, key: 'country' }, { label: T.city, key: 'city' }, { label: 'IP', key: 'ip' },
        { label: '', html: (r) => `<button type="button" class="subs-remove" data-email="${esc(r.email)}" data-confirm="${esc(T.removeQ(r.name || r.email, r.email))}" title="${esc(T.remove)}" aria-label="${esc(T.remove)}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg></button>` }], T)}
      <script type="application/json" id="subs-data">${JSON.stringify({ sheet: T.subs, rows: [head, ...data] }).replace(/</g, '\\u003c')}</script>
      <p class="muted"><small>${T.subsNote}</small></p></section>`);
  }

  let site = `<p class="muted">${T.noDb}</p>`, bot = site;
  if (d) {
    await d.prepare('DELETE FROM hits WHERE ts < ?').bind(Date.now() - KEEP_DAYS * 864e5).run();
    const q = (sql) => d.prepare(sql).bind(from);
    const [tot, daily, langs, langDaily, blangs, pages, refs, countries, countryDaily, devices, ctot, cdaily, cmodels, csources, recent] = (await d.batch([
      q('SELECT COUNT(*) views, (SELECT SUM(n) FROM (SELECT COUNT(DISTINCT visitor) n FROM hits WHERE day >= ?1 GROUP BY day)) visitors FROM hits WHERE day >= ?1'),
      q('SELECT day, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY day'),
      q(`SELECT ${SITE_LANG} lang, COUNT(*) views, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY views DESC`),
      q(`SELECT day, ${SITE_LANGS.map((l) => `SUM(${SITE_LANG} = '${l}') ${l}`).join(', ')} FROM hits WHERE day >= ? GROUP BY day`),
      q("SELECT COALESCE(blang, '') blang, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY visitors DESC LIMIT 15"),
      q('SELECT path, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY path ORDER BY views DESC LIMIT 25'),
      q("SELECT ref, COUNT(*) views FROM hits WHERE day >= ? GROUP BY 1 ORDER BY views DESC LIMIT 15"),
      q("SELECT CASE country WHEN '' THEN '?' ELSE country END country, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY 1 ORDER BY visitors DESC LIMIT 15"),
      q("SELECT day, CASE country WHEN '' THEN '?' ELSE country END country, COUNT(*) views, COUNT(DISTINCT visitor) visitors FROM hits WHERE day >= ? GROUP BY 1, 2"),
      q('SELECT device, COUNT(DISTINCT day || visitor) visitors FROM hits WHERE day >= ? GROUP BY device ORDER BY visitors DESC'),
      q('SELECT COUNT(*) questions, SUM(1 - ok) errors, ROUND(AVG(ms) / 1000.0, 1) secs FROM chats WHERE day >= ?'),
      q('SELECT day, COUNT(*) questions FROM chats WHERE day >= ? GROUP BY day'),
      q('SELECT model, COUNT(*) n FROM chats WHERE day >= ? GROUP BY model ORDER BY n DESC'),
      q("SELECT sources FROM chats WHERE day >= ? AND sources != ''"),
      q('SELECT ts, question, sources, ms, ok, country FROM chats WHERE day >= ? ORDER BY ts DESC LIMIT 100'),
    ])).map((r) => r.results);

    // Visitors per country per day: the 5 countries with the most visitors in the period get their own colour, the rest is "other".
    const regionName = new Intl.DisplayNames([LOCALE[lang]], { type: 'region' });
    const cname = (code) => { try { return code === '?' ? T.unknown : regionName.of(code); } catch { return code; } };
    const perCountry = new Map();
    for (const r of countryDaily) perCountry.set(r.country, (perCountry.get(r.country) || 0) + r.visitors);
    const topC = [...perCountry].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([c]) => c);
    const cKeys = [...topC, 'other'];
    const cLabels = [...topC.map(cname), T.other];
    const byDay = new Map();
    for (const r of countryDaily) {
      const d = byDay.get(r.day) || byDay.set(r.day, { day: r.day, list: [] }).get(r.day);
      const k = topC.includes(r.country) ? r.country : 'other';
      d[k] = (d[k] || 0) + r.visitors;
      d.list.push(r);
    }
    const cdRows = [...byDay.values()].sort((a, b) => b.day.localeCompare(a.day)).map((d) => ({
      ...d, views: d.list.reduce((n, r) => n + r.views, 0), visitors: d.list.reduce((n, r) => n + r.visitors, 0),
      countries: d.list.sort((a, b) => b.visitors - a.visitors || b.views - a.views)
        .map((r) => `<span class="nw" title="${esc(cname(r.country))}">${esc(r.country)} ${nf.format(r.visitors)} <span class="muted">(${nf.format(r.views)})</span></span>`).join(' · '),
    }));

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
      <h3>${T.devices}</h3>${table(devices, [{ label: T.device, html: (r) => esc(T.deviceNames[r.device] || r.device) }, { label: T.visitorsH, key: 'visitors', num: true }], T)}</div></div>
      <h3>${T.countryDay}${days > 1 && topC.length ? ` <small>${cLabels.map((l, i) => `<i class="k b${i}"></i>${esc(l)}`).join(' ')}</small>` : ''}</h3>
      ${days > 1 && topC.length ? bars([...byDay.values()], days, cKeys, cLabels, true) : ''}
      ${cdRows.length ? `<table class="cd"><tr><th>${T.day}</th><th class="n">${T.viewsH}</th><th class="n">${T.visitorsH}</th></tr>${cdRows.map((r) =>
        `<tr><td class="nw">${new Date(r.day).toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'short', weekday: 'short', timeZone: 'UTC' })}</td>
        <td class="n">${nf.format(r.views)}</td><td class="n">${nf.format(r.visitors)}</td></tr><tr class="c"><td colspan="3">${r.countries}</td></tr>`).join('')}</table>
        <p class="muted"><small>${T.country}: ${T.cdNote}</small></p>` : `<p class="muted">${T.noData}</p>`}`;

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

  const tabs = [1, 7, 30, 90, 365].map((n) => `<a href="?days=${n}"${n === days ? ' class="on"' : ''}>${n === 1 ? T.today : T.days(n)}</a>`).join('');
  const html = `<div class="ranges">${tabs}</div>
<section><h2>1. ${T.site}</h2>${site}</section>
<section><h2>2. ${T.bot}</h2>${bot}</section>
<p class="muted">${T.note}</p>`;
  return done(html);
}
