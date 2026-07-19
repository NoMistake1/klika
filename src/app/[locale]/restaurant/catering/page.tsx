import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Phone, Users } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema } from "@/lib/structured-data";
import { vouchers } from "@/content/restaurant";
import { restaurantEmail, restaurantPhone } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Price } from "@/components/ui/MenuBadges";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { BackgroundPhoto } from "@/components/ui/BackgroundPhoto";
import { Plate } from "@/components/illustrations";
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
    path: "/restaurant/catering",
    title: dict.catering.title,
    description: dict.catering.intro,
  });
}

export default async function CateringPage({
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
        eyebrow={dict.catering.eyebrow}
        title={dict.catering.title}
        lede={dict.catering.intro}
        crumbs={[
          { label: dict.restaurantPage.eyebrow, path: "/restaurant" },
          { label: dict.catering.eyebrow },
        ]}
        className="lg:pt-44 lg:pb-32"
        // The laid wedding table carries the masthead: the portrait crop on
        // phones, the wide frame on desktop, each with its own focal point, and
        // both under the shared dark scrim so the cream text stays readable
        // without washing the photograph out.
        background={{
          src: "/images/restaurant/svatba-desktop.webp",
          width: 1672,
          height: 941,
          mobileSrc: "/images/restaurant/svatba.webp",
          mobileWidth: 1402,
          mobileHeight: 1122,
          imgClassName: "object-[center_58%] md:object-[center_42%]",
        }}
        aside={
          <div className="flex items-center gap-3 text-cream">
            <Users aria-hidden="true" className="size-5 opacity-60" />
            <p>
              <span className="block text-xs tracking-wide uppercase opacity-70">
                {dict.catering.capacityTitle}
              </span>
              <span className="block text-sm">{dict.catering.capacityText}</span>
            </p>
          </div>
        }
      />

      <Section tone="warm-white" className="relative overflow-hidden">
        <Plate
          aria-hidden="true"
          className="pointer-events-none absolute top-12 -right-10 h-48 w-48 text-sand opacity-30 lg:top-2"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow={dict.catering.offerTitle} title={dict.catering.offerTitle} />
              <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
                {dict.catering.offer.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-navy/10 py-3.5 text-sm"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-sand-ink" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* On a phone the planning panel sits BELOW this list, so the
                  arrow has to lead downward into it rather than sideways off
                  the screen; on desktop the panel is the column to the right,
                  where the level arrow is already correct. Display is toggled
                  on wrappers, never with `hidden` on the note's own inline-flex
                  span — cn() is a plain join, so that would never win. */}
              <div className="mt-10 lg:hidden">
                <HandwrittenNote arrow="downRight" tilt={34}>
                  {dict.catering.contactTitle}
                </HandwrittenNote>
              </div>
              <div className="mt-10 hidden lg:block">
                <HandwrittenNote arrow="right">{dict.catering.contactTitle}</HandwrittenNote>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-cream p-6 text-navy sm:p-8">
                <h2 className="text-lg font-semibold">{dict.catering.contactTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed opacity-75">
                  {dict.catering.contactText}
                </p>

                <div className="mt-6 flex flex-col gap-2.5">
                  <Button href={telLink(restaurantPhone.e164)}>
                    <Phone aria-hidden="true" className="size-4" />
                    {dict.actions.callRestaurant}
                  </Button>
                  <Button
                    href={`mailto:${restaurantEmail}?subject=${encodeURIComponent(dict.catering.eyebrow)}`}
                    variant="outline"
                  >
                    <Mail aria-hidden="true" className="size-4" />
                    {dict.actions.sendEmail}
                  </Button>
                </div>

                <dl className="mt-6 border-t border-navy/10 pt-4 text-sm">
                  <dt className="opacity-55">{dict.contactPage.phone}</dt>
                  <dd className="font-medium">{restaurantPhone.display}</dd>
                  <dt className="mt-2 opacity-55">{dict.contactPage.email}</dt>
                  <dd className="font-medium break-all">{restaurantEmail}</dd>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Gift vouchers — the voucher photograph is the section itself, not a
          picture placed on it. The scrim is directional: dense behind the text
          column and thinning across the frame, so the printed detail of the
          voucher stays visible instead of disappearing under a flat card. */}
      <Section tone="navy" className="relative overflow-hidden">
        <BackgroundPhoto
          src="/images/restaurant/poukazy.webp"
          width={1402}
          height={1122}
          sizes="100vw"
          className="object-[center_45%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy/88 via-navy/70 to-navy/62 lg:bg-gradient-to-r lg:from-navy/94 lg:via-navy/70 lg:to-navy/20"
        />

        <Container className="relative">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl leading-none text-blue sm:text-5xl">
              {dict.catering.vouchersTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-pretty text-cream/90 sm:text-lg">
              {dict.catering.vouchersText}
            </p>

            {/* The three values, as frosted plates rather than an opaque card. */}
            <ul className="mt-8 flex flex-wrap gap-3">
              {vouchers.map((voucher) => (
                <li
                  key={voucher.id}
                  className="border border-cream/25 bg-navy/25 px-6 py-4 backdrop-blur-sm"
                >
                  <span className="block text-[0.7rem] tracking-[0.18em] text-cream/60 uppercase">
                    {dict.catering.voucherValue}
                  </span>
                  <Price
                    amountCzk={voucher.valueCzk}
                    locale={locale}
                    className="mt-1 block font-display text-3xl text-blue"
                  />
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={telLink(restaurantPhone.e164)} variant="secondary" size="lg">
                <Phone aria-hidden="true" className="size-4" />
                {dict.actions.callRestaurant}
              </Button>
              <Button
                href={`mailto:${restaurantEmail}?subject=${encodeURIComponent(dict.catering.vouchersTitle)}`}
                variant="outline"
                size="lg"
                className="border-cream/40 text-cream hover:bg-cream/10"
              >
                <Mail aria-hidden="true" className="size-4" />
                {dict.actions.sendEmail}
              </Button>
            </div>

            {/* No payment system is implemented, and none is implied. */}
            {/* Kept at /80 rather than /70: the scrim is deliberately thinner
                here so the voucher print stays visible, so the smallest text
                needs the extra weight to stay comfortably legible. */}
            <p className="mt-6 max-w-md text-sm text-cream/80">{dict.catering.vouchersNote}</p>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          breadcrumbSchema(locale, [
            { name: dict.restaurantPage.eyebrow, path: "/restaurant" },
            { name: dict.catering.eyebrow, path: "/restaurant/catering" },
          ]),
        ]}
      />
    </>
  );
}
