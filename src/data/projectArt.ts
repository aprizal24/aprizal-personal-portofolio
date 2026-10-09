/**
 * Presentation-only settings for project visuals (not case-study content).
 * `tint` is the soft ground each cover sits on, drawn from the project's own
 * palette so the colour comes from the work, not from the site.
 */
export const projectArt: Record<string, { tint: string }> = {
  evora: { tint: '#ebe7f7' },     // festival violet
  flowforge: { tint: '#e5edf9' }, // dashboard blue
  snaphire: { tint: '#e3eef5' },  // booking teal-blue
  klyra: { tint: '#ece9f6' },     // finance lavender
};

export const projectTint = (slug: string) => projectArt[slug]?.tint ?? '#eeeeeb';
