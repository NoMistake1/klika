import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localePath, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema } from "@/lib/structured-data";
import { getDailyMenu, isDemoDailyMenu } from "@/content/daily-menu";
import { getUsedAllergens } from "@/content/menu";
import { bookTableHref } from "@/content/navigation";
import { restaurantPhone } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { DailyMenuEmpty, DailyMenuList } from "@/components/restaurant/DailyMenuList";
import { AllergenLegend } from "@/components/ui/MenuBadges";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { formatDate, formatWeekday, telLink } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/restaurant/daily-menu",
    title: dict.dailyMenuPage.title,
    description: dict.dailyMenu.subtitle,
  });
}

export default async function DailyMenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const menu = getDailyMenu();
  const usedAllergens = menu ? getUsedAllergens(menu.items) : [];

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.dailyMenuPage.eyebrow}
        title={dict.dailyMenuPage.title}
        lede={dict.dailyMenuPage.intro}
        crumbs={[
          { label: dict.restaurantPage.eyebrow, path: "/restaurant" },
          { label: dict.dailyMenu.title },
        ]}
        tone="cream"
        aside={
          <div className="flex flex-col items-start gap-4 lg:items-end">
            {menu ? (
              <p className="flex items-center gap-2 font-medium">
                <CalendarDays aria-hidden="true" className="size-4 opacity-60" />
                <time dateTime={menu.date}>
                  <span className="capitalize">{formatWeekday(menu.date, locale)}</span>
                  {" · "}
                  {formatDate(menu.date, locale)}
                </time>
              </p>
            ) : null}
            <p className="text-sm opacity-60">{dict.dailyMenu.servedFrom}</p>
            <Button href={localePath(locale, bookTableHref)} variant="secondary">
              {dict.actions.bookTable}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        }
      />

      <Section tone="warm-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              {menu ? (
                <>
                  <DailyMenuList menu={menu} locale={locale} dict={dict} />
                  <div className="mt-14">
                    <AllergenLegend allergens={usedAllergens} locale={locale} dict={dict} />
                  </div>
                  {isDemoDailyMenu ? (
                    <p className="mt-8 text-xs opacity-50">{dict.dailyMenu.demoNotice}</p>
                  ) : null}
                </>
              ) : (
                <DailyMenuEmpty dict={dict} />
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <HandwrittenNote arrow="right">{dict.dailyMenu.eyebrow}</HandwrittenNote>

                <div className="mt-6 bg-cream p-6">
                  <p className="text-sm leading-relaxed opacity-80">
                    {dict.dailyMenu.subtitle}
                  </p>
                  <p className="mt-4 text-sm opacity-60">{dict.dailyMenu.servedFrom}</p>
                  <a
                    href={telLink(restaurantPhone.e164)}
                    className="link-underline mt-4 inline-flex min-h-8 items-center text-sm font-medium"
                  >
                    {restaurantPhone.display}
                  </a>
                </div>

                <Button
                  href={localePath(locale, "/restaurant/menu")}
                  variant="outline"
                  className="mt-6"
                >
                  {dict.actions.fullMenu}
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          breadcrumbSchema(locale, [
            { name: dict.restaurantPage.eyebrow, path: "/restaurant" },
            { name: dict.dailyMenu.title, path: "/restaurant/daily-menu" },
          ]),
        ]}
      />
    </>
  );
}
