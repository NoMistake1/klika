"use client";

import { useRef, useState } from "react";
import type { SeatingZone } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { interpolate } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

/**
 * Seating zones.
 *
 * Mobile: a horizontally swipeable, snap-aligned carousel. The next card peeks
 * in from the right and the row carries the page gutter, so the first card
 * never touches the screen edge and the affordance is visible without a
 * scrollbar. Native scroll-snap does the physics: momentum, trackpads and
 * keyboard scrolling all work before any JavaScript runs — the only JS here
 * derives the active dot from the scroll position.
 *
 * Desktop keeps the expanding editorial strip: all three zones visible, the
 * hovered or focused one breathing wider.
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
  const [activeId, setActiveId] = useState<string>(zones[0]?.id ?? "");
  const [scrolledCard, setScrolledCard] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  /** Which card currently owns the snap position, derived from scrollLeft. */
  function onRowScroll() {
    const row = rowRef.current;
    if (!row || zones.length < 2) return;
    const progress = row.scrollLeft / (row.scrollWidth - row.clientWidth);
    setScrolledCard(Math.round(progress * (zones.length - 1)));
  }

  function scrollToCard(id: string) {
    cardRefs.current.get(id)?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
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
        {zones.map((zone) => {
          const isActive = zone.id === activeId;

          return (
            <button
              key={zone.id}
              ref={(node) => {
                if (node) cardRefs.current.set(zone.id, node);
                else cardRefs.current.delete(zone.id);
              }}
              type="button"
              onMouseEnter={() => setActiveId(zone.id)}
              onFocus={() => setActiveId(zone.id)}
              onClick={() => setActiveId(zone.id)}
              aria-pressed={isActive}
              className={cn(
                "group relative overflow-hidden rounded-lg bg-navy text-left text-cream",
                // Mobile card: snaps, next one peeks in.
                "h-[26rem] shrink-0 basis-[84%] snap-start sm:basis-[60%]",
                // Desktop: the breathing strip.
                "lg:h-full lg:basis-auto lg:snap-align-none",
                "lg:transition-[flex-grow] lg:duration-500 lg:ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                isActive ? "lg:grow-[3]" : "lg:grow",
              )}
            >
              <SafeImage
                image={zone.image}
                locale={locale}
                fill
                sizes="(min-width: 1024px) 50vw, 84vw"
                className={cn(
                  "transition-[opacity,transform] duration-700",
                  isActive ? "scale-100 opacity-80" : "scale-105 opacity-60",
                )}
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent"
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
                    "text-sm leading-relaxed text-cream/85 transition-opacity duration-500",
                    // Always readable on small screens; on desktop the copy
                    // belongs to the expanded zone.
                    isActive ? "opacity-100" : "opacity-100 lg:opacity-0",
                  )}
                >
                  {zone.description[locale]}
                </span>

                <span
                  className={cn(
                    "flex flex-wrap gap-x-3 gap-y-1 text-xs text-cream/60 transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                >
                  {zone.features[locale].map((feature) => (
                    <span key={feature} className="flex items-center gap-1.5">
                      <span aria-hidden="true" className="size-1 rounded-full bg-blue" />
                      {feature}
                    </span>
                  ))}
                </span>
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
            aria-current={dotIndex === scrolledCard ? "true" : undefined}
            className="inline-flex size-8 items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300",
                dotIndex === scrolledCard ? "w-6 bg-accent" : "w-1.5 bg-navy/30",
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
    </div>
  );
}
