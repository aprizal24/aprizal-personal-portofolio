import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const cache = new Map<string, string | undefined>();

/**
 * Inline SVG markup for a Tabler outline icon (package: @tabler/icons), read
 * from node_modules at build time — no client JS, no extra request.
 * Returns undefined if the package isn't installed yet, so callers can fall
 * back to text (install with: npm install @tabler/icons).
 */
export function tablerIcon(name: string): string | undefined {
  if (cache.has(name)) return cache.get(name);
  let svg: string | undefined;
  try {
    svg = readFileSync(join(process.cwd(), 'node_modules', '@tabler', 'icons', 'icons', 'outline', `${name}.svg`), 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  } catch {
    console.warn(`[icons] "${name}" not found — run \`npm install @tabler/icons\`. Falling back to text.`);
    return undefined; // not cached, so a later install is picked up without a restart
  }
  cache.set(name, svg);
  return svg;
}
