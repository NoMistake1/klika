import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema } from "@/lib/structured-data";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { HotelBookingWizard } from "@/components/booking/HotelBookingWizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/hotel/booking",
    title: dict.hotelBooking.title,
    description: dict.hotelPage.bookingText,
    // The booking flow is a tool, not content to rank; keeping it out of the
    // index avoids competing with the hotel and rooms pages.
    index: false,
  });
}

export default async function HotelBookingPage({
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
        eyebrow={dict.hotelBooking.eyebrow}
        title={dict.hotelBooking.title}
        lede={dict.hotelPage.bookingText}
        crumbs={[
          { label: dict.hotelPage.eyebrow, path: "/hotel" },
          { label: dict.hotelBooking.eyebrow },
        ]}
        // Same asset and same height as the rooms hero, so arriving here from
        // a room card feels continuous rather than like a different site.
        className="lg:pt-44 lg:pb-32"
        background={{
          src: "/images/hotel/bed.webp",
          width: 1672,
          height: 941,
          imgClassName: "object-[center_50%] md:object-[center_45%]",
        }}
      />

      <Section tone="warm-white">
        <Container>
          {/* useSearchParams needs a Suspense boundary to keep the rest of the
              page static. */}
          <Suspense
            fallback={<p className="py-12 text-center opacity-60">{dict.a11y.loading}…</p>}
          >
            <HotelBookingWizard locale={locale} dict={dict} />
          </Suspense>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          breadcrumbSchema(locale, [
            { name: dict.hotelPage.eyebrow, path: "/hotel" },
            { name: dict.hotelBooking.eyebrow, path: "/hotel/booking" },
          ]),
        ]}
      />
    </>
  );
}
