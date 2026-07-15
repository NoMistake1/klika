import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localePath, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema, restaurantSchema } from "@/lib/structured-data";
import { getMenuByCategory, getUsedAllergens, menuItems } from "@/content/menu";
import { bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { MenuList } from "@/components/restaurant/MenuList";
import { AllergenLegend } from "@/components/ui/MenuBadges";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/restaurant/menu",
    title: dict.menuPage.title,
    description: dict.menuPage.intro,
  });
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const groups = getMenuByCategory();
  const usedAllergens = getUsedAllergens(menuItems);

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.menuPage.eyebrow}
        title={dict.menuPage.title}
        lede={dict.menuPage.intro}
        crumbs={[
          { label: dict.restaurantPage.eyebrow, path: "/restaurant" },
          { label: dict.menuPage.title },
        ]}
        tone="cream"
        aside={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Button href={localePath(locale, bookTableHref)} size="lg" variant="secondary">
              {dict.actions.bookTable}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href={localePath(locale, "/restaurant/daily-menu")} variant="ghost">
              {dict.actions.fullDailyMenu}
            </Button>
          </div>
        }
      />

      <Section tone="warm-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Category jump list — a menu this long needs a way in. */}
            <nav aria-label={dict.menuPage.jumpTo} className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                  {dict.menuPage.jumpTo}
                </h2>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 lg:flex-col lg:gap-y-2">
                  {groups.map((group) => (
                    <li key={group.category}>
                      <a
                        href={`#menu-${group.category}`}
                        className="link-underline inline-flex min-h-8 items-center text-sm opacity-75 hover:opacity-100"
                      >
                        {dict.menuPage.categories[group.category]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="lg:col-span-9">
              <MenuList groups={groups} locale={locale} dict={dict} />

              <div className="mt-16">
                <AllergenLegend allergens={usedAllergens} locale={locale} dict={dict} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          restaurantSchema(locale),
          breadcrumbSchema(locale, [
            { name: dict.restaurantPage.eyebrow, path: "/restaurant" },
            { name: dict.menuPage.title, path: "/restaurant/menu" },
          ]),
        ]}
      />
    </>
  );
}
