import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type Size = { width: number; height: number };

const cache = new Map<string, Size | undefined>();

/**
 * Intrinsic size of an image in /public (WebP, PNG or JPEG), read from the
 * file header at build time. Lets <img> carry real width/height (no layout
 * shift) without cropping images into a fixed ratio. Returns undefined if the
 * file can't be read or parsed; callers then fall back to CSS sizing.
 */
export function publicImageSize(src: string): Size | undefined {
  if (cache.has(src)) return cache.get(src);
  let size: Size | undefined;
  try {
    const buf = readFileSync(join(process.cwd(), 'public', src.replace(/^\//, '')));
    size = parse(buf);
  } catch {
    size = undefined;
  }
  cache.set(src, size);
  return size;
}

function parse(buf: Buffer): Size | undefined {
  // PNG: IHDR width/height
  if (buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // WebP: RIFF....WEBP + VP8X / VP8 / VP8L chunk
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
    }
  }

  // JPEG: first SOFn marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      const length = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + length;
    }
  }

  return undefined;
}
