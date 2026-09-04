// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// Static output (the default). Vercel serves dist/ as-is, so no adapter is needed.
export default defineConfig({
  site: 'https://www.aprizal.me',
  integrations: [sitemap()],
});