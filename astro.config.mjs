import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://javc.nl',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin/') && !page.includes('/stats/') && !page.includes('/cms/') })],
  trailingSlash: 'always',
  build: { format: 'directory', assets: 'assets', inlineStylesheets: 'always' },
});
