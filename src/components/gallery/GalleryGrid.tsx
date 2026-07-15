"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Expand } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

/**
 * The lightbox is only ever needed after a click, so it is code-split out of
 * the initial gallery payload. `ssr: false` is correct here: it renders nothing
 * until opened and depends on browser-only APIs.
 */
const Lightbox = dynamic(
  () => import("@/components/gallery/Lightbox").then((mod) => mod.Lightbox),
  { ssr: false },
);

type Filter = GalleryCategory | "all";

/**
 * Editorial gallery grid.
 *
 * Not a uniform tile grid: the column span of each image follows its real
 * aspect ratio, so landscape photos run wide and portraits stay tall — a
 * masonry-like rhythm without a masonry library. Because every item declares
 * its intrinsic width and height, the reserved boxes are correct before the
 * images load and nothing shifts.
 */
export function GalleryGrid({
  items,
  categories,
  locale,
  dict,
  showFilter = true,
  swipeOnMobile = false,
}: {
  items: readonly GalleryItem[];
  categories: readonly GalleryCategory[];
  locale: Locale;
  dict: Dictionary;
  showFilter?: boolean;
  /**
   * Swipe sideways on phones instead of stacking. For previews embedded in a
   * page, where eight stacked images would push the rest of the page away.
   * The gallery page itself stays a grid — there, browsing everything at once
   * is the whole point.
   */
  swipeOnMobile?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const lastOpenedId = useRef<string | null>(null);

  const visible = filter === "all" ? items : items.filter((item) => item.category === filter);

  function open(index: number) {
    lastOpenedId.current = visible[index]?.id ?? null;
    setOpenIndex(index);
  }

  function close() {
    setOpenIndex(null);
    // Return focus to the thumbnail the guest came from.
    const id = lastOpenedId.current;
    if (id) triggerRefs.current.get(id)?.focus();
  }

  const filters: readonly Filter[] = ["all", ...categories];

  return (
    <div>
      {showFilter ? (
        <div
          role="group"
          aria-label={dict.gallery.filterLabel}
          className="scrollbar-none -mx-1 mb-10 flex snap-x gap-1 overflow-x-auto px-1"
        >
          {filters.map((category) => {
            const isActive = category === filter;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex min-h-11 shrink-0 snap-start items-center rounded-[2px] border px-4 text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "border-navy bg-navy text-warm-white"
                    : "border-current/20 hover:border-current/50",
                )}
              >
                {dict.gallery.categories[category]}
              </button>
            );
          })}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <div className="rule-t py-16 text-center">
          <p className="text-lg font-medium">{dict.gallery.empty}</p>
          <p className="mt-2 text-sm opacity-70">{dict.gallery.emptyHint}</p>
        </div>
      ) : (
        <ul
          className={cn(
            swipeOnMobile
              ? // Full-bleed swipe row on phones; the negative margin exactly
                // cancels the Container gutter, so it reaches the viewport edge
                // and never overflows the page.
                "scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scroll-padding-inline:1.25rem] sm:mx-0 sm:grid sm:overflow-x-visible sm:px-0 sm:pb-0"
              : "grid",
            "auto-rows-auto grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
          )}
        >
          {visible.map((item, index) => {
            const ratio = item.image.width / item.image.height;
            const isLandscape = ratio > 1.15;
            const isSquare = !isLandscape && ratio > 0.9;

            return (
              <li
                key={item.id}
                className={cn(
                  // Landscape images earn a double column on desktop; the
                  // resulting uneven rhythm is the point.
                  isLandscape ? "col-span-2" : "col-span-1",
                  swipeOnMobile && "snap-start shrink-0 basis-[72%] sm:basis-auto",
                  "group relative",
                )}
              >
                <button
                  ref={(node) => {
                    if (node) triggerRefs.current.set(item.id, node);
                    else triggerRefs.current.delete(item.id);
                  }}
                  type="button"
                  onClick={() => open(index)}
                  className="relative block w-full overflow-hidden bg-cream"
                >
                  <span
                    className={cn(
                      "block w-full",
                      isLandscape ? "aspect-[4/3]" : isSquare ? "aspect-square" : "aspect-[4/5]",
                    )}
                  >
                    <SafeImage
                      image={item.image}
                      locale={locale}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute right-3 bottom-3 inline-flex size-8 translate-y-1 items-center justify-center rounded-[2px] bg-cream/90 text-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  >
                    <Expand className="size-3.5" />
                  </span>

                  <span className="sr-only">
                    {dict.gallery.openImage}: {item.caption[locale]}
                  </span>
                </button>

                <p className="mt-2 text-xs opacity-55">{item.caption[locale]}</p>
              </li>
            );
          })}
        </ul>
      )}

      {openIndex !== null ? (
        <Lightbox
          items={visible}
          startIndex={openIndex}
          locale={locale}
          dict={dict}
          onClose={close}
        />
      ) : null}
    </div>
  );
}
