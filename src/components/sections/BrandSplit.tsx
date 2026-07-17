import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { DecorImage } from "@/components/ui/DecorImage";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { Waves, CornerMark } from "@/components/illustrations";

/**
 * The two Klika worlds.
 *
 * Not two matching cards: the hotel block leads with a tall image on the left
 * and the restaurant block reverses and overlaps it, with the two halves
 * carrying their own colour worlds — light blue for the hotel, cream and navy
 * for the restaurant.
 *
 * Each handwritten note sits above its own photograph and points down at it —
 * left-aligned for the hotel, right-aligned for the restaurant, a mirror that
 * is intentionally not perfectly symmetrical.
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
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-0">
          <div className="relative lg:col-span-6 lg:row-span-2">
            {/* Annotation above the photo, left-aligned, pointing down at it. */}
            <div className="mb-4 ml-1">
              <HandwrittenNote arrow="down">{dict.split.hotelNote}</HandwrittenNote>
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
            <Waves
              aria-hidden="true"
              className="absolute right-0 -bottom-4 h-10 w-2/3 text-blue"
            />
            {/* Corner bracket, offset from the bottom-left of the photo. */}
            <CornerMark className="absolute -bottom-3 -left-3 hidden h-10 w-10 rotate-180 text-navy/30 lg:block" />
          </div>

          <div className="flex flex-col justify-center bg-blue-light p-8 text-navy sm:p-12 lg:col-span-6 lg:-ml-12 lg:self-center lg:p-14">
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
        </Reveal>

        {/* Restaurant — mirrored, and pulled up so the two blocks interlock. */}
        <Reveal className="mt-8 grid gap-8 lg:mt-[-6rem] lg:grid-cols-12 lg:gap-0">
          <div className="relative order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            {/* Annotation above the photo, right-aligned, pointing down —
                a deliberate mirror of the hotel note. */}
            <div className="mr-1 mb-4 flex justify-end">
              <HandwrittenNote arrow="down">{dict.split.restaurantNote}</HandwrittenNote>
            </div>

            {/* Decorative mushroom, tucked behind the right edge of the photo:
                it sits earlier in the DOM than the image, so the image paints
                over it (no negative z-index, which would drop it behind the
                section background). Hidden on the smallest screens. */}
            <DecorImage
              src="/images/restaurant/zampion.webp"
              className="top-1/3 -right-14 hidden h-40 w-40 opacity-50 sm:block lg:-right-16 lg:h-52 lg:w-52"
            />

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
            {/* Corner bracket, offset from the top-right of the photo. */}
            <CornerMark className="absolute -top-3 -right-3 hidden h-10 w-10 rotate-90 text-navy/30 lg:block" />
          </div>

          <div className="order-2 flex flex-col justify-center bg-navy p-8 text-cream sm:p-12 lg:order-1 lg:col-span-6 lg:col-start-1 lg:-mr-12 lg:self-center lg:p-14">
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
