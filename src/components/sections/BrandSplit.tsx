import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { DecorImage } from "@/components/ui/DecorImage";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";

/**
 * The two Klika worlds.
 *
 * Not two matching cards: the hotel block leads with a tall image on the left
 * and the restaurant block reverses and overlaps it, carrying their own colour
 * worlds — light blue for the hotel, cream and navy for the restaurant. Each
 * content box is vertically centred on its photograph (lg:items-center) and
 * pulled over it, the intended editorial overlap.
 *
 * Each handwritten note sits above its own photograph and points down at it —
 * the hotel's arrow descends to the right, the restaurant's to the left, a
 * mirror that is intentionally not perfectly symmetrical.
 */
export function BrandSplit({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="warm-white" spacing="loose" className="overflow-hidden">
      <Container>
        <p className="mb-14 flex items-center gap-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-50">
          <span aria-hidden="true" className="h-px w-12 bg-current" />
          {dict.split.eyebrow}
        </p>

        {/* Hotel */}
        {/* Mobile: no row gap, so the photo and the light-blue box meet with no
            warm-white strip between them; desktop keeps its overlapping layout. */}
        <Reveal className="grid gap-0 lg:grid-cols-12 lg:items-center lg:gap-0">
          {/* On desktop the box pulls left over the photo; z-index puts the
              photograph on top in that overlap so it reads as in front, while
              the box's text (clear of the overlap zone) stays fully visible. */}
          <div className="relative lg:z-10 lg:col-span-6">
            {/* Note above the photo; arrow descends to the right into it. */}
            <div className="mb-4 ml-1">
              <HandwrittenNote arrow="downRight">{dict.split.hotelNote}</HandwrittenNote>
            </div>

            <div className="relative aspect-[3/4] overflow-hidden bg-blue-light">
              <SafeImage
                image={{
                  src: "/images/hotel/split-hotel.webp",
                  alt: {
                    cs: "Hotel Klika",
                    en: "Hotel Klika",
                    de: "Hotel Klika",
                  },
                  width: 941,
                  height: 1672,
                }}
                locale={locale}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Content box, centred on and overlapping the photo. The hand-drawn
              hotel mark lives INSIDE it, in the bottom-right corner, behind the
              text — the box clips whatever bleeds past its edge. */}
          <div className="relative overflow-hidden bg-blue-light p-8 text-navy sm:p-12 lg:z-0 lg:col-span-6 lg:-ml-12 lg:py-14 lg:pr-14 lg:pl-[6.5rem]">
            <DecorImage
              src="/images/logos/drawings/hotel-tr.webp"
              className="-right-6 -bottom-6 h-40 w-56 opacity-[0.16] sm:-right-8 sm:h-48 sm:w-72 lg:-right-6 lg:-bottom-8 lg:h-56 lg:w-80"
            />
            <div className="relative">
              <h2 className="font-display text-4xl leading-none sm:text-5xl">
                {dict.split.hotelTitle}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-pretty opacity-80 sm:text-lg">
                {dict.split.hotelText}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={localePath(locale, "/hotel")}>
                  {dict.actions.hotelDetail}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
                <Button href={localePath(locale, "/hotel/rooms")} variant="outline">
                  {dict.actions.allRooms}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Restaurant — mirrored, and pulled up so the two blocks interlock
            with a continuous transition rather than a wide gap. */}
        {/* Mobile: photo and navy box meet directly (no row gap); desktop keeps
            the pulled-up interlock. */}
        <Reveal className="mt-10 grid gap-0 lg:-mt-28 lg:grid-cols-12 lg:items-center lg:gap-0">
          <div className="relative order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            {/* Note above the photo, right-aligned; the shared downLeft arrow
                (a mirror of the hotel note's downRight) curves from beside the
                text down-left toward the food photo, with the open-V head at the
                lower-left target end. The tilt is NEGATIVE because this arrow is
                mirrored and CSS scales before it rotates — see HandArrow; −20°
                leads the eye down into the photograph without going vertical. */}
            <div className="mr-1 mb-4 flex justify-end">
              <HandwrittenNote arrow="downLeft" tilt={-20}>
                {dict.split.restaurantNote}
              </HandwrittenNote>
            </div>

            <div className="relative aspect-[3/4] overflow-hidden bg-cream">
              <SafeImage
                image={{
                  src: "/images/restaurant/split-restaurant.webp",
                  alt: {
                    cs: "Klika Kitchen & Coffee",
                    en: "Klika Kitchen & Coffee",
                    de: "Klika Kitchen & Coffee",
                  },
                  width: 1080,
                  height: 1350,
                }}
                locale={locale}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="order-2 bg-navy p-8 text-cream sm:p-12 lg:order-1 lg:col-span-6 lg:col-start-1 lg:-mr-12 lg:p-14">
            <h2 className="font-display text-4xl leading-none text-blue sm:text-5xl">
              {dict.split.restaurantTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-pretty opacity-85 sm:text-lg">
              {dict.split.restaurantText}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={localePath(locale, "/restaurant")} variant="cream">
                {dict.actions.restaurantDetail}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button
                href={localePath(locale, "/restaurant/menu")}
                variant="outline"
                className="border-cream/40 text-cream hover:bg-cream/10"
              >
                {dict.actions.fullMenu}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
