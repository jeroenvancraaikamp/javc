// "Publishing…" indicator in the top bar, only for the signed-in CMS user.
// After a save in the CMS, GitHub builds and deploys the site (Workers Builds, about 1.5 minutes).
// This shows that progress and reloads the page as soon as the new version is live.
const REPO = 'jeroenvancraaikamp/javc';
const badge = document.querySelector<HTMLElement>('.publish-status');
const inEditor = location.pathname.startsWith('/cms');
let wasPublishing = false;
let timer: ReturnType<typeof setTimeout> | undefined;

const token = () => {
  try { return JSON.parse(localStorage.getItem('sveltia-cms.user') || '{}').token || ''; } catch { return ''; }
};

function show(text: string, state: 'busy' | 'done' | 'error' | '') {
  if (!badge) return;
  badge.textContent = text;
  badge.dataset.state = state;
  badge.hidden = !text;
}

function later(ms: number) {
  clearTimeout(timer);
  timer = setTimeout(check, ms);
}

async function check() {
  const t = token();
  if (!t || !badge) { show('', ''); return later(60_000); }
  if (document.hidden) return later(15_000);
  const headers = { authorization: `Bearer ${t}`, accept: 'application/vnd.github+json' };
  const get = (path: string) => fetch(`https://api.github.com/repos/${REPO}/${path}`, { headers, cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null)).catch(() => null);
  const commit = await get('commits/main');
  if (!commit) return later(60_000);
  const run = (await get(`commits/${commit.sha}/check-runs`))?.check_runs?.[0];
  const age = Date.now() - Date.parse(commit.commit.committer.date);
  // No build reported yet for a fresh commit: it is about to start.
  const publishing = run ? run.status !== 'completed' : age < 5 * 60_000;
  const failed = run && run.status === 'completed' && !['success', 'cancelled', 'skipped'].includes(run.conclusion) && age < 30 * 60_000;

  if (publishing) {
    wasPublishing = true;
    show('Publishing…', 'busy');
    return later(8_000);
  }
  if (failed) {
    show('Publish failed', 'error');
    return later(60_000);
  }
  if (wasPublishing) {
    wasPublishing = false;
    if (inEditor) {
      show('Live ✓', 'done');
      setTimeout(() => show('', ''), 15_000);
    } else {
      show('Live ✓ reloading…', 'done');
      setTimeout(() => location.reload(), 2_000);
      return;
    }
  } else {
    show('', '');
  }
  later(inEditor ? 15_000 : 60_000);
}

check();
addEventListener('visibilitychange', () => { if (!document.hidden) later(500); });
addEventListener('storage', (e) => { if (e.key === 'sveltia-cms.user') later(500); });
