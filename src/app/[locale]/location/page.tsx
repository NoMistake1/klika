import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Compass, Info, MapPin } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema, hotelSchema } from "@/lib/structured-data";
import { address, coordinates, directionsUrl } from "@/content/contact";
import { locationHighlights, travelOptions, tripTips, walkingDistances } from "@/content/location";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { MapEmbed } from "@/components/location/MapEmbed";
import { Tabs } from "@/components/ui/Tabs";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { ScrollRow, scrollRowItem } from "@/components/ui/ScrollRow";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/location",
    title: dict.locationPage.title,
    description: dict.locationPage.intro,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const travelTabs = travelOptions.map((option) => ({
    id: option.id,
    label: option.label[locale],
    icon: <Icon name={option.icon} className="size-4 shrink-0" />,
    content: (
      <div className="max-w-2xl">
        <p className="text-base leading-relaxed text-pretty">{option.summary[locale]}</p>
        <ul className="mt-5 space-y-2.5">
          {option.details[locale].map((detail) => (
            <li key={detail} className="flex items-baseline gap-3 text-sm">
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 translate-y-1.5 rounded-full bg-sand-ink"
              />
              <span className="opacity-80">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.locationPage.eyebrow}
        title={dict.locationPage.title}
        lede={dict.locationPage.intro}
        crumbs={[{ label: dict.locationPage.eyebrow }]}
        background={{
          src: "/images/hotel/facade-desktop.webp",
          width: 1920,
          height: 1280,
          mobileSrc: "/images/hotel/facade.webp",
          mobileWidth: 1023,
          mobileHeight: 1537,
          imgClassName: "object-center",
        }}
        aside={
          <div className="text-cream">
            <address className="flex gap-3 leading-relaxed not-italic">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 opacity-60" />
              <span>
                {dict.siteName}
                <br />
                {address.streetLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                {address.postalCode} {address.city}
                <br />
                {address.country[locale]}
              </span>
            </address>
            <p className="mt-3 flex items-center gap-3 text-sm opacity-70">
              <Compass aria-hidden="true" className="size-4 shrink-0 opacity-70" />
              <span className="sr-only">{dict.locationPage.gpsTitle}: </span>
              {coordinates.display}
            </p>
            <Button
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5"
            >
              {dict.actions.navigate}
              <span className="sr-only">({dict.a11y.openInNewTab})</span>
            </Button>
          </div>
        }
      />

      {/* Map */}
      <Section tone="warm-white" spacing="tight">
        <Container>
          <MapEmbed dict={dict} aspect="aspect-[4/3] sm:aspect-[21/9]" />
        </Container>
      </Section>

      {/* Highlights */}
      <Section tone="warm-white" spacing="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={dict.locationPage.highlightsTitle}
                title={dict.locationPage.highlightsTitle}
              />
              <h3 className="mt-8 mb-3 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                {dict.locationPreview.walkingDistance}
              </h3>
              <ul className="space-y-2.5">
                {walkingDistances.map((entry) => (
                  <li key={entry.id} className="flex items-baseline gap-3 text-sm">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 translate-y-1.5 rounded-full bg-sand-ink"
                    />
                    {entry.text[locale]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {locationHighlights.map((highlight) => (
                  <li
                    key={highlight.id}
                    className="flex items-center gap-3 border-b border-navy/10 py-3.5 text-sm"
                  >
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                    {highlight.text[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Travel */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow={dict.locationPage.travelTitle}
            title={dict.locationPage.travelTitle}
            lede={dict.locationPage.travelSubtitle}
          />

          <div className="mt-10">
            <Tabs items={travelTabs} label={dict.locationPage.travelTitle} />
          </div>

          {/* Timetables and lines change; the site does not pretend otherwise. */}
          <p className="mt-10 flex max-w-2xl gap-3 border-l-2 border-sand-ink pl-4 text-sm opacity-75">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sand-ink" />
            {dict.locationPage.scheduleWarning}
          </p>
        </Container>
      </Section>

      {/* Trip tips */}
      <Section tone="warm-white">
        <Container>
          <SectionHeading
            eyebrow={dict.locationPage.tipsTitle}
            title={dict.locationPage.tipsTitle}
            lede={dict.locationPage.tipsSubtitle}
          />

          {/* Swipes on a phone, five across on desktop — stacked, these five
              portraits ran to several screens. */}
          <ScrollRow className="mt-10 sm:gap-6" cols="sm:grid-cols-3 lg:grid-cols-5">
            {tripTips.map((tip, index) => (
              <Reveal key={tip.id} as="li" delay={index * 60} className={scrollRowItem}>
                <figure>
                  <div className="card-float relative aspect-[4/5] overflow-hidden bg-cream">
                    <SafeImage
                      image={tip.image}
                      locale={locale}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 78vw"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <p className="font-display text-xl leading-none">{tip.name}</p>
                    <p className="mt-1.5 text-xs opacity-60">{tip.description[locale]}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ScrollRow>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          hotelSchema(locale),
          breadcrumbSchema(locale, [{ name: dict.locationPage.eyebrow, path: "/location" }]),
        ]}
      />
    </>
  );
}
