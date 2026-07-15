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
        tone="cream"
        aside={
          <div className="flex items-center gap-3 text-navy">
            <Users aria-hidden="true" className="size-5 opacity-50" />
            <p>
              <span className="block text-xs tracking-wide uppercase opacity-55">
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
          className="pointer-events-none absolute top-12 -right-10 h-48 w-48 text-sand opacity-30"
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

              <HandwrittenNote className="mt-10" arrow="right">
                {dict.catering.contactTitle}
              </HandwrittenNote>
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

      {/* Vouchers */}
      <Section tone="blue-light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={dict.catering.vouchersTitle}
                title={dict.catering.vouchersTitle}
                lede={dict.catering.vouchersText}
              />
            </div>

            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {vouchers.map((voucher) => (
                  <li
                    key={voucher.id}
                    className="flex flex-col items-start justify-between gap-6 border border-navy/20 bg-warm-white p-5"
                  >
                    <span className="text-xs tracking-wide uppercase opacity-55">
                      {dict.catering.voucherValue}
                    </span>
                    <Price
                      amountCzk={voucher.valueCzk}
                      locale={locale}
                      className="font-display text-3xl"
                    />
                  </li>
                ))}
              </ul>

              {/* No payment system is implemented, and none is implied. */}
              <p className="mt-6 text-sm opacity-70">{dict.catering.vouchersNote}</p>
            </div>
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
