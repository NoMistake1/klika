import type { GalleryCategory, GalleryGroup, GalleryItem } from "@/types";

/* ==========================================================================
   Gallery.
   Every entry currently points at a labelled local placeholder. Real photos
   drop in by replacing the file at `image.src` and removing `isPlaceholder`;
   the layout is driven by the declared width/height, so swapping an asset of
   the same aspect ratio causes no layout shift and no code change.

   No stock photography is used: a random hotel photo presented as Hotel Klika
   would be a misrepresentation.
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
    id: "restaurant-bar",
    category: "restaurant",
    image: {
      src: "/images/restaurant/bar.png",
      alt: {
        cs: "Zástupný obrázek — bar s vitrínou dezertů",
        en: "Placeholder image — the bar with the dessert cabinet",
        de: "Platzhalterbild — Bar mit Dessertvitrine",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
    caption: {
      cs: "Vitrína s dezerty u baru",
      en: "The dessert cabinet by the bar",
      de: "Dessertvitrine an der Bar",
    },
  },
  {
    id: "food-tartare",
    category: "food",
    image: {
      src: "/images/food/tartare.png",
      alt: {
        cs: "Zástupný obrázek — tatarák ze stařeného hovězího",
        en: "Placeholder image — steak tartare from aged beef",
        de: "Platzhalterbild — Tatar vom gereiften Rindfleisch",
      },
      width: 1400,
      height: 1400,
      isPlaceholder: true,
    },
    caption: {
      cs: "Tatarák ze stařeného hovězího z Volar",
      en: "Steak tartare from aged Volary beef",
      de: "Tatar vom gereiften Volary-Rind",
    },
  },
  {
    id: "food-schnitzel",
    category: "food",
    image: {
      src: "/images/food/schnitzel.png",
      alt: {
        cs: "Zástupný obrázek — kuřecí řízek",
        en: "Placeholder image — chicken schnitzel",
        de: "Platzhalterbild — Hähnchenschnitzel",
      },
      width: 1200,
      height: 1500,
      isPlaceholder: true,
    },
    caption: {
      cs: "Kuřecí řízek ve strouhance z čerstvých rohlíků",
      en: "Chicken schnitzel in breadcrumbs from fresh rolls",
      de: "Hähnchenschnitzel in Paniermehl aus frischen Brötchen",
    },
  },
  {
    id: "food-dessert",
    category: "food",
    image: {
      src: "/images/food/dessert.png",
      alt: {
        cs: "Zástupný obrázek — jahodové knedlíčky",
        en: "Placeholder image — strawberry dumplings",
        de: "Platzhalterbild — Erdbeerknödel",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
    caption: {
      cs: "Jahodové knedlíčky obalené v perníku",
      en: "Strawberry dumplings rolled in gingerbread",
      de: "Erdbeerknödel in Lebkuchen gewälzt",
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
      src: "/images/restaurant/garden-children.png",
      alt: {
        cs: "Zástupný obrázek — dětský koutek na zahrádce",
        en: "Placeholder image — the children's area in the garden",
        de: "Platzhalterbild — Kinderbereich im Garten",
      },
      width: 1200,
      height: 1500,
      isPlaceholder: true,
    },
    caption: {
      cs: "Pískoviště a houpačka na zahrádce",
      en: "The sandbox and swing in the garden",
      de: "Sandkasten und Schaukel im Garten",
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
 * The landing-page gallery groups. Each is one tall lead image plus two
 * stacked images, rendered as an irregular horizontally swipeable strip —
 * deliberately not a uniform grid. No image repeats inside a group.
 */
export const landingGalleryGroups: readonly GalleryGroup[] = [
  {
    id: "group-hotel",
    large: item("hotel-facade"),
    stacked: [item("hotel-reception"), item("hotel-breakfast")],
  },
  {
    id: "group-rooms",
    large: item("room-apartment-sauna"),
    stacked: [item("room-double"), item("restaurant-conservatory")],
  },
  {
    id: "group-restaurant",
    large: item("garden-terrace"),
    stacked: [item("room-triple"), item("restaurant-wall")],
  },
];

/** Flat item list for the lightbox, in the order the groups render. */
export const landingGalleryItems: readonly GalleryItem[] = landingGalleryGroups.flatMap(
  (group) => [group.large, ...group.stacked],
);
