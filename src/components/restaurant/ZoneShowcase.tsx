"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import type { GalleryItem, SeatingZone } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { interpolate } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

/**
 * The same viewer the gallery uses, code-split the same way — it only arrives
 * once a guest actually opens a zone.
 */
const Lightbox = dynamic(
  () => import("@/components/gallery/Lightbox").then((mod) => mod.Lightbox),
  { ssr: false },
);

/**
 * Seating zones.
 *
 * Mobile: a horizontally swipeable, snap-aligned carousel. The next card peeks
 * in from the right and the row carries the page gutter, so the first card
 * never touches the screen edge and the affordance is visible without a
 * scrollbar. Native scroll-snap does the physics: momentum, trackpads and
 * keyboard scrolling all work before any JavaScript runs.
 *
 * The card the guest has swiped to is the active one. That matters because
 * almost nobody taps these cards — they swipe — so tying the lit state to a
 * click would leave the card they are actually looking at sitting dark. The
 * active card is derived from whichever one is nearest the row's centre, and it
 * gets exactly the same treatment the desktop hover state gives.
 *
 * Desktop keeps the expanding editorial strip: all three zones visible, the
 * hovered or focused one breathing wider.
 *
 * On both, activating a card opens the shared gallery lightbox on these three
 * photographs — same swipe, arrows, keyboard, Escape and click-outside.
 *
 * A stylized presentation, not an architectural plan — the supplied material
 * gives seat counts and character, not a survey. The garden, whose capacity
 * was never stated, shows none.
 */
export function ZoneShowcase({
  zones,
  locale,
  dict,
}: {
  zones: readonly SeatingZone[];
  locale: Locale;
  dict: Dictionary;
}) {
  /** Desktop: the hovered/focused zone. Mobile ignores this. */
  const [hoveredId, setHoveredId] = useState<string>(zones[0]?.id ?? "");
  /** Mobile: the card currently occupying the centre of the swipe row. */
  const [centredCard, setCentredCard] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());
  const lastOpenedId = useRef<string | null>(null);

  /** The three zone photographs, in the shape the shared lightbox expects. */
  const lightboxItems = useMemo<readonly GalleryItem[]>(
    () =>
      zones.map((zone) => ({
        id: zone.id,
        category: "restaurant" as const,
        image: zone.image,
        caption: zone.description,
      })),
    [zones],
  );

  /**
   * Which card owns the viewport, measured rather than interpolated: the one
   * whose centre is nearest the row's centre. Comparing rects (not scrollLeft
   * ratios) stays correct with the peeking card and the scroll padding.
   */
  function onRowScroll() {
    const row = rowRef.current;
    if (!row || zones.length < 2) return;

    const rowRect = row.getBoundingClientRect();
    const rowCentre = rowRect.left + rowRect.width / 2;

    let nearest = 0;
    let smallest = Infinity;
    zones.forEach((zone, index) => {
      const card = cardRefs.current.get(zone.id);
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const distance = Math.abs(cardRect.left + cardRect.width / 2 - rowCentre);
      if (distance < smallest) {
        smallest = distance;
        nearest = index;
      }
    });

    setCentredCard(nearest);
  }

  function scrollToCard(id: string) {
    cardRefs.current.get(id)?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  function openLightbox(index: number) {
    lastOpenedId.current = zones[index]?.id ?? null;
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
    const id = lastOpenedId.current;
    if (id) cardRefs.current.get(id)?.focus();
  }

  return (
    <div>
      <div
        ref={rowRef}
        onScroll={onRowScroll}
        className={cn(
          // Mobile swipe row: full-bleed against the Container gutter, with the
          // same gutter as scroll padding so cards align to the page margin.
          "scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5",
          "[scroll-padding-inline:1.25rem]",
          // Desktop: the expanding strip, no horizontal scrolling.
          "lg:mx-0 lg:h-[30rem] lg:snap-none lg:gap-3 lg:overflow-visible lg:px-0",
        )}
      >
        {zones.map((zone, index) => {
          // Two independent notions of "active": the swiped-to card drives the
          // phone, the hovered/focused one drives the desktop strip. Each is
          // applied at its own breakpoint, so neither leaks into the other.
          const isCentred = index === centredCard;
          const isHovered = zone.id === hoveredId;

          return (
            <button
              key={zone.id}
              ref={(node) => {
                if (node) cardRefs.current.set(zone.id, node);
                else cardRefs.current.delete(zone.id);
              }}
              type="button"
              onMouseEnter={() => setHoveredId(zone.id)}
              onFocus={() => setHoveredId(zone.id)}
              onClick={() => openLightbox(index)}
              aria-haspopup="dialog"
              className={cn(
                "group relative overflow-hidden rounded-lg bg-navy text-left text-cream",
                // Mobile card: snaps, next one peeks in.
                "h-[26rem] shrink-0 basis-[84%] snap-start sm:basis-[60%]",
                // Desktop: the breathing strip.
                "lg:h-full lg:basis-auto lg:snap-align-none",
                "lg:transition-[flex-grow] lg:duration-500 lg:ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                isHovered ? "lg:grow-[3]" : "lg:grow",
              )}
            >
              <SafeImage
                image={zone.image}
                locale={locale}
                fill
                sizes="(min-width: 1024px) 50vw, 84vw"
                className={cn(
                  // `scale`, not `transform`: Tailwind v4's scale-* utilities
                  // set the individual `scale` property, so listing `transform`
                  // here left the zoom snapping instantly while only the opacity
                  // eased. Both are compositor-only properties, so this stays
                  // cheap — no layout is animated.
                  "transition-[opacity,scale] duration-700",
                  // Phone: the swiped-to card lights up.
                  isCentred ? "scale-100 opacity-80" : "scale-105 opacity-60",
                  // Desktop overrides it with the hover/focus state.
                  isHovered
                    ? "lg:scale-100 lg:opacity-80"
                    : "lg:scale-105 lg:opacity-60",
                )}
              />

              {/* Shorter gradient, anchored to the bottom, so more of the
                  photograph stays visible now the bullet list is gone. Left
                  untouched by the active state on purpose: the swiped-to card
                  must look exactly like a clicked one, and clicking only ever
                  changed the photograph. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-navy via-navy/55 to-transparent"
              />

              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:p-6">
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-2xl sm:text-3xl">{zone.name[locale]}</span>
                  {zone.seats !== null ? (
                    <span className="text-sm text-blue tabular-nums">
                      {zone.seats} {dict.zones.seats}
                    </span>
                  ) : (
                    <span className="text-sm text-blue">{dict.zones.seasonal}</span>
                  )}
                </span>

                <span
                  className={cn(
                    "text-sm leading-relaxed text-cream/90 transition-opacity duration-500",
                    // Always readable on small screens; on desktop the copy
                    // belongs to the expanded zone.
                    isHovered ? "opacity-100" : "opacity-100 lg:opacity-0",
                  )}
                >
                  {zone.description[locale]}
                </span>
              </span>

              <span className="sr-only">
                {dict.gallery.openImage}: {zone.name[locale]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pagination for the mobile swipe row only — desktop shows all three. */}
      <div className="mt-4 flex items-center justify-center lg:hidden">
        {zones.map((zone, dotIndex) => (
          <button
            key={zone.id}
            type="button"
            onClick={() => scrollToCard(zone.id)}
            aria-current={dotIndex === centredCard ? "true" : undefined}
            className="inline-flex size-8 items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300",
                dotIndex === centredCard ? "w-6 bg-accent" : "w-1.5 bg-navy/30",
              )}
            />
            <span className="sr-only">
              {interpolate(dict.a11y.goToSlide, { index: dotIndex + 1 })}
              {": "}
              {zone.name[locale]}
            </span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          items={lightboxItems}
          startIndex={lightboxIndex}
          locale={locale}
          dict={dict}
          onClose={closeLightbox}
        />
      ) : null}
    </div>
  );
}
