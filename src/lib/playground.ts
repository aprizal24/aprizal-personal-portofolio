/**
 * Playground order: newest first.
 *
 * Items with `dateAdded` come first, most recent date at the top. Items added
 * on the same day fall back to `order` (higher = added later, so it goes
 * first). Items without `dateAdded` follow, in their existing `order`
 * (lowest first), so older entries keep their relative order.
 *
 * Used by /playground/ and the Playground section on Home, so the grid, the
 * mobile layout and the preview modals all share one order.
 */
type Sortable = { data: { dateAdded?: Date; order: number } };

export function sortPlayground<T extends Sortable>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const da = a.data.dateAdded?.getTime();
    const db = b.data.dateAdded?.getTime();
    if (da !== undefined && db !== undefined) {
      return db - da || b.data.order - a.data.order;
    }
    if (da !== undefined) return -1; // dated items before undated ones
    if (db !== undefined) return 1;
    return a.data.order - b.data.order;
  });
}
