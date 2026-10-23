// Comments on articles, stored in the D1 database (table "comments", created in stats.js).
// New comments are "pending" until Jeroen approves them on /comments (signed in to the CMS);
// he gets an email for each new comment (via SMTP2GO, like the contact form).
//
//   GET  /api/comments?slug=x      approved comments of one article
//   GET  /api/comments?latest=1    the latest approved comments (sidebar)
//   POST /api/comments             {slug, name, email, body, website} → pending
//   GET  /api/comments?all=1       all comments, for moderation (CMS login)
//   POST /api/comments/moderate    {id, action: approve | hide | delete} (CMS login)
import { db, cmsUser } from './stats.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export async function comments(request, env, guard, { humanCheck, tooFast }) {
  const url = new URL(request.url);
  const d = await db(env).catch((err) => { console.error('comments db', err); return null; });
  if (!d) return json({ error: 'Comments are not available right now.' }, 503);

  if (url.pathname === '/api/comments/moderate') {
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
    if (!(await cmsUser(request))) return json({ error: 'Not signed in' }, 401);
    const { id, action } = await request.json().catch(() => ({}));
    if (action === 'delete') await d.prepare('DELETE FROM comments WHERE id = ?').bind(id).run();
    else if (action === 'approve' || action === 'hide') {
      await d.prepare('UPDATE comments SET status = ? WHERE id = ?').bind(action === 'approve' ? 'approved' : 'pending', id).run();
    } else return json({ error: 'Unknown action' }, 400);
    return json({ ok: true });
  }

  if (request.method === 'GET') {
    if (url.searchParams.get('all')) {
      if (!(await cmsUser(request))) return json({ error: 'Not signed in' }, 401);
      const { results } = await d.prepare('SELECT id, ts, slug, name, email, body, status FROM comments ORDER BY ts DESC LIMIT 300').all();
      return json({ comments: results });
    }
    if (url.searchParams.get('latest')) {
      const { results } = await d.prepare("SELECT ts, slug, name, substr(body, 1, 120) body FROM comments WHERE status = 'approved' ORDER BY ts DESC LIMIT 5").all();
      return json({ comments: results });
    }
    const slug = url.searchParams.get('slug') || '';
    const { results } = await d.prepare("SELECT ts, name, body FROM comments WHERE slug = ? AND status = 'approved' ORDER BY ts").bind(slug).all();
    return json({ comments: results });
  }

  const denied = await guard(request, env, env.CONTACT_LIMITER);
  if (denied) return denied;
  const f = await request.json().catch(() => null);
  const field = (k, max) => (typeof f?.[k] === 'string' ? f[k].trim().slice(0, max) : '');
  const slug = field('slug', 200), name = field('name', 100), email = field('email', 200), body = field('body', 3000);
  if (field('hp_note', 200) || tooFast(f)) return json({ ok: true }); // honeypot / too fast: bots, pretend it worked
  if (!(await humanCheck(f, request, env))) return json({ error: 'The spam check failed. Please reload the page and try again.' }, 403);
  if ((body.match(/https?:\/\/|www\./gi) || []).length > 2) return json({ error: 'Please include at most two links in your comment.' }, 400);
  if (!/^[a-z0-9-]+$/.test(slug) || !name || !body || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return json({ error: 'Please fill in your name, a valid email address and a comment.' }, 400);
  }
  await d.prepare('INSERT INTO comments (ts, slug, name, email, body) VALUES (?, ?, ?, ?, ?)').bind(Date.now(), slug, name, email, body).run();

  if (!env.SMTP2GO_API_KEY) console.error('comment mail: SMTP2GO_API_KEY missing');
  else {
    const site = url.origin;
    await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'X-Smtp2go-Api-Key': env.SMTP2GO_API_KEY },
      body: JSON.stringify({
        sender: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        subject: `New comment on javc.nl from ${name.replace(/[\r\n]+/g, ' ')}`,
        text_body: `${name} (${email}) commented on ${site}/${slug}/:\n\n${body}\n\nApprove or delete it at ${site}/comments/`,
      }),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.data?.succeeded) console.error('comment mail failed', res.status, JSON.stringify(data));
    }).catch((err) => console.error('comment mail', err));
  }
  return json({ ok: true });
}
