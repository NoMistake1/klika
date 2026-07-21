import { cn } from "@/lib/utils";

/**
 * The one bullet list used across the hotel pages.
 *
 * Two details do the real work, and both replace hand-tuned nudges that had
 * drifted out of sync between sections:
 *
 * - It is a two-column grid, not a flex row. The text gets its own track, so a
 *   wrapped second line starts under the text rather than under the marker.
 * - The marker is offset by half the difference between the line box and the
 *   dot, expressed in `em`. That centres it on the FIRST line at any font size,
 *   instead of the `items-baseline` + `translate-y-1.5` guess it replaces —
 *   which is what made markers sit visibly high or low from list to list. The
 *   1.625 factor is `leading-relaxed`, applied on the same element.
 *
 * List semantics stay real `ul`/`li`; the marker is decorative and hidden, and
 * the browser's default list padding is never relied on.
 */
const markerTones = {
  /** Default: the beige-gold ink, on cream and warm-white surfaces. */
  ink: "bg-sand-ink",
  /** Brand blue, for navy surfaces. */
  blue: "bg-blue",
  /** For text sitting over a photograph, where the ink would disappear. */
  cream: "bg-cream/80",
} as const;

export type BulletTone = keyof typeof markerTones;

/**
 * Half the difference between the line box and the marker, in `em`. Shared so
 * the icon-marked lists (reception services, included/excluded) centre their
 * 1rem icon on the first line by exactly the same rule the dots use.
 */
export const BULLET_MARKER_OFFSET = "mt-[calc((1.625em-0.375rem)/2)]";
export const ICON_MARKER_OFFSET = "mt-[calc((1.625em-1rem)/2)]";

/** Text column of an icon-marked row: 1rem marker track, then the text. */
export const ICON_LIST_ITEM =
  "grid grid-cols-[1rem_1fr] items-start gap-x-3 text-sm leading-relaxed";

export function BulletList({
  items,
  tone = "ink",
  className,
  itemClassName,
  markerClassName,
  spacing = true,
}: {
  items: readonly string[];
  tone?: BulletTone;
  className?: string;
  /** Extra classes per item — e.g. a bordered row or a colour over a photo. */
  itemClassName?: string;
  /**
   * Extra classes on the marker, applied after the tone. Its use is responsive
   * recolouring — a section that sits on a photograph on mobile but on a plain
   * surface on desktop needs two different marker colours.
   */
  markerClassName?: string;
  /**
   * Vertical rhythm between items. Turn off when the caller supplies its own
   * layout (a multi-column grid, or bordered rows that carry their own
   * padding), since `space-y` margins would fight both.
   */
  spacing?: boolean;
}) {
  return (
    <ul className={cn(spacing && "space-y-2.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "grid grid-cols-[0.375rem_1fr] items-start gap-x-3 text-sm leading-relaxed",
            itemClassName,
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              BULLET_MARKER_OFFSET,
              "size-1.5 rounded-full",
              markerTones[tone],
              markerClassName,
            )}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
