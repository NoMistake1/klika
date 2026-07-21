import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localePath, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema, restaurantSchema } from "@/lib/structured-data";
import { getMenuByCategory, getUsedAllergens, menuItems } from "@/content/menu";
import { getDailyMenu, isDemoDailyMenu } from "@/content/daily-menu";
import { bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { MenuSwitcher } from "@/components/restaurant/MenuSwitcher";

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
  const dailyMenu = getDailyMenu();
  const permanentAllergens = getUsedAllergens(menuItems);
  const dailyAllergens = dailyMenu ? getUsedAllergens(dailyMenu.items) : [];

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.menuPage.eyebrow}
        title={dict.menuPage.title}
        lede={dict.restaurantPage.menuTeaserText}
        crumbs={[
          { label: dict.restaurantPage.eyebrow, path: "/restaurant" },
          { label: dict.menuPage.title },
        ]}
        className="lg:pt-44 lg:pb-32"
        background={{
          src: "/images/restaurant/menu-desktop.webp",
          width: 1536,
          height: 1024,
          mobileSrc: "/images/restaurant/menu-mobile.webp",
          mobileWidth: 1402,
          mobileHeight: 1122,
          // Same focal points as the table-booking hero, which shares these two
          // files: both crops sit well down the frame so the printed booklet and
          // its Klika/MENU lettering land in the visible band instead of the
          // empty tabletop above it. The desktop file needs to sit lower still
          // than the taller mobile one.
          imgClassName: "object-[center_62%] md:object-[center_74%]",
        }}
        aside={
          <Button href={localePath(locale, bookTableHref)} size="lg" variant="secondary">
            {dict.actions.bookTable}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        }
      />

      <Section tone="warm-white">
        {/* A menu is read, not scanned edge to edge — a narrow measure keeps
            the dish/price relationship legible on a wide screen. */}
        <Container size="narrow">
          {/* useSearchParams needs a Suspense boundary to keep the page static. */}
          <Suspense fallback={<div className="min-h-96" aria-hidden="true" />}>
            <MenuSwitcher
              dailyMenu={dailyMenu}
              groups={groups}
              dailyAllergens={dailyAllergens}
              permanentAllergens={permanentAllergens}
              isDemoDaily={isDemoDailyMenu}
              locale={locale}
              dict={dict}
            />
          </Suspense>
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
