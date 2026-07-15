/**
 * Generates the labelled placeholder imagery in public/images.
 *
 * These are deliberate, branded stand-ins — never stock photography pretending
 * to be Hotel Klika. Each one states what it is and what belongs there, so an
 * unreplaced asset is obvious in review rather than shipping unnoticed.
 *
 * Replacing a placeholder with a real photograph needs no code change: keep the
 * filename and aspect ratio, drop the file in, and remove `isPlaceholder` from
 * the matching entry in src/content.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Requires `sharp`, which ships with Next.js. Dev-time only: nothing here runs
 * at build or request time.
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

/** Brand palette, mirroring the tokens in src/app/globals.css. */
const palettes = {
  hotel: { bg: "#D9ECFA", ink: "#0B1D35", accent: "#9FC8EC" },
  room: { bg: "#9FC8EC", ink: "#0B1D35", accent: "#D9ECFA" },
  restaurant: { bg: "#F4EFE5", ink: "#0B1D35", accent: "#D9C3A2" },
  food: { bg: "#D9C3A2", ink: "#0B1D35", accent: "#B65F3D" },
  location: { bg: "#142944", ink: "#F4EFE5", accent: "#9FC8EC" },
  neutral: { bg: "#FFFDF9", ink: "#111A27", accent: "#D9C3A2" },
};

const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (char) =>
    char === "<"
      ? "&lt;"
      : char === ">"
        ? "&gt;"
        : char === "&"
          ? "&amp;"
          : char === "'"
            ? "&apos;"
            : "&quot;",
  );

/**
 * A restrained editorial composition: a wash, a horizon, a monogram-derived
 * arc motif and a label. No fake photographic detail.
 */
function buildSvg({ width, height, label, detail, palette }) {
  const { bg, ink, accent } = palettes[palette];
  const unit = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const monogram = unit * 0.42;
  const pad = Math.round(unit * 0.07);
  const labelSize = Math.round(unit * 0.052);
  const detailSize = Math.round(unit * 0.038);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bg}"/>

  <!-- horizon -->
  <rect x="0" y="${cy + unit * 0.18}" width="${width}" height="${height}" fill="${accent}" opacity="0.35"/>
  <line x1="0" y1="${cy + unit * 0.18}" x2="${width}" y2="${cy + unit * 0.18}" stroke="${ink}" stroke-opacity="0.18" stroke-width="${Math.max(1, unit * 0.003)}"/>

  <!-- monogram-derived arc motif, echoing the Klika 'K' -->
  <g opacity="0.16" stroke="${ink}" fill="none" stroke-width="${unit * 0.028}" stroke-linecap="round">
    <path d="M ${cx - monogram * 0.45} ${cy - monogram * 0.6} L ${cx - monogram * 0.62} ${cy + monogram * 0.62}"/>
    <path d="M ${cx + monogram * 0.5} ${cy - monogram * 0.6} L ${cx - monogram * 0.5} ${cy + monogram * 0.02}"/>
    <path d="M ${cx - monogram * 0.2} ${cy - monogram * 0.16} A ${monogram * 0.52} ${monogram * 0.52} 0 1 0 ${cx + monogram * 0.42} ${cy + monogram * 0.56}"/>
  </g>

  <!-- corner rules -->
  <g stroke="${ink}" stroke-opacity="0.28" stroke-width="${Math.max(1, unit * 0.004)}">
    <path d="M ${pad} ${pad + unit * 0.06} L ${pad} ${pad} L ${pad + unit * 0.06} ${pad}" fill="none"/>
    <path d="M ${width - pad - unit * 0.06} ${height - pad} L ${width - pad} ${height - pad} L ${width - pad} ${height - pad - unit * 0.06}" fill="none"/>
  </g>

  <text x="${pad}" y="${height - pad - detailSize * 1.5}" fill="${ink}" fill-opacity="0.85"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${labelSize}" font-weight="600">${escapeXml(label)}</text>
  <text x="${pad}" y="${height - pad}" fill="${ink}" fill-opacity="0.6"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${detailSize}">${escapeXml(detail)}</text>
  <text x="${width - pad}" y="${pad + labelSize * 0.8}" fill="${ink}" fill-opacity="0.45" text-anchor="end"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${detailSize}" letter-spacing="${unit * 0.006}">PLACEHOLDER</text>
</svg>`;
}

/** src path (under /public) -> composition. Mirrors the content modules. */
const assets = [
  // Hero / video poster
  ["images/hero/poster.png", 1920, 1080, "Hero video poster", "Final cinematic still — see public/video/README.md", "hotel"],

  // Hotel
  ["images/hotel/facade.png", 1200, 1500, "Hotel facade", "Hroznová / nábřeží Jindřicha Libraria", "hotel"],
  ["images/hotel/reception.png", 1600, 1200, "Reception", "Open daily 07:00–22:00", "hotel"],
  ["images/hotel/breakfast.png", 1400, 1400, "Breakfast buffet", "Served 07:00–10:00", "restaurant"],
  ["images/hotel/split-hotel.png", 1200, 1600, "Hotel Klika", "Rooms, river, rest", "hotel"],

  // Rooms
  ["images/rooms/single-limited.png", 1600, 1200, "Limited single room", "Compact room, private bathroom", "room"],
  ["images/rooms/double.png", 1600, 1200, "Double room", "Non-smoking, main building", "room"],
  ["images/rooms/triple.png", 1600, 1200, "Triple room", "Sleeps three", "room"],
  ["images/rooms/apartment-sauna.png", 1600, 1200, "Apartment with sauna", "View of Sokolský ostrov", "room"],
  ["images/rooms/apartment-sauna-detail.png", 1200, 1500, "Apartment with sauna", "Private sauna detail", "room"],
  ["images/rooms/apartment-four.png", 1600, 1200, "Four-person apartment", "Late 19th-century building", "room"],
  ["images/rooms/apartment-long-stay.png", 1600, 1200, "Apartment for longer stays", "50 m from reception", "room"],

  // Restaurant
  ["images/restaurant/zone-restaurant.png", 1400, 1050, "Restaurant", "40 seats, 14th-century wall", "restaurant"],
  ["images/restaurant/zone-conservatory.png", 1400, 1050, "Conservatory", "20 seats, river view", "restaurant"],
  ["images/restaurant/conservatory-detail.png", 1200, 1500, "Conservatory", "Glass interior detail", "restaurant"],
  ["images/restaurant/zone-garden.png", 1400, 1050, "Garden", "Riverside, seasonal", "restaurant"],
  ["images/restaurant/bar.png", 1600, 1200, "Bar", "Dessert cabinet", "restaurant"],
  ["images/restaurant/garden-children.png", 1200, 1500, "Children's area", "Sandbox and swing", "restaurant"],
  ["images/restaurant/split-restaurant.png", 1200, 1600, "Klika Kitchen & Coffee", "Food, people, season", "restaurant"],

  // Food
  ["images/food/tartare.png", 1400, 1400, "Steak tartare", "Aged Volary beef", "food"],
  ["images/food/schnitzel.png", 1200, 1500, "Chicken schnitzel", "Druhaz farm chicken", "food"],
  ["images/food/dessert.png", 1600, 1200, "Dessert", "Strawberry dumplings", "food"],

  // Location
  ["images/location/river.png", 1600, 1200, "The Malše", "Sokolský ostrov", "location"],
  ["images/location/square.png", 1200, 1500, "Přemysl Otakar II Square", "3 minutes on foot", "location"],
  ["images/location/piaristicke.png", 1400, 1400, "Piaristické náměstí", "Next to the hotel", "location"],
  ["images/location/hluboka.png", 1200, 1500, "Hluboká nad Vltavou", "Trip tip", "location"],
  ["images/location/holasovice.png", 1200, 1500, "Holašovice", "Trip tip", "location"],
  ["images/location/klet.png", 1200, 1500, "Kleť", "Trip tip", "location"],
  ["images/location/cesky-krumlov.png", 1200, 1500, "Český Krumlov", "Trip tip", "location"],
  ["images/location/trebon.png", 1200, 1500, "Třeboň", "Trip tip", "location"],

  // Generic fallback used by <SafeImage /> when a source is missing
  ["images/placeholders/generic.png", 1600, 1200, "Image coming soon", "Final asset to be supplied", "neutral"],
];

async function main() {
  for (const [path, width, height, label, detail, palette] of assets) {
    const file = join(publicDir, path);
    await mkdir(dirname(file), { recursive: true });
    const svg = buildSvg({ width, height, label, detail, palette });
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile(file);
    console.log(`${path}  ${width}x${height}`);
  }
  console.log(`\n${assets.length} placeholders generated.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
