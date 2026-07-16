import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The real Klika logo, from the supplied production artwork in
 * /public/images/logos. Nothing here is recreated with text or CSS.
 *
 * The artwork is dark navy on transparency, so it disappears on navy and on
 * the hero video. `onDark` applies a filter (see `.logo-on-dark` in
 * globals.css) that renders the same file in warm white — one source of truth
 * for the mark, both polarities.
 *
 * `width`/`height` passed to next/image are the *display* dimensions, not the
 * intrinsic 2500–6000px of the files: Next then serves appropriately resized
 * 1x/2x versions instead of the multi-megabyte originals, and the fixed
 * dimensions prevent layout shift.
 */

interface LogoArt {
  readonly src: string;
  /** Intrinsic aspect ratio, width ÷ height. */
  readonly ratio: number;
  readonly alt: string;
}

const art = {
  /** The K mark alone (2500×3000). */
  symbol: {
    src: "/images/logos/web/logo-symbol.webp",
    ratio: 2500 / 3000,
    alt: "Klika",
  },
  /** The script wordmark (3000×1450). */
  wordmark: {
    src: "/images/logos/web/logo-wordmark.webp",
    ratio: 3000 / 1450,
    alt: "Klika",
  },
  /** The full lockup (3000×1450). */
  full: {
    src: "/images/logos/web/logo-full.webp",
    ratio: 3000 / 1450,
    alt: "Hotel Klika — Klika Kitchen & Coffee",
  },
  /**
   * The original PNG of the full lockup, for the large loading screen where
   * it renders sharpest. Still served resized through next/image.
   */
  fullOriginal: {
    src: "/images/logos/original/logo-full.png",
    ratio: 3000 / 1450,
    alt: "Hotel Klika — Klika Kitchen & Coffee",
  },
} satisfies Record<string, LogoArt>;

export type LogoVariant = keyof typeof art;

export function Logo({
  variant = "wordmark",
  height = 32,
  onDark = false,
  priority = false,
  decorative = false,
  className,
}: {
  variant?: LogoVariant;
  /** Display height in CSS pixels; width follows the intrinsic ratio. */
  height?: number;
  /** Renders the navy artwork in warm white for navy/video surfaces. */
  onDark?: boolean;
  priority?: boolean;
  /** Hides the image from assistive tech when a text label sits beside it. */
  decorative?: boolean;
  className?: string;
}) {
  const { src, ratio, alt } = art[variant];
  const width = Math.round(height * ratio);

  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative || undefined}
      width={width}
      height={height}
      priority={priority}
      quality={90}
      className={cn("select-none", onDark && "logo-on-dark", className)}
    />
  );
}
