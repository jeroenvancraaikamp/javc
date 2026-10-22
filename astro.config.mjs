import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://javc.nl',
  trailingSlash: 'always',
  build: { format: 'directory', assets: 'assets', inlineStylesheets: 'always' },
});
