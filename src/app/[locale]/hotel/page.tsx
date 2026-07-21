import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Baby, Croissant, Dog, ParkingSquare } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localePath, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema, hotelSchema } from "@/lib/structured-data";
import {
  accommodationAreas,
  breakfastFacts,
  childrenAndPetsFacts,
  hotelFacilities,
  hotelStats,
  parkingFacts,
  pricingRows,
  receptionServices,
  rooms,
  specialOffers,
} from "@/content/hotel";
import { breakfastHours } from "@/content/contact";
import { hotelGalleryGroups, hotelGalleryItems } from "@/content/gallery";
import { bookStayHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RoomSlider } from "@/components/hotel/RoomSlider";
import { PricingList } from "@/components/hotel/PricingList";
import { EditorialGallery } from "@/components/gallery/EditorialGallery";
import { BackgroundPhoto } from "@/components/ui/BackgroundPhoto";
import { BulletList, ICON_LIST_ITEM, ICON_MARKER_OFFSET } from "@/components/ui/BulletList";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/hotel",
    title: dict.hotelPage.title,
    description: dict.hotelPage.intro,
  });
}

export default async function HotelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.hotelPage.eyebrow}
        title={dict.hotelPage.title}
        lede={dict.hotelPage.intro}
        crumbs={[{ label: dict.hotelPage.eyebrow }]}
        className="lg:pt-44 lg:pb-32"
        // The house itself, art-directed: the wide street view on desktop and
        // the portrait crop on phones, so only one file is ever downloaded.
        // Both focal points sit above centre — the desktop frame skips the
        // foreground cobbles, the portrait one skips the sky — so the HOTEL
        // lettering and the Klika café sign stay in the band. PageHeader adds
        // the shared scrim and loads this one with priority.
        background={{
          src: "/images/hotel/facade-desktop.webp",
          width: 1536,
          height: 1024,
          mobileSrc: "/images/hotel/facade.webp",
          mobileWidth: 1023,
          mobileHeight: 1537,
          imgClassName: "object-[center_45%] md:object-[center_40%]",
        }}
        aside={
          <div className="flex flex-col items-start gap-5 lg:items-end">
            {/* On a phone the note stands alone — no arrow, and no leftover
                space where one used to be. The desktop note keeps its arrow,
                which still points correctly into the column beside it. The
                display toggle lives on wrapper divs rather than on the note's
                own inline-flex span, since cn() is a plain join and a `hidden`
                there would never win. */}
            <div className="lg:hidden">
              <HandwrittenNote>{dict.hotelPage.handwritten}</HandwrittenNote>
            </div>
            <div className="hidden lg:block">
              <HandwrittenNote arrow="left">{dict.hotelPage.handwritten}</HandwrittenNote>
            </div>
            {/* The masthead is navy now that it carries the facade photograph,
                so the navy primary would vanish into it — the light-blue
                secondary is the same button the other photo heroes use. */}
            <Button href={localePath(locale, bookStayHref)} size="lg" variant="secondary">
              {dict.actions.bookStay}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        }
      >
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-cream/25 pt-6 sm:grid-cols-4">
          {hotelStats.map((stat) => (
            <div key={stat.id}>
              <dt className="sr-only">{stat.label[locale]}</dt>
              <dd>
                <span className="block font-display text-4xl leading-none">{stat.value}</span>
                <span className="mt-1 block text-xs opacity-65">{stat.label[locale]}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* Facilities */}
      <Section tone="warm-white" spacing="tight">
        <Container>
          {/* Bordered rows carry their own rhythm, so the list's own spacing is
              switched off rather than fighting the grid. */}
          <BulletList
            items={hotelFacilities[locale]}
            spacing={false}
            className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3"
            itemClassName="border-b border-navy/10 py-3.5"
          />
        </Container>
      </Section>

      {/* Rooms */}
      <Section tone="warm-white">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={dict.rooms.eyebrow}
              title={dict.rooms.title}
              lede={dict.rooms.subtitle}
            />
            <Button
              href={localePath(locale, "/hotel/rooms")}
              variant="ghost"
              className="shrink-0 self-start sm:self-auto"
            >
              {dict.actions.allRooms}
            </Button>
          </div>
          <div className="mt-12">
            <RoomSlider rooms={rooms} locale={locale} dict={dict} />
          </div>
        </Container>
      </Section>

      {/* Buildings */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow={dict.hotelPage.areasTitle}
            title={dict.hotelPage.areasTitle}
            lede={dict.hotelPage.areasSubtitle}
          />

          {/* Four detailed cards stack into most of a phone screen each, so on
              mobile they swipe; from sm up they return to the hairline grid. */}
          <ol
            className={cn(
              "scrollbar-none -mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scroll-padding-inline:1.25rem]",
              "sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-x-visible sm:bg-navy/10 sm:px-0 sm:pb-0",
            )}
          >
            {accommodationAreas.map((area, index) => (
              <Reveal
                key={area.id}
                as="li"
                delay={index * 60}
                className="card-float snap-start shrink-0 basis-[82%] bg-cream p-6 sm:basis-auto sm:rounded-none sm:p-8 sm:shadow-none"
              >
                <p
                  aria-hidden="true"
                  className="font-display text-3xl leading-none text-navy/25"
                >
                  {`0${index + 1}`}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-pretty">{area.name[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">
                  {area.description[locale]}
                </p>
                <BulletList
                  items={area.details[locale]}
                  className="mt-4"
                  itemClassName="opacity-80"
                />
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Breakfast + reception services */}
      <Section tone="warm-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Breakfast. On a phone the buffet photograph moves behind this
                column — the desktop layout is deliberately left alone, where the
                text already has the whole warm-white field to itself. */}
            <div className="relative overflow-hidden lg:col-span-5 lg:overflow-visible">
              <div aria-hidden="true" className="absolute inset-0 lg:hidden">
                <BackgroundPhoto
                  src="/images/hotel/breakfast.webp"
                  width={2400}
                  height={1350}
                  sizes="100vw"
                  className="object-[center_55%]"
                />
                {/* Denser at the foot where the list sits, but it never thins
                    past ~68%: the top of this photograph is a brightly lit
                    shelf, and a lighter scrim there dropped the cream lede to
                    ~3.4:1. At 68% the buffet is still plainly a buffet and the
                    body copy clears AA. */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/80 to-navy/68" />
              </div>

              <div className="relative p-6 text-cream sm:p-8 lg:p-0 lg:text-ink">
                <SectionHeading
                  eyebrow={dict.hotelPage.breakfastTitle}
                  title={dict.hotelPage.breakfastTitle}
                  lede={dict.hotelPage.breakfastSubtitle}
                />
                <p className="mt-6 flex items-center gap-2.5 text-sm font-medium">
                  <Croissant aria-hidden="true" className="size-4 opacity-60" />
                  <time>{breakfastHours}</time>
                </p>
                <BulletList
                  items={breakfastFacts.items[locale]}
                  tone="cream"
                  markerClassName="lg:bg-sand-ink"
                  className="mt-5"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={dict.hotelPage.servicesTitle}
                title={dict.hotelPage.servicesTitle}
                lede={dict.hotelPage.servicesSubtitle}
              />
              {/* Icon-marked rows, aligned by the same rule the dot lists use:
                  the icon sits in its own 1rem track and is centred on the
                  first line, so a wrapped German label runs under the text. */}
              <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {receptionServices.map((service) => (
                  <li
                    key={service.id}
                    className={cn(ICON_LIST_ITEM, "border-b border-navy/10 py-3")}
                  >
                    <Icon
                      name={service.icon}
                      className={cn(ICON_MARKER_OFFSET, "size-4 opacity-55")}
                    />
                    <span>{service.label[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Parking, children and pets — two photographic panels rather than one
          flat blue text block. On desktop they are equal-height columns (grid
          items stretch); on a phone they stack full width with enough height
          that each photograph still reads. The decorative wave that used to run
          under this band is gone: the photographs carry it now. */}
      <Section tone="cream" spacing="tight">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <div className="relative flex min-h-[20rem] flex-col justify-end overflow-hidden bg-navy p-7 text-cream sm:min-h-[24rem] sm:p-9 lg:p-10">
              <BackgroundPhoto
                src="/images/hotel/parking.webp"
                width={1672}
                height={941}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-[center_45%]"
              />
              {/* Dense only where the text sits; the marked bays above stay
                  visible as a photograph rather than a dark wash. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/72 to-navy/25"
              />
              <div className="relative">
                <h2 className="flex items-center gap-2.5 text-heading font-semibold">
                  <ParkingSquare aria-hidden="true" className="size-5 shrink-0 opacity-70" />
                  {dict.hotelPage.parkingTitle}
                </h2>
                <BulletList items={parkingFacts[locale]} tone="cream" className="mt-5" />
              </div>
            </div>

            <div className="relative flex min-h-[20rem] flex-col justify-end overflow-hidden bg-navy p-7 text-cream sm:min-h-[24rem] sm:p-9 lg:p-10">
              <BackgroundPhoto
                src="/images/hotel/pet.webp"
                width={1672}
                height={941}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-[62%_center]"
              />
              {/* Related to the parking panel but deliberately not identical:
                  the dog sits on the right of the frame, so from sm up the
                  scrim runs left-to-right and leaves the animal clear. On a
                  phone the text spans the full width, so it falls back to the
                  bottom-anchored scrim — a sideways one would leave text over
                  the dog's white chest. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/72 to-navy/30 sm:bg-gradient-to-r sm:from-navy/95 sm:via-navy/70 sm:to-navy/20"
              />
              <div className="relative">
                <h2 className="flex items-center gap-2.5 text-heading font-semibold">
                  <Baby aria-hidden="true" className="size-5 shrink-0 opacity-70" />
                  {dict.hotelPage.childrenTitle}
                  <Dog aria-hidden="true" className="size-5 shrink-0 opacity-70" />
                </h2>
                <BulletList
                  items={childrenAndPetsFacts[locale]}
                  tone="cream"
                  className="mt-5"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Special offers */}
      <Section tone="warm-white">
        <Container>
          <SectionHeading eyebrow={dict.hotelPage.offersTitle} title={dict.hotelPage.offersTitle} />

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {specialOffers.map((offer) => (
              <div key={offer.id} className="border-t border-navy/15 pt-5">
                <h3 className="text-lg font-semibold text-pretty">{offer.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">
                  {offer.description[locale]}
                </p>
                <p className="mt-3 text-xs font-medium text-sand-ink">
                  {offer.conditions[locale]}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-sand-ink pl-4 text-sm opacity-70">
            {dict.hotelPage.offersNote}
          </p>
        </Container>
      </Section>

      {/* Pricing teaser */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow={dict.hotelPage.pricingTitle}
                title={dict.hotelPage.pricingTitle}
                lede={dict.hotelPage.pricingTeaser}
              />
              {/* The rate card is the moment to book, so the booking action
                  sits beside the full price list rather than only in the
                  footer band. */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={localePath(locale, bookStayHref)}>
                  {dict.actions.bookStay}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
                <Button href={localePath(locale, "/hotel/pricing")} variant="outline">
                  {dict.actions.pricing}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-8">
              {/* Room rates only; fees and the tourist charge live on the full
                  pricing page so this stays a teaser rather than a duplicate. */}
              <PricingList
                rows={pricingRows.filter((row) =>
                  ["double-single-use", "double", "triple", "apartment-sauna", "apartment-four"].includes(
                    row.id,
                  ),
                )}
                locale={locale}
                dict={dict}
              />
              <p className="mt-4 text-xs opacity-60">{dict.pricingPage.exceptionNote}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section tone="warm-white">
        <Container>
          <SectionHeading eyebrow={dict.gallery.eyebrow} title={dict.hotelPage.galleryTitle} />
          <div className="mt-10">
            {/* Same editorial system as the restaurant gallery, deliberately a
                different story: the house, the rooms and the stay lead, and the
                restaurant appears only at the end as an amenity. */}
            <EditorialGallery
              groups={hotelGalleryGroups}
              items={hotelGalleryItems}
              locale={locale}
              dict={dict}
            />
          </div>
          <div className="mt-8">
            <Button href={localePath(locale, "/gallery")} variant="outline">
              {dict.actions.wholeGallery}
            </Button>
          </div>
        </Container>
      </Section>

      {/* Booking CTA */}
      <Section tone="navy" spacing="tight">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-4xl leading-none text-blue">
                {dict.hotelPage.bookingTitle}
              </h2>
              <p className="mt-3 max-w-md opacity-80">{dict.hotelPage.bookingText}</p>
            </div>
            <Button
              href={localePath(locale, bookStayHref)}
              variant="cream"
              size="lg"
              className="shrink-0"
            >
              {dict.actions.bookStay}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          hotelSchema(locale),
          breadcrumbSchema(locale, [{ name: dict.hotelPage.eyebrow, path: "/hotel" }]),
        ]}
      />
    </>
  );
}
