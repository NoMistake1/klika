import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A row that swipes horizontally on mobile and becomes a grid from `sm` up.
 *
 * Why: a six-item image grid stacked two-per-row turns into several screens of
 * scrolling on a phone. Swiping sideways through them keeps the section one
 * screen tall and matches how people browse images on a phone anyway.
 *
 * Built on native CSS scroll-snap rather than a JS carousel, so it swipes with
 * momentum, scrolls with a trackpad, responds to keyboard scrolling and works
 * before hydration. Items are sized so the next one peeks in — that overhang is
 * the affordance that says "there is more this way", which matters because the
 * scrollbar is hidden.
 *
 * The row is deliberately full-bleed on mobile: the negative margin exactly
 * cancels the Container's gutter, so it reaches the viewport edge and no
 * further — it never contributes horizontal overflow to the page.
 *
 * Not for menus or long-form reading: the brief is explicit, and a menu that
 * hides half its dishes off-screen is a worse menu.
 */
export function ScrollRow({
  children,
  className,
  /** Grid template applied from `sm` upwards. */
  cols = "sm:grid-cols-2 lg:grid-cols-4",
}: {
  children: ReactNode;
  className?: string;
  cols?: string;
}) {
  return (
    <ul
      className={cn(
        // Mobile: a snapping, full-bleed swipe row.
        "scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1",
        "[scroll-padding-inline:1.25rem]",
        // sm and up: an ordinary grid, no horizontal scrolling at all.
        "sm:mx-0 sm:grid sm:gap-4 sm:overflow-x-visible sm:px-0 sm:pb-0",
        cols,
        className,
      )}
    >
      {children}
    </ul>
  );
}

/**
 * Classes every direct child of <ScrollRow> must carry.
 * `basis-[78%]` leaves the next card peeking; `sm:basis-auto` hands sizing back
 * to the grid.
 */
export const scrollRowItem = "snap-start shrink-0 basis-[78%] sm:basis-auto";
