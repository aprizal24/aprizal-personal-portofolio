// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import { site, features } from './src/data/site.ts';

// Static output (the default). Vercel serves dist/ as-is, so no adapter is needed.
export default defineConfig({
  site: site.url,
  // Retired addresses. Vercel answers them with a 301 (vercel.json); these
  // also cover dev and other hosts.
  // - /experiments/ → /playground/ (page renamed)
  // - /contact/ → / (Contact page removed; email is on About and the Home CTA)
  redirects: {
    '/experiments': '/playground/',
    '/contact': '/',
  },
  integrations: [
    sitemap({
      // /playground/ stays out of the sitemap until it has published content;
      // the old /experiments/ address is only a redirect, never listed.
      filter: (page) => {
        const path = new URL(page).pathname;
        if (path.startsWith('/experiments') || path.startsWith('/contact')) return false;
        return features.playground || !path.startsWith('/playground');
      },
    }),
  ],
});
