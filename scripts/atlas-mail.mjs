// The e-mail with the daily IT4IT Atlas report (scripts/maintain-atlas.mjs): plain text plus an HTML version in the
// layout of the Champagne360 notification mails, in the colours and with the logo of javc.nl.
// node scripts/atlas-mail.mjs [out.html] writes a preview of the latest report in atlas/activity.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const C = { accent: '#3f8577', soft: '#e8f2ef', ink: '#1f2a37', text: '#4a5560', muted: '#8a96a3', line: '#e4e8ec', bg: '#f4f7fa', dark: '#1d2731' };
const SITE = 'https://javc.nl';
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = (n) => Number(n || 0).toLocaleString('nl-NL');

export function atlasMail(report) {
  const day = new Date(report.date + 'T12:00:00Z').toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const subject = `IT4IT Atlas: ${report.updated.length} bijgewerkt, ${report.added.length} toegevoegd (${report.date})`;
  const overview = [
    ['Tools gecontroleerd', num(report.checked)],
    ['Ongewijzigd bevestigd', num(report.confirmed)],
    ['Bijgewerkt', num(report.updated.length)],
    ['Toegevoegd', num(report.added.length)],
    ['Niet meer leverbaar', num(report.discontinued.length)],
    ['Niet te verifiëren', num(report.unverified)],
    ['Gezocht in', (report.searched || []).join('; ') || '—'],
  ];
  if (report.errors) overview.push(['Problemen', `${num(report.errors)} (zie het log van de GitHub Action)`]);
  const name = (x) => `${x.name}${x.vendor ? ` (${x.vendor})` : ''}${x.was ? ` (was: ${x.was})` : ''}`;
  const rows = (list, sub) => list.map((x) => [name(x), (sub && x.sub ? `[${x.sub}] ` : '') + (x.change || '—')]);
  const sections = [
    [`Toegevoegd (${report.added.length})`, rows(report.added, true)],
    [`Bijgewerkt (${report.updated.length})`, rows(report.updated)],
    [`Niet meer leverbaar, verborgen (${report.discontinued.length})`, rows(report.discontinued)],
  ].filter(([, r]) => r.length);

  const pad = (r) => r.map(([k, v]) => `${(k + ':').padEnd(24)}${v}`);
  const text = [`Dagelijkse update van de IT4IT Atlas, ${day}`, '', ...pad(overview), '',
    ...sections.flatMap(([title, r]) => [title, ...r.map(([k, v]) => `- ${k}: ${v}`), '']),
    `De wijzigingen staan al live: ${SITE}/it4it-atlas/changes/`, '',
    'Met vriendelijke groet,', '', 'JAVC Management & Consultancy', SITE].join('\n') + '\n';

  const table = (title, r, keyWidth) => `
<tr><td style="padding:22px 32px 6px;font:600 12px/1.4 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${C.muted}">${esc(title)}</td></tr>
<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${C.line}">
${r.map(([k, v], i) => `<tr style="background:${i % 2 ? '#ffffff' : C.bg}"><td style="width:${keyWidth};padding:9px 12px;border-bottom:1px solid ${C.line};font:600 14px/1.4 Arial,sans-serif;color:${C.ink};vertical-align:top">${esc(k)}</td><td style="padding:9px 12px;border-bottom:1px solid ${C.line};font:14px/1.45 Arial,sans-serif;color:${C.text};word-break:break-word">${esc(v)}</td></tr>`).join('\n')}
</table></td></tr>`;
  const link = (href, label) => `<a href="${href}" style="color:${C.accent};font-weight:700">${label}</a>`;
  const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.bg}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:#ffffff;border-radius:6px;overflow:hidden;border:1px solid ${C.line}">
<tr><td style="background:#ffffff;padding:22px 32px 16px;border-bottom:3px solid ${C.accent}">
  <a href="${SITE}"><img src="${SITE}/wp-content/uploads/2022/12/JAVC-1.png" width="233" height="40" alt="JAVC Management &amp; Consultancy" style="display:block;border:0"></a>
  <div style="padding-top:10px;font:600 12px/1.4 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:${C.accent}">IT4IT Atlas · dagelijkse update</div>
</td></tr>
<tr><td style="padding:28px 32px 4px;font:16px/1.5 Arial,sans-serif;color:${C.ink}">De dagelijkse controle van de ${link(`${SITE}/it4it-atlas/`, 'IT4IT Atlas')} van <b>${esc(day)}</b> is verwerkt en staat al live.</td></tr>
<tr><td style="padding:14px 32px 0"><div style="background:${C.soft};border-left:4px solid ${C.accent};padding:12px 14px;font:15px/1.45 Arial,sans-serif;color:${C.ink}"><b>${num(report.checked)} tools gecontroleerd:</b> ${num(report.updated.length)} bijgewerkt, ${num(report.added.length)} toegevoegd, ${num(report.discontinued.length)} niet meer leverbaar.</div></td></tr>
${table('Overzicht', overview, '42%')}
${sections.map(([title, r]) => table(title, r, '34%')).join('')}
<tr><td style="padding:22px 32px 0;font:15px/1.5 Arial,sans-serif;color:${C.ink}">Alle wijzigingen staan ook in de ${link(`${SITE}/it4it-atlas/changes/`, 'changelog')} op de site.</td></tr>
<tr><td style="padding:22px 32px 8px;font:15px/1.5 Arial,sans-serif;color:${C.ink}">Met vriendelijke groet,</td></tr>
<tr><td style="padding:8px 32px 28px">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="border-left:3px solid ${C.accent};padding:2px 0 2px 14px">
      <span style="font:700 16px/1.3 Arial,sans-serif;color:${C.ink}">JAVC Management &amp; Consultancy</span><br>
      <span style="font:13px/1.5 Arial,sans-serif;color:${C.muted}">IT4IT Atlas: IT-managementtools per business capability</span><br>
      <a href="${SITE}" style="font:13px/1.5 Arial,sans-serif;color:${C.accent}">javc.nl</a>
    </td></tr></table>
</td></tr>
<tr><td style="background:${C.dark};padding:12px 32px;font:11px/1.5 Arial,sans-serif;color:#a9b4bf">Deze mail is automatisch verstuurd door de dagelijkse update van de IT4IT Atlas op javc.nl (GitHub Action "Update IT4IT Atlas").</td></tr>
</table></td></tr></table></body></html>`;
  return { subject, text, html };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [latest] = JSON.parse(readFileSync('atlas/activity.json', 'utf8'));
  const out = process.argv[2] || 'atlas-mail-preview.html';
  writeFileSync(out, atlasMail(latest).html);
  console.log(`Preview of the ${latest.date} report: ${out}`);
}
