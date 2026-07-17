/**
 * Hand-drawn decorative SVGs.
 *
 * All are purely decorative: `aria-hidden`, `focusable="false"` and
 * `pointer-events-none`, so they never reach the accessibility tree or
 * intercept clicks. They are small inline paths — no artwork is faked out of
 * stacked CSS shapes — and each is a single component, easy to replace with
 * final illustrations later.
 *
 * Use sparingly: beside a heading, at a section edge, or as a very low-opacity
 * wash behind content.
 */
import { cn } from "@/lib/utils";

interface DecorProps {
  className?: string;
}

const decorProps = {
  "aria-hidden": true as const,
  focusable: "false" as const,
  fill: "none" as const,
};

/** Curved handwritten arrow, pairs with a Caveat note. */
export function ArrowCurve({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...decorProps}
    >
      <path d="M4 12c22 30 56 42 104 34" />
      <path d="M92 34c8 6 14 9 16 12M108 46c-6 1-12 3-16 6" />
    </svg>
  );
}

/** River waves — the Malše runs past the hotel and the garden. */
export function Waves({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 240 40"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      {...decorProps}
    >
      <path d="M0 12c15 0 15-8 30-8s15 8 30 8 15-8 30-8 15 8 30 8 15-8 30-8 15 8 30 8 15-8 30-8 15 8 30 8" />
      <path d="M0 28c15 0 15-8 30-8s15 8 30 8 15-8 30-8 15 8 30 8 15-8 30-8 15 8 30 8 15-8 30-8 15 8 30 8" />
    </svg>
  );
}

/** Serving plate seen from above, with cutlery. */
export function Plate({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      {...decorProps}
    >
      <circle cx="60" cy="60" r="34" />
      <circle cx="60" cy="60" r="24" strokeDasharray="3 5" />
      <path d="M14 40v40M14 40c-4 4-4 12 0 16M100 38v44M104 38c4 6 4 14 0 18-2 2-4 2-4 0" />
    </svg>
  );
}

/** Herb sprig — seasonal cooking, the garden. */
export function Sprig({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 60 120"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      {...decorProps}
    >
      <path d="M30 116V16" />
      <path d="M30 96c-14 0-22-8-22-18 12-2 22 6 22 18ZM30 96c14 0 22-8 22-18-12-2-22 6-22 18ZM30 66c-14 0-22-8-22-18 12-2 22 6 22 18ZM30 66c14 0 22-8 22-18-12-2-22 6-22 18ZM30 38c-11 0-17-7-17-15 10-1 17 5 17 15ZM30 38c11 0 17-7 17-15-10-1-17 5-17 15Z" />
    </svg>
  );
}

/** Coffee cup on a saucer. */
export function Cup({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      {...decorProps}
    >
      <path d="M24 34h60v26a26 26 0 0 1-26 26H50a26 26 0 0 1-26-26V34Z" />
      <path d="M84 42h10a12 12 0 0 1 0 24h-10" />
      <path d="M14 92h92" />
      <path d="M44 22c0-6 6-8 6-14M62 22c0-6 6-8 6-14" strokeDasharray="4 4" />
    </svg>
  );
}

/** Two figures — the family running the hotel and the guests in the garden. */
export function People({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...decorProps}
    >
      <circle cx="42" cy="32" r="12" />
      <path d="M22 112V78a20 20 0 0 1 40 0v34" />
      <circle cx="82" cy="42" r="10" />
      <path d="M66 112V84a16 16 0 0 1 32 0v28" />
    </svg>
  );
}

/** Historic rooftops — the old town around Piaristické náměstí. */
export function Rooftops({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 240 80"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...decorProps}
    >
      <path d="M0 78V52l18-16 18 16v26M36 78V40l16-14 16 14v38M68 78V56l20-18 20 18v22M108 78V34l18-16 18 16v44M144 78V50l16-14 16 14v28M176 78V58l16-14 16 14v20M208 78V46l16-14 16 14v32" />
      <path d="M126 18V6M126 6h10" />
      <path d="M0 78h240" />
    </svg>
  );
}

/** Loose underline, drawn by hand under a word. */
export function Underline({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      preserveAspectRatio="none"
      {...decorProps}
    >
      <path d="M3 8c40-5 80-6 120-4s60 3 74 1" />
    </svg>
  );
}

/**
 * A single editorial corner bracket — two thin strokes forming an L, like the
 * corner of a photo frame. Deliberately not a full rectangle: placed offset
 * from an image so it frames the composition without enclosing it. Rotate with
 * a utility class to point it at any corner.
 */
export function CornerMark({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("pointer-events-none", className)}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      {...decorProps}
    >
      <path d="M2 40V2h38" />
    </svg>
  );
}
