import type { Metadata } from "next";
import { notFound } from "next/navigation";
// lucide-react no longer ships brand icons, so social links use a neutral
// external-link affordance plus the platform name as text.
import { ArrowRight, CalendarDays, ExternalLink } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localePath, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema, restaurantSchema } from "@/lib/structured-data";
import { getDailyMenu, isDemoDailyMenu } from "@/content/daily-menu";
import { getMenuByCategory } from "@/content/menu";
import { drinkGroups, instagramUrl, seatingZones, vouchers } from "@/content/restaurant";
import { galleryItems } from "@/content/gallery";
import { bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Price } from "@/components/ui/MenuBadges";
import { DailyMenuEmpty, DailyMenuList } from "@/components/restaurant/DailyMenuList";
import { MenuList } from "@/components/restaurant/MenuList";
import { ZoneShowcase } from "@/components/restaurant/ZoneShowcase";
import { LocalProducers } from "@/components/sections/LocalProducers";
import { FamilyFriendly } from "@/components/sections/FamilyFriendly";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Cup, Waves } from "@/components/illustrations";
import { formatDate, formatWeekday } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/restaurant",
    title: dict.restaurantPage.title,
    description: dict.restaurantPage.intro,
  });
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const menu = getDailyMenu();
  const restaurantGallery = galleryItems.filter(
    (item) =>
      item.category === "restaurant" || item.category === "food" || item.category === "garden",
  );
  // A teaser only — the full à la carte menu has its own page.
  const menuTeaser = getMenuByCategory().filter((group) =>
    ["small-dishes", "main-courses"].includes(group.category),
  );

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.restaurantPage.eyebrow}
        title={dict.restaurantPage.title}
        lede={dict.restaurantPage.intro}
        crumbs={[{ label: dict.restaurantPage.eyebrow }]}
        tone="cream"
        aside={
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <HandwrittenNote arrow="left">{dict.restaurantPage.handwritten}</HandwrittenNote>
            <Button href={localePath(locale, bookTableHref)} size="lg" variant="secondary">
              {dict.actions.bookTable}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-navy/15 pt-5 text-sm opacity-75">
          <p>{dict.restaurantPage.reopened}</p>
          <p className="font-medium">{dict.restaurantPage.jimeJih}</p>
        </div>
      </PageHeader>

      {/* Today's menu */}
      <Section tone="warm-white">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={dict.dailyMenu.eyebrow}
              title={dict.dailyMenu.title}
              lede={dict.dailyMenu.subtitle}
            />
            {menu ? (
              <p className="flex shrink-0 items-center gap-2 text-sm font-medium">
                <CalendarDays aria-hidden="true" className="size-4 opacity-60" />
                <time dateTime={menu.date}>
                  <span className="capitalize">{formatWeekday(menu.date, locale)}</span>
                  {" · "}
                  {formatDate(menu.date, locale)}
                </time>
              </p>
            ) : null}
          </div>

          <div className="mt-10">
            {menu ? (
              <>
                <DailyMenuList menu={menu} locale={locale} dict={dict} />
                {isDemoDailyMenu ? (
                  <p className="mt-8 text-xs opacity-50">{dict.dailyMenu.demoNotice}</p>
                ) : null}
              </>
            ) : (
              <DailyMenuEmpty dict={dict} />
            )}
          </div>

          <div className="mt-8">
            <Button href={localePath(locale, "/restaurant/daily-menu")} variant="outline">
              {dict.actions.fullDailyMenu}
            </Button>
          </div>
        </Container>
      </Section>

      {/* How we cook */}
      <Section tone="navy" spacing="tight" className="relative overflow-hidden">
        <Waves
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 left-0 h-10 w-full text-blue opacity-10"
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
            <h2 className="text-heading font-semibold text-balance text-blue">
              {dict.restaurantPage.principlesTitle}
            </h2>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {dict.restaurantPage.principles.map((principle) => (
                <li
                  key={principle}
                  className="flex items-center gap-3 border-b border-cream/15 py-3 text-sm"
                >
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Menu teaser */}
      <Section tone="warm-white">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={dict.restaurantPage.menuTeaser}
              title={dict.restaurantPage.menuTeaser}
              lede={dict.restaurantPage.menuTeaserText}
            />
            <Button
              href={localePath(locale, "/restaurant/menu")}
              variant="ghost"
              className="shrink-0 self-start sm:self-auto"
            >
              {dict.actions.fullMenu}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>

          <div className="mt-12">
            <MenuList groups={menuTeaser} locale={locale} dict={dict} />
          </div>
        </Container>
      </Section>

      {/* Zones */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow={dict.zones.eyebrow}
            title={dict.zones.title}
            lede={dict.zones.subtitle}
          />
          <div className="mt-12">
            <ZoneShowcase zones={seatingZones} locale={locale} dict={dict} />
          </div>
        </Container>
      </Section>

      <LocalProducers locale={locale} dict={dict} />

      {/* Drinks */}
      <Section tone="warm-white" className="relative overflow-hidden">
        <Cup
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-10 h-40 w-40 text-sand opacity-30"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow={dict.restaurantPage.drinksTitle}
            title={dict.restaurantPage.drinksTitle}
            lede={dict.restaurantPage.drinksSubtitle}
          />

          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {drinkGroups.map((group) => (
              <div key={group.id} className="border-t border-navy/15 pt-5">
                <h3 className="text-lg font-semibold">{group.title[locale]}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm">
                      <span aria-hidden="true" className="size-1 rounded-full bg-sand-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
                {group.note ? (
                  <p className="mt-3 text-sm leading-relaxed opacity-70">
                    {group.note[locale]}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* No prices are published for drinks, and none are invented. The
                full list is on the table; this button is ready for a future
                PDF or dedicated page. */}
            <p className="text-sm opacity-70">{dict.restaurantPage.drinksNote}</p>
            <p className="text-xs opacity-50">{dict.restaurantPage.drinksPending}</p>
          </div>
        </Container>
      </Section>

      <FamilyFriendly locale={locale} dict={dict} />

      {/* Events, catering and vouchers.
          Cream, because FamilyFriendly above it is the blue field. */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={dict.catering.eyebrow}
                title={dict.catering.title}
                lede={dict.catering.intro}
              />
              <p className="mt-6 text-sm opacity-75">{dict.catering.capacityText}</p>
              <Button href={localePath(locale, "/restaurant/catering")} className="mt-6">
                {dict.catering.eyebrow}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>

            <div>
              <SectionHeading
                eyebrow={dict.catering.vouchersTitle}
                title={dict.catering.vouchersTitle}
                lede={dict.catering.vouchersText}
              />
              <ul className="mt-6 flex flex-wrap gap-3">
                {vouchers.map((voucher) => (
                  <li
                    key={voucher.id}
                    className="border border-navy/20 px-4 py-2 text-sm font-medium"
                  >
                    <span className="sr-only">{dict.catering.voucherValue} </span>
                    <Price amountCzk={voucher.valueCzk} locale={locale} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs opacity-60">{dict.catering.vouchersNote}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section tone="warm-white">
        <Container>
          <SectionHeading eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} />
          <div className="mt-10">
            <GalleryGrid
              items={restaurantGallery}
              categories={["restaurant", "food", "garden"]}
              locale={locale}
              dict={dict}
              showFilter={false}
              swipeOnMobile
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={localePath(locale, "/gallery")} variant="outline">
              {dict.actions.wholeGallery}
            </Button>
            <Button
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              {dict.restaurantPage.followInstagram}
              <span className="sr-only">({dict.a11y.openInNewTab})</span>
            </Button>
          </div>
          <p className="mt-3 text-xs opacity-55">{dict.restaurantPage.instagramText}</p>
        </Container>
      </Section>

      {/* Booking CTA */}
      <Section tone="navy" spacing="tight">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-4xl leading-none text-blue">
                {dict.restaurantPage.bookingTitle}
              </h2>
              <p className="mt-3 max-w-md opacity-80">{dict.restaurantPage.bookingText}</p>
            </div>
            <Button
              href={localePath(locale, bookTableHref)}
              variant="secondary"
              size="lg"
              className="shrink-0"
            >
              {dict.actions.bookTable}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          restaurantSchema(locale),
          breadcrumbSchema(locale, [
            { name: dict.restaurantPage.eyebrow, path: "/restaurant" },
          ]),
        ]}
      />
    </>
  );
}
