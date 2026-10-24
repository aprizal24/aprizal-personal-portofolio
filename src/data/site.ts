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
  /** Default social preview image: a real screenshot of the desktop Home page
   *  (hero + Selected work), 1200×630 JPEG, served from /public. */
  ogImage: {
    path: '/og-home.jpg',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'Aprizal Triansyah portfolio home page: “Designing simple, intuitive digital products that solve real user problems.” above the Selected work projects',
  },
  email: 'aprizaltriansyah24@gmail.com',
  emailSubject: "Let's Work Together",
  resume: '/assets/resume.pdf',
  social: {
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aprizal-triansyah', handle: 'in/aprizal-triansyah' },
    instagram: { label: 'Instagram', url: 'https://www.instagram.com/byaprizal', handle: '@byaprizal' },
    dribbble: { label: 'Dribbble', url: 'https://dribbble.com/aprizal-triansyah', handle: 'aprizal-triansyah' },
  },
} as const;

/** `mailto:` link with the standard subject line. */
export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject).replace(/'/g, '%27')}`;

/**
 * Feature switches.
 * playground — flip to true only when at least one real Playground item is
 * published. While false, /playground/ stays out of the navigation and the
 * sitemap and is served with `noindex, nofollow`.
 */
export const features = {
  playground: true,
} as const;
