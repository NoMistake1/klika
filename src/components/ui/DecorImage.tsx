import { cn } from "@/lib/utils";

/**
 * A purely decorative raster illustration (the hand-drawn tomato, mushroom…).
 *
 * These are transparent-background line drawings positioned as accents, so
 * next/image's layout machinery is more hindrance than help: a plain <img>
 * keeps the supplied WebP untouched, stays out of the layout flow, and can
 * overflow its section freely. The section it lives in clips the overflow, so
 * it never adds page-level horizontal scroll.
 *
 * Always decorative: hidden from assistive tech, non-interactive, lazy, and
 * `object-contain` so the drawing is never distorted. Positioning and size are
 * supplied by the caller through `className`.
 */
export function DecorImage({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    // Decorative cutout, served as-is: next/image adds no value here and
    // complicates the intentional overflow.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn("pointer-events-none absolute object-contain select-none", className)}
    />
  );
}
