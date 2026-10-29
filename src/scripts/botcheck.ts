// Bot check for forms: Cloudflare Turnstile (when set up on the Worker, see worker/turnstile.js)
// plus the time since the form was shown. Turnstile adds its token to the form as "cf-turnstile-response".
declare const turnstile: { render: (el: HTMLElement, opts: object) => string; reset: (id?: string) => void };

// The check stays hidden unless Cloudflare suspects a bot. compact: the small widget (150 px wide) on its own line under the
// form, for narrow forms such as the Atlas subscribe box.
export function protect(form: HTMLFormElement, { compact = false } = {}) {
  const shown = Date.now();
  let widget: string | undefined;
  fetch('/api/turnstile').then((r) => r.json()).then(({ siteKey }) => {
    if (!siteKey) return;
    const box = document.createElement('div');
    box.className = 'botcheck';
    // Next to the submit button, on the right.
    const btn = form.querySelector('button[type="submit"]');
    if (btn && !compact) {
      const row = document.createElement('div');
      row.className = 'form-actions';
      btn.before(row);
      row.append(btn, box);
    } else form.append(box);
    const render = () => { widget = turnstile.render(box, { sitekey: siteKey, appearance: 'interaction-only', size: compact ? 'compact' : 'normal' }); };
    if (typeof turnstile !== 'undefined') return render();
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = render;
    document.head.append(s);
  }).catch(() => {});
  return {
    // Extra fields to send with the form.
    extra: () => ({ t: Date.now() - shown }),
    // A Turnstile token can be used once: get a fresh one after each submit.
    reset: () => { if (widget !== undefined) turnstile.reset(widget); },
  };
}
