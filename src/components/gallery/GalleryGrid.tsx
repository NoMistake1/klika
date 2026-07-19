"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Expand } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
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

/** How many photographs render before the guest asks for more. */
const INITIAL_COUNT = 18;
const BATCH_COUNT = 18;

/**
 * Desktop rhythm over a six-column grid. Each bracketed run sums to exactly six,
 * so rows are always flush — the composition is irregular without leaving holes:
 *   [3 3] [2 2 2] [4 2] [2 4] [3 3] [2 2 2]
 */
type Span = 2 | 3 | 4;
const DESKTOP_SPANS: readonly Span[] = [3, 3, 2, 2, 2, 4, 2, 2, 4, 3, 3, 2, 2, 2];

/**
 * Each span carries the aspect ratio that makes every tile in a row the same
 * height (a span-2 portrait sets the height; 3 and 4 follow from it). That is
 * what keeps the irregular grid gap-free while still mixing portrait and
 * landscape shapes.
 */
const SPAN_CLASSES: Record<Span, string> = {
  2: "lg:col-span-2 lg:aspect-[3/4]",
  3: "lg:col-span-3 lg:aspect-[9/8]",
  4: "lg:col-span-4 lg:aspect-[3/2]",
};

const SPAN_SIZES: Record<Span, string> = {
  2: "(min-width: 1024px) 33vw, 50vw",
  3: "(min-width: 1024px) 50vw, 100vw",
  4: "(min-width: 1024px) 67vw, 100vw",
};

/**
 * Editorial gallery grid.
 *
 * Not a uniform tile grid: on desktop the images run across a six-column field
 * in a repeating irregular rhythm, and on mobile every fifth photograph takes
 * the full width while the rest pair off — so the page reads as edited groups
 * rather than an endless ladder of identical thumbnails.
 *
 * Only the first batch renders; the rest arrive on request, so a gallery of
 * seventy photographs never asks the browser to lay out seventy images at once.
 * Every tile reserves its box from the declared aspect ratio, so nothing shifts
 * as images arrive, and thumbnails carry no permanent caption — the photograph
 * is the content, and its description lives in the alt text and the lightbox.
 */
export function GalleryGrid({
  items,
  categories,
  locale,
  dict,
  showFilter = true,
}: {
  items: readonly GalleryItem[];
  categories: readonly GalleryCategory[];
  locale: Locale;
  dict: Dictionary;
  showFilter?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(INITIAL_COUNT);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const lastOpenedId = useRef<string | null>(null);

  const matching = filter === "all" ? items : items.filter((item) => item.category === filter);
  // `visible` is always a prefix of `matching`, so an index is valid in both —
  // which lets the lightbox browse the whole category, not just what is drawn.
  const visible = matching.slice(0, shown);
  const remaining = matching.length - visible.length;

  function choose(next: Filter) {
    setFilter(next);
    setShown(INITIAL_COUNT);
  }

  function open(index: number) {
    lastOpenedId.current = matching[index]?.id ?? null;
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
                onClick={() => choose(category)}
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
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {visible.map((item, index) => {
            const span = DESKTOP_SPANS[index % DESKTOP_SPANS.length] ?? 2;
            // Every fifth photograph runs full width on a phone; the rest pair
            // off two-up, so mobile reads as groups rather than one long list.
            const wideOnMobile = index % 5 === 0;

            return (
              <li
                key={item.id}
                className={cn(
                  "group relative",
                  wideOnMobile ? "col-span-2 aspect-[4/3]" : "col-span-1 aspect-[3/4]",
                  SPAN_CLASSES[span],
                )}
              >
                <button
                  ref={(node) => {
                    if (node) triggerRefs.current.set(item.id, node);
                    else triggerRefs.current.delete(item.id);
                  }}
                  type="button"
                  onClick={() => open(index)}
                  className="relative block size-full overflow-hidden bg-cream"
                >
                  <SafeImage
                    image={item.image}
                    locale={locale}
                    fill
                    sizes={SPAN_SIZES[span]}
                    className="transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
                  />

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
              </li>
            );
          })}
        </ul>
      )}

      {/* Progressive reveal — the rest of the category on request. */}
      {remaining > 0 ? (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShown((count) => count + BATCH_COUNT)}
            aria-label={`${dict.gallery.loadMore} (${remaining})`}
          >
            {dict.gallery.loadMore}
            <span aria-hidden="true" className="opacity-60">
              {remaining}
            </span>
          </Button>
        </div>
      ) : matching.length > INITIAL_COUNT ? (
        <p className="mt-10 text-center text-sm opacity-55">{dict.gallery.allShown}</p>
      ) : null}

      {openIndex !== null ? (
        <Lightbox
          items={matching}
          startIndex={openIndex}
          locale={locale}
          dict={dict}
          onClose={close}
        />
      ) : null}
    </div>
  );
}
