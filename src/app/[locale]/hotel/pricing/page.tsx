import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Info, X } from "lucide-react";
import { getDictionary, interpolate } from "@/content/dictionaries";
import { isLocale, localePath, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema } from "@/lib/structured-data";
import { pricingPeriod, pricingRows } from "@/content/hotel";
import { bookStayHref } from "@/content/navigation";
import { hotelEmail, hotelMobile } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { PricingList } from "@/components/hotel/PricingList";
import { ICON_LIST_ITEM, ICON_MARKER_OFFSET } from "@/components/ui/BulletList";
import { cn, formatDate, telLink } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/hotel/pricing",
    title: dict.pricingPage.title,
    description: interpolate(dict.pricingPage.validity, {
      from: formatDate(pricingPeriod.validFrom, locale),
      to: formatDate(pricingPeriod.validTo, locale),
    }),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const validity = interpolate(dict.pricingPage.validity, {
    from: formatDate(pricingPeriod.validFrom, locale),
    to: formatDate(pricingPeriod.validTo, locale),
  });

  // Room rates carry the trade-fair/New Year's Eve exception; the fees below
  // are listed separately so the asterisk means exactly one thing.
  const roomRows = pricingRows.filter((row) => row.hasSeasonalException || row.id === "single-limited");
  const extraRows = pricingRows.filter(
    (row) => !row.hasSeasonalException && row.id !== "single-limited",
  );

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.pricingPage.eyebrow}
        title={dict.pricingPage.title}
        lede={validity}
        crumbs={[
          { label: dict.hotelPage.eyebrow, path: "/hotel" },
          { label: dict.pricingPage.title },
        ]}
        tone="blue-light"
        aside={
          <Button href={localePath(locale, bookStayHref)} size="lg">
            {dict.actions.bookStay}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        }
      />

      <Section tone="warm-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="mb-6 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                {dict.rooms.title}
              </h2>
              <PricingList rows={roomRows} locale={locale} dict={dict} />

              <h2 className="mt-14 mb-6 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                {dict.pricingPage.extrasTitle}
              </h2>
              <PricingList rows={extraRows} locale={locale} dict={dict} />

              <p className="mt-8 flex gap-3 border-l-2 border-sand-ink pl-4 text-sm opacity-75">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sand-ink" />
                {dict.pricingPage.exceptionNote}
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-cream p-6 sm:p-8">
                {/* Same alignment rule as every other list on the hotel pages:
                    the icon gets its own 1rem track and is centred on the first
                    line, so a wrapped item runs under the text. */}
                <h2 className="text-lg font-semibold">{dict.pricingPage.includedTitle}</h2>
                <ul className="mt-4 space-y-2">
                  {dict.pricingPage.included.map((item) => (
                    <li key={item} className={ICON_LIST_ITEM}>
                      <Check
                        aria-hidden="true"
                        className={cn(ICON_MARKER_OFFSET, "size-4 text-sand-ink")}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="mt-8 text-lg font-semibold">
                  {dict.pricingPage.notIncludedTitle}
                </h2>
                <ul className="mt-4 space-y-2">
                  {dict.pricingPage.notIncluded.map((item) => (
                    <li key={item} className={cn(ICON_LIST_ITEM, "opacity-70")}>
                      <X aria-hidden="true" className={cn(ICON_MARKER_OFFSET, "size-4")} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-navy/15 pt-6">
                <h2 className="text-lg font-semibold text-pretty">
                  {dict.pricingPage.singleRoomTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed opacity-75">
                  {dict.pricingPage.singleRoomText}
                </p>
              </div>

              <div className="mt-6 border-t border-navy/15 pt-6">
                <p className="text-sm opacity-75">{dict.pricingPage.askReception}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={telLink(hotelMobile.e164)}
                    className="link-underline inline-flex min-h-8 items-center text-sm font-medium"
                  >
                    {hotelMobile.display}
                  </a>
                  <a
                    href={`mailto:${hotelEmail}`}
                    className="link-underline inline-flex min-h-8 items-center text-sm font-medium"
                  >
                    {hotelEmail}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          breadcrumbSchema(locale, [
            { name: dict.hotelPage.eyebrow, path: "/hotel" },
            { name: dict.pricingPage.title, path: "/hotel/pricing" },
          ]),
        ]}
      />
    </>
  );
}
