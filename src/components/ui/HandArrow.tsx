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

  // Base shaft sweeps left→right. `default` bulges up then descends; `alt`
  // bulges the opposite way. Both end low-right so the head reads as leading
  // downward toward what the note points at.
  const shaft =
    curve === "alt"
      ? "M5 15 C 26 33, 52 33, 84 27"
      : "M5 14 C 34 7, 60 20, 84 30";

  return (
    <svg
      viewBox="0 0 96 48"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none h-[0.8em] w-[1.75em] shrink-0",
        // A small downward tilt for the "down" variants; the level ones lift
        // slightly so they don't droop.
        steep ? "rotate-[8deg]" : "-rotate-[6deg]",
        mirrored && "-scale-x-100",
        className,
      )}
    >
      <path d={shaft} />
      {/* Open-V head at the shaft's end (84,~29). */}
      <path d="M73 22 L86 30 L76 41" />
    </svg>
  );
}
