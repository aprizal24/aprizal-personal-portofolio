/**
 * Shared site information — the single source for identity, contact details,
 * links and feature switches. Import from here instead of hard-coding values.
 *
 * Email: keep the verified address below. Switch to hello@aprizal.me only
 * after that inbox is confirmed to exist and receive mail.
 */

export const site = {
  name: 'Aprizal Triansyah',
  shortName: 'Aprizal',
  role: 'UI/UX Designer',
  location: {
    label: 'Lombok, Indonesia',
    locality: 'Lombok',
    country: 'ID',
  },
  /** Must match `site` in astro.config.mjs. No trailing slash. */
  url: 'https://www.aprizal.me',
  /** Default social preview image (1200×630), served from /public. */
  ogImage: { path: '/opengraph-image.png', width: 1200, height: 630, type: 'image/png' },
  email: 'aprizaltriansyah24@gmail.com',
  emailSubject: "Let's Work Together",
  resume: '/assets/resume.pdf',
  social: {
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aprizal-triansyah', handle: 'in/aprizal-triansyah' },
    instagram: { label: 'Instagram', url: 'https://www.instagram.com/byaprizal', handle: '@byaprizal' },
  },
} as const;

/** `mailto:` link with the standard subject line. */
export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject).replace(/'/g, '%27')}`;

/**
 * Feature switches.
 * experiments — flip to true only when at least one real experiment is
 * published. While false, /experiments/ stays out of the navigation and the
 * sitemap and is served with `noindex, nofollow`.
 */
export const features = {
  experiments: false,
} as const;
