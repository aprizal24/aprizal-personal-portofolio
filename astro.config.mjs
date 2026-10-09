// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import { site, features } from './src/data/site.ts';

// Static output (the default). Vercel serves dist/ as-is, so no adapter is needed.
export default defineConfig({
  site: site.url,
  integrations: [
    sitemap({
      // /experiments/ stays out of the sitemap until it has published content.
      filter: (page) => features.experiments || !new URL(page).pathname.startsWith('/experiments'),
    }),
  ],
});
