import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import {
  address,
  billingEntities,
  checkInHours,
  checkOutHours,
  directionsUrl,
  hotelEmail,
  hotelMobile,
  hotelPhone,
  openingHours,
  restaurantEmail,
  restaurantPhone,
  socialLinks,
} from "@/content/contact";
import { bookStayHref, bookTableHref, footerNavigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Logo } from "@/components/ui/Logo";
import { Waves } from "@/components/illustrations";
import { telLink } from "@/lib/utils";

/**
 * Site footer. Server-rendered — the only interactive part is the billing
 * disclosure, which uses native <details> and needs no JavaScript.
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy text-cream">
      <Waves
        className="pointer-events-none absolute -top-1 left-0 h-10 w-[200%] text-blue opacity-10"
        aria-hidden="true"
      />

      <Container className="relative pt-16 pb-10 sm:pt-20">
        {/* Booking CTAs */}
        <div className="flex flex-col gap-6 border-b border-cream/15 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <Logo variant="full" height={64} onDark className="mb-5" />
            <p className="text-lg leading-relaxed text-balance">{dict.footer.statement}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
            <Button href={localePath(locale, bookStayHref)} variant="cream" size="lg">
              {dict.actions.bookStay}
            </Button>
            <Button href={localePath(locale, bookTableHref)} variant="secondary" size="lg">
              {dict.actions.bookTable}
            </Button>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Hotel */}
          <section>
            <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
              {dict.footer.hotelTitle}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={telLink(hotelPhone.e164)}
                  className="link-underline inline-flex min-h-8 items-center gap-2"
                >
                  <Phone aria-hidden="true" className="size-3.5 shrink-0 opacity-60" />
                  <span className="sr-only">{dict.contactPage.reception}:</span>
                  {hotelPhone.display}
                </a>
              </li>
              <li>
                <a
                  href={telLink(hotelMobile.e164)}
                  className="link-underline inline-flex min-h-8 items-center gap-2"
                >
                  <Phone aria-hidden="true" className="size-3.5 shrink-0 opacity-60" />
                  <span className="sr-only">{dict.contactPage.mobile}:</span>
                  {hotelMobile.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${hotelEmail}`}
                  className="link-underline inline-flex min-h-8 items-center gap-2 break-all"
                >
                  <Mail aria-hidden="true" className="size-3.5 shrink-0 opacity-60" />
                  {hotelEmail}
                </a>
              </li>
            </ul>

            <h2 className="mt-8 mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
              {dict.footer.restaurantTitle}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={telLink(restaurantPhone.e164)}
                  className="link-underline inline-flex min-h-8 items-center gap-2"
                >
                  <Phone aria-hidden="true" className="size-3.5 shrink-0 opacity-60" />
                  {restaurantPhone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${restaurantEmail}`}
                  className="link-underline inline-flex min-h-8 items-center gap-2 break-all"
                >
                  <Mail aria-hidden="true" className="size-3.5 shrink-0 opacity-60" />
                  {restaurantEmail}
                </a>
              </li>
            </ul>
          </section>

          {/* Address + hours */}
          <section>
            <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
              {dict.footer.addressTitle}
            </h2>
            <address className="text-sm leading-relaxed not-italic opacity-90">
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
            </address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-3 inline-flex min-h-8 items-center gap-2 text-sm"
            >
              <MapPin aria-hidden="true" className="size-3.5 shrink-0 opacity-60" />
              {dict.actions.navigate}
              <span className="sr-only">({dict.a11y.openInNewTab})</span>
            </a>

            <h2 className="mt-8 mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
              {dict.footer.hoursTitle}
            </h2>
            <dl className="space-y-1.5 text-sm">
              {openingHours.map((entry) => (
                <div key={entry.id} className="flex justify-between gap-4">
                  <dt className="opacity-70">{entry.label[locale]}</dt>
                  <dd className="tabular-nums">{entry.hours}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4">
                <dt className="opacity-70">{dict.contactPage.checkIn}</dt>
                <dd className="tabular-nums">{checkInHours}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="opacity-70">{dict.contactPage.checkOut}</dt>
                <dd className="tabular-nums">{checkOutHours}</dd>
              </div>
            </dl>
          </section>

          {/* Navigation */}
          <nav aria-label={dict.footer.navigationTitle}>
            <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
              {dict.footer.navigationTitle}
            </h2>
            <ul className="space-y-2 text-sm">
              {footerNavigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={localePath(locale, item.href)}
                    className="link-underline inline-flex min-h-8 items-center opacity-90 hover:opacity-100"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <section>
            <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
              {dict.contactPage.socialTitle}
            </h2>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex min-h-8 items-center opacity-90 hover:opacity-100"
                  >
                    {link.label}
                    <span className="sr-only"> ({dict.a11y.openInNewTab})</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Billing — present but deliberately understated. */}
        <details className="group border-t border-cream/15 py-4">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-xs tracking-wide opacity-60 transition-opacity hover:opacity-100">
            <span className="transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
            {dict.footer.billingToggle}
          </summary>
          <div className="grid gap-6 pt-4 text-xs opacity-70 sm:grid-cols-2">
            {billingEntities.map((entity) => (
              <div key={entity.id}>
                <p className="mb-1 font-semibold">{entity.role[locale]}</p>
                <address className="leading-relaxed not-italic">
                  {entity.name}
                  <br />
                  {entity.addressLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                  {dict.contactPage.companyId}: {entity.companyId}
                  <br />
                  {dict.contactPage.vatId}: {entity.vatId}
                </address>
              </div>
            ))}
          </div>
        </details>

        <div className="flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs opacity-60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {dict.siteName}. {dict.footer.rights}
          </p>
          <Link
            href={localePath(locale, "/privacy")}
            className="link-underline inline-flex min-h-8 items-center"
          >
            {dict.footer.privacy}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
