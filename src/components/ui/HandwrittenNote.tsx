import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A handwritten aside set in Caveat with a drawn arrow, in the terracotta
 * accent — the annotation voice of the brand.
 *
 * Composition notes: the arrow is drawn as one confident stroke (2.5–3.5px
 * scaled) with a solid head, vertically anchored to the text baseline and
 * sized in em units so it scales with the note instead of floating beside it
 * at a fixed size. Text tilts one degree; the arrow curve answers it — they
 * read as one gesture, not a label plus clip-art.
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
  /** Direction the arrow points, relative to the note. */
  arrow?: "left" | "right" | "none";
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
        "inline-flex items-center gap-2.5 font-hand text-2xl leading-tight font-bold sm:text-3xl",
        toneClass,
        className,
      )}
    >
      {arrow === "left" ? <HandDrawnArrow className="-scale-x-100" /> : null}
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
