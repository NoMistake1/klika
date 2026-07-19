import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import type { LocalizedText } from "@/types";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { DecorImage } from "@/components/ui/DecorImage";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Landing food collage — the editorial teaser that replaced the old full daily
 * menu below the hero. Three plated-food photographs in one irregular row (an
 * outer pair lifted, the wider middle dropped) with a Caveat annotation, over a
 * light decorative tomato. It sends guests to the real daily / permanent menus
 * rather than duplicating them.
 *
 * Structure adapted from a shared collage reference but rebuilt entirely in the
 * Klika system: warm-white surface, navy/blue type, the single terracotta
 * accent for the handwriting, sharp corners and the site container — no foreign
 * tokens, pills or wording.
 */

type CollagePhoto = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  /** Wrapper geometry: mobile size/offset, then the desktop editorial step. */
  wrap: string;
  sizes: string;
};

const photos: readonly CollagePhoto[] = [
  {
    // Large lead image.
    src: "/images/food/food19.webp",
    width: 1440,
    height: 1440,
    alt: {
      cs: "Sezónní talíř podle denní nabídky",
      en: "A seasonal plate from the daily offering",
      de: "Ein saisonaler Teller aus dem Tagesangebot",
    },
    wrap: "w-full aspect-[16/10] lg:w-[30%] lg:aspect-[3/4] lg:-translate-y-6",
    sizes: "(min-width: 1024px) 30vw, 100vw",
  },
  {
    // Middle image — a touch wider and dropped lower.
    src: "/images/food/food38.webp",
    width: 1122,
    height: 1402,
    alt: {
      cs: "Čerstvě připravené hlavní jídlo",
      en: "A freshly prepared main dish",
      de: "Ein frisch zubereitetes Hauptgericht",
    },
    wrap: "w-[calc(50%-0.5rem)] aspect-[3/4] lg:w-[36%] lg:aspect-[4/5] lg:translate-y-10",
    sizes: "(min-width: 1024px) 36vw, 45vw",
  },
  {
    // Right image — lifted on desktop, dropped on mobile to open a note gap.
    src: "/images/food/food8.webp",
    width: 1194,
    height: 1492,
    alt: {
      cs: "Několik malých chodů na sdílení",
      en: "A spread of small dishes to share",
      de: "Mehrere kleine Gerichte zum Teilen",
    },
    wrap: "mt-14 w-[calc(50%-0.5rem)] aspect-[4/5] lg:mt-0 lg:w-[30%] lg:aspect-[3/4] lg:-translate-y-6",
    sizes: "(min-width: 1024px) 30vw, 45vw",
  },
];

export function FoodCollage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const menuHref = localePath(locale, "/restaurant/menu");

  return (
    <Section tone="warm-white" id="explore" className="relative overflow-hidden">
      {/* Decorative tomato, upper-right, reaching upward and bleeding a little
          past the screen — the section clips the overflow, so it never causes
          horizontal scroll. Kept light and behind the relative Container, well
          clear of the three food images. */}
      <DecorImage
        src="/images/food/rajce.webp"
        className="-top-6 -right-16 h-56 w-56 opacity-20 sm:-top-10 sm:-right-20 sm:h-72 sm:w-72 lg:-top-12 lg:-right-14 lg:h-[26rem] lg:w-[26rem]"
      />

      <Container className="relative">
        {/* Header — the annotation and display heading on the left, the
            supporting copy (and the desktop CTAs) on the right. */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <HandwrittenNote>{dict.foodCollage.eyebrow}</HandwrittenNote>
            <h2 className="mt-3 font-display text-4xl leading-none text-navy sm:text-5xl">
              {dict.foodCollage.title}
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-base leading-relaxed text-pretty opacity-80 sm:text-lg">
              {dict.foodCollage.text}
            </p>
            {/* Desktop CTAs — balance the header, above the collage. */}
            <div className="mt-7 hidden flex-wrap gap-3 lg:flex">
              <Button href={`${menuHref}?view=daily`} variant="primary">
                {dict.actions.fullDailyMenu}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button href={`${menuHref}?view=permanent`} variant="outline">
                {dict.actions.fullMenu}
              </Button>
            </div>
          </div>
        </div>

        {/* Three-image editorial row. `overflow-hidden` is on each inner frame,
            not the wrapper, so the Caveat notes can sit above the images without
            being clipped. Sharp corners and a restrained float shadow. */}
        <Reveal className="mt-12 flex flex-wrap gap-4 lg:mt-16 lg:flex-nowrap lg:items-center lg:gap-6">
          {photos.map((photo, index) => (
            <div key={photo.src} className={`relative shrink-0 ${photo.wrap}`}>
              <div className="group relative h-full w-full overflow-hidden bg-cream shadow-[0_20px_45px_-28px_rgba(10,26,49,0.5)]">
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
              </div>

              {/* Desktop: one note centred above the middle image, arrow down. */}
              {index === 1 ? (
                <div className="absolute -top-14 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
                  <HandwrittenNote arrow="downRight" className="whitespace-nowrap">
                    {dict.foodCollage.note}
                  </HandwrittenNote>
                </div>
              ) : null}

              {/* Mobile: one note in the gap above the lower-right image. */}
              {index === 2 ? (
                <div className="absolute -top-12 right-0 z-10 block lg:hidden">
                  <HandwrittenNote arrow="downRight" className="whitespace-nowrap">
                    {dict.foodCollage.note}
                  </HandwrittenNote>
                </div>
              ) : null}
            </div>
          ))}
        </Reveal>

        {/* Mobile CTAs — stacked, full width, below the collage. */}
        <div className="mt-10 flex flex-col gap-3 lg:hidden">
          <Button href={`${menuHref}?view=daily`} variant="primary" className="w-full">
            {dict.actions.fullDailyMenu}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <Button href={`${menuHref}?view=permanent`} variant="outline" className="w-full">
            {dict.actions.fullMenu}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
