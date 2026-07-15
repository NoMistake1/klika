import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Info, LogIn, LogOut, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema, hotelSchema, restaurantSchema } from "@/lib/structured-data";
import {
  address,
  billingEntities,
  checkInHours,
  checkOutHours,
  coordinates,
  directionsUrl,
  hotelEmail,
  hotelMobile,
  hotelPhone,
  hotelWhatsApp,
  openingHours,
  restaurantEmail,
  restaurantPhone,
  socialLinks,
} from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { LazyMap } from "@/components/location/LazyMap";
import { telLink, whatsAppLink } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/contact",
    title: dict.contactPage.title,
    description: `${dict.siteName}, ${address.streetLines[0]}, ${address.postalCode} ${address.city}. ${hotelPhone.display}`,
  });
}

export default async function ContactPage({
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
        eyebrow={dict.contactPage.eyebrow}
        title={dict.contactPage.title}
        crumbs={[{ label: dict.contactPage.eyebrow }]}
        tone="blue-light"
      />

      <Section tone="warm-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Hotel */}
            <section>
              <h2 className="font-display text-3xl leading-none">
                {dict.contactPage.hotelTitle}
              </h2>

              <dl className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
                <ContactRow icon={<Phone className="size-4" />} label={dict.contactPage.reception}>
                  <a href={telLink(hotelPhone.e164)} className="link-underline font-medium">
                    {hotelPhone.display}
                  </a>
                </ContactRow>
                <ContactRow icon={<Phone className="size-4" />} label={dict.contactPage.mobile}>
                  <a href={telLink(hotelMobile.e164)} className="link-underline font-medium">
                    {hotelMobile.display}
                  </a>
                </ContactRow>
                <ContactRow
                  icon={<MessageCircle className="size-4" />}
                  label={dict.contactPage.whatsApp}
                >
                  <a
                    href={whatsAppLink(hotelWhatsApp.e164)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-medium"
                  >
                    {hotelWhatsApp.display}
                    <span className="sr-only"> ({dict.a11y.openInNewTab})</span>
                  </a>
                </ContactRow>
                <ContactRow icon={<Mail className="size-4" />} label={dict.contactPage.email}>
                  <a
                    href={`mailto:${hotelEmail}`}
                    className="link-underline font-medium break-all"
                  >
                    {hotelEmail}
                  </a>
                </ContactRow>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={telLink(hotelMobile.e164)}>
                  <Phone aria-hidden="true" className="size-4" />
                  {dict.actions.callReception}
                </Button>
                <Button href={`mailto:${hotelEmail}`} variant="outline">
                  <Mail aria-hidden="true" className="size-4" />
                  {dict.actions.sendEmail}
                </Button>
              </div>
            </section>

            {/* Restaurant */}
            <section>
              <h2 className="font-display text-3xl leading-none">
                {dict.contactPage.restaurantTitle}
              </h2>

              <dl className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
                <ContactRow icon={<Phone className="size-4" />} label={dict.contactPage.phone}>
                  <a href={telLink(restaurantPhone.e164)} className="link-underline font-medium">
                    {restaurantPhone.display}
                  </a>
                </ContactRow>
                <ContactRow icon={<Mail className="size-4" />} label={dict.contactPage.email}>
                  <a
                    href={`mailto:${restaurantEmail}`}
                    className="link-underline font-medium break-all"
                  >
                    {restaurantEmail}
                  </a>
                </ContactRow>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={telLink(restaurantPhone.e164)} variant="secondary">
                  <Phone aria-hidden="true" className="size-4" />
                  {dict.actions.callRestaurant}
                </Button>
                <Button href={`mailto:${restaurantEmail}`} variant="outline">
                  <Mail aria-hidden="true" className="size-4" />
                  {dict.actions.sendEmail}
                </Button>
              </div>
            </section>
          </div>
        </Container>
      </Section>

      {/* Hours */}
      <Section tone="cream" spacing="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={dict.contactPage.hoursTitle}
                title={dict.contactPage.hoursTitle}
              />
              {/* Guests arriving outside reception hours need this, so it is
                  stated where they will look, not buried. */}
              <p className="mt-6 flex gap-3 border-l-2 border-sand-ink pl-4 text-sm opacity-80">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sand-ink" />
                {dict.contactPage.afterHoursNotice}
              </p>
            </div>

            <div className="lg:col-span-7">
              <dl className="divide-y divide-navy/10 border-y border-navy/10">
                {openingHours.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <dt className="flex items-center gap-2.5 font-medium">
                      <Clock aria-hidden="true" className="size-4 opacity-50" />
                      {entry.label[locale]}
                      <span className="text-sm font-normal opacity-55">
                        {entry.days[locale]}
                      </span>
                    </dt>
                    <dd className="tabular-nums">{entry.hours}</dd>
                  </div>
                ))}

                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="flex items-center gap-2.5 font-medium">
                    <LogIn aria-hidden="true" className="size-4 opacity-50" />
                    {dict.contactPage.checkIn}
                  </dt>
                  <dd className="tabular-nums">{checkInHours}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="flex items-center gap-2.5 font-medium">
                    <LogOut aria-hidden="true" className="size-4 opacity-50" />
                    {dict.contactPage.checkOut}
                  </dt>
                  <dd className="tabular-nums">{checkOutHours}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Address + map */}
      <Section tone="warm-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={dict.contactPage.addressTitle}
                title={dict.contactPage.addressTitle}
              />
              <address className="mt-6 flex gap-3 text-base leading-relaxed not-italic">
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
              <p className="mt-3 text-sm opacity-70">
                <span className="sr-only">{dict.locationPage.gpsTitle}: </span>
                {coordinates.display}
              </p>
              <Button
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6"
              >
                {dict.actions.navigate}
                <span className="sr-only">({dict.a11y.openInNewTab})</span>
              </Button>

              <h2 className="mt-10 mb-3 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                {dict.contactPage.socialTitle}
              </h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex min-h-8 items-center text-sm"
                    >
                      {link.label}
                      <span className="sr-only"> ({dict.a11y.openInNewTab})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <LazyMap dict={dict} aspect="aspect-[4/3]" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Billing — present, findable, and deliberately not prominent. */}
      <Section tone="cream" spacing="tight">
        <Container>
          <details className="group border-y border-navy/15">
            <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 text-sm font-medium">
              <span aria-hidden="true" className="transition-transform group-open:rotate-45">
                +
              </span>
              {dict.contactPage.billingToggle}
            </summary>
            <div className="grid gap-8 pb-6 sm:grid-cols-2">
              {billingEntities.map((entity) => (
                <div key={entity.id}>
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                    {entity.role[locale]}
                  </h2>
                  <address className="mt-2 text-sm leading-relaxed not-italic">
                    <span className="font-medium">{entity.name}</span>
                    <br />
                    {entity.addressLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                    <span className="opacity-70">
                      {dict.contactPage.companyId}: {entity.companyId}
                      <br />
                      {dict.contactPage.vatId}: {entity.vatId}
                    </span>
                  </address>
                </div>
              ))}
            </div>
          </details>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          hotelSchema(locale),
          restaurantSchema(locale),
          breadcrumbSchema(locale, [{ name: dict.contactPage.eyebrow, path: "/contact" }]),
        ]}
      />
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3.5">
      <dt className="flex items-center gap-2.5 text-sm opacity-60">
        <span aria-hidden="true" className="opacity-70">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}
