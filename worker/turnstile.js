// Bot check for the contact and comment forms with Cloudflare Turnstile (free, usually invisible).
// It switches on as soon as the Worker has TURNSTILE_SITE_KEY (variable) and TURNSTILE_SECRET (secret);
// without them the forms keep working with only the honeypot, timing check and rate limit.

// GET /api/turnstile: the public site key for the forms (null when Turnstile is not set up).
export function turnstileConfig(env) {
  return new Response(JSON.stringify({ siteKey: (env.TURNSTILE_SECRET && env.TURNSTILE_SITE_KEY) || null }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'max-age=300' },
  });
}

// True when the form passed the check (or Turnstile is not set up).
export async function humanCheck(form, request, env) {
  if (!env.TURNSTILE_SECRET || !env.TURNSTILE_SITE_KEY) return true;
  const token = typeof form?.['cf-turnstile-response'] === 'string' ? form['cf-turnstile-response'] : '';
  if (!token) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET);
  body.append('response', token);
  body.append('remoteip', request.headers.get('cf-connecting-ip') || '');
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body }).catch(() => null);
  const data = res ? await res.json().catch(() => ({})) : {};
  return data.success === true;
}

// Submitted within 3 seconds of opening the form: almost certainly a bot (the forms send "t", ms since load).
export const tooFast = (form) => typeof form?.t === 'number' && form.t < 3000;
