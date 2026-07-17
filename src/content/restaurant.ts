import type { LocalizedText, Producer, SeatingZone, Voucher } from "@/types";

/* ==========================================================================
   Klika Kitchen & Coffee content.
   The restaurant is an independent operation from the hotel.
   ========================================================================== */

export const seatingZones: readonly SeatingZone[] = [
  {
    id: "restaurant",
    name: { cs: "Restaurace", en: "Restaurant", de: "Restaurant" },
    description: {
      cs: "Vnitřní nekuřácký prostor pro 40 hostů s původní městskou hradbou ze 14. století. Otevřeno celoročně.",
      en: "An indoor non-smoking space for 40 guests, built around the original 14th-century city wall. Open all year round.",
      de: "Ein Innenraum für Nichtraucher mit Platz für 40 Gäste und der ursprünglichen Stadtmauer aus dem 14. Jahrhundert. Ganzjährig geöffnet.",
    },
    seats: 40,
    image: {
      src: "/images/restaurant/zone-restaurant.webp",
      alt: {
        cs: "Interiér restaurace s původní městskou hradbou",
        en: "The restaurant interior with the original city wall",
        de: "Innenraum des Restaurants mit der ursprünglichen Stadtmauer",
      },
      width: 1618,
      height: 1080,
    },
  },
  {
    id: "conservatory",
    name: { cs: "Skleník", en: "Conservatory", de: "Wintergarten" },
    description: {
      cs: "Prosklený, celoročně využívaný prostor pro 20 hostů s dostatkem světla a výhledem směrem k řece.",
      en: "A glazed, year-round space for 20 guests, full of light and looking out toward the river.",
      de: "Ein verglaster, ganzjährig nutzbarer Raum für 20 Gäste mit viel Licht und Blick in Richtung Fluss.",
    },
    seats: 20,
    image: {
      src: "/images/restaurant/zone-conservatory.webp",
      alt: {
        cs: "Prosklený skleník s posezením",
        en: "The glazed conservatory seating",
        de: "Der verglaste Wintergarten mit Sitzplätzen",
      },
      width: 1672,
      height: 941,
    },
  },
  {
    id: "garden",
    name: { cs: "Zahrádka", en: "Garden", de: "Garten" },
    description: {
      cs: "Sezónní venkovní posezení u řeky, ideální pro teplé dny a klidné večery.",
      en: "Seasonal outdoor seating by the river, ideal for warm days and quiet evenings.",
      de: "Saisonale Sitzplätze im Freien am Fluss, ideal für warme Tage und ruhige Abende.",
    },
    // The source does not state an exact terrace capacity.
    seats: null,
    image: {
      src: "/images/restaurant/zone-garden.webp",
      alt: {
        cs: "Zahrádka restaurace u řeky",
        en: "The restaurant garden by the river",
        de: "Der Garten des Restaurants am Fluss",
      },
      width: 1535,
      height: 1024,
    },
  },
];

export function getZoneById(id: string): SeatingZone | undefined {
  return seatingZones.find((zone) => zone.id === id);
}

/* -------------------------------------------------------------------------- */
/* Producers                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Rendered as restrained typographic marks. No producer logos are invented —
 * only the names as supplied by the restaurant.
 */
export const producers: readonly Producer[] = [
  {
    id: "vicemil",
    name: "Farma Vícemil",
    description: { cs: "Jihočeská farma", en: "South Bohemian farm", de: "Südböhmischer Hof" },
  },
  {
    id: "divis",
    name: "Farma Diviš",
    description: { cs: "Sýry", en: "Cheese", de: "Käse" },
  },
  {
    id: "louzna",
    name: "Loužná",
    description: { cs: "Kuřecí maso", en: "Chicken", de: "Hähnchenfleisch" },
  },
  {
    id: "volary",
    name: "Volary",
    description: { cs: "Hovězí maso", en: "Beef", de: "Rindfleisch" },
  },
  {
    id: "local-drinks",
    name: "Goldie",
    description: {
      cs: "Kombucha z Českých Budějovic",
      en: "Kombucha from České Budějovice",
      de: "Kombucha aus České Budějovice",
    },
  },
  {
    id: "homemade-desserts",
    name: "Klika",
    description: {
      cs: "Vlastní dezerty a dorty",
      en: "Our own desserts and cakes",
      de: "Eigene Desserts und Torten",
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Drinks                                                                     */
/* -------------------------------------------------------------------------- */

export interface DrinkGroup {
  readonly id: string;
  readonly title: LocalizedText;
  readonly items: readonly string[];
  readonly note?: LocalizedText;
}

/**
 * Names only. The supplied content contains no drink prices and none are
 * invented — the full list is available in the restaurant.
 */
export const drinkGroups: readonly DrinkGroup[] = [
  {
    id: "beer",
    title: { cs: "Pivo", en: "Beer", de: "Bier" },
    items: ["Budějovický Budvar"],
    note: {
      cs: "Nepasterizovaný a nefiltrovaný ležák z prachatického minipivovaru a třetí, rotující pivo z malých pivovarů.",
      en: "An unpasteurized, unfiltered lager from a Prachatice microbrewery and a rotating third beer from small breweries.",
      de: "Ein unpasteurisiertes, ungefiltertes Lager aus einer Mikrobrauerei in Prachatice und ein drittes, wechselndes Bier aus kleinen Brauereien.",
    },
  },
  {
    id: "non-alcoholic",
    title: { cs: "Nealko", en: "Non-alcoholic", de: "Alkoholfrei" },
    items: ["Goldie kombucha"],
    note: {
      cs: "Domácí ovocné a bylinkové limonády. Kombuchu Goldie vaří v Českých Budějovicích.",
      en: "Homemade fruit and herb lemonades. Goldie kombucha is brewed in České Budějovice.",
      de: "Hausgemachte Frucht- und Kräuterlimonaden. Goldie-Kombucha wird in České Budějovice gebraut.",
    },
  },
  {
    id: "cocktails",
    title: { cs: "Koktejly", en: "Cocktails", de: "Cocktails" },
    items: ["Aperol Spritz", "Gin & Tonic"],
  },
];

/* -------------------------------------------------------------------------- */
/* Vouchers                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * FUTURE: electronic vouchers may link to an external purchase system.
 * No payment flow is implemented — the UI offers contact actions instead.
 */
export const vouchers: readonly Voucher[] = [
  { id: "voucher-500", valueCzk: 500 },
  { id: "voucher-1000", valueCzk: 1000 },
  { id: "voucher-2000", valueCzk: 2000 },
];

export const instagramUrl = "https://www.instagram.com/klikakitchen/";

/** Time options offered by the table booking form, within opening hours. */
export const bookingTimeSlots: readonly string[] = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];
