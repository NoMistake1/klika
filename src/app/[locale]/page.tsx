import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, resolveLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, hotelSchema, restaurantSchema } from "@/lib/structured-data";
import { Hero } from "@/components/sections/Hero";
import { DailyMenuPreview } from "@/components/sections/DailyMenuPreview";
import { BrandSplit } from "@/components/sections/BrandSplit";
import { HotelNumbers } from "@/components/sections/HotelNumbers";
import { FeaturedRooms } from "@/components/sections/FeaturedRooms";
import { RestaurantZones } from "@/components/sections/RestaurantZones";
import { LocalProducers } from "@/components/sections/LocalProducers";
import { FamilyFriendly } from "@/components/sections/FamilyFriendly";
import { LocationPreview } from "@/components/sections/LocationPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { FinalCta } from "@/components/sections/FinalCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/",
    title: `${dict.siteName} — ${dict.tagline}`,
    description: dict.hero.subheadline,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  // An unsupported first segment (e.g. /foo) lands here — it is a 404, not a
  // silent fallback to Czech.
  if (!isLocale(raw)) notFound();

  const locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <DailyMenuPreview locale={locale} dict={dict} />
      <BrandSplit locale={locale} dict={dict} />
      <HotelNumbers locale={locale} dict={dict} />
      <FeaturedRooms locale={locale} dict={dict} />
      <RestaurantZones locale={locale} dict={dict} />
      <LocalProducers locale={locale} dict={dict} />
      <FamilyFriendly locale={locale} dict={dict} />
      <LocationPreview locale={locale} dict={dict} />
      <GalleryPreview locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />
      <JsonLdScript schemas={[hotelSchema(locale), restaurantSchema(locale)]} />
    </>
  );
}
