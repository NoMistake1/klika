import type {
  BillingEntity,
  GeoCoordinates,
  OpeningHours,
  PhoneNumber,
  PostalAddress,
  SocialLink,
} from "@/types";

/* ==========================================================================
   Contact facts. Phone numbers, e-mails, addresses and times are business
   facts and are never translated or reformatted per locale.
   ========================================================================== */

const allWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const hotelPhone: PhoneNumber = {
  display: "+420 387 318 171",
  e164: "+420387318171",
};

export const hotelMobile: PhoneNumber = {
  display: "+420 774 328 555",
  e164: "+420774328555",
};

/** The mobile number doubles as the WhatsApp contact. */
export const hotelWhatsApp: PhoneNumber = hotelMobile;

export const restaurantPhone: PhoneNumber = {
  display: "+420 387 318 360",
  e164: "+420387318360",
};

export const hotelEmail = "hotel@hotelklika.cz";
export const restaurantEmail = "restaurace@hotelklika.cz";

/**
 * Both street lines are published by the hotel: the reception building on
 * nábřeží Jindřicha Libraria and the restaurant on Hroznová.
 */
export const address: PostalAddress = {
  streetLines: ["Hroznová 487/25", "Nábřeží Jindřicha Libraria 158/3"],
  postalCode: "370 01",
  city: "České Budějovice",
  country: {
    cs: "Česká republika",
    en: "Czech Republic",
    de: "Tschechische Republik",
  },
  countryCode: "CZ",
};

/** Decimal values converted from the published DMS coordinates. */
export const coordinates: GeoCoordinates = {
  latitude: 48.97633,
  longitude: 14.4716,
  display: "48°58'34.787\"N, 14°28'17.772\"E",
};

export const openingHours: readonly OpeningHours[] = [
  {
    id: "restaurant",
    label: { cs: "Restaurace", en: "Restaurant", de: "Restaurant" },
    days: { cs: "Pondělí–neděle", en: "Monday–Sunday", de: "Montag–Sonntag" },
    hours: "10:30–22:00",
    schema: { opens: "10:30", closes: "22:00", dayOfWeek: allWeek },
  },
  {
    id: "reception",
    label: { cs: "Recepce", en: "Reception", de: "Rezeption" },
    days: { cs: "Pondělí–neděle", en: "Monday–Sunday", de: "Montag–Sonntag" },
    hours: "07:00–22:00",
    schema: { opens: "07:00", closes: "22:00", dayOfWeek: allWeek },
  },
];

export const checkInHours = "14:00–18:00";
export const checkOutHours = "07:00–11:00";

/** Breakfast service window, served in the restaurant. */
export const breakfastHours = "07:00–10:00";

export const socialLinks: readonly SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/klikakitchen/",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/hotelklika",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hotel-klika/",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/hotelklika",
  },
  {
    id: "tripadvisor",
    label: "Tripadvisor",
    href: "https://www.tripadvisor.com/Hotel_Review-g274687-d1059809-Reviews-Hotel_Klika-Ceske_Budejovice_South_Bohemian_Region_Bohemia.html",
  },
];

export const billingEntities: readonly BillingEntity[] = [
  {
    id: "hotel-operator",
    role: {
      cs: "Provozovatel hotelu",
      en: "Hotel operator",
      de: "Betreiber des Hotels",
    },
    name: "Klika J. s. r. o.",
    addressLines: ["nábřeží Jindřicha Libraria 158/3", "370 01 České Budějovice"],
    companyId: "26026449",
    vatId: "CZ26026449",
  },
  {
    id: "restaurant-operator",
    role: {
      cs: "Provozovatel restaurace",
      en: "Restaurant operator",
      de: "Betreiber des Restaurants",
    },
    name: "Budweiser Gastro s. r. o.",
    addressLines: ["Hroznová 487/25", "370 01 České Budějovice"],
    companyId: "28107152",
    vatId: "CZ28107152",
  },
];

/** Google Maps directions link, built from the published coordinates. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.latitude},${coordinates.longitude}`;

/** OpenStreetMap embed, loaded only on user interaction (see <LazyMap />). */
export const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
  coordinates.longitude - 0.004
},${coordinates.latitude - 0.002},${coordinates.longitude + 0.004},${
  coordinates.latitude + 0.002
}&layer=mapnik&marker=${coordinates.latitude},${coordinates.longitude}`;

export const mapLink = `https://www.openstreetmap.org/?mlat=${coordinates.latitude}&mlon=${coordinates.longitude}#map=17/${coordinates.latitude}/${coordinates.longitude}`;
