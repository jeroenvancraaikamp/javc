// Bot check for forms: Cloudflare Turnstile (when set up on the Worker, see worker/turnstile.js)
// plus the time since the form was shown. Turnstile adds its token to the form as "cf-turnstile-response".
declare const turnstile: { render: (el: HTMLElement, opts: object) => string; reset: (id?: string) => void; execute: (id: string) => void };

// The check stays hidden unless Cloudflare suspects a bot. compact: for narrow forms such as the Atlas subscribe box, the
// check only runs when the form is sent (call ready() first) and, if it needs a click, shows the small widget (150 px)
// under the form.
export function protect(form: HTMLFormElement, { compact = false } = {}) {
  const shown = Date.now();
  let widget: string | undefined;
  let done: (() => void) | undefined; // compact: resolves ready() once Turnstile has a token (or gave up)
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
    const render = () => {
      widget = turnstile.render(box, {
        sitekey: siteKey, appearance: 'interaction-only', theme: 'light', size: compact ? 'compact' : 'normal',
        ...(compact ? { execution: 'execute', callback: () => { done?.(); done = undefined; }, 'error-callback': () => { done?.(); done = undefined; } } : {}),
      });
    };
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
    // compact: run the check now and wait for its token (at most 60 s, e.g. while the visitor ticks the box).
    ready: () => new Promise<void>((resolve) => {
      if (!compact || widget === undefined) return resolve();
      const timer = setTimeout(() => { done = undefined; resolve(); }, 60000);
      done = () => { clearTimeout(timer); resolve(); };
      turnstile.execute(widget);
    }),
    // A Turnstile token can be used once: get a fresh one after each submit.
    reset: () => { if (widget !== undefined) turnstile.reset(widget); },
  };
}
