import type { ReactNode } from "react";
import { ArrowCurve } from "@/components/illustrations";
import { cn } from "@/lib/utils";

/**
 * A short handwritten aside set in Caveat, optionally with a drawn arrow.
 *
 * Reserved for genuine editorial asides ("Nakoukněte k nám", "Tady se dobře
 * spí") — never for body copy, and never more than once or twice per page.
 * The note is real text, so it stays readable, translatable and selectable.
 */
export function HandwrittenNote({
  children,
  className,
  arrow,
  tone = "beige",
}: {
  children: ReactNode;
  className?: string;
  /** Direction the arrow points, relative to the note. */
  arrow?: "left" | "right" | "none";
  /**
   * `beige` for light surfaces, `beigeLight` for navy ones. Beige is the brand
   * accent for handwriting, but a single tone cannot serve both: plain sand on
   * cream is 1.49:1 — invisible. So the beige deepens on light surfaces
   * (3.4–4.1:1) and stays light on navy (9.9:1). Same colour family, legible
   * either way.
   */
  tone?: "beige" | "beigeLight" | "navy" | "blue" | "cream";
}) {
  const toneClass = {
    beige: "text-sand-ink",
    beigeLight: "text-sand",
    navy: "text-navy",
    blue: "text-blue",
    cream: "text-cream",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-hand text-xl leading-tight sm:text-2xl",
        toneClass,
        className,
      )}
    >
      {arrow === "left" ? (
        <ArrowCurve className="h-6 w-12 -scale-x-100 opacity-80" />
      ) : null}
      <span className="-rotate-2">{children}</span>
      {arrow === "right" ? <ArrowCurve className="h-6 w-12 opacity-80" /> : null}
    </span>
  );
}
