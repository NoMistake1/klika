import type { GalleryCategory, GalleryGroup, GalleryItem } from "@/types";

/* ==========================================================================
   Gallery.
   Real Klika photography where it exists; the few remaining entries that still
   point at a labelled placeholder carry `isPlaceholder` so SafeImage renders a
   neutral fallback rather than a broken image. Layout is driven by each item's
   declared width/height, so swapping an asset of the same aspect ratio causes
   no layout shift and no code change.

   No stock photography is used: a random photo presented as Hotel Klika would
   be a misrepresentation.
   ========================================================================== */

export const galleryCategoryOrder: readonly GalleryCategory[] = [
  "hotel",
  "rooms",
  "restaurant",
  "food",
  "garden",
  "surroundings",
];

/** Portrait, landscape and square entries drive the editorial masonry rhythm. */
export const galleryItems: readonly GalleryItem[] = [
  {
    id: "hotel-facade",
    category: "hotel",
    image: {
      src: "/images/hotel/facade.webp",
      alt: {
        cs: "Fasáda Hotelu Klika",
        en: "The facade of Hotel Klika",
        de: "Fassade des Hotels Klika",
      },
      width: 1023,
      height: 1537,
    },
    caption: {
      cs: "Hotel u Piaristického náměstí",
      en: "The hotel by Piaristické náměstí",
      de: "Das Hotel am Piaristické náměstí",
    },
  },
  {
    id: "hotel-reception",
    category: "hotel",
    image: {
      src: "/images/hotel/reception.webp",
      alt: {
        cs: "Recepce hotelu",
        en: "The hotel reception",
        de: "Rezeption des Hotels",
      },
      width: 1536,
      height: 1024,
    },
    caption: {
      cs: "Recepce, otevřeno 07:00–22:00",
      en: "Reception, open 07:00–22:00",
      de: "Rezeption, geöffnet 07:00–22:00",
    },
  },
  {
    id: "hotel-breakfast",
    category: "hotel",
    image: {
      src: "/images/hotel/breakfast.webp",
      alt: {
        cs: "Snídaně formou bufetu",
        en: "The buffet breakfast",
        de: "Das Frühstücksbuffet",
      },
      width: 2400,
      height: 1350,
    },
    caption: {
      cs: "Snídaně 07:00–10:00",
      en: "Breakfast 07:00–10:00",
      de: "Frühstück 07:00–10:00",
    },
  },
  {
    id: "room-double",
    category: "rooms",
    image: {
      src: "/images/rooms/double.webp",
      alt: {
        cs: "Dvoulůžkový pokoj",
        en: "The double room",
        de: "Doppelzimmer",
      },
      width: 1600,
      height: 1068,
    },
    caption: { cs: "Dvoulůžkový pokoj", en: "Double room", de: "Doppelzimmer" },
  },
  {
    id: "room-apartment-sauna",
    category: "rooms",
    image: {
      src: "/images/rooms/apartment-sauna-detail.webp",
      alt: {
        cs: "Apartmán s vlastní saunou",
        en: "The apartment with a private sauna",
        de: "Apartment mit eigener Sauna",
      },
      width: 1023,
      height: 1537,
    },
    caption: {
      cs: "Apartmán s vlastní saunou",
      en: "Apartment with a private sauna",
      de: "Apartment mit eigener Sauna",
    },
  },
  {
    id: "room-triple",
    category: "rooms",
    image: {
      src: "/images/rooms/triple.webp",
      alt: {
        cs: "Třílůžkový pokoj",
        en: "The triple room",
        de: "Dreibettzimmer",
      },
      width: 1535,
      height: 1024,
    },
    caption: { cs: "Třílůžkový pokoj", en: "Triple room", de: "Dreibettzimmer" },
  },
  {
    id: "restaurant-wall",
    category: "restaurant",
    image: {
      src: "/images/restaurant/zone-restaurant.webp",
      alt: {
        cs: "Interiér restaurace s původní hradbou",
        en: "The interior with the original wall",
        de: "Innenraum mit der ursprünglichen Mauer",
      },
      width: 1618,
      height: 1080,
    },
    caption: {
      cs: "Původní hradba ze 14. století",
      en: "The original 14th-century wall",
      de: "Die ursprüngliche Mauer aus dem 14. Jahrhundert",
    },
  },
  {
    id: "restaurant-conservatory",
    category: "restaurant",
    image: {
      src: "/images/restaurant/zone-conservatory.webp",
      alt: {
        cs: "Skleník s výhledem na řeku",
        en: "The conservatory with a river view",
        de: "Wintergarten mit Blick auf den Fluss",
      },
      width: 1672,
      height: 941,
    },
    caption: {
      cs: "Skleník s výhledem na řeku",
      en: "The conservatory with a river view",
      de: "Wintergarten mit Blick auf den Fluss",
    },
  },
  {
    id: "restaurant-indoor",
    category: "restaurant",
    image: {
      src: "/images/restaurant/indoor.webp",
      alt: {
        cs: "Posezení v restauraci",
        en: "Seating inside the restaurant",
        de: "Sitzplätze im Restaurant",
      },
      width: 1080,
      height: 1350,
    },
    caption: {
      cs: "Nekuřácký vnitřní prostor",
      en: "The indoor non-smoking space",
      de: "Der Nichtraucher-Innenraum",
    },
  },
  {
    id: "restaurant-bar",
    category: "restaurant",
    image: {
      src: "/images/restaurant/bar.webp",
      alt: {
        cs: "Bar s vitrínou dezertů",
        en: "The bar with the dessert cabinet",
        de: "Die Bar mit der Dessertvitrine",
      },
      width: 1402,
      height: 1122,
    },
    caption: {
      cs: "Vitrína s dezerty u baru",
      en: "The dessert cabinet by the bar",
      de: "Dessertvitrine an der Bar",
    },
  },
  {
    id: "restaurant-outside",
    category: "restaurant",
    image: {
      src: "/images/restaurant/outside-restaurant.webp",
      alt: {
        cs: "Restaurace zvenku",
        en: "The restaurant from outside",
        de: "Das Restaurant von außen",
      },
      width: 2400,
      height: 1751,
    },
    caption: {
      cs: "Vchod do restaurace",
      en: "The restaurant entrance",
      de: "Der Eingang zum Restaurant",
    },
  },
  {
    id: "food-plate-1",
    category: "food",
    image: {
      src: "/images/food/food1.webp",
      alt: {
        cs: "Sezónní předkrm na talíři",
        en: "A seasonal starter on the plate",
        de: "Eine saisonale Vorspeise auf dem Teller",
      },
      width: 1440,
      height: 1802,
    },
    caption: {
      cs: "Sezónní předkrm",
      en: "A seasonal starter",
      de: "Eine saisonale Vorspeise",
    },
  },
  {
    id: "food-main-1",
    category: "food",
    image: {
      src: "/images/food/food9.webp",
      alt: {
        cs: "Hlavní chod podle sezóny",
        en: "A seasonal main course",
        de: "Ein saisonales Hauptgericht",
      },
      width: 1350,
      height: 1687,
    },
    caption: {
      cs: "Hlavní chod",
      en: "A main course",
      de: "Ein Hauptgericht",
    },
  },
  {
    id: "food-plate-2",
    category: "food",
    image: {
      src: "/images/food/food12.webp",
      alt: {
        cs: "Talíř dochucený čerstvými bylinkami",
        en: "A plate finished with fresh herbs",
        de: "Ein Teller mit frischen Kräutern",
      },
      width: 1080,
      height: 1350,
    },
    caption: {
      cs: "Talíř podle sezóny",
      en: "A plate in season",
      de: "Ein Teller nach Saison",
    },
  },
  {
    id: "food-plate-3",
    category: "food",
    image: {
      src: "/images/food/food21.webp",
      alt: {
        cs: "Maso s omáčkou na talíři",
        en: "Meat with sauce on the plate",
        de: "Fleisch mit Sauce auf dem Teller",
      },
      width: 1440,
      height: 1440,
    },
    caption: {
      cs: "Poctivé maso",
      en: "Honest meat",
      de: "Ehrliches Fleisch",
    },
  },
  {
    id: "food-dessert-1",
    category: "food",
    image: {
      src: "/images/food/food23.webp",
      alt: {
        cs: "Maso s přílohou na talíři",
        en: "A plated meat dish with garnish",
        de: "Ein Fleischgericht mit Beilage auf dem Teller",
      },
      width: 1793,
      height: 1536,
    },
    caption: {
      cs: "Poctivé maso na talíři",
      en: "An honest plate of meat",
      de: "Ein ehrlicher Fleischteller",
    },
  },
  {
    id: "food-dessert-2",
    category: "food",
    image: {
      src: "/images/food/food18.webp",
      alt: {
        cs: "Barevné dezerty a koláčky",
        en: "Colourful desserts and tarts",
        de: "Bunte Desserts und Törtchen",
      },
      width: 2048,
      height: 2048,
    },
    caption: {
      cs: "Dezerty a dorty",
      en: "Desserts and cakes",
      de: "Desserts und Torten",
    },
  },
  {
    id: "food-drink-1",
    category: "food",
    image: {
      src: "/images/food/food17.webp",
      alt: {
        cs: "Domácí limonáda v ruce",
        en: "A homemade lemonade in hand",
        de: "Eine hausgemachte Limonade in der Hand",
      },
      width: 1440,
      height: 1440,
    },
    caption: {
      cs: "Domácí limonáda",
      en: "A homemade lemonade",
      de: "Eine hausgemachte Limonade",
    },
  },
  {
    id: "food-drink-2",
    category: "food",
    image: {
      src: "/images/food/food5.webp",
      alt: {
        cs: "Pivo a polévka dne",
        en: "Beer and the soup of the day",
        de: "Bier und die Suppe des Tages",
      },
      width: 1080,
      height: 1350,
    },
    caption: {
      cs: "Pivo a polévka dne",
      en: "Beer and the soup of the day",
      de: "Bier und die Suppe des Tages",
    },
  },
  {
    id: "food-people-1",
    category: "food",
    image: {
      src: "/images/food/food6.webp",
      alt: {
        cs: "V kuchyni Kliky",
        en: "In the Klika kitchen",
        de: "In der Klika-Küche",
      },
      width: 1194,
      height: 1492,
    },
    caption: {
      cs: "V kuchyni",
      en: "In the kitchen",
      de: "In der Küche",
    },
  },
  {
    id: "food-people-2",
    category: "food",
    image: {
      src: "/images/food/food20.webp",
      alt: {
        cs: "Dochystání malých chodů",
        en: "Plating small dishes",
        de: "Anrichten kleiner Gerichte",
      },
      width: 1440,
      height: 1440,
    },
    caption: {
      cs: "Dochystání chodů",
      en: "Plating the dishes",
      de: "Anrichten der Gerichte",
    },
  },
  {
    id: "food-table-1",
    category: "food",
    image: {
      src: "/images/food/food8.webp",
      alt: {
        cs: "Několik malých chodů na stole",
        en: "A spread of small dishes on the table",
        de: "Mehrere kleine Gerichte auf dem Tisch",
      },
      width: 1440,
      height: 1440,
    },
    caption: {
      cs: "Několik malých chodů",
      en: "A spread of small dishes",
      de: "Mehrere kleine Gerichte",
    },
  },
  {
    id: "food-table-2",
    category: "food",
    image: {
      src: "/images/food/food24.webp",
      alt: {
        cs: "Oběd se sklenkou vína",
        en: "Lunch with a glass of wine",
        de: "Mittagessen mit einem Glas Wein",
      },
      width: 1402,
      height: 1122,
    },
    caption: {
      cs: "Oběd se sklenkou vína",
      en: "Lunch with a glass of wine",
      de: "Mittagessen mit einem Glas Wein",
    },
  },
  {
    id: "food-table-3",
    category: "food",
    image: {
      src: "/images/food/food27.webp",
      alt: {
        cs: "Prostřený stůl s několika chody",
        en: "A laid table with several dishes",
        de: "Ein gedeckter Tisch mit mehreren Gerichten",
      },
      width: 2400,
      height: 1701,
    },
    caption: {
      cs: "Prostřený stůl",
      en: "A laid table",
      de: "Ein gedeckter Tisch",
    },
  },
  {
    id: "garden-terrace",
    category: "garden",
    image: {
      src: "/images/restaurant/zone-garden.webp",
      alt: {
        cs: "Zahrádka u řeky",
        en: "The riverside garden",
        de: "Der Garten am Fluss",
      },
      width: 1535,
      height: 1024,
    },
    caption: {
      cs: "Zahrádka na slunci u Malše",
      en: "The sunny garden by the Malše",
      de: "Der sonnige Garten an der Malše",
    },
  },
  {
    id: "garden-children",
    category: "garden",
    image: {
      src: "/images/restaurant/garden-children.webp",
      alt: {
        cs: "Dětský koutek na zahrádce",
        en: "The children's area in the garden",
        de: "Der Kinderbereich im Garten",
      },
      width: 1122,
      height: 1402,
    },
    caption: {
      cs: "Koutek pro děti na zahrádce",
      en: "The children's corner in the garden",
      de: "Die Kinderecke im Garten",
    },
  },
  {
    id: "surroundings-river",
    category: "surroundings",
    image: {
      src: "/images/location/river.png",
      alt: {
        cs: "Zástupný obrázek — řeka Malše u hotelu",
        en: "Placeholder image — the Malše river by the hotel",
        de: "Platzhalterbild — der Fluss Malše beim Hotel",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
    caption: {
      cs: "Malše a Sokolský ostrov",
      en: "The Malše and Sokolský ostrov",
      de: "Die Malše und die Insel Sokolský ostrov",
    },
  },
  {
    id: "surroundings-square",
    category: "surroundings",
    image: {
      src: "/images/location/square.png",
      alt: {
        cs: "Zástupný obrázek — náměstí Přemysla Otakara II.",
        en: "Placeholder image — Přemysl Otakar II Square",
        de: "Platzhalterbild — Platz Přemysl Otakar II.",
      },
      width: 1200,
      height: 1500,
      isPlaceholder: true,
    },
    caption: {
      cs: "Náměstí Přemysla Otakara II., 3 minuty pěšky",
      en: "Přemysl Otakar II Square, 3 minutes on foot",
      de: "Platz Přemysl Otakar II., 3 Minuten zu Fuß",
    },
  },
  {
    id: "surroundings-piaristicke",
    category: "surroundings",
    image: {
      src: "/images/location/piaristicke.png",
      alt: {
        cs: "Zástupný obrázek — Piaristické náměstí",
        en: "Placeholder image — Piaristické náměstí",
        de: "Platzhalterbild — Piaristické náměstí",
      },
      width: 1400,
      height: 1400,
      isPlaceholder: true,
    },
    caption: {
      cs: "Piaristické náměstí hned vedle hotelu",
      en: "Piaristické náměstí right next to the hotel",
      de: "Das Piaristické náměstí direkt neben dem Hotel",
    },
  },
];

export function getGalleryByCategory(category: GalleryCategory | "all"): readonly GalleryItem[] {
  return category === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === category);
}

function item(id: string): GalleryItem {
  const found = galleryItems.find((entry) => entry.id === id);
  if (!found) throw new Error(`Unknown gallery item: ${id}`);
  return found;
}

/**
 * The landing-page gallery groups. Each is one tall lead image plus two stacked
 * images, rendered as an irregular horizontally swipeable strip — deliberately
 * not a uniform grid. The order leads with food and restaurant while keeping the
 * hotel, rooms and location photography present, and no near-identical plated
 * dish sits directly beside another. No image repeats inside a group.
 */
export const landingGalleryGroups: readonly GalleryGroup[] = [
  {
    id: "group-food-1",
    large: item("food-plate-1"),
    stacked: [item("food-people-1"), item("food-dessert-1")],
  },
  {
    id: "group-restaurant",
    large: item("restaurant-indoor"),
    stacked: [item("restaurant-conservatory"), item("food-table-1")],
  },
  {
    id: "group-food-2",
    large: item("food-main-1"),
    stacked: [item("food-drink-1"), item("food-table-2")],
  },
  {
    id: "group-hotel",
    large: item("hotel-facade"),
    stacked: [item("hotel-reception"), item("hotel-breakfast")],
  },
  {
    id: "group-food-3",
    large: item("food-plate-2"),
    stacked: [item("food-dessert-2"), item("food-people-2")],
  },
  {
    id: "group-rooms",
    large: item("room-apartment-sauna"),
    stacked: [item("room-double"), item("garden-terrace")],
  },
];

/** Flat item list for the lightbox, in the order the groups render. */
export const landingGalleryItems: readonly GalleryItem[] = landingGalleryGroups.flatMap(
  (group) => [group.large, ...group.stacked],
);
