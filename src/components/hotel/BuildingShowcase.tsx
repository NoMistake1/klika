"use client";

import { useRef, useState } from "react";
import type { AccommodationArea } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { interpolate } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { BackgroundPhoto } from "@/components/ui/BackgroundPhoto";
import { BulletList } from "@/components/ui/BulletList";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Where you will stay — the four buildings, as editorial photo panels.
 *
 * Each panel carries its building's photograph full-bleed behind the copy
 * rather than stacking a picture above a text block. The photographs are
 * decorative (`alt=""`), so every fact — the name, the description and the
 * bullet list — stays in real text, in real headings, exactly as before.
 *
 * Legibility over four different photographs comes from two stacked layers: a
 * flat navy tint that levels them out, and a bottom-anchored gradient that goes
 * essentially opaque under the copy. That keeps the top two-thirds of each
 * photograph visible while the cream text below it clears AA comfortably.
 *
 * Mobile is a scroll-snap carousel, same mechanics as the restaurant zones:
 * native scrolling does the physics, the next card peeks in, and the dots below
 * both report and control the position. `touch-action` is left permissive on
 * purpose — restricting it to `pan-x` would make a slightly diagonal swipe over
 * a card refuse to scroll the page, which is exactly the trapping we don't
 * want. Desktop drops the scroller for a balanced 2×2 grid.
 */
export function BuildingShowcase({
  areas,
  locale,
  dict,
}: {
  areas: readonly AccommodationArea[];
  locale: Locale;
  dict: Dictionary;
}) {
  /** Mobile only: the card currently occupying the centre of the swipe row. */
  const [centredCard, setCentredCard] = useState(0);
  const rowRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  /**
   * Which card owns the viewport, measured rather than interpolated: the one
   * whose centre is nearest the row's centre. Comparing rects (not scrollLeft
   * ratios) stays correct with the peeking card and the scroll padding.
   */
  function onRowScroll() {
    const row = rowRef.current;
    if (!row || areas.length < 2) return;

    const rowRect = row.getBoundingClientRect();
    const rowCentre = rowRect.left + rowRect.width / 2;

    let nearest = 0;
    let smallest = Infinity;
    areas.forEach((area, index) => {
      const card = cardRefs.current.get(area.id);
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

  return (
    <div>
      <ol
        ref={rowRef}
        onScroll={onRowScroll}
        className={cn(
          // Mobile swipe row: full-bleed against the Container gutter, with the
          // same gutter as scroll padding so the first card still lines up with
          // the page margin and the last one keeps a right margin.
          "scrollbar-none -mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5",
          // Pin the vertical axis, rather than leaving it the `visible` that
          // `overflow-x: auto` would silently promote to `auto`. Until a card
          // reveals it sits 1.5rem lower (the .reveal utility's translate3d),
          // which made the row genuinely scrollable by 24px vertically — a
          // scroller inside the page that swallows an upward swipe. Browsers
          // normalise `clip` to `hidden` when the other axis scrolls; either
          // computed value keeps the horizontal scroller and refuses vertical
          // scroll gestures, which is the behaviour being bought here.
          "overflow-y-clip [scroll-padding-inline:1.25rem]",
          // Equivalent to `manipulation`, spelled out: horizontal swipes drive
          // the row, vertical ones fall through to the page, and pinch-zoom is
          // explicitly kept rather than being collateral of a `pan-x` lockdown.
          "[touch-action:pan-x_pan-y_pinch-zoom]",
          // Desktop: a balanced 2×2 grid. `overflow-visible` retires the
          // scroller entirely so no stray horizontal scrolling survives.
          "md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0",
        )}
      >
        {areas.map((area, index) => (
          <Reveal
            key={area.id}
            as="li"
            delay={index * 60}
            elementRef={(node) => {
              if (node) cardRefs.current.set(area.id, node);
              else cardRefs.current.delete(area.id);
            }}
            className={cn(
              "relative flex flex-col justify-end overflow-hidden bg-navy text-cream",
              // Card sizing. `basis-[85vw]` is measured against the viewport, so
              // the card lands squarely in the 82–88vw the design calls for at
              // every phone width, and the next one peeks past the gutter.
              "min-h-[30rem] shrink-0 basis-[85vw] snap-start",
              "md:min-h-[26rem] md:basis-auto lg:min-h-[28rem]",
            )}
          >
            <BackgroundPhoto
              src={area.photo.src}
              width={area.photo.width}
              height={area.photo.height}
              mobileSrc={area.photo.mobileSrc}
              mobileWidth={area.photo.mobileWidth}
              mobileHeight={area.photo.mobileHeight}
              mobileBreakpoint="(max-width: 767px)"
              sizes="(min-width: 768px) 50vw, 85vw"
              className={area.photo.imgClassName}
            />

            {/* Two layers, not one heavy scrim: the flat tint evens out four
                photographs shot in different light, the gradient does the
                actual contrast work under the copy. Measured over the
                brightest of the four, the cream text clears 6:1. */}
            <span aria-hidden="true" className="absolute inset-0 bg-navy/20" />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/30"
            />

            <div className="relative p-6 sm:p-7">
              <p aria-hidden="true" className="font-display text-3xl leading-none text-blue">
                {`0${index + 1}`}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-pretty">{area.name[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">
                {area.description[locale]}
              </p>
              <BulletList
                items={area.details[locale]}
                tone="cream"
                className="mt-4"
                itemClassName="text-cream/85"
              />
            </div>
          </Reveal>
        ))}
      </ol>

      {/* Pagination for the mobile swipe row only — the desktop grid shows all
          four at once, so dots there would report nothing. */}
      <div className="mt-4 flex items-center justify-center md:hidden">
        {areas.map((area, dotIndex) => (
          <button
            key={area.id}
            type="button"
            onClick={() => scrollToCard(area.id)}
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
              {area.name[locale]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
