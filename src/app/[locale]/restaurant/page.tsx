import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
// lucide-react no longer ships brand icons, so social links use a neutral
// external-link affordance plus the platform name as text.
import { ArrowRight, ExternalLink } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localePath, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema, restaurantSchema } from "@/lib/structured-data";
import { drinkGroups, instagramUrl, seatingZones, vouchers } from "@/content/restaurant";
import { galleryItems } from "@/content/gallery";
import type { GalleryItem } from "@/types";
import { bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Price } from "@/components/ui/MenuBadges";
import { ZoneShowcase } from "@/components/restaurant/ZoneShowcase";
import { LocalProducers } from "@/components/sections/LocalProducers";
import { FamilyFriendly } from "@/components/sections/FamilyFriendly";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SafeImage } from "@/components/ui/SafeImage";
import { DecorImage } from "@/components/ui/DecorImage";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/restaurant",
    title: dict.restaurantPage.title,
    description: dict.restaurantPage.intro,
  });
}

/** Pick gallery items by id, in the given order, dropping any that are missing. */
function pickGallery(ids: readonly string[]): GalleryItem[] {
  return ids
    .map((id) => galleryItems.find((entry) => entry.id === id))
    .filter((entry): entry is GalleryItem => entry !== undefined);
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const menuHref = localePath(locale, "/restaurant/menu");

  // Interleaved so no two similar plated dishes sit side by side — food,
  // interiors, garden, people and drinks alternate down the strip.
  const restaurantGallery = pickGallery([
    "restaurant-indoor",
    "food-plate-1",
    "restaurant-conservatory",
    "food-dessert-1",
    "garden-terrace",
    "food-drink-1",
    "restaurant-wall",
    "food-table-3",
    "food-people-1",
    "restaurant-bar",
    "food-main-1",
    "garden-children",
    "food-plate-3",
    "restaurant-outside",
  ]);

  return (
    <>
      {/* Responsive hero — the bar close-up on phones, the wider riverside
          frame on desktop, both under a dark scrim so the cream text reads.
          Deliberately a shorter, breadcrumbed masthead rather than the
          full-height landing hero. */}
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.restaurantPage.eyebrow}
        title={dict.restaurantPage.title}
        lede={dict.restaurantPage.heroLede}
        crumbs={[{ label: dict.restaurantPage.eyebrow }]}
        className="lg:pt-44 lg:pb-32"
        background={{
          src: "/images/hero/fallback-desktop.webp",
          width: 1535,
          height: 1025,
          mobileSrc: "/images/restaurant/bar.webp",
          mobileWidth: 1402,
          mobileHeight: 1122,
          imgClassName: "object-[center_45%]",
        }}
        aside={
          <Button href={localePath(locale, bookTableHref)} size="lg" variant="secondary">
            {dict.actions.bookTable}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        }
      />

      {/* Introduction — the fuller story and the two key facts, moved below the
          hero so the photograph can breathe on a phone. */}
      <Section tone="warm-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <p className="text-lg leading-relaxed text-pretty lg:col-span-7 sm:text-xl">
              {dict.restaurantPage.intro}
            </p>
            <div className="flex flex-col gap-2 text-sm opacity-75 lg:col-span-5 lg:border-l lg:border-navy/15 lg:pl-8">
              <p>{dict.restaurantPage.reopened}</p>
              <p className="font-medium">{dict.restaurantPage.jimeJih}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Seasonal food editorial collage — one dominant portrait beside a small
          cluster, never an even card grid. */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow={dict.restaurantPage.collageEyebrow}
            title={dict.restaurantPage.collageTitle}
          />

          <Reveal className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-6">
            <figure className="relative aspect-[3/4] overflow-hidden bg-warm-white lg:col-span-5">
              <SafeImage
                image={{
                  src: "/images/food/food1.webp",
                  alt: {
                    cs: "Sezónní předkrm na talíři",
                    en: "A seasonal starter on the plate",
                    de: "Eine saisonale Vorspeise auf dem Teller",
                  },
                  width: 1440,
                  height: 1802,
                }}
                locale={locale}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </figure>

            <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-6">
              <figure className="relative aspect-[4/5] overflow-hidden bg-warm-white">
                <SafeImage
                  image={{
                    src: "/images/food/food11.webp",
                    alt: {
                      cs: "Domácí dorty na patře",
                      en: "Homemade cakes on a stand",
                      de: "Hausgemachte Torten auf einer Etagere",
                    },
                    width: 1350,
                    height: 1687,
                  }}
                  locale={locale}
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                />
              </figure>
              <figure className="relative aspect-[4/5] overflow-hidden bg-warm-white">
                <SafeImage
                  image={{
                    src: "/images/food/food9.webp",
                    alt: {
                      cs: "Hlavní chod podle sezóny",
                      en: "A seasonal main course",
                      de: "Ein saisonales Hauptgericht",
                    },
                    width: 1350,
                    height: 1687,
                  }}
                  locale={locale}
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                />
              </figure>
              <figure className="relative col-span-2 aspect-[16/9] overflow-hidden bg-warm-white">
                <SafeImage
                  image={{
                    src: "/images/food/food27.webp",
                    alt: {
                      cs: "Prostřený stůl s několika chody",
                      en: "A laid table with several dishes",
                      de: "Ein gedeckter Tisch mit mehreren Gerichten",
                    },
                    width: 2400,
                    height: 1701,
                  }}
                  locale={locale}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                />
              </figure>
            </div>
          </Reveal>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium">
            {dict.restaurantPage.collageTags.map((tag) => (
              <li key={tag} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-sand-ink" />
                {tag}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Menu navigation — two photographic cards deep-linking to the menu page
          on the right tab. The full menu data lives only on that page. */}
      <Section tone="navy">
        <Container>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue/70 uppercase">
            {dict.restaurantPage.menuNavEyebrow}
          </p>
          <h2 className="text-heading font-semibold text-balance text-blue">
            {dict.restaurantPage.menuNavTitle}
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed opacity-80">
            {dict.restaurantPage.menuNavText}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
            <MenuCard
              href={`${menuHref}?view=daily`}
              label={dict.restaurantPage.dailyCard}
              image={{
                src: "/images/food/food9.webp",
                alt: {
                  cs: "Hlavní chod z denního menu",
                  en: "A main course from the daily menu",
                  de: "Ein Hauptgericht aus dem Tagesmenü",
                },
                width: 1350,
                height: 1687,
              }}
              locale={locale}
            />
            <MenuCard
              href={`${menuHref}?view=permanent`}
              label={dict.restaurantPage.permanentCard}
              image={{
                src: "/images/restaurant/menu-desktop.webp",
                alt: {
                  cs: "Jídelní lístek na stole",
                  en: "The menu on the table",
                  de: "Die Speisekarte auf dem Tisch",
                },
                width: 1536,
                height: 1024,
              }}
              locale={locale}
            />
          </div>
        </Container>
      </Section>

      {/* Seating zones */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow={dict.zones.eyebrow}
            title={dict.zones.title}
            lede={dict.zones.subtitle}
          />
          <div className="mt-12">
            <ZoneShowcase zones={seatingZones} locale={locale} dict={dict} />
          </div>
        </Container>
      </Section>

      {/* How we cook — the kitchen principles, kept as a compact scannable list. */}
      <Section tone="navy" spacing="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
            <h2 className="text-heading font-semibold text-balance text-blue">
              {dict.restaurantPage.principlesTitle}
            </h2>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {dict.restaurantPage.principles.map((principle) => (
                <li
                  key={principle}
                  className="flex items-center gap-3 border-b border-cream/15 py-3 text-sm"
                >
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Local ingredients and suppliers */}
      <LocalProducers locale={locale} dict={dict} />

      {/* Drinks and bar */}
      <Section tone="warm-white" className="relative overflow-hidden">
        {/* Hand-drawn coffee mark, upper-right, sitting behind the content and
            bleeding a little off the edge (clipped by the section). */}
        <DecorImage
          src="/images/logos/drawings/cafe-tr.webp"
          className="-top-8 -right-10 h-44 w-44 opacity-[0.12] sm:h-52 sm:w-52 lg:-top-10 lg:-right-8 lg:h-72 lg:w-72"
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <SectionHeading
                eyebrow={dict.restaurantPage.drinksTitle}
                title={dict.restaurantPage.drinksTitle}
                lede={dict.restaurantPage.drinksSubtitle}
              />

              <div className="mt-10 grid gap-10 sm:grid-cols-3">
                {drinkGroups.map((group) => (
                  <div key={group.id} className="border-t border-navy/15 pt-5">
                    <h3 className="text-lg font-semibold">{group.title[locale]}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm">
                          <span aria-hidden="true" className="size-1 rounded-full bg-sand-ink" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {group.note ? (
                      <p className="mt-3 text-sm leading-relaxed opacity-70">
                        {group.note[locale]}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <p className="text-sm opacity-70">{dict.restaurantPage.drinksNote}</p>
                <p className="text-xs opacity-50">{dict.restaurantPage.drinksPending}</p>
              </div>
            </div>

            {/* The bar itself, floating on the warm field beside the list. */}
            <div className="lg:col-span-4 lg:self-center">
              <div className="card-float relative aspect-[4/3] overflow-hidden bg-cream">
                <SafeImage
                  image={{
                    src: "/images/restaurant/bar.webp",
                    alt: {
                      cs: "Bar s vitrínou dezertů",
                      en: "The bar with the dessert cabinet",
                      de: "Die Bar mit der Dessertvitrine",
                    },
                    width: 1402,
                    height: 1122,
                  }}
                  locale={locale}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Families and garden */}
      <FamilyFriendly locale={locale} dict={dict} />

      {/* Events, catering and vouchers */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={dict.catering.eyebrow}
                title={dict.catering.title}
                lede={dict.catering.intro}
              />
              <p className="mt-6 text-sm opacity-75">{dict.catering.capacityText}</p>
              <Button href={localePath(locale, "/restaurant/catering")} className="mt-6">
                {dict.catering.eyebrow}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>

            <div>
              <SectionHeading
                eyebrow={dict.catering.vouchersTitle}
                title={dict.catering.vouchersTitle}
                lede={dict.catering.vouchersText}
              />
              <ul className="mt-6 flex flex-wrap gap-3">
                {vouchers.map((voucher) => (
                  <li
                    key={voucher.id}
                    className="border border-navy/20 px-4 py-2 text-sm font-medium"
                  >
                    <span className="sr-only">{dict.catering.voucherValue} </span>
                    <Price amountCzk={voucher.valueCzk} locale={locale} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs opacity-60">{dict.catering.vouchersNote}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Expanded gallery — food, interiors, garden, people and drinks, swipeable
          on phones, captions hidden for an editorial read. */}
      <Section tone="warm-white">
        <Container>
          <SectionHeading eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} />
          <div className="mt-10">
            <GalleryGrid
              items={restaurantGallery}
              categories={["restaurant", "food", "garden"]}
              locale={locale}
              dict={dict}
              showFilter={false}
              swipeOnMobile
              showCaptions={false}
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={localePath(locale, "/gallery")} variant="outline">
              {dict.actions.wholeGallery}
            </Button>
            <Button href={instagramUrl} target="_blank" rel="noopener noreferrer" variant="ghost">
              <ExternalLink aria-hidden="true" className="size-4" />
              {dict.restaurantPage.followInstagram}
              <span className="sr-only">({dict.a11y.openInNewTab})</span>
            </Button>
          </div>
          <p className="mt-3 text-xs opacity-55">{dict.restaurantPage.instagramText}</p>
        </Container>
      </Section>

      {/* Booking CTA */}
      <Section tone="navy" spacing="tight">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-4xl leading-none text-blue">
                {dict.restaurantPage.bookingTitle}
              </h2>
              <p className="mt-3 max-w-md opacity-80">{dict.restaurantPage.bookingText}</p>
            </div>
            <Button
              href={localePath(locale, bookTableHref)}
              variant="secondary"
              size="lg"
              className="shrink-0"
            >
              {dict.actions.bookTable}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          restaurantSchema(locale),
          breadcrumbSchema(locale, [{ name: dict.restaurantPage.eyebrow, path: "/restaurant" }]),
        ]}
      />
    </>
  );
}

/** One photographic menu-navigation card, deep-linking into the menu page. */
function MenuCard({
  href,
  label,
  image,
  locale,
}: {
  href: string;
  label: string;
  image: GalleryItem["image"];
  locale: Locale;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[16/10] overflow-hidden bg-navy-soft"
    >
      <SafeImage
        image={image}
        locale={locale}
        fill
        sizes="(min-width: 640px) 45vw, 100vw"
        className="opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-6">
        <span className="font-display text-2xl text-cream sm:text-3xl">{label}</span>
        <ArrowRight
          aria-hidden="true"
          className="size-5 shrink-0 text-cream transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
