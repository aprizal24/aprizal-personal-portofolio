# Aprizal Triansyah – Portfolio

Static portfolio site built with [Astro](https://astro.build). No client-side JavaScript is shipped.

## Run locally

Requires Node.js 18.17 or newer (Node 22 recommended).

```bash
npm install
npm run dev
```

Then open http://localhost:4321 in your browser.

## Build for production

```bash
npm run build
```

The finished site is written to `dist/`. `npm run preview` serves that folder locally.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, "Add New Project" and import the repository.
3. Vercel detects Astro automatically. Framework preset: **Astro**, build command `npm run build`, output directory `dist`.

No Vercel adapter is needed because the output is fully static. `vercel.json` sets trailing slashes to match the build output and redirects the bare domain to `www`.

## Domain

The site is configured for **https://www.aprizal.me** (`site` in `astro.config.mjs`, canonical and Open Graph URLs, and the redirect in `vercel.json`). To point the domain at the new deployment:

1. In the Vercel project go to **Settings → Domains** and add both `www.aprizal.me` and `aprizal.me`.
2. Set `www.aprizal.me` as the primary domain. Vercel will redirect `aprizal.me` to it.
3. At the DNS provider, create the records Vercel shows on that page. The usual values are an `A` record for `aprizal.me` pointing to `76.76.21.21` and a `CNAME` record for `www` pointing to `cname.vercel-dns.com`.
4. Wait for the domain to show as verified in Vercel. HTTPS certificates are issued automatically.

If the domain is already attached to an older Vercel project, remove it there first or transfer it to the new project from the same Domains page.

## Resume PDF

The Resume links point to `/assets/resume.pdf`, served from `public/assets/resume.pdf`. Replace that file to update the resume.

## Project layout

- `src/pages/index.astro` – home page
- `src/pages/case-studies/[slug].astro` – renders one page per case study
- `src/content/case-studies/*.md` – the three case studies (frontmatter + page sections)
- `src/layouts/BaseLayout.astro` – shared `<head>`, fonts, global CSS
- `src/components/` – header, nav, footer
- `src/styles/` – fonts and page CSS
- `public/fonts`, `public/images` – static assets, served as-is
