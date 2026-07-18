import { cn } from "@/lib/utils";

/**
 * One reusable hand-drawn arrow for the Caveat annotations.
 *
 * The head is always an OPEN "V" — two strokes with rounded caps and joins,
 * never a filled triangle — and it inherits `currentColor`, so text and arrow
 * always share the annotation's accent colour.
 *
 * A single rightward, gently descending base drawing is transformed to cover
 * every direction the site needs, so there is one arrow implementation rather
 * than several:
 *   right      — head points right, nearly level
 *   downRight  — head points right and clearly down
 *   left       — mirror of right
 *   downLeft   — mirror of downRight
 * `curve="alt"` flips the bulge of the shaft for the cases that ask for the
 * opposite arc.
 */
export type ArrowDir = "left" | "right" | "downLeft" | "downRight";

export function HandArrow({
  dir,
  curve = "default",
  className,
}: {
  dir: ArrowDir;
  curve?: "default" | "alt";
  className?: string;
}) {
  const mirrored = dir === "left" || dir === "downLeft";
  const steep = dir === "downLeft" || dir === "downRight";

  // Base shaft sweeps left→right and both variants converge on the SAME end
  // point (90,30) with the SAME shared control point (66,20). That means the
  // curve leaves at one consistent tangent (right, tilted ~22° down), so a
  // single open-V head reads as following the line naturally for either arc.
  // `default` bows up over the middle; `alt` bows down — a stronger, smoother
  // bezier than before, so the stroke feels drawn in one confident sweep.
  const shaft =
    curve === "alt"
      ? "M6 16 C 30 42, 66 20, 90 30"
      : "M6 26 C 30 6, 66 20, 90 30";

  return (
    <svg
      viewBox="0 0 100 46"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none h-[0.9em] w-[1.95em] shrink-0",
        // A small downward tilt for the "down" variants; the level ones lift
        // slightly so they don't droop.
        steep ? "rotate-[7deg]" : "-rotate-[7deg]",
        mirrored && "-scale-x-100",
        className,
      )}
    >
      <path d={shaft} />
      {/* Open-V head at the shaft's tip (90,30). Both barbs trail back ~30°
          either side of the shared end tangent, so the V opens back up the
          line and points cleanly along it — never a filled triangle. */}
      <path d="M79 16 L90 30 L72 32" />
    </svg>
  );
}
