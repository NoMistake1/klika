import type { ReactNode } from "react";
import { HandArrow, type ArrowDir } from "@/components/ui/HandArrow";
import { cn } from "@/lib/utils";

/**
 * A handwritten aside set in Caveat with an optional open-V arrow, in the one
 * terracotta accent used for every annotation on the site (the `text-accent`
 * token). Text and arrow always share that colour.
 *
 * The arrow direction also decides which side of the text it sits on:
 * `right`/`downRight` after the text, `left`/`downLeft` before it. Down arrows
 * hang toward the baseline so they read as leading downward.
 *
 * Accessibility: the text is real, selectable, translated content; the arrow is
 * decorative and hidden. Terracotta on the light surfaces passes WCAG only as
 * large text, hence the enforced 1.5rem floor. Reserved for genuine asides.
 */
export function HandwrittenNote({
  children,
  className,
  arrow,
  curve = "default",
  arrowClassName,
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  arrow?: ArrowDir | "none";
  /** Flip the arrow's arc, for the notes that ask for the opposite bulge. */
  curve?: "default" | "alt";
  /** Extra classes on the arrow, e.g. to hide it at a breakpoint. */
  arrowClassName?: string;
  /** `accent` is the standard annotation colour on every surface. */
  tone?: "accent" | "navy" | "cream";
}) {
  const toneClass = {
    accent: "text-accent",
    navy: "text-navy",
    cream: "text-cream",
  }[tone];

  const hasArrow = arrow && arrow !== "none";
  const before = arrow === "left" || arrow === "downLeft";
  const down = arrow === "downLeft" || arrow === "downRight";

  return (
    <span
      className={cn(
        "inline-flex gap-2 font-hand text-2xl leading-tight font-bold sm:text-3xl",
        down ? "items-end" : "items-center",
        toneClass,
        className,
      )}
    >
      {hasArrow && before ? (
        <HandArrow dir={arrow} curve={curve} className={cn(down && "mb-1", arrowClassName)} />
      ) : null}
      <span className="-rotate-1">{children}</span>
      {hasArrow && !before ? (
        <HandArrow dir={arrow} curve={curve} className={cn(down && "mb-1", arrowClassName)} />
      ) : null}
    </span>
  );
}
