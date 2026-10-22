# javc.nl

Source of the new javc.nl website: a static, WordPress-style blog built with [Astro](https://astro.build).

## Writing

- **Articles** are Markdown files in `src/content/articles/`. The file name becomes the URL (`my-post.md` → `/my-post/`).
  Front matter: `title`, `date`, `categories`, `excerpt`, and optionally `image`, `readingTime`, `popular`.
- **Menu pages** (Skills, Projects, ...) are in `src/content/pages/`.
- Images, PDFs and video go in `public/` and are referenced as `/images/...`, `/files/...`, `/media/...`.

See `src/content/articles/what-an-article-can-hold.md` for every supported content type.

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
