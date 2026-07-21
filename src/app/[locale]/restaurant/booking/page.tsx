import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema } from "@/lib/structured-data";
import { openingHours, restaurantEmail, restaurantPhone } from "@/content/contact";
import { seatingZones } from "@/content/restaurant";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { TableBookingForm } from "@/components/booking/TableBookingForm";
import { telLink } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/restaurant/booking",
    title: dict.restaurantBooking.title,
    description: dict.restaurantBooking.intro,
    index: false,
  });
}

export default async function RestaurantBookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const restaurantHours = openingHours.find((entry) => entry.id === "restaurant");

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.restaurantBooking.eyebrow}
        title={dict.restaurantBooking.title}
        lede={dict.restaurantBooking.intro}
        crumbs={[
          { label: dict.restaurantPage.eyebrow, path: "/restaurant" },
          { label: dict.restaurantBooking.eyebrow },
        ]}
        className="lg:pt-44 lg:pb-32"
        // The printed menu on a laid table — the clearest possible "book a
        // table" signal. Both crops are pulled well down the frame so the
        // booklet and its Klika/MENU lettering land in the visible band rather
        // than the empty tabletop above it; the wide desktop file needs to sit
        // lower still than the taller mobile one. The shared PageHeader scrim
        // and priority loading come with the background prop.
        background={{
          src: "/images/restaurant/menu-desktop.webp",
          width: 1536,
          height: 1024,
          mobileSrc: "/images/restaurant/menu-mobile.webp",
          mobileWidth: 1402,
          mobileHeight: 1122,
          imgClassName: "object-[center_62%] md:object-[center_74%]",
        }}
      />

      <Section tone="warm-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* The form sits on its own raised surface so it reads as a single
                task rather than loose fields on the page. */}
            <div className="card-float bg-warm-white p-6 sm:p-8 lg:col-span-7">
              <TableBookingForm locale={locale} dict={dict} />
            </div>

            <aside className="lg:col-span-5">
              <div className="card-float bg-cream p-6 text-navy sm:p-8">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                  {dict.contactPage.restaurantTitle}
                </h2>

                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={telLink(restaurantPhone.e164)}
                    className="link-underline inline-flex min-h-9 items-center gap-2 font-medium"
                  >
                    <Phone aria-hidden="true" className="size-4 opacity-60" />
                    {restaurantPhone.display}
                  </a>
                  <a
                    href={`mailto:${restaurantEmail}`}
                    className="link-underline inline-flex min-h-9 items-center gap-2 font-medium break-all"
                  >
                    <Mail aria-hidden="true" className="size-4 shrink-0 opacity-60" />
                    {restaurantEmail}
                  </a>
                </div>

                {restaurantHours ? (
                  <p className="mt-6 border-t border-navy/10 pt-4 text-sm">
                    <span className="opacity-60">{restaurantHours.days[locale]}: </span>
                    <span className="tabular-nums">{restaurantHours.hours}</span>
                  </p>
                ) : null}

                <h3 className="mt-8 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                  {dict.zones.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {seatingZones.map((zone) => (
                    <li key={zone.id} className="flex justify-between gap-4">
                      <span>{zone.name[locale]}</span>
                      <span className="shrink-0 opacity-60 tabular-nums">
                        {zone.seats !== null
                          ? `${zone.seats} ${dict.zones.seats}`
                          : dict.zones.seasonal}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-xs opacity-60">{dict.restaurantBooking.zoneHint}</p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          breadcrumbSchema(locale, [
            { name: dict.restaurantPage.eyebrow, path: "/restaurant" },
            { name: dict.restaurantBooking.eyebrow, path: "/restaurant/booking" },
          ]),
        ]}
      />
    </>
  );
}
