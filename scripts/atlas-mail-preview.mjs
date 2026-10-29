// Preview of the IT4IT Atlas e-mails (scripts/atlas-mail.mjs) with the latest report in atlas/activity.json:
// node scripts/atlas-mail-preview.mjs [folder] writes report-nl.html, report-en.html and confirm-en.html there.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { atlasMail, confirmMail } from './atlas-mail.mjs';

const dir = process.argv[2] || 'mail-preview';
mkdirSync(dir, { recursive: true });
const [latest] = JSON.parse(readFileSync('atlas/activity.json', 'utf8'));
writeFileSync(`${dir}/report-nl.html`, atlasMail(latest, { lang: 'nl' }).html);
writeFileSync(`${dir}/report-en.html`, atlasMail(latest, { lang: 'en', unsubscribe: 'https://javc.nl/api/atlas/unsubscribe?token=example' }).html);
writeFileSync(`${dir}/confirm-en.html`, confirmMail('en', 'https://javc.nl/api/atlas/confirm?token=example').html);
console.log(`Previews of the ${latest.date} report in ${dir}/`);
