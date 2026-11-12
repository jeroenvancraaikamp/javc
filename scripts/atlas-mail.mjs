// E-mails of the IT4IT Atlas in the layout of the Champagne360 notification mails, in the colours and with the logo
// of javc.nl: the daily report (Jeroen's copy from scripts/maintain-atlas.mjs, Dutch; the subscribers' copies from
// worker/atlas-subscribers.js, Dutch or English with an unsubscribe link), the confirmation mail for a new subscriber,
// and the messages of the contact form (worker/index.js).
// No Node.js imports: the Worker bundles this file too. Preview: node scripts/atlas-mail-preview.mjs.

const C = { accent: '#3f8577', soft: '#e8f2ef', ink: '#1f2a37', text: '#4a5560', muted: '#8a96a3', line: '#e4e8ec', bg: '#f4f7fa', dark: '#1d2731' };
const SITE = 'https://javc.nl';
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const link = (href, label) => `<a href="${esc(href)}" style="color:${C.accent};font-weight:700">${label}</a>`;

const T = {
  nl: {
    locale: 'nl-NL', hello: (n) => `Beste ${n},`, label: 'IT4IT Atlas · dagelijkse update', title: 'Dagelijkse update van de IT4IT Atlas',
    subject: (r) => `IT4IT Atlas: ${r.updated.length} bijgewerkt, ${r.added.length} toegevoegd (${r.date})`,
    intro: (day) => `Hier is de dagelijkse update van de ${link(`${SITE}/nl/it4it-atlas/`, 'IT4IT Atlas')} van <b>${esc(day)}</b>.`,
    box: (r) => `<b>${r.checked} tools gecontroleerd:</b> ${r.updated.length} bijgewerkt, ${r.added.length} toegevoegd, ${r.discontinued.length} niet meer leverbaar.`,
    overview: 'Overzicht', checked: 'Tools gecontroleerd', confirmed: 'Ongewijzigd bevestigd', updated: 'Bijgewerkt', added: 'Toegevoegd',
    discontinued: 'Niet meer leverbaar', discontinuedHead: 'Niet meer leverbaar, verborgen', unverified: 'Niet te verifiëren', searched: 'Gezocht in',
    was: 'was', producer: 'Producent',
    changelog: `Alle wijzigingen staan ook in de ${link(`${SITE}/nl/it4it-atlas/changes/`, 'changelog')} op de site.`, changelogUrl: `${SITE}/nl/it4it-atlas/changes/`,
    live: 'Alle wijzigingen', regards: 'Met vriendelijke groet,', tagline: 'IT4IT Atlas: IT-managementtools per business capability',
    footer: 'Deze mail is automatisch verstuurd door de dagelijkse update van de IT4IT Atlas op javc.nl.',
    unsubscribe: (u) => `Je krijgt deze mail omdat je je hebt aangemeld voor de dagelijkse update van de IT4IT Atlas. ${link(u, 'Afmelden')}`,
    unsubscribeText: 'Afmelden',
  },
  en: {
    locale: 'en-GB', hello: (n) => `Dear ${n},`, label: 'IT4IT Atlas · daily update', title: 'Daily update of the IT4IT Atlas',
    subject: (r) => `IT4IT Atlas: ${r.updated.length} updated, ${r.added.length} added (${r.date})`,
    intro: (day) => `Here is the daily update of the ${link(`${SITE}/it4it-atlas/`, 'IT4IT Atlas')} for <b>${esc(day)}</b>.`,
    box: (r) => `<b>${r.checked} tools checked:</b> ${r.updated.length} updated, ${r.added.length} added, ${r.discontinued.length} no longer offered.`,
    overview: 'Overview', checked: 'Tools checked', confirmed: 'Confirmed unchanged', updated: 'Updated', added: 'Added',
    discontinued: 'No longer offered', discontinuedHead: 'No longer offered, hidden', unverified: 'Could not be verified', searched: 'Searched in',
    was: 'was', producer: 'Producer',
    changelog: `All changes are also in the ${link(`${SITE}/it4it-atlas/changes/`, 'changelog')} on the site.`, changelogUrl: `${SITE}/it4it-atlas/changes/`,
    live: 'All changes', regards: 'Kind regards,', tagline: 'IT4IT Atlas: IT management tools by business capability',
    footer: 'This e-mail was sent automatically by the daily update of the IT4IT Atlas on javc.nl.',
    unsubscribe: (u) => `You receive this e-mail because you subscribed to the daily update of the IT4IT Atlas. ${link(u, 'Unsubscribe')}`,
    unsubscribeText: 'Unsubscribe',
  },
};

// The page around every mail: logo, label, body rows, signature and dark footer (body rows are HTML).
function layout({ lang, title, label, rows, tagline, regards, footer, note }) {
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.bg}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:#ffffff;border-radius:6px;overflow:hidden;border:1px solid ${C.line}">
<tr><td style="background:#ffffff;padding:22px 32px 16px;border-bottom:3px solid ${C.accent}">
  <a href="${SITE}"><img src="${SITE}/wp-content/uploads/2022/12/JAVC-1.png" width="233" height="40" alt="JAVC Management &amp; Consultancy" style="display:block;border:0"></a>
  <div style="padding-top:10px;font:600 12px/1.4 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:${C.accent}">${esc(label)}</div>
</td></tr>
${rows}
${regards ? `<tr><td style="padding:22px 32px 8px;font:15px/1.5 Arial,sans-serif;color:${C.ink}">${esc(regards)}</td></tr>` : '<tr><td style="padding:14px 0 0"></td></tr>'}
<tr><td style="padding:8px 32px 28px">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="border-left:3px solid ${C.accent};padding:2px 0 2px 14px">
      <span style="font:700 16px/1.3 Arial,sans-serif;color:${C.ink}">JAVC Management &amp; Consultancy</span><br>
      <span style="font:13px/1.5 Arial,sans-serif;color:${C.muted}">${esc(tagline)}</span><br>
      <a href="${SITE}" style="font:13px/1.5 Arial,sans-serif;color:${C.accent}">javc.nl</a>
    </td></tr></table>
</td></tr>
${note ? `<tr><td style="padding:0 32px 22px;font:13px/1.5 Arial,sans-serif;color:${C.muted}">${note}</td></tr>` : ''}
<tr><td style="background:${C.dark};padding:12px 32px;font:11px/1.5 Arial,sans-serif;color:#a9b4bf">${esc(footer)}</td></tr>
</table></td></tr></table></body></html>`;
}

const para = (html, top = 22) => `<tr><td style="padding:${top}px 32px 0;font:16px/1.5 Arial,sans-serif;color:${C.ink}">${html}</td></tr>`;
const box = (html) => `<tr><td style="padding:14px 32px 0"><div style="background:${C.soft};border-left:4px solid ${C.accent};padding:12px 14px;font:15px/1.45 Arial,sans-serif;color:${C.ink}">${html}</div></td></tr>`;
// r: [key, value] rows; a key may be { html, text } for a key with links.
const table = (title, r, keyWidth) => `
<tr><td style="padding:22px 32px 6px;font:600 12px/1.4 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${C.muted}">${esc(title)}</td></tr>
<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${C.line}">
${r.map(([k, v], i) => `<tr style="background:${i % 2 ? '#ffffff' : C.bg}"><td style="width:${keyWidth};padding:9px 12px;border-bottom:1px solid ${C.line};font:600 14px/1.4 Arial,sans-serif;color:${C.ink};vertical-align:top">${k?.html ?? esc(k)}</td><td style="padding:9px 12px;border-bottom:1px solid ${C.line};font:14px/1.45 Arial,sans-serif;color:${C.text};word-break:break-word">${esc(v)}</td></tr>`).join('\n')}
</table></td></tr>`;

// The daily report. lang 'nl' or 'en'; unsubscribe: the subscriber's own unsubscribe link (none for Jeroen's copy).
export function atlasMail(report, { lang = 'nl', unsubscribe, name } = {}) {
  const L = T[lang] ?? T.en;
  const num = (n) => Number(n || 0).toLocaleString(L.locale);
  const day = new Date(report.date + 'T12:00:00Z').toLocaleDateString(L.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const r = { ...report, checked: num(report.checked) };
  const overview = [
    [L.checked, num(report.checked)], [L.confirmed, num(report.confirmed)], [L.updated, num(report.updated.length)],
    [L.added, num(report.added.length)], [L.discontinued, num(report.discontinued.length)], [L.unverified, num(report.unverified)],
    [L.searched, (report.searched || []).join('; ') || '—'],
  ];
  const label = (x) => `${x.name}${x.vendor ? ` (${x.vendor})` : ''}${x.was ? ` (${L.was}: ${x.was})` : ''}`;
  // The tool's profile on javc.nl (when it is on the site) and the producer's website.
  const profileUrl = (x) => (x.listed && x.id ? `${SITE}${lang === 'nl' ? '/nl' : ''}/it4it-atlas/?tool=${encodeURIComponent(x.id)}` : '');
  const site = (x) => (/^https:\/\//.test(x.url || '') ? x.url : '');
  const key = (x) => ({
    text: [label(x), profileUrl(x), site(x) && `${L.producer}: ${site(x)}`].filter(Boolean).join(' · '),
    html: (profileUrl(x) ? `<a href="${esc(profileUrl(x))}" style="color:${C.accent};font-weight:700;text-decoration:none">${esc(x.name)}</a>` : esc(x.name))
      + (x.vendor ? ` <span style="font-weight:400;color:${C.text}">(${esc(x.vendor)})</span>` : '')
      + (x.was ? ` <span style="font-weight:400;color:${C.muted}">(${esc(L.was)}: ${esc(x.was)})</span>` : '')
      + (site(x) ? `<br><a href="${esc(site(x))}" style="font:400 12px/1.6 Arial,sans-serif;color:${C.accent}">${esc(L.producer)} ↗</a>` : ''),
  });
  const rows = (list, sub) => list.map((x) => [key(x), (sub && x.sub ? `[${x.sub}] ` : '') + (x.change || '—')]);
  const sections = [
    [`${L.added} (${report.added.length})`, rows(report.added, true)],
    [`${L.updated} (${report.updated.length})`, rows(report.updated)],
    [`${L.discontinuedHead} (${report.discontinued.length})`, rows(report.discontinued)],
  ].filter(([, x]) => x.length);

  const pad = (x) => x.map(([k, v]) => `${(k + ':').padEnd(24)}${v}`);
  const text = [...(name ? [L.hello(name), ''] : []), `${L.title}, ${day}`, '', ...pad(overview), '',
    ...sections.flatMap(([title, x]) => [title, ...x.map(([k, v]) => `- ${k.text}: ${v}`), '']),
    `${L.live}: ${L.changelogUrl}`, '', L.regards, '', 'JAVC Management & Consultancy', SITE,
    ...(unsubscribe ? ['', `${L.unsubscribeText}: ${unsubscribe}`] : [])].join('\n') + '\n';

  const html = layout({
    lang, title: L.subject(report), label: L.label, tagline: L.tagline, regards: L.regards, footer: L.footer,
    note: unsubscribe ? L.unsubscribe(unsubscribe) : '',
    rows: (name ? para(esc(L.hello(name)), 28) + para(L.intro(day), 10) : para(L.intro(day), 28)) + box(L.box(r)) + table(L.overview, overview, '42%')
      + sections.map(([title, x]) => table(title, x, '34%')).join('') + para(L.changelog),
  });
  return { subject: L.subject(report), text, html };
}

// The mail with the confirmation link for a new subscriber, in the language of the page they used.
const CONFIRM = {
  en: { hello: 'Dear', subject: 'Confirm your subscription to the IT4IT Atlas update', intro: 'Please confirm that you want to receive the daily update of the IT4IT Atlas by e-mail: what was checked, changed and added that day.', button: 'Confirm subscription', ignore: 'Did you not ask for this? Then ignore this e-mail; without confirmation you will not receive anything and your address is deleted within a week.', regards: 'Kind regards,' },
  nl: { hello: 'Beste', subject: 'Bevestig je aanmelding voor de IT4IT Atlas-update', intro: 'Bevestig dat je de dagelijkse update van de IT4IT Atlas per e-mail wilt ontvangen: wat die dag is gecontroleerd, gewijzigd en toegevoegd.', button: 'Aanmelding bevestigen', ignore: 'Heb je hier niet om gevraagd? Negeer deze mail dan; zonder bevestiging ontvang je niets en wordt je adres binnen een week verwijderd.', regards: 'Met vriendelijke groet,' },
  cn: { hello: '您好', subject: '请确认订阅 IT4IT Atlas 更新', intro: '请确认您希望通过电子邮件接收 IT4IT Atlas 的每日更新：当天核查、更改和新增的内容（英文）。', button: '确认订阅', ignore: '如果您没有申请订阅，请忽略此邮件；未经确认您不会收到任何邮件，您的地址将在一周内删除。', regards: '此致敬礼，' },
  fr: { hello: 'Bonjour', subject: 'Confirmez votre abonnement à la mise à jour de l’IT4IT Atlas', intro: 'Confirmez que vous souhaitez recevoir par e-mail la mise à jour quotidienne de l’IT4IT Atlas : ce qui a été vérifié, modifié et ajouté ce jour-là (en anglais).', button: 'Confirmer l’abonnement', ignore: 'Vous n’avez rien demandé ? Ignorez cet e-mail ; sans confirmation vous ne recevrez rien et votre adresse sera supprimée sous une semaine.', regards: 'Cordialement,' },
  de: { hello: 'Hallo', subject: 'Bestätigen Sie Ihr Abonnement des IT4IT-Atlas-Updates', intro: 'Bitte bestätigen Sie, dass Sie das tägliche Update des IT4IT Atlas per E-Mail erhalten möchten: was an dem Tag geprüft, geändert und hinzugefügt wurde (auf Englisch).', button: 'Abonnement bestätigen', ignore: 'Sie haben das nicht angefordert? Dann ignorieren Sie diese E-Mail; ohne Bestätigung erhalten Sie nichts, und Ihre Adresse wird innerhalb einer Woche gelöscht.', regards: 'Mit freundlichen Grüßen,' },
};
export function confirmMail(lang, confirmUrl, name = '') {
  const L = CONFIRM[lang] ?? CONFIRM.en;
  const hello = name ? `${L.hello} ${name},` : '';
  const button = `<tr><td style="padding:22px 32px 0"><a href="${esc(confirmUrl)}" style="display:inline-block;background:${C.accent};color:#ffffff;font:700 15px/1 Arial,sans-serif;text-decoration:none;padding:13px 22px;border-radius:4px">${esc(L.button)}</a></td></tr>`;
  const html = layout({
    lang, title: L.subject, label: 'IT4IT Atlas', tagline: (T[lang] ?? T.en).tagline, regards: L.regards, footer: (T[lang] ?? T.en).footer,
    rows: (hello ? para(esc(hello), 28) + para(esc(L.intro), 10) : para(esc(L.intro), 28)) + button + `<tr><td style="padding:22px 32px 0;font:13px/1.5 Arial,sans-serif;color:${C.muted}">${esc(L.ignore)}</td></tr>`,
  });
  const text = [...(hello ? [hello, ''] : []), L.intro, '', `${L.button}: ${confirmUrl}`, '', L.ignore, '', L.regards, '', 'JAVC Management & Consultancy', SITE].join('\n') + '\n';
  return { subject: L.subject, text, html };
}

// A short notice to Jeroen (a new subscription request, a confirmation, an unsubscription), in the same layout.
export function noticeMail(title, intro, rows) {
  const html = layout({
    lang: 'nl', title, label: 'IT4IT Atlas · abonnees', tagline: T.nl.tagline, regards: T.nl.regards, footer: 'Automatisch bericht van javc.nl.',
    rows: para(esc(intro), 28) + table('Gegevens', rows, '34%'),
  });
  const text = [intro, '', ...rows.map(([k, v]) => `${(k + ':').padEnd(18)}${v}`)].join('\n') + '\n';
  return { subject: title, text, html };
}

// A message from the contact form of javc.nl (worker/index.js), to Jeroen in the same layout; replying answers the sender.
export function contactMail({ name, email, phone, message, lang, country, city, host }) {
  const LANG = { en: 'Engels', nl: 'Nederlands', cn: 'Chinees', fr: 'Frans', de: 'Duits' };
  const rows = [['Naam', name], ['E-mailadres', email], ['Telefoon', phone || '—'], ['Taal van de site', `${LANG[lang] || lang} (${lang})`], ['Land (Cloudflare)', country || '—'], ['Plaats', city || '—']];
  const reply = `<tr><td style="padding:22px 32px 0"><a href="mailto:${esc(email)}" style="display:inline-block;background:${C.accent};color:#ffffff;font:700 15px/1 Arial,sans-serif;text-decoration:none;padding:13px 22px;border-radius:4px">Beantwoorden</a></td></tr>`;
  const html = layout({
    lang: 'nl', title: `Contactformulier: ${name}`, label: 'Contactformulier', tagline: 'Contactformulier van javc.nl', regards: '', footer: `Verstuurd via het contactformulier op ${host || 'javc.nl'}.`,
    rows: para(`<b>${esc(name)}</b> heeft een bericht gestuurd via het contactformulier.`, 28)
      + `<tr><td style="padding:22px 32px 6px;font:600 12px/1.4 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${C.muted}">Bericht</td></tr>`
      + `<tr><td style="padding:0 32px"><div style="background:${C.soft};border-left:4px solid ${C.accent};padding:14px 16px;font:15px/1.55 Arial,sans-serif;color:${C.ink};white-space:pre-wrap;word-break:break-word">${esc(message)}</div></td></tr>`
      + reply + table('Gegevens', rows, '34%'),
  });
  const text = [`Naam: ${name}`, `E-mail: ${email}`, `Telefoon: ${phone || '-'}`, `Taal: ${lang}`, `Land: ${country || '-'}`, `Plaats: ${city || '-'}`, '', message, '', `(Verstuurd via het contactformulier op ${host || 'javc.nl'})`].join('\n') + '\n';
  return { subject: `Contactformulier javc.nl: ${name.replace(/[\r\n]+/g, ' ')}`, text, html };
}
