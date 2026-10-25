import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkCjkFriendly from 'remark-cjk-friendly';

export default defineConfig({
  site: 'https://javc.nl',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin/') && !page.includes('/stats/') && !page.includes('/cms/') && !page.endsWith('/comments/') })],
  // Bold and italics next to Chinese punctuation (**“术语”**的) render as such instead of showing the asterisks.
  markdown: { remarkPlugins: [remarkCjkFriendly] },
  trailingSlash: 'always',
  build: { format: 'directory', assets: 'assets', inlineStylesheets: 'always' },
});
