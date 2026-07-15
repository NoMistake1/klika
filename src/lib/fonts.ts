import localFont from "next/font/local";

/**
 * All three families are self-hosted and subset to Latin + Latin Extended-A so
 * Czech (ě š č ř ž ů) and German (ä ö ü ß) render from the same file.
 * See src/assets/fonts/README.md for how the woff2 files are produced.
 */

/** Body, navigation, forms and UI. */
export const geist = localFont({
  src: "../assets/fonts/geist-variable.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
  style: "normal",
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

/** Brand display headings only. Never used for body copy. */
export const lobster = localFont({
  src: "../assets/fonts/lobster-regular.woff2",
  variable: "--font-lobster",
  display: "swap",
  weight: "400",
  style: "normal",
  preload: true,
  fallback: ["Brush Script MT", "cursive"],
});

/** Short handwritten notes, arrows and annotations only. */
export const caveat = localFont({
  src: "../assets/fonts/caveat-variable.woff2",
  variable: "--font-caveat",
  display: "swap",
  weight: "400 700",
  style: "normal",
  // Decorative accents are never above the fold in a blocking position.
  preload: false,
  fallback: ["Segoe Script", "cursive"],
});

export const fontVariables = `${geist.variable} ${lobster.variable} ${caveat.variable}`;
