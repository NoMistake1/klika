"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { interpolate } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { useFocusTrap, useScrollLock } from "@/lib/use-focus-trap";

const SWIPE_THRESHOLD_PX = 50;

/**
 * Fullscreen image viewer.
 *
 * Loaded via dynamic import, so its weight lands only when a guest actually
 * opens an image rather than on every gallery page view.
 *
 * Behaviour: Escape and click-outside close, ArrowLeft/ArrowRight navigate,
 * touch swipes navigate, focus is trapped inside and restored to the thumbnail
 * on close, and background scrolling is locked. Only the neighbouring images
 * are preloaded — never the whole set.
 */
export function Lightbox({
  items,
  startIndex,
  locale,
  dict,
  onClose,
}: {
  items: readonly GalleryItem[];
  startIndex: number;
  locale: Locale;
  dict: Dictionary;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = items.length;
  const current = items[index];

  const goTo = useCallback((next: number) => setIndex((next + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  useFocusTrap({ active: true, containerRef: dialogRef, onEscape: onClose });
  useScrollLock(true);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [next, previous]);

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: React.TouchEvent) {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined) return;

    const delta = end - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta < 0) next();
    else previous();
  }

  if (!current) return null;

  const counter = interpolate(dict.a11y.imageOf, { current: index + 1, total: count });

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={dict.gallery.lightboxLabel}
      // Above every other layer, including the sticky header and intro screen.
      className="fixed inset-0 z-[120] flex flex-col bg-navy/95 backdrop-blur-sm"
    >
      {/* Click-outside target. Sits behind the content, so clicks on the image
          or controls never bubble into a close. */}
      <button
        type="button"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 size-full cursor-zoom-out"
      />

      <header className="relative flex items-center justify-between gap-4 px-4 py-3 text-cream sm:px-6">
        <p className="text-xs tracking-wider tabular-nums opacity-70">
          <span aria-hidden="true">
            {index + 1} / {count}
          </span>
          <span className="sr-only">{counter}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center rounded-[2px] transition-colors hover:bg-cream/10"
        >
          <X aria-hidden="true" className="size-5" />
          <span className="sr-only">{dict.a11y.close}</span>
        </button>
      </header>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16"
      >
        <div className="relative size-full">
          <Image
            key={current.id}
            src={current.image.src}
            alt={current.image.alt[locale]}
            fill
            sizes="100vw"
            quality={85}
            priority
            className="animate-fade-in object-contain"
          />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={previous}
              className="absolute left-1 inline-flex size-11 items-center justify-center rounded-[2px] bg-navy/60 text-cream transition-colors hover:bg-navy sm:left-3 sm:size-12"
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
              <span className="sr-only">{dict.a11y.previous}</span>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-1 inline-flex size-11 items-center justify-center rounded-[2px] bg-navy/60 text-cream transition-colors hover:bg-navy sm:right-3 sm:size-12"
            >
              <ArrowRight aria-hidden="true" className="size-5" />
              <span className="sr-only">{dict.a11y.next}</span>
            </button>
          </>
        ) : null}
      </div>

      <footer className="relative px-4 py-4 text-center sm:px-6 sm:py-5">
        <p className="mx-auto max-w-2xl text-sm text-cream/85 text-pretty">
          {current.caption[locale]}
        </p>
      </footer>

      {/* Only the neighbours are prefetched — never the whole gallery. */}
      <div aria-hidden="true" className="sr-only">
        {[items[(index + 1) % count], items[(index - 1 + count) % count]].map((item) =>
          item && item.id !== current.id ? (
            <Image
              key={`preload-${item.id}`}
              src={item.image.src}
              alt=""
              width={16}
              height={16}
              quality={85}
            />
          ) : null,
        )}
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {counter}: {current.caption[locale]}
      </div>
    </div>
  );
}
