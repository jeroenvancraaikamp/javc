// Preview of the IT4IT Atlas e-mails (scripts/atlas-mail.mjs) with the latest report in atlas/activity.json:
// node scripts/atlas-mail-preview.mjs [folder] writes report-nl.html, report-en.html, confirm-en.html and contact.html there.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { atlasMail, confirmMail, contactMail } from './atlas-mail.mjs';

const dir = process.argv[2] || 'mail-preview';
mkdirSync(dir, { recursive: true });
// The report as the Worker mails it (with links; run scripts/build-atlas.mjs first), else the raw latest report.
const latest = existsSync('public/atlas/report.json') ? JSON.parse(readFileSync('public/atlas/report.json', 'utf8')) : JSON.parse(readFileSync('atlas/activity.json', 'utf8'))[0];
writeFileSync(`${dir}/report-nl.html`, atlasMail(latest, { lang: 'nl' }).html);
writeFileSync(`${dir}/report-en.html`, atlasMail(latest, { lang: 'en', unsubscribe: 'https://javc.nl/api/atlas/unsubscribe?token=example' }).html);
writeFileSync(`${dir}/confirm-en.html`, confirmMail('en', 'https://javc.nl/api/atlas/confirm?token=example').html);
writeFileSync(`${dir}/contact.html`, contactMail({ name: 'Jan de Vries', email: 'jan@example.com', phone: '06 12345678', message: 'Hallo Jeroen,\n\nIk zag je artikel over CSDM 5 en wil graag eens kennismaken.\n\nGroet, Jan', lang: 'nl', country: 'NL', city: 'Utrecht', host: 'javc.nl' }).html);
console.log(`Previews of the ${latest.date} report in ${dir}/`);
