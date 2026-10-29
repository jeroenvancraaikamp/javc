// Cloudflare Worker: serves the static site (dist/) and the chatbot endpoint /api/chat.
// The chatbot looks up the most relevant passages from the articles, pages and documents
// (worker/knowledge.json, built by scripts/build-knowledge.mjs) and lets a language model
// answer from those passages.
//
// Model: Claude when the secret ANTHROPIC_API_KEY is set on the Worker, otherwise
// Cloudflare Workers AI (free up to a daily limit, no key needed).
import Anthropic from '@anthropic-ai/sdk';
import KNOWLEDGE from './knowledge.json';
import WP_IDS from './wp-ids.json';
import { logHit, logChat, statsData } from './stats.js';
import { turnstileConfig, humanCheck, tooFast } from './turnstile.js';
import { subscribe, confirm, unsubscribe, sendUpdates } from './atlas-subscribers.js';

const CLAUDE_MODEL = 'claude-opus-5-5';
const WORKERS_AI_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const TOP_K = 8;
const MAX_HISTORY = 10;
const MAX_MESSAGE = 2000;
const MAX_ANSWER_TOKENS = 1200;

// --- search (BM25 over the chunks) ---------------------------------------
const STOP = new Set(('a an and are as at be by can de den der die do does een en for from had has have het hoe how i ' +
  'ik in is it its je jij kan me met mijn my naar niet of om on op or over that the their there this to van voor ' +
  'wat was we what when where which who why will with would you your zijn').split(' '));

function tokens(text) {
  return (text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').match(/[a-z0-9]+/g) || [])
    .filter((t) => t.length > 1 && !STOP.has(t));
}

const docs = KNOWLEDGE.map((c) => {
  const tf = new Map();
  const toks = tokens(`${c.title} ${c.title} ${c.text}`);
  for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1);
  return { tf, len: toks.length };
});
const avgLen = docs.reduce((s, d) => s + d.len, 0) / docs.length;
const df = new Map();
for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) || 0) + 1);

function search(query, k = TOP_K) {
  const q = [...new Set(tokens(query))];
  const N = docs.length;
  const scored = [];
  docs.forEach((d, i) => {
    let s = 0;
    for (const t of q) {
      const f = d.tf.get(t);
      if (!f) continue;
      const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
      s += idf * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * d.len / avgLen));
    }
    if (s > 0) scored.push([s, i]);
  });
  scored.sort((a, b) => b[0] - a[0]);
  // At most 4 passages per source, so one long document doesn't crowd out the rest.
  const perSource = new Map();
  const out = [];
  for (const [, i] of scored) {
    const c = KNOWLEDGE[i];
    const n = perSource.get(c.title) || 0;
    if (n >= 4) continue;
    perSource.set(c.title, n + 1);
    out.push(c);
    if (out.length === k) break;
  }
  return out;
}

// --- prompt ---------------------------------------------------------------
const SYSTEM = `You are the assistant on javc.nl, the website of Jeroen van Craaikamp (JAVC Management & Consultancy), a freelance ServiceNow implementation manager and consultant in Amstelveen, the Netherlands. Visitors ask about Jeroen, his experience and services, and the topics he writes about (ServiceNow, CMDB, CSDM, IT4IT, ITIL, TBM, ESM).

How to answer:
- Answer in the language named with each question (the language of the page the visitor is on: the site is in English, with Dutch, Simplified Chinese, French and German versions under /nl/, /cn/, /fr/ and /de/).
- Base your answer on the passages provided with each question. If they don't cover the question, say you don't know based on the site, and don't make things up. General background knowledge is fine for explaining a concept, but never invent facts about Jeroen.
- Keep answers short and conversational (a few sentences or a short list). Your answer may be read aloud, so avoid tables.
- When an answer comes from an article or page, mention its title and link it in Markdown with the path given, e.g. [Title](/path/).
- Refer to Jeroen in the third person. For hiring, quotes or contact, point to the contact page [Contact me](/contact-me/) or Info@JAVC.nl.`;

// The other languages live under /nl/, /cn/, /fr/ and /de/: point links to site pages there for those visitors.
const LANG_NAME = { en: 'English', nl: 'Dutch', cn: 'Simplified Chinese', fr: 'French', de: 'German' };
const LANGS = Object.keys(LANG_NAME);
function localPath(path, lang) {
  if (lang === 'en' || !path?.startsWith('/') || /^\/(nl|cn|fr|de)\//.test(path) || /^\/(wp-content|images|media|files|api)\//.test(path)) return path;
  return `/${lang}${path}`;
}
const SORRY = {
  refused: { en: "Sorry, I can't help with that question.", nl: 'Sorry, met die vraag kan ik je niet helpen.', cn: '抱歉，这个问题我无法回答。', fr: 'Désolé, je ne peux pas vous aider avec cette question.', de: 'Entschuldigung, bei dieser Frage kann ich nicht helfen.' },
  none: { en: 'Sorry, I have no answer to that.', nl: 'Sorry, daar heb ik geen antwoord op.', cn: '抱歉，我没有这个问题的答案。', fr: "Désolé, je n'ai pas de réponse à cela.", de: 'Entschuldigung, darauf habe ich keine Antwort.' },
};
const localLinks = (text, lang) => text.replace(/\]\((\/[^)\s]*)\)/g, (_, p) => `](${localPath(p, lang)})`);

function context(chunks) {
  return chunks.map((c, i) =>
    `<passage index="${i + 1}" source="${c.title}"${c.url ? ` path="${c.url}"` : ''}${c.date ? ` date="${c.date}"` : ''}>\n${c.text}\n</passage>`
  ).join('\n\n');
}

// --- models -----------------------------------------------------------------
async function askClaude(env, history, question, passages, lang) {
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const res = await client.beta.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: MAX_ANSWER_TOKENS,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [
      ...history,
      { role: 'user', content: `<passages>\n${passages}\n</passages>\n\nAnswer in ${LANG_NAME[lang]}.\n\nVisitor's question: ${question}` },
    ],
  });
  if (res.stop_reason === 'refusal') return SORRY.refused[lang];
  return res.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
}

async function askWorkersAI(env, history, question, passages, lang) {
  const res = await env.AI.run(WORKERS_AI_MODEL, {
    max_tokens: 800,
    messages: [
      { role: 'system', content: SYSTEM },
      ...history,
      { role: 'user', content: `Passages from the website:\n\n${passages}\n\nAnswer in ${LANG_NAME[lang]}.\n\nVisitor's question: ${question}` },
    ],
  });
  return (res.response || '').trim();
}

// The search only knows English and Dutch words, so a Chinese question is first turned into English search words.
async function searchWords(env, text) {
  if (!/[\u3400-\u9fff]/.test(text)) return text;
  const ask = `Translate this website visitor's question into English search keywords (names, topics, key nouns). Reply with the keywords only.\n\n${text}`;
  try {
    if (env.ANTHROPIC_API_KEY) {
      const res = await new Anthropic({ apiKey: env.ANTHROPIC_API_KEY }).beta.messages.create({
        model: CLAUDE_MODEL, max_tokens: 100, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default',
        output_config: { effort: 'low' }, messages: [{ role: 'user', content: ask }],
      });
      return `${text} ${res.content.filter((b) => b.type === 'text').map((b) => b.text).join(' ')}`;
    }
    const res = await env.AI.run(WORKERS_AI_MODEL, { max_tokens: 60, messages: [{ role: 'user', content: ask }] });
    return `${text} ${res.response || ''}`;
  } catch (err) {
    console.error('search words', err);
    return text;
  }
}

// --- handler ----------------------------------------------------------------
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

// Only accept POSTs sent from the site itself (browsers always send an Origin header on a POST),
// and apply a per-visitor rate limit when the rate-limit binding is configured (see wrangler.jsonc).
async function guard(request, env, limiter) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const origin = request.headers.get('origin');
  let ok = false;
  try { ok = !!origin && new URL(origin).host === new URL(request.url).host; } catch { /* invalid origin */ }
  if (!ok) return json({ error: 'Forbidden' }, 403);
  if (limiter) {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const { success } = await limiter.limit({ key: ip });
    if (!success) return json({ error: 'Too many requests. Please wait a minute and try again.' }, 429);
  }
  return null;
}

async function chat(request, env, ctx) {
  const denied = await guard(request, env, env.CHAT_LIMITER);
  if (denied) return denied;

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  const lang = LANGS.includes(body?.lang) ? body.lang : 'en';
  const msgs = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE) }))
    .slice(-MAX_HISTORY);
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  const last = msgs.pop();
  if (!last || last.role !== 'user') return json({ error: 'No question' }, 400);

  // Search with the question plus the previous question, so follow-ups ("and what about X?") still find context.
  const prevUser = [...msgs].reverse().find((m) => m.role === 'user');
  const found = search(await searchWords(env, `${last.content} ${prevUser ? prevUser.content : ''}`));
  const passages = context(found);
  const started = Date.now();
  const model = env.ANTHROPIC_API_KEY ? 'claude' : 'workers-ai';
  const log = (ok, sources = []) => ctx.waitUntil(logChat(env, request, { question: last.content, model, sources, ms: Date.now() - started, ok })
    .catch((err) => console.error('stats log', err)));

  try {
    const answer = env.ANTHROPIC_API_KEY
      ? await askClaude(env, msgs, last.content, passages, lang)
      : await askWorkersAI(env, msgs, last.content, passages, lang);
    const seen = new Set();
    const sources = found
      .filter((c) => c.url && !seen.has(c.url) && seen.add(c.url))
      .slice(0, 3)
      .map((c) => ({ title: c.title, url: localPath(c.url, lang) }));
    log(!!answer, sources.map((s) => s.url));
    return json({ answer: answer ? localLinks(answer, lang) : SORRY.none[lang], sources });
  } catch (err) {
    console.error('chat error', err);
    log(false);
    return json({ error: 'The assistant is not available right now. Please try again later.' }, 503);
  }
}

// --- contact form: sends the message by email through SMTP2GO ------------------
// Needs the Worker secret SMTP2GO_API_KEY. CONTACT_TO / CONTACT_FROM are set in wrangler.jsonc;
// the sender address must be a verified sender (or domain) in SMTP2GO.
async function contact(request, env) {
  const denied = await guard(request, env, env.CONTACT_LIMITER);
  if (denied) return denied;
  let f;
  try { f = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  // Error messages in the language of the form (the Dutch contact page sends lang: 'nl', the Chinese one 'cn', and so on).
  const say = (en, nl, cn, fr, de) => ({ en, nl, cn, fr, de })[f?.lang] ?? en;
  const field = (k, max) => (typeof f?.[k] === 'string' ? f[k].trim().slice(0, max) : '');
  const name = field('name', 200), email = field('email', 200), phone = field('phone', 50), message = field('message', 5000);

  // Honeypot: a hidden field people never fill in; bots do (password managers are told to skip it). Pretend it worked. Same for impossibly fast submits.
  if (field('hp_note', 200) || tooFast(f)) return json({ ok: true });
  if (!(await humanCheck(f, request, env))) return json({ error: say('The spam check failed. Please reload the page and try again.', 'De spamcontrole is mislukt. Laad de pagina opnieuw en probeer het nog eens.', '垃圾信息检查未通过。请刷新页面后重试。', 'La vérification anti-spam a échoué. Rechargez la page et réessayez.', 'Die Spamprüfung ist fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.') }, 403);
  if (!name || !message || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return json({ error: say('Please fill in your name, a valid email address and a message.', 'Vul je naam, een geldig e-mailadres en een bericht in.', '请填写您的姓名、有效的电子邮件地址和留言。', 'Veuillez indiquer votre nom, une adresse e-mail valide et un message.', 'Bitte geben Sie Ihren Namen, eine gültige E-Mail-Adresse und eine Nachricht ein.') }, 400);
  }
  if (!env.SMTP2GO_API_KEY) return json({ error: say('The form is not available right now. Please email Info@JAVC.nl.', 'Het formulier werkt op dit moment niet. Mail naar Info@JAVC.nl.', '表单暂时无法使用。请发送电子邮件至 Info@JAVC.nl。', "Le formulaire n'est pas disponible pour le moment. Écrivez à Info@JAVC.nl.", 'Das Formular ist gerade nicht verfügbar. Bitte schreiben Sie an Info@JAVC.nl.') }, 503);

  const res = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'X-Smtp2go-Api-Key': env.SMTP2GO_API_KEY },
    body: JSON.stringify({
      sender: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      subject: `Contactformulier javc.nl: ${name.replace(/[\r\n]+/g, ' ')}`,
      text_body: `Naam: ${name}\nE-mail: ${email}\nTelefoon: ${phone || '-'}\n\n${message}\n\n(Verstuurd via het contactformulier op ${new URL(request.url).host})`,
      custom_headers: [{ header: 'Reply-To', value: email.replace(/[\r\n]/g, '') }],
    }),
  }).catch((err) => { console.error('smtp2go fetch', err); return null; });
  const data = res ? await res.json().catch(() => ({})) : {};
  if (!res?.ok || !data?.data?.succeeded) {
    console.error('smtp2go error', res?.status, JSON.stringify(data));
    return json({ error: say('Sending failed. Please try again later or email Info@JAVC.nl.', 'Versturen is mislukt. Probeer het later opnieuw of mail naar Info@JAVC.nl.', '发送失败。请稍后再试，或发送电子邮件至 Info@JAVC.nl。', "L'envoi a échoué. Réessayez plus tard ou écrivez à Info@JAVC.nl.", 'Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder schreiben Sie an Info@JAVC.nl.') }, 502);
  }
  return json({ ok: true });
}

// --- redirects: www → javc.nl, and old WordPress addresses → their new place ------
const WP_ADMIN = 'https://javcmanagement.nl/wp-admin/';
const CATEGORY_RENAMES = { csdm: 'csdm-cmdb-tbm', 'tbm-csdm-cmdb': 'csdm-cmdb-tbm' };

function redirectFor(url) {
  if (url.hostname === 'www.javc.nl') return `https://javc.nl${url.pathname}${url.search}`;
  const p = url.pathname;
  // ?p=123 and ?page_id=123 (old WordPress short links)
  const id = url.searchParams.get('p') || url.searchParams.get('page_id');
  if (p === '/' && id && WP_IDS[id]) return WP_IDS[id];
  if (/^\/(wp-admin|wp-login\.php)/.test(p)) return WP_ADMIN;
  if (/^\/(feed|comments\/feed)\/?$/.test(p)) return '/articles/';
  let m;
  if ((m = p.match(/^\/category\/([^/]+)\/(?:page\/(\d+)\/)?$/))) {
    const cat = CATEGORY_RENAMES[m[1]];
    if (cat || m[2]) return `/category/${cat || m[1]}/${m[2] && m[2] !== '1' ? m[2] + '/' : ''}`;
  }
  if ((m = p.match(/^\/articles\/page\/(\d+)\/?$/))) return m[1] === '1' ? '/articles/' : `/articles/${m[1]}/`;
  if ((m = p.match(/^\/(20\d\d)\/(\d\d)\/?$/))) return `/archive/${m[1]}/${m[2]}/`;
  if (/^\/(tag|author|portfolio-items|portfolio_category|slide)\//.test(p)) return '/articles/';
  if (/^\/[^/]+\/feed\/?$/.test(p)) return p.replace(/feed\/?$/, '');
  return null;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const to = redirectFor(url);
    if (to) return Response.redirect(new URL(to, url).toString(), 301);
    if (url.pathname === '/api/chat') return chat(request, env, ctx);
    if (url.pathname === '/api/hit') return logHit(request, env).catch((err) => { console.error('hit', err); return new Response(null, { status: 204 }); });
    if (url.pathname === '/api/stats') return statsData(request, env);
    if (url.pathname === '/api/turnstile') return turnstileConfig(env);
    if (url.pathname === '/api/contact') return contact(request, env);
    if (url.pathname === '/api/atlas/subscribe') return (await guard(request, env, env.CONTACT_LIMITER)) ?? subscribe(request, env);
    if (url.pathname === '/api/atlas/confirm') return confirm(request, env, ctx);
    if (url.pathname === '/api/atlas/unsubscribe') return unsubscribe(request, env, ctx);
    return env.ASSETS.fetch(request);
  },
  // Cron trigger (wrangler.jsonc): e-mail the daily IT4IT Atlas report to its subscribers.
  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendUpdates(env).catch((err) => console.error('atlas updates', err)));
  },
};
