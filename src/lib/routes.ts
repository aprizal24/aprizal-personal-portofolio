import { features } from '../data/site';

/**
 * Every internal URL is built here, so a route change happens in one place.
 * All page URLs end with a slash to match `trailingSlash` in astro.config.mjs
 * and vercel.json.
 */

/**
 * Base path for case studies.
 * Live today: /case-studies/{slug}/
 * Approved target: /work/{slug}/ — switched together with the Work archive
 * checkpoint (move src/pages/case-studies/[slug].astro to src/pages/work/[slug].astro
 * and enable the 308 redirects documented in vercel.json notes), so /work/
 * never exists without its index page.
 */
export const CASE_STUDY_BASE = '/case-studies';

export const routes = {
  home: '/',
  work: '/work/',
  about: '/about/',
  contact: '/contact/',
  experiments: '/experiments/',
} as const;

export const caseStudyPath = (slug: string) => `${CASE_STUDY_BASE}/${slug}/`;

export type NavIcon = 'home' | 'work' | 'experiments' | 'about' | 'contact';
export type NavItem = { label: string; href: string; icon: NavIcon };

/**
 * Public navigation (floating dock, SiteNav.astro).
 * No Home item: the name "Aprizal" on the left of the dock links to Home.
 * Experiments is appended automatically once `features.experiments` is true.
 * Pages still on the legacy Header.astro don't render it yet.
 */
export const primaryNav: NavItem[] = [
  { label: 'Work', href: routes.work, icon: 'work' },
  ...(features.experiments ? [{ label: 'Experiments', href: routes.experiments, icon: 'experiments' as const }] : []),
  { label: 'About', href: routes.about, icon: 'about' },
  { label: 'Contact', href: routes.contact, icon: 'contact' },
];

/** True when `href` is the current page or a parent section of it (e.g. Work on a case study). */
export const isActive = (href: string, pathname: string) => {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (href === routes.home) return path === '/';
  if (href === routes.work && path.startsWith(`${CASE_STUDY_BASE}/`)) return true;
  return path.startsWith(href);
};
