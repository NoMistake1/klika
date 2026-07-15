"use client";

import { useState } from "react";
import type { SeatingZone } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

/**
 * Seating zones.
 *
 * A stylized presentation, not an architectural plan: the supplied material
 * gives seat counts and character, not a survey, so drawing an accurate floor
 * plan would be an invention. Instead each zone gets a photo, a label and its
 * real capacity — and the garden, whose capacity was never stated, simply
 * shows none.
 *
 * Interaction is progressive: all three zones are fully readable as a stacked
 * list, and on larger screens they expand horizontally on hover or focus.
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

  return (
    <div className="flex flex-col gap-3 lg:h-[30rem] lg:flex-row">
      {zones.map((zone) => {
        const isActive = zone.id === activeId;

        return (
          <button
            key={zone.id}
            type="button"
            onMouseEnter={() => setActiveId(zone.id)}
            onFocus={() => setActiveId(zone.id)}
            onClick={() => setActiveId(zone.id)}
            aria-pressed={isActive}
            className={cn(
              "group relative overflow-hidden bg-navy text-left text-cream",
              "transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
              "h-56 w-full lg:h-full",
              isActive ? "lg:grow-[3]" : "lg:grow",
            )}
          >
            <SafeImage
              image={zone.image}
              locale={locale}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cn(
                "transition-[opacity,transform] duration-700",
                isActive ? "scale-100 opacity-70" : "scale-105 opacity-40",
              )}
            />

            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent"
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
                  "text-sm leading-relaxed text-cream/80 transition-opacity duration-500",
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
  );
}
