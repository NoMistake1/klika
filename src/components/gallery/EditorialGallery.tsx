"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GalleryGroup, GalleryItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { interpolate } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

/** Loaded only once a guest opens an image — kept out of the initial payload. */
const Lightbox = dynamic(
  () => import("@/components/gallery/Lightbox").then((mod) => mod.Lightbox),
  { ssr: false },
);

/**
 * Landing-page gallery: an irregular, horizontally swipeable strip of editorial
 * groups. Each group is one tall lead image beside two stacked images — never a
 * uniform grid. Groups alternate which side the lead sits on, so the rhythm is
 * asymmetric. Corners are sharp and there are no captions on the thumbnails
 * (alt text is preserved); clicking any image opens the shared lightbox.
 *
 * Scrolling is native scroll-snap, bounded by this component, so it never adds
 * page-level horizontal overflow. Only the lead image of the first group is
 * eager — everything else is lazy.
 */
export function EditorialGallery({
  groups,
  items,
  locale,
  dict,
}: {
  groups: readonly GalleryGroup[];
  /** Flat item list, in render order, for the lightbox. */
  items: readonly GalleryItem[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Map<string, HTMLElement>>(new Map());
  const triggerRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const lastOpened = useRef<number | null>(null);

  function open(index: number) {
    lastOpened.current = index;
    setOpenIndex(index);
  }

  function close() {
    setOpenIndex(null);
    if (lastOpened.current !== null) triggerRefs.current.get(lastOpened.current)?.focus();
  }

  function onStripScroll() {
    const strip = stripRef.current;
    if (!strip || groups.length < 2) return;
    const progress = strip.scrollLeft / (strip.scrollWidth - strip.clientWidth);
    setActiveGroup(Math.round(progress * (groups.length - 1)));
  }

  function scrollToGroup(id: string) {
    groupRefs.current.get(id)?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  function step(delta: number) {
    const next = Math.min(Math.max(activeGroup + delta, 0), groups.length - 1);
    const target = groups[next];
    if (target) scrollToGroup(target.id);
  }

  /** Global index of an item within the flat list, for the lightbox. */
  const flatIndex = (groupIndex: number, slot: number) => groupIndex * 3 + slot;

  return (
    <div>
      <div
        ref={stripRef}
        onScroll={onStripScroll}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scroll-padding-inline:0]"
      >
        {groups.map((group, groupIndex) => {
          const leadRight = groupIndex % 2 === 1;

          return (
            <div
              key={group.id}
              ref={(node) => {
                if (node) groupRefs.current.set(group.id, node);
                else groupRefs.current.delete(group.id);
              }}
              className="flex h-[21rem] shrink-0 basis-[88%] snap-start gap-3 sm:h-[26rem] sm:basis-[82%] lg:h-[31rem] lg:basis-[64%]"
            >
              {/* Lead image, full height. */}
              <GalleryTile
                item={group.large}
                locale={locale}
                dict={dict}
                priority={groupIndex === 0}
                onOpen={() => open(flatIndex(groupIndex, 0))}
                registerTrigger={(node) =>
                  registerAt(triggerRefs, flatIndex(groupIndex, 0), node)
                }
                className={cn("h-full basis-[58%]", leadRight && "order-2")}
                sizes="(min-width: 1024px) 24rem, 55vw"
              />

              {/* Two stacked images; together they equal the lead's height. */}
              <div className="flex h-full basis-[42%] flex-col gap-3">
                {group.stacked.map((item, slot) => (
                  <GalleryTile
                    key={item.id}
                    item={item}
                    locale={locale}
                    dict={dict}
                    onOpen={() => open(flatIndex(groupIndex, slot + 1))}
                    registerTrigger={(node) =>
                      registerAt(triggerRefs, flatIndex(groupIndex, slot + 1), node)
                    }
                    className="min-h-0 flex-1"
                    sizes="(min-width: 1024px) 18rem, 40vw"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle navigation: centred progress dots, plus arrows from lg up. */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={activeGroup === 0}
          className="hidden size-10 items-center justify-center rounded-full border border-navy/20 transition-colors hover:border-navy/60 disabled:opacity-30 lg:inline-flex"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span className="sr-only">{dict.a11y.previous}</span>
        </button>

        <div className="flex items-center">
          {groups.map((group, groupIndex) => (
            <button
              key={group.id}
              type="button"
              onClick={() => scrollToGroup(group.id)}
              aria-current={groupIndex === activeGroup ? "true" : undefined}
              className="inline-flex size-8 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  groupIndex === activeGroup ? "w-6 bg-accent" : "w-1.5 bg-navy/30",
                )}
              />
              <span className="sr-only">
                {interpolate(dict.a11y.slideOf, {
                  current: groupIndex + 1,
                  total: groups.length,
                })}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          disabled={activeGroup === groups.length - 1}
          className="hidden size-10 items-center justify-center rounded-full border border-navy/20 transition-colors hover:border-navy/60 disabled:opacity-30 lg:inline-flex"
        >
          <ArrowRight aria-hidden="true" className="size-4" />
          <span className="sr-only">{dict.a11y.next}</span>
        </button>
      </div>

      {openIndex !== null ? (
        <Lightbox
          items={items}
          startIndex={openIndex}
          locale={locale}
          dict={dict}
          onClose={close}
        />
      ) : null}
    </div>
  );
}

function registerAt(
  map: React.RefObject<Map<number, HTMLButtonElement>>,
  index: number,
  node: HTMLButtonElement | null,
) {
  if (node) map.current.set(index, node);
  else map.current.delete(index);
}

/** One image in the strip — sharp corners, no caption, opens the lightbox. */
function GalleryTile({
  item,
  locale,
  dict,
  onOpen,
  registerTrigger,
  className,
  sizes,
  priority = false,
}: {
  item: GalleryItem;
  locale: Locale;
  dict: Dictionary;
  onOpen: () => void;
  registerTrigger: (node: HTMLButtonElement | null) => void;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <button
      ref={registerTrigger}
      type="button"
      onClick={onOpen}
      className={cn("group relative overflow-hidden bg-cream", className)}
    >
      <SafeImage
        image={item.image}
        locale={locale}
        fill
        sizes={sizes}
        priority={priority}
        className="transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
      />
      {/* No caption text — a faint scrim on hover only, for affordance. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/10"
      />
      <span className="sr-only">
        {dict.gallery.openImage}: {item.caption[locale]}
      </span>
    </button>
  );
}
