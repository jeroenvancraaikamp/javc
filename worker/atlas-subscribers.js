// Subscribers to the daily IT4IT Atlas update e-mail, kept in the D1 database (binding DB, table atlas_subscribers).
//
// POST /api/atlas/subscribe          the form on the Atlas pages: stores the address as pending and e-mails a confirmation link
// GET  /api/atlas/confirm?token=…    the link in that mail: the subscription becomes active (double opt-in)
// GET  /api/atlas/unsubscribe?token=… the link in every update: opens the changelog page, which asks to confirm with a button
// POST /api/atlas/unsubscribe?token=… that button, and the one-click unsubscribe of mail programs (List-Unsubscribe-Post)
//
// The cron trigger (wrangler.jsonc) runs sendUpdates() every 15 minutes during the day: once the GitHub Action has published
// today's report (public/atlas/report.json, written by scripts/build-atlas.mjs), it e-mails it to the active subscribers in
// batches. Mails go through SMTP2GO with the Worker secret SMTP2GO_API_KEY; Jeroen gets a short note of every (un)subscription.
import { atlasMail, confirmMail, noticeMail } from '../scripts/atlas-mail.mjs';
import { humanCheck, tooFast } from './turnstile.js';

const SITE = 'https://javc.nl';
const LANGS = ['en', 'nl', 'cn', 'fr', 'de'];
const BATCH = 25; // mails per cron run (the free Workers plan allows 50 outgoing requests per run)
const PENDING_DAYS = 7; // unconfirmed addresses are deleted after a week
const FROM = 'IT4IT Atlas (JAVC) <info@javc.nl>';

let schema;
function table(env) {
  if (!env.DB) return null;
  schema ??= env.DB.prepare('CREATE TABLE IF NOT EXISTS atlas_subscribers (email TEXT PRIMARY KEY, lang TEXT, token TEXT UNIQUE, status TEXT, created INTEGER, mailed INTEGER, confirmed INTEGER, last_report TEXT)').run()
    // Name and where the request came from (added later): add the columns to an existing table; fails harmlessly when they are there.
    .then(() => Promise.all(['name', 'country', 'city', 'ip'].map((c) => env.DB.prepare(`ALTER TABLE atlas_subscribers ADD COLUMN ${c} TEXT`).run().catch(() => {}))))
    .catch((err) => { schema = undefined; throw err; });
  return schema.then(() => env.DB);
}

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const changesPage = (lang, query) => `${SITE}${lang && lang !== 'en' ? `/${lang}` : ''}/it4it-atlas/changes/?${query}#subscribe`;
const newToken = () => (crypto.randomUUID() + crypto.randomUUID()).replace(/-/g, '');
const cleanToken = (t) => (typeof t === 'string' && /^[0-9a-f]{64}$/.test(t) ? t : '');

async function send(env, { to, subject, text, html, headers = [] }) {
  const res = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'X-Smtp2go-Api-Key': env.SMTP2GO_API_KEY },
    body: JSON.stringify({ sender: FROM, to: [to], subject, text_body: text, html_body: html, custom_headers: headers }),
  }).catch((err) => { console.error('smtp2go fetch', err); return null; });
  const data = res ? await res.json().catch(() => ({})) : {};
  if (!res?.ok || !data?.data?.succeeded) { console.error('smtp2go error', res?.status, JSON.stringify(data)); return false; }
  return true;
}

// A short note to Jeroen (CONTACT_TO) with the subscriber's details. Failures are only logged.
const LANG_NAME = { en: 'Engels', nl: 'Nederlands', cn: 'Chinees', fr: 'Frans', de: 'Duits' };
const notifyOwner = (env, subject, intro, s) => send(env, { to: env.CONTACT_TO, ...noticeMail(subject, intro, [
  ['Naam', s.name || '—'], ['E-mailadres', s.email], ['Taal van de site', `${LANG_NAME[s.lang] || s.lang} (${s.lang})`],
  ['Land (Cloudflare)', s.country || '—'], ['Plaats', s.city || '—'], ['IP-adres', s.ip || '—'],
]) });

// POST /api/atlas/subscribe {name, email, lang, t, hp_note, cf-turnstile-response}. The origin check and rate limit are done by the caller.
export async function subscribe(request, env, ctx) {
  let f;
  try { f = await request.json(); } catch { return json({ error: 'invalid' }, 400); }
  const lang = LANGS.includes(f?.lang) ? f.lang : 'en';
  const email = typeof f?.email === 'string' ? f.email.trim().toLowerCase().slice(0, 200) : '';
  const name = typeof f?.name === 'string' ? f.name.replace(/[\r\n<>]+/g, ' ').trim().slice(0, 100) : '';
  if ((typeof f?.hp_note === 'string' && f.hp_note) || tooFast(f)) return json({ ok: true });
  if (!(await humanCheck(f, request, env))) return json({ error: 'spam' }, 403);
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i.test(email)) return json({ error: 'invalid' }, 400);
  if (!name) return json({ error: 'name' }, 400);
  const db = await table(env)?.catch(() => null);
  if (!db || !env.SMTP2GO_API_KEY) return json({ error: 'unavailable' }, 503);

  const now = Date.now();
  await db.prepare("DELETE FROM atlas_subscribers WHERE status = 'pending' AND created < ?").bind(now - PENDING_DAYS * 864e5).run();
  const row = await db.prepare('SELECT status, token, mailed FROM atlas_subscribers WHERE email = ?').bind(email).first();
  if (row?.status === 'active') return json({ ok: true, already: true });
  // At most one confirmation mail per address per hour, so the form cannot be used to flood someone's mailbox.
  if (row && now - (row.mailed || 0) < 36e5) return json({ ok: true });
  const token = row?.token || newToken();
  const who = { email, name, lang, country: request.cf?.country || '', city: request.cf?.city || '', ip: request.headers.get('cf-connecting-ip') || '' };
  if (row) await db.prepare('UPDATE atlas_subscribers SET name = ?, lang = ?, mailed = ?, country = ?, city = ?, ip = ? WHERE email = ?').bind(name, lang, now, who.country, who.city, who.ip, email).run();
  else await db.prepare("INSERT INTO atlas_subscribers (email, name, lang, token, status, created, mailed, country, city, ip) VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?)").bind(email, name, lang, token, now, now, who.country, who.city, who.ip).run();
  const ok = await send(env, { to: email, ...confirmMail(lang, `${SITE}/api/atlas/confirm?token=${token}`, name) });
  if (!ok) return json({ error: 'failed' }, 502);
  ctx.waitUntil(notifyOwner(env, `IT4IT Atlas: aanmeldverzoek van ${name}`, `${name} heeft zich aangemeld voor de dagelijkse update van de IT4IT Atlas. De aanmelding is actief zodra de link in de bevestigingsmail is aangeklikt.`, who));
  return json({ ok: true });
}

// GET /api/atlas/confirm?token=…
export async function confirm(request, env, ctx) {
  const token = cleanToken(new URL(request.url).searchParams.get('token'));
  const db = await table(env)?.catch(() => null);
  const row = token && db ? await db.prepare('SELECT * FROM atlas_subscribers WHERE token = ?').bind(token).first() : null;
  if (!row) return Response.redirect(changesPage('en', 'subscription=invalid'), 303);
  if (row.status !== 'active') {
    await db.prepare("UPDATE atlas_subscribers SET status = 'active', confirmed = ? WHERE token = ?").bind(Date.now(), token).run();
    ctx.waitUntil(notifyOwner(env, `IT4IT Atlas: nieuwe abonnee ${row.name || row.email}`, `${row.name || row.email} heeft de aanmelding bevestigd en ontvangt nu de dagelijkse update van de IT4IT Atlas.`, row));
  }
  return Response.redirect(changesPage(row.lang, 'subscription=confirmed'), 303);
}

// GET /api/atlas/unsubscribe?token=… shows the confirmation button on the changelog page (mail scanners open links,
// so a GET never unsubscribes); POST unsubscribes straight away.
export async function unsubscribe(request, env, ctx) {
  const token = cleanToken(new URL(request.url).searchParams.get('token'));
  const db = await table(env)?.catch(() => null);
  const row = token && db ? await db.prepare('SELECT * FROM atlas_subscribers WHERE token = ?').bind(token).first() : null;
  if (request.method === 'GET') return Response.redirect(changesPage(row?.lang, row ? `unsubscribe=${token}` : 'subscription=gone'), 303);
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (row) {
    await db.prepare('DELETE FROM atlas_subscribers WHERE token = ?').bind(token).run();
    ctx.waitUntil(notifyOwner(env, `IT4IT Atlas: afgemeld ${row.name || row.email}`, `${row.name || row.email} heeft zich afgemeld voor de dagelijkse update van de IT4IT Atlas. De gegevens zijn verwijderd.`, row));
  }
  return json({ ok: true });
}

// Cron: e-mail today's report to the next batch of active subscribers that have not had it yet.
export async function sendUpdates(env) {
  const db = await table(env);
  if (!db || !env.SMTP2GO_API_KEY) return;
  await db.prepare("DELETE FROM atlas_subscribers WHERE status = 'pending' AND created < ?").bind(Date.now() - PENDING_DAYS * 864e5).run();
  const res = await env.ASSETS.fetch(new Request(`${SITE}/atlas/report.json`)).catch(() => null);
  const report = res?.ok ? await res.json().catch(() => null) : null;
  if (!report?.date || report.date !== new Date().toISOString().slice(0, 10)) return;
  const { results } = await db.prepare("SELECT email, name, lang, token FROM atlas_subscribers WHERE status = 'active' AND (last_report IS NULL OR last_report < ?) LIMIT ?").bind(report.date, BATCH).all();
  let sent = 0;
  for (const s of results) {
    const unsubscribeUrl = `${SITE}/api/atlas/unsubscribe?token=${s.token}`;
    const mail = atlasMail(report, { lang: s.lang === 'nl' ? 'nl' : 'en', unsubscribe: unsubscribeUrl, name: s.name });
    const ok = await send(env, { to: s.email, ...mail, headers: [
      { header: 'List-Unsubscribe', value: `<${unsubscribeUrl}>` },
      { header: 'List-Unsubscribe-Post', value: 'List-Unsubscribe=One-Click' },
    ] });
    // Also after a failure, so one bad address does not block the rest; it gets the next day's report again.
    await db.prepare('UPDATE atlas_subscribers SET last_report = ? WHERE email = ?').bind(report.date, s.email).run();
    if (ok) sent++;
  }
  if (results.length) console.log(`atlas update ${report.date}: e-mailed ${sent} of ${results.length} subscribers`);
}

// Removes a subscriber from the stats page (worker/stats.js); true when there was one.
export async function removeSubscriber(env, email) {
  const db = await table(env);
  if (!db) return false;
  const { meta } = await db.prepare('DELETE FROM atlas_subscribers WHERE email = ?').bind(String(email).trim().toLowerCase()).run();
  return meta.changes > 0;
}

// The subscribers for the stats page (worker/stats.js), newest first.
export async function subscriberList(env) {
  const db = await table(env);
  if (!db) return null;
  await db.prepare("DELETE FROM atlas_subscribers WHERE status = 'pending' AND created < ?").bind(Date.now() - PENDING_DAYS * 864e5).run();
  return (await db.prepare('SELECT name, email, lang, status, created, confirmed, last_report, country, city, ip FROM atlas_subscribers ORDER BY created DESC').all()).results;
}
