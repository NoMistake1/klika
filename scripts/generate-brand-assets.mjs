/**
 * Generates the Open Graph image from the real Klika logo artwork.
 *
 * Favicons and touch icons are the supplied production files in
 * public/images/logos/favicon and are wired through the Next metadata API —
 * they are NOT generated here.
 *
 *   node scripts/generate-brand-assets.mjs
 */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const BLUE = "#AED3FA";
const NAVY = "#0A1A31";

async function main() {
  const width = 1200;
  const height = 630;

  // The full lockup, sized to sit comfortably inside the card.
  const logo = await sharp(join(root, "public/images/logos/original/logo-full.png"))
    .resize({ width: 720 })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  const baseline = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${BLUE}"/>
    <rect y="${height - 14}" width="${width}" height="14" fill="${NAVY}"/>
  </svg>`;

  await sharp(Buffer.from(baseline))
    .composite([
      {
        input: logo,
        left: Math.round((width - (logoMeta.width ?? 720)) / 2),
        top: Math.round((height - (logoMeta.height ?? 348)) / 2) - 8,
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(root, "src/app/opengraph-image.png"));

  console.log("src/app/opengraph-image.png regenerated from the real logo.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
