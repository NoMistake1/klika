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
import { Waves } from "@/components/illustrations";
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
        tone="blue-light"
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
            <Button href={localePath(locale, bookStayHref)} size="lg">
              {dict.actions.bookStay}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        }
      >
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-navy/15 pt-6 sm:grid-cols-4">
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
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {hotelFacilities[locale].map((facility) => (
              <li
                key={facility}
                className="flex items-center gap-3 border-b border-navy/10 py-3.5 text-sm"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-blue" />
                {facility}
              </li>
            ))}
          </ul>
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
                <ul className="mt-4 space-y-1.5">
                  {area.details[locale].map((detail) => (
                    <li key={detail} className="flex items-baseline gap-2.5 text-sm">
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 translate-y-1.5 rounded-full bg-sand-ink"
                      />
                      <span className="opacity-80">{detail}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Breakfast + reception services */}
      <Section tone="warm-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={dict.hotelPage.breakfastTitle}
                title={dict.hotelPage.breakfastTitle}
                lede={dict.hotelPage.breakfastSubtitle}
              />
              <p className="mt-6 flex items-center gap-2.5 text-sm font-medium">
                <Croissant aria-hidden="true" className="size-4 opacity-60" />
                <time>{breakfastHours}</time>
              </p>
              <ul className="mt-5 space-y-2.5">
                {breakfastFacts.items[locale].map((item) => (
                  <li key={item} className="flex items-baseline gap-3 text-sm">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 translate-y-1.5 rounded-full bg-sand-ink"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={dict.hotelPage.servicesTitle}
                title={dict.hotelPage.servicesTitle}
                lede={dict.hotelPage.servicesSubtitle}
              />
              <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {receptionServices.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center gap-3 border-b border-navy/10 py-3 text-sm"
                  >
                    <Icon name={service.icon} className="size-4 shrink-0 opacity-55" />
                    {service.label[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Parking, children and pets */}
      <Section tone="blue-light" spacing="tight" className="relative overflow-hidden">
        <Waves
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 left-0 h-10 w-full text-navy opacity-10"
        />
        <Container className="relative">
          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="flex items-center gap-2.5 text-heading font-semibold">
                <ParkingSquare aria-hidden="true" className="size-5 opacity-60" />
                {dict.hotelPage.parkingTitle}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {parkingFacts[locale].map((fact) => (
                  <li key={fact} className="flex items-baseline gap-3 text-sm">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 translate-y-1.5 rounded-full bg-sand-ink"
                    />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2.5 text-heading font-semibold">
                <Baby aria-hidden="true" className="size-5 opacity-60" />
                {dict.hotelPage.childrenTitle}
                <Dog aria-hidden="true" className="size-5 opacity-60" />
              </h2>
              <ul className="mt-5 space-y-2.5">
                {childrenAndPetsFacts[locale].map((fact) => (
                  <li key={fact} className="flex items-baseline gap-3 text-sm">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 translate-y-1.5 rounded-full bg-sand-ink"
                    />
                    {fact}
                  </li>
                ))}
              </ul>
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
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={localePath(locale, "/hotel/pricing")}>
                  {dict.actions.pricing}
                  <ArrowRight aria-hidden="true" className="size-4" />
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
