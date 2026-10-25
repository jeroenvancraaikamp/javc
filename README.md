# javc.nl

Source of the new javc.nl website: a static, WordPress-style blog built with [Astro](https://astro.build).

## Writing

- **Articles** are Markdown files in `src/content/articles/`. The file name becomes the URL (`my-post.md` → `/my-post/`).
  Front matter: `title`, `date`, `categories`, `excerpt`, and optionally `image`, `readingTime`, `popular`.
- **Menu pages** (Skills, Projects, ...) are in `src/content/pages/`.
- Images, PDFs and video go in `public/` and are referenced as `/images/...`, `/files/...`, `/media/...`.

See `src/content/articles/what-an-article-can-hold.md` for every supported content type.

## Five languages

The site is in English at the plain addresses (`/skills/`), and in Dutch, Simplified Chinese, French and German under `/nl/`, `/cn/`, `/fr/` and `/de/` (`/nl/skills/` and so on); the flags at the top left switch between them. Every article and page has a `lang` field (English by default) for the language it is written in. The other languages are translations in `src/content/translations/<articles|pages>/<slug>.<lang>.md` (homepage: `src/data/home.<lang>.json`); until one exists, the original is shown. The routes of the other languages are copies of the English ones in `src/pages/<lang>/`.

After every change on `main`, the GitHub Action **Translate** (`scripts/translate.mjs`) translates what is new or changed with Claude and commits it. It needs the repository secret `ANTHROPIC_API_KEY`. To correct a translation yourself, edit it in the CMS under *Translations* and tick *Keep my edits*. Interface texts (menu, buttons, sidebar) are in `src/i18n.ts`.

## Editing in the browser

The site has a Sveltia CMS admin at `/admin/` (settings in `public/admin/config.yml`).
Sign in with a GitHub fine-grained access token that has *Contents: read and write* on this repository.
Every save is a commit to `main`, which Cloudflare deploys automatically.

## Importing from WordPress

Export from WordPress (Tools → Export → All content) and run:

```sh
npm run import -- path/to/export.xml
```

This replaces the sample articles with your published posts and writes your pages to `src/content/pages/`.

## Running locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Hosting

Cloudflare Pages: build command `npm run build`, output directory `dist`.
