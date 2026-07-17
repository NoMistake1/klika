import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A handwritten aside set in Caveat with a drawn arrow, in the terracotta
 * accent — the annotation voice of the brand.
 *
 * Composition notes: each arrow is one confident stroke with a solid head,
 * sized in em units so it scales with the note. The horizontal arrows sit on
 * the text baseline; the `down` arrow sits to the left of the text and points
 * down toward whatever the note refers to (a CTA or an image below it). Text
 * tilts one degree so the pairing reads as one gesture, not label plus
 * clip-art.
 *
 * Accessibility: the text is real, selectable, translated content; the arrow
 * is decorative and hidden. Terracotta on the light surfaces is 3.1–3.7:1,
 * which passes WCAG only as large text — hence the enforced 1.5rem floor.
 * Reserved for genuine asides, never body copy.
 */
export function HandwrittenNote({
  children,
  className,
  arrow,
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  /**
   * Direction the arrow points relative to the note. `down` places the arrow
   * left of the text pointing downward — for notes that sit above their image
   * or CTA.
   */
  arrow?: "left" | "right" | "down" | "none";
  /** `accent` works on every surface (3.1:1+ large text; 4.7:1 on navy). */
  tone?: "accent" | "navy" | "cream";
}) {
  const toneClass = {
    accent: "text-accent",
    navy: "text-navy",
    cream: "text-cream",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex gap-2.5 font-hand text-2xl leading-tight font-bold sm:text-3xl",
        arrow === "down" ? "items-end" : "items-center",
        toneClass,
        className,
      )}
    >
      {arrow === "left" ? <HandDrawnArrow className="-scale-x-100" /> : null}
      {arrow === "down" ? <HandDrawnArrowDown /> : null}
      <span className="-rotate-1">{children}</span>
      {arrow === "right" ? <HandDrawnArrow /> : null}
    </span>
  );
}

/**
 * One clean, confident stroke with a filled head. Sized in em so it scales
 * with the note's own font size, and stroke width holds up at small sizes.
 */
function HandDrawnArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 44"
      aria-hidden="true"
      focusable="false"
      fill="none"
      className={cn("pointer-events-none mt-2 h-[0.85em] w-[1.7em] shrink-0", className)}
    >
      {/* The shaft: a single swing that answers the text's tilt. */}
      <path
        d="M4 10c16 16 38 24 66 21"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* A solid head instead of two thin ticks — this is what gives the
          arrow its presence at small sizes. */}
      <path
        d="M84 29.5c-6.5-4.8-10.5-7-16.5-8.6 3 5 4.6 9.4 5.6 15.1 3-2.6 6.7-4.7 10.9-6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * A downward hand-drawn arrow, curving down and slightly left, for notes that
 * sit above the content they point at. Head points straight down.
 */
function HandDrawnArrowDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 84"
      aria-hidden="true"
      focusable="false"
      fill="none"
      className={cn("pointer-events-none mb-1 h-[1.5em] w-[0.72em] shrink-0", className)}
    >
      <path
        d="M27 6C19 24 14 44 15 64"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M15 78c-3.4-6.8-6.6-11-10.9-15.6 4.4 1.6 8 1.7 11.4 1 3.3.7 6.7.4 10.6-1.5-4 4.7-7.5 9.2-11.1 16.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
