/**
 * Generates the favicon, apple icon and Open Graph image.
 *
 * PLACEHOLDER MARK. The official Klika logo has not been supplied yet, and the
 * reference screenshots must not be traced or used as production assets. What
 * is drawn here is a neutral monogram stand-in plus the brand colours — it is
 * deliberately not an attempt at the real logo.
 *
 * When the official SVG arrives: replace src/app/icon.png, src/app/apple-icon.png
 * and src/app/opengraph-image.png, and update src/components/ui/Logo.tsx.
 * Next.js picks these files up by convention — no metadata wiring needed.
 *
 *   node scripts/generate-brand-assets.mjs
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const NAVY = "#0B1D35";
const BLUE_LIGHT = "#D9ECFA";
const CREAM = "#F4EFE5";
const SAND = "#D9C3A2";

/** The 'K' stand-in: two strokes and a bowl, echoing the brand's rounded script. */
function monogram(cx, cy, size, color, opacity = 1) {
  return `<g stroke="${color}" stroke-opacity="${opacity}" fill="none" stroke-width="${size * 0.15}" stroke-linecap="round">
    <path d="M ${cx - size * 0.34} ${cy - size * 0.62} L ${cx - size * 0.46} ${cy + size * 0.5}"/>
    <path d="M ${cx + size * 0.46} ${cy - size * 0.62} L ${cx - size * 0.4} ${cy + size * 0.04}"/>
    <path d="M ${cx - size * 0.16} ${cy - size * 0.12} A ${size * 0.46} ${size * 0.46} 0 1 0 ${cx + size * 0.36} ${cy + size * 0.5}"/>
  </g>`;
}

function iconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BLUE_LIGHT}"/>
  ${monogram(size / 2, size / 2, size * 0.5, NAVY)}
</svg>`;
}

function ogSvg(width, height) {
  const cx = width * 0.78;
  const cy = height * 0.5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${NAVY}"/>
  <rect x="0" y="${height * 0.78}" width="${width}" height="${height * 0.22}" fill="${SAND}" opacity="0.22"/>
  ${monogram(cx, cy, height * 0.62, BLUE_LIGHT, 0.22)}
  <text x="${width * 0.07}" y="${height * 0.44}" fill="${CREAM}"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${height * 0.115}" font-weight="700">Hotel Klika</text>
  <text x="${width * 0.07}" y="${height * 0.55}" fill="${BLUE_LIGHT}"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${height * 0.05}">Klika Kitchen &amp; Coffee</text>
  <line x1="${width * 0.07}" y1="${height * 0.62}" x2="${width * 0.28}" y2="${height * 0.62}" stroke="${SAND}" stroke-width="3"/>
  <text x="${width * 0.07}" y="${height * 0.72}" fill="${CREAM}" fill-opacity="0.75"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${height * 0.042}">Hotel a restaurace v srdci Českých Budějovic</text>
</svg>`;
}

const targets = [
  ["src/app/icon.png", iconSvg(512)],
  ["src/app/apple-icon.png", iconSvg(180)],
  ["src/app/opengraph-image.png", ogSvg(1200, 630)],
];

async function main() {
  for (const [path, svg] of targets) {
    const file = join(root, path);
    await mkdir(dirname(file), { recursive: true });
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
    console.log(path);
  }
  console.log("\nBrand placeholders generated. Replace when the official logo arrives.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
