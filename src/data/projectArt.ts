/**
 * Presentation-only settings for project visuals (not case-study content).
 * - `tint`: the soft ground each cover sits on, drawn from the project's own
 *   palette so the colour comes from the work, not from the site.
 * - `fit` / `position`: how the cover fills an image tile. Opaque screenshots
 *   ('cover') fill the tile edge to edge; transparent device mockups
 *   ('contain') sit whole on the tint so no device is cut off.
 */
type Art = { tint: string; fit: 'cover' | 'contain'; position: string };

export const projectArt: Record<string, Art> = {
  evora: { tint: '#ebe7f7', fit: 'contain', position: '50% 50%' },     // festival violet
  flowforge: { tint: '#e5edf9', fit: 'contain', position: '50% 50%' }, // dashboard blue; centred like the others
  snaphire: { tint: '#e3eef5', fit: 'contain', position: '50% 50%' },  // booking teal-blue
  klyra: { tint: '#ece9f6', fit: 'contain', position: '50% 50%' },     // finance lavender
};

const fallback: Art = { tint: '#eeeeeb', fit: 'contain', position: '50% 50%' };

export const projectArtFor = (slug: string): Art => projectArt[slug] ?? fallback;
export const projectTint = (slug: string) => projectArtFor(slug).tint;
