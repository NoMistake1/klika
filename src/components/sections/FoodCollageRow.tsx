"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { LocalizedText } from "@/types";
import { landingFoodLightboxItems } from "@/content/gallery";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The same viewer the galleries use, code-split the same way — it only arrives
 * once a guest actually opens a photograph.
 */
const Lightbox = dynamic(
  () => import("@/components/gallery/Lightbox").then((mod) => mod.Lightbox),
  { ssr: false },
);

export type CollagePhoto = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  /** Wrapper geometry: mobile size/offset, then the desktop editorial step. */
  wrap: string;
  sizes: string;
};

/**
 * The three-image editorial row of the landing collage, and the only
 * interactive part of it — hence the one client component in the section.
 *
 * Each photograph opens the shared gallery lightbox on a curated run of fifteen
 * food images, starting on the one that was clicked. The extra twelve exist
 * only inside the viewer: the collage itself still renders exactly three, and
 * gains no arrows, dots or carousel of its own.
 *
 * The lightbox brings its own keyboard, swipe, Escape, click-outside, focus
 * trap and neighbour-only preloading. What it can't know is where focus came
 * from, so the opening button is remembered here and refocused on close.
 */
export function FoodCollageRow({
  photos,
  locale,
  dict,
}: {
  photos: readonly CollagePhoto[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const frameRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const lastOpenedSrc = useRef<string | null>(null);

  /**
   * Where each collage photograph sits in the curated run. Resolved by source
   * rather than hardcoded, so reordering either list can't silently open the
   * viewer on the wrong picture.
   */
  const startIndexBySrc = useMemo(() => {
    const map = new Map<string, number>();
    for (const photo of photos) {
      const index = landingFoodLightboxItems.findIndex(
        (entry) => entry.image.src === photo.src,
      );
      if (index >= 0) map.set(photo.src, index);
    }
    return map;
  }, [photos]);

  function openLightbox(src: string) {
    const index = startIndexBySrc.get(src);
    if (index === undefined) return;
    lastOpenedSrc.current = src;
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
    const src = lastOpenedSrc.current;
    if (src) frameRefs.current.get(src)?.focus();
  }

  return (
    <>
      {/* Three-image editorial row. `overflow-hidden` is on each inner frame,
          not the wrapper, so the Caveat notes can sit above the images without
          being clipped. Sharp corners and a restrained float shadow. */}
      {/* Desktop drops the whole row a little further below the header —
          applied to the row, not the individual wrappers, so each image keeps
          its own editorial offset and the middle image keeps its note. */}
      <Reveal className="mt-12 flex flex-wrap gap-4 lg:mt-24 lg:flex-nowrap lg:items-center lg:gap-6">
        {photos.map((photo, index) => (
          <div key={photo.src} className={`relative shrink-0 ${photo.wrap}`}>
            <button
              type="button"
              ref={(node) => {
                if (node) frameRefs.current.set(photo.src, node);
                else frameRefs.current.delete(photo.src);
              }}
              onClick={() => openLightbox(photo.src)}
              aria-haspopup="dialog"
              className="group relative block h-full w-full cursor-pointer overflow-hidden bg-cream shadow-[0_20px_45px_-28px_rgba(10,26,49,0.5)]"
            >
              <SafeImage
                image={{
                  src: photo.src,
                  alt: photo.alt,
                  width: photo.width,
                  height: photo.height,
                }}
                locale={locale}
                fill
                sizes={photo.sizes}
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
              />
              <span className="sr-only">
                {dict.gallery.openImage}: {photo.alt[locale]}
              </span>
            </button>

            {/* Desktop: one note centred above the middle image, arrow down. */}
            {index === 1 ? (
              <div className="absolute -top-14 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
                <HandwrittenNote arrow="downRight" className="whitespace-nowrap">
                  {dict.foodCollage.note}
                </HandwrittenNote>
              </div>
            ) : null}

            {/* Mobile: one note in the gap above the lower-right image. The
                wrapper spans exactly that image's column (inset-x-0) and
                centres the note over it, so the composition stays balanced on
                the image and can never reach across into its neighbour. The
                whole note is set on a slight diagonal — handwriting, not a
                label — and the arrow is steepened so it points down into the
                photograph rather than sideways. Text wraps to two lines here,
                which is what keeps it inside the column. */}
            {index === 2 ? (
              <div className="absolute inset-x-0 -top-16 z-10 flex -rotate-6 justify-center max-[451px]:-top-20 lg:hidden">
                {/* Narrow phones (450px and below) only: the note is pulled up
                    into the gap, and the max-widths keep the whole composition
                    clear of the left-hand image — tighter again at 360px and
                    below, where the column is narrowest.

                    The bounds read 451/361 because Tailwind's `max-*` variant
                    compiles to `width < n`, so the named width itself would
                    otherwise fall outside the rule. Keeping them in the
                    `max-*` family matters: Tailwind sorts those descending, so
                    the narrower rule reliably wins on the smallest screens. */}
                {/* downLeft is the exact horizontal mirror of the desktop
                    note's downRight: the shared arrow flips on its own axis AND
                    moves to the left of the text, which pushes the words right
                    and brings the arrow in toward the centre of the row. The
                    tilt is negated to match — for mirrored arrows CSS scales
                    before it rotates, so −34° reproduces the +34° descent
                    exactly, just handed the other way. Left-aligned lines keep
                    the text hugging the arrow, and with the arrow bottom-
                    aligned it leaves the text around the "Sezónně / poctivě"
                    break and runs down into the photograph's top-left corner. */}
                <HandwrittenNote
                  arrow="downLeft"
                  tilt={-34}
                  // `self-center` rather than a competing items-* or margin
                  // class: it is the only align-self rule on the arrow, so it
                  // deterministically overrides the note's items-end and lifts
                  // the arrow to begin around the "Sezónně / poctivě" break
                  // instead of level with the second line.
                  arrowClassName="max-[451px]:self-center"
                  className="max-[451px]:max-w-[11.5rem] max-[451px]:text-left max-[361px]:max-w-[9.5rem]"
                >
                  {dict.foodCollage.note}
                </HandwrittenNote>
              </div>
            ) : null}
          </div>
        ))}
      </Reveal>

      {lightboxIndex !== null ? (
        <Lightbox
          items={landingFoodLightboxItems}
          startIndex={lightboxIndex}
          locale={locale}
          dict={dict}
          onClose={closeLightbox}
        />
      ) : null}
    </>
  );
}
