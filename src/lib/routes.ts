import { features } from '../data/site';

/**
 * Every internal URL is built here, so a route change happens in one place.
 * All page URLs end with a slash to match `trailingSlash` in astro.config.mjs
 * and vercel.json.
 */

/**
 * Base path for case studies: /work/{slug}/ (pages in src/pages/work/[slug].astro,
 * next to the /work/ archive). The old /case-studies/{slug}/ URLs redirect here
 * with HTTP 308 (vercel.json).
 */
export const CASE_STUDY_BASE = '/work';

export const routes = {
  home: '/',
  work: '/work/',
  about: '/about/',
  playground: '/playground/',
} as const;

export const caseStudyPath = (slug: string) => `${CASE_STUDY_BASE}/${slug}/`;

export type NavIcon = 'home' | 'work' | 'playground' | 'about';
export type NavItem = { label: string; href: string; icon: NavIcon };

/**
 * Public navigation (icon pill, top right — SiteNav.astro).
 * Home, Work, Playground, About; Playground is included once
 * `features.playground` is true. Pages still on the legacy Header.astro
 * don't render it.
 */
export const primaryNav: NavItem[] = [
  { label: 'Home', href: routes.home, icon: 'home' },
  { label: 'Work', href: routes.work, icon: 'work' },
  ...(features.playground ? [{ label: 'Playground', href: routes.playground, icon: 'playground' as const }] : []),
  { label: 'About', href: routes.about, icon: 'about' },
];

/** True when `href` is the current page or a parent section of it (e.g. Work on a case study). */
export const isActive = (href: string, pathname: string) => {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (href === routes.home) return path === '/';
  if (href === routes.work && path.startsWith(`${CASE_STUDY_BASE}/`)) return true;
  return path.startsWith(href);
};
