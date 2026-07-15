import {
  address,
  coordinates,
  hotelEmail,
  hotelPhone,
  openingHours,
  restaurantEmail,
  restaurantPhone,
  socialLinks,
} from "@/content/contact";
import { getDictionary } from "@/content/dictionaries";
import { localePath, localeTags, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";

/* ==========================================================================
   schema.org structured data.

   Strictly limited to facts present in the supplied content. Deliberately
   absent: starRating, aggregateRating, review, awards and priceRange — none of
   those were supplied, and fabricating them would misrepresent the business to
   search engines and guests alike.
   ========================================================================== */

/** JSON-LD is an untyped document format; this mirrors that shape honestly. */
type JsonLd = Record<string, unknown>;

const postalAddress = (locale: Locale): JsonLd => ({
  "@type": "PostalAddress",
  streetAddress: address.streetLines.join(", "),
  addressLocality: address.city,
  postalCode: address.postalCode,
  addressCountry: address.countryCode,
  addressRegion: address.country[locale],
});

const geo: JsonLd = {
  "@type": "GeoCoordinates",
  latitude: coordinates.latitude,
  longitude: coordinates.longitude,
};

function openingSpec(id: string): JsonLd[] {
  const entry = openingHours.find((hours) => hours.id === id);
  if (!entry?.schema) return [];
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...entry.schema.dayOfWeek],
      opens: entry.schema.opens,
      closes: entry.schema.closes,
    },
  ];
}

/** Hotel Klika — the accommodation business. */
export function hotelSchema(locale: Locale): JsonLd {
  const dict = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${absoluteUrl(localePath(locale, "/hotel"))}#hotel`,
    name: dict.siteName,
    description: dict.hotelPage.intro,
    url: absoluteUrl(localePath(locale, "/hotel")),
    telephone: hotelPhone.display,
    email: hotelEmail,
    address: postalAddress(locale),
    geo,
    inLanguage: localeTags[locale],
    checkinTime: "14:00",
    checkoutTime: "11:00",
    petsAllowed: true,
    numberOfRooms: 26,
    sameAs: socialLinks.map((link) => link.href),
    openingHoursSpecification: openingSpec("reception"),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Breakfast", value: true },
    ],
  };
}

/** Klika Kitchen & Coffee — operated independently of the hotel. */
export function restaurantSchema(locale: Locale): JsonLd {
  const dict = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${absoluteUrl(localePath(locale, "/restaurant"))}#restaurant`,
    name: dict.restaurantName,
    description: dict.restaurantPage.intro,
    url: absoluteUrl(localePath(locale, "/restaurant")),
    telephone: restaurantPhone.display,
    email: restaurantEmail,
    address: postalAddress(locale),
    geo,
    inLanguage: localeTags[locale],
    servesCuisine: ["Czech", "South Bohemian", "Seasonal"],
    hasMenu: absoluteUrl(localePath(locale, "/restaurant/menu")),
    acceptsReservations: absoluteUrl(localePath(locale, "/restaurant/booking")),
    sameAs: [socialLinks.find((link) => link.id === "instagram")?.href].filter(Boolean),
    openingHoursSpecification: openingSpec("restaurant"),
  };
}

/** The operating organisation behind the site. */
export function organizationSchema(locale: Locale): JsonLd {
  const dict = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: dict.siteName,
    url: absoluteUrl(localePath(locale)),
    email: hotelEmail,
    telephone: hotelPhone.display,
    address: postalAddress(locale),
    sameAs: socialLinks.map((link) => link.href),
  };
}

export interface BreadcrumbEntry {
  readonly name: string;
  /** Path without the locale prefix. */
  readonly path: string;
}

/** Breadcrumb trail for a subpage. Home is prepended automatically. */
export function breadcrumbSchema(locale: Locale, trail: readonly BreadcrumbEntry[]): JsonLd {
  const dict = getDictionary(locale);
  const entries: BreadcrumbEntry[] = [{ name: dict.a11y.home, path: "/" }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(localePath(locale, entry.path)),
    })),
  };
}

/**
 * Renders one or more JSON-LD blocks.
 *
 * The content is our own serialized data, never user input; `JSON.stringify`
 * output is escaped for `<` so a value could never close the script tag early.
 */
export function JsonLdScript({ schemas }: { schemas: readonly JsonLd[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
