import { site } from '../data/site';

/**
 * Absolute URL on the canonical host. Uses the URL constructor, so a trailing
 * slash on the base can never produce `//` (the old og:image bug).
 */
export const absoluteUrl = (path: string, base: string | URL = site.url) => new URL(path, base).href;

/**
 * schema.org Person for the portfolio owner. Only facts already published on
 * the site are included. Pass to BaseLayout via the `schema` prop.
 */
export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: absoluteUrl('/'),
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.locality,
    addressCountry: site.location.country,
  },
  sameAs: [site.social.linkedin.url, site.social.instagram.url],
});
