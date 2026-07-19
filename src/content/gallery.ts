import type { GalleryCategory, GalleryGroup, GalleryItem, LocalizedText } from "@/types";

/* ==========================================================================
   Gallery.

   Every entry is a real Klika photograph, catalogued from the actual files in
   /public/images after looking at each one — never classified from the filename
   alone. Layout is driven by each item's declared width/height, so the reserved
   box is correct before the image loads and nothing shifts.

   Responsive variants (facade / facade-desktop, window-desktop / -mobile,
   svatba / svatba-desktop, menu-desktop / -mobile, hero fallbacks) are treated
   as ONE logical photograph and appear once, using the crop that reads best in
   a gallery tile.

   Deliberately excluded: logos and decorative line art (logo-full, rajce,
   zampion), the landing split composition already used at full bleed
   (split-restaurant) and the voucher product shot (poukazy).

   Missing from the food range and therefore never referenced: food7 and
   food26 — neither file exists.
   ========================================================================== */

/** Compact builder — the alt text doubles as the lightbox caption. */
function gi(
  id: string,
  category: GalleryCategory,
  src: string,
  width: number,
  height: number,
  alt: LocalizedText,
): GalleryItem {
  return { id, category, image: { src, alt, width, height }, caption: alt };
}

export const galleryCategoryOrder: readonly GalleryCategory[] = [
  "food",
  "restaurant",
  "hotel",
  "surroundings",
];

/* --------------------------------------------------------------------------
   Food — 40 photographs.
   Ordered so the newest, least-seen plates open the category, and so no two
   visually similar white-plate dishes sit next to each other: mains, desserts,
   drinks, prep, table scenes and people alternate all the way down.
   -------------------------------------------------------------------------- */
const foodItems: readonly GalleryItem[] = [
  gi("food-36", "food", "/images/food/food36.webp", 1122, 1402, {
    cs: "Chod s houbami na papíru, u řeky",
    en: "A dish with mushrooms on paper, by the river",
    de: "Ein Gericht mit Pilzen auf Papier, am Fluss",
  }),
  gi("food-34", "food", "/images/food/food34.webp", 1122, 1402, {
    cs: "Cheesecake s čerstvým ovocem na podnose",
    en: "Cheesecake with fresh fruit on a stand",
    de: "Cheesecake mit frischen Früchten auf einer Etagere",
  }),
  gi("food-33", "food", "/images/food/food33.webp", 1169, 1157, {
    cs: "Polévka, salát a chlebíček na dřevěném stole",
    en: "Soup, salad and an open sandwich on a wooden table",
    de: "Suppe, Salat und ein belegtes Brot auf einem Holztisch",
  }),
  gi("food-35", "food", "/images/food/food35.webp", 1123, 1400, {
    cs: "Růžový drink s květy fialek",
    en: "A pink drink with violet blossoms",
    de: "Ein rosa Drink mit Veilchenblüten",
  }),
  gi("food-37", "food", "/images/food/food37.webp", 1122, 1402, {
    cs: "Kachní prsa se závitkem z červeného zelí",
    en: "Duck breast with a red cabbage roll",
    de: "Entenbrust mit Rotkohlroulade",
  }),
  gi("food-32", "food", "/images/food/food32.webp", 1170, 1155, {
    cs: "Podnos větrníků v ulici před restaurací",
    en: "A tray of cream puffs on the street outside",
    de: "Ein Tablett Windbeutel auf der Straße",
  }),
  gi("food-40", "food", "/images/food/food40.webp", 1122, 1402, {
    cs: "Dva burgery zabalené v papíru",
    en: "Two burgers wrapped in paper",
    de: "Zwei Burger in Papier eingewickelt",
  }),
  gi("food-30", "food", "/images/food/food30.webp", 1170, 1153, {
    cs: "Tvarohové knedlíky s jahodovou omáčkou",
    en: "Curd dumplings with strawberry sauce",
    de: "Quarkknödel mit Erdbeersauce",
  }),
  gi("food-28", "food", "/images/food/food28.webp", 1170, 1447, {
    cs: "Smažený sýr s novými bramborami a tatarkou",
    en: "Fried cheese with new potatoes and tartare sauce",
    de: "Gebackener Käse mit jungen Kartoffeln und Sauce Tartare",
  }),
  gi("food-39", "food", "/images/food/food39.webp", 1122, 1402, {
    cs: "Cheesecake zdobený čokoládovým krémem",
    en: "Cheesecake piped with chocolate cream",
    de: "Cheesecake mit Schokoladencreme",
  }),
  gi("food-38", "food", "/images/food/food38.webp", 1122, 1402, {
    cs: "Čerstvě připravené hlavní jídlo",
    en: "A freshly prepared main dish",
    de: "Ein frisch zubereitetes Hauptgericht",
  }),
  gi("food-31", "food", "/images/food/food31.webp", 1170, 1180, {
    cs: "Zmrzlinový pohár s borůvkami",
    en: "An ice cream sundae with blueberries",
    de: "Eisbecher mit Heidelbeeren",
  }),
  gi("food-27", "food", "/images/food/food27.webp", 2400, 1701, {
    cs: "Prostřený stůl s několika chody",
    en: "A laid table with several dishes",
    de: "Ein gedeckter Tisch mit mehreren Gerichten",
  }),
  gi("food-29", "food", "/images/food/food29.webp", 1170, 1443, {
    cs: "Ovocné knedlíky se švestkami a mákem",
    en: "Fruit dumplings with plums and poppy seed",
    de: "Obstknödel mit Zwetschgen und Mohn",
  }),
  gi("food-25", "food", "/images/food/food25.webp", 2400, 1602, {
    cs: "Příprava kávy s mléčnou kresbou",
    en: "Pouring latte art into a coffee",
    de: "Latte Art wird in einen Kaffee gegossen",
  }),
  gi("food-24", "food", "/images/food/food24.webp", 1402, 1122, {
    cs: "Oběd se sklenkou vína",
    en: "Lunch with a glass of wine",
    de: "Mittagessen mit einem Glas Wein",
  }),
  gi("food-23", "food", "/images/food/food23.webp", 1793, 1536, {
    cs: "Maso s přílohou na talíři",
    en: "Meat with a side on the plate",
    de: "Fleisch mit Beilage auf dem Teller",
  }),
  gi("food-18", "food", "/images/food/food18.webp", 2048, 2048, {
    cs: "Barevné dezerty a koláčky",
    en: "Colourful desserts and pastries",
    de: "Bunte Desserts und Gebäck",
  }),
  gi("food-20", "food", "/images/food/food20.webp", 1440, 1440, {
    cs: "Dochystání malých chodů",
    en: "Plating a set of small dishes",
    de: "Anrichten kleiner Gerichte",
  }),
  gi("food-17", "food", "/images/food/food17.webp", 1440, 1440, {
    cs: "Domácí limonáda",
    en: "A homemade lemonade",
    de: "Eine hausgemachte Limonade",
  }),
  gi("food-21", "food", "/images/food/food21.webp", 1440, 1440, {
    cs: "Maso s omáčkou na talíři",
    en: "Meat with sauce on the plate",
    de: "Fleisch mit Sauce auf dem Teller",
  }),
  gi("food-14", "food", "/images/food/food14.webp", 1440, 1440, {
    cs: "Kremrole s borůvkovým krémem na plechu",
    en: "Cream horns with blueberry cream on a tray",
    de: "Schaumrollen mit Heidelbeercreme auf einem Blech",
  }),
  gi("food-15", "food", "/images/food/food15.webp", 1440, 1440, {
    cs: "Hrášková polévka se zastřeným vejcem u vody",
    en: "Pea soup with a poached egg by the water",
    de: "Erbsensuppe mit pochiertem Ei am Wasser",
  }),
  gi("food-22", "food", "/images/food/food22.webp", 1440, 1440, {
    cs: "Barevný talíř",
    en: "A colourful plate",
    de: "Ein bunter Teller",
  }),
  gi("food-10", "food", "/images/food/food10.webp", 1350, 1687, {
    cs: "Matcha latte, dezert a citrusový čaj na tácu",
    en: "Matcha latte, a dessert and citrus tea on a tray",
    de: "Matcha Latte, ein Dessert und Zitrustee auf einem Tablett",
  }),
  gi("food-16", "food", "/images/food/food16.webp", 1440, 1439, {
    cs: "Barevný talíř podle sezóny",
    en: "A colourful seasonal plate",
    de: "Ein bunter saisonaler Teller",
  }),
  gi("food-11", "food", "/images/food/food11.webp", 1350, 1687, {
    cs: "Domácí dorty na patře",
    en: "Homemade cakes on a stand",
    de: "Hausgemachte Torten auf einer Etagere",
  }),
  gi("food-3", "food", "/images/food/food3.webp", 1080, 1350, {
    cs: "Kachní prsa s bramborovými knedlíčky a vínem",
    en: "Duck breast with potato dumplings and wine",
    de: "Entenbrust mit Kartoffelknödeln und Wein",
  }),
  gi("food-13", "food", "/images/food/food13.webp", 1440, 1440, {
    cs: "Talíř dochucený omáčkou",
    en: "A plate finished with sauce",
    de: "Ein Teller mit Sauce",
  }),
  gi("food-vecere", "food", "/images/food/vecere.webp", 1402, 1122, {
    cs: "Přípitek nad pečenou kachnou",
    en: "A toast over a roast duck dinner",
    de: "Ein Anstoßen über einem Entenbraten",
  }),
  gi("food-19", "food", "/images/food/food19.webp", 1440, 1440, {
    cs: "Talíř podle sezóny",
    en: "A seasonal plate",
    de: "Ein saisonaler Teller",
  }),
  gi("food-5", "food", "/images/food/food5.webp", 1080, 1350, {
    cs: "Pivo a polévka dne",
    en: "Beer and the soup of the day",
    de: "Bier und die Suppe des Tages",
  }),
  gi("food-1", "food", "/images/food/food1.webp", 1440, 1802, {
    cs: "Sezónní předkrm na talíři",
    en: "A seasonal starter on the plate",
    de: "Eine saisonale Vorspeise auf dem Teller",
  }),
  gi("food-8", "food", "/images/food/food8.webp", 1194, 1492, {
    cs: "Několik malých chodů",
    en: "A spread of small dishes",
    de: "Mehrere kleine Gerichte",
  }),
  gi("food-sklenka", "food", "/images/food/sklenka.webp", 1402, 1122, {
    cs: "Sklenka domácího nápoje s pomerančem a rozmarýnem",
    en: "A glass of a house drink with orange and rosemary",
    de: "Ein Glas Hausgetränk mit Orange und Rosmarin",
  }),
  gi("food-6", "food", "/images/food/food6.webp", 1080, 1350, {
    cs: "V kuchyni Kliky",
    en: "In the Klika kitchen",
    de: "In der Küche von Klika",
  }),
  gi("food-12", "food", "/images/food/food12.webp", 1080, 1350, {
    cs: "Talíř dochucený čerstvými bylinkami",
    en: "A plate finished with fresh herbs",
    de: "Ein Teller mit frischen Kräutern",
  }),
  gi("food-9", "food", "/images/food/food9.webp", 1350, 1687, {
    cs: "Hlavní chod z denního menu",
    en: "A main course from the daily menu",
    de: "Ein Hauptgericht aus dem Tagesmenü",
  }),
  gi("food-2", "food", "/images/food/food2.webp", 1080, 1350, {
    cs: "Talíř podle sezóny",
    en: "A seasonal plate",
    de: "Ein saisonaler Teller",
  }),
  gi("food-4", "food", "/images/food/food4.webp", 1080, 1350, {
    cs: "Servírování jídla u stolu",
    en: "Serving a dish at the table",
    de: "Ein Gericht wird am Tisch serviert",
  }),
];

/* --------------------------------------------------------------------------
   Restaurant — the rooms, the bar, the garden and the conservatory.
   -------------------------------------------------------------------------- */
const restaurantItems: readonly GalleryItem[] = [
  gi("restaurant-conservatory", "restaurant", "/images/restaurant/zone-conservatory.webp", 1672, 941, {
    cs: "Skleník s výhledem na řeku",
    en: "The conservatory looking out over the river",
    de: "Der Wintergarten mit Blick auf den Fluss",
  }),
  gi("restaurant-bar", "restaurant", "/images/restaurant/bar.webp", 1402, 1122, {
    cs: "Bar s vitrínou dezertů",
    en: "The bar with the dessert cabinet",
    de: "Die Bar mit der Dessertvitrine",
  }),
  gi("restaurant-indoor", "restaurant", "/images/restaurant/indoor.webp", 1080, 1350, {
    cs: "Posezení v restauraci",
    en: "Seating inside the restaurant",
    de: "Sitzplätze im Restaurant",
  }),
  gi("restaurant-garden", "restaurant", "/images/restaurant/zone-garden.webp", 1535, 1024, {
    cs: "Zahrádka u řeky",
    en: "The garden by the river",
    de: "Der Garten am Fluss",
  }),
  gi("restaurant-zone2", "restaurant", "/images/restaurant/zone-restaurant2.webp", 1080, 1350, {
    cs: "Stůl pro větší společnost",
    en: "A table for a larger party",
    de: "Ein Tisch für eine größere Gesellschaft",
  }),
  gi("restaurant-conservatory-detail", "restaurant", "/images/restaurant/conservatory-detail.webp", 1122, 1402, {
    cs: "Detail skleníku",
    en: "A corner of the conservatory",
    de: "Ein Detail des Wintergartens",
  }),
  gi("restaurant-outside", "restaurant", "/images/restaurant/outside-restaurant.webp", 2400, 1751, {
    cs: "Restaurace zvenku",
    en: "The restaurant from outside",
    de: "Das Restaurant von außen",
  }),
  gi("restaurant-children", "restaurant", "/images/restaurant/garden-children.webp", 1122, 1402, {
    cs: "Dětský koutek na zahrádce",
    en: "The children's corner in the garden",
    de: "Die Kinderecke im Garten",
  }),
  gi("restaurant-zone1", "restaurant", "/images/restaurant/zone-restaurant.webp", 1618, 1080, {
    cs: "Interiér restaurace s původní hradbou",
    en: "The restaurant interior with the original town wall",
    de: "Der Gastraum mit der historischen Stadtmauer",
  }),
  gi("restaurant-wedding", "restaurant", "/images/restaurant/svatba.webp", 1402, 1122, {
    cs: "Slavnostně prostřený stůl na svatbu",
    en: "A table laid for a wedding",
    de: "Ein festlich gedeckter Tisch für eine Hochzeit",
  }),
  gi("restaurant-menu", "restaurant", "/images/restaurant/menu-desktop.webp", 1536, 1024, {
    cs: "Jídelní lístek na stole",
    en: "The menu on the table",
    de: "Die Speisekarte auf dem Tisch",
  }),
  gi("restaurant-counter", "restaurant", "/images/hero/fallback-desktop.webp", 1535, 1025, {
    cs: "Barový pult s květinami a kávovarem",
    en: "The bar counter with flowers and the coffee machine",
    de: "Der Tresen mit Blumen und Kaffeemaschine",
  }),
  gi("restaurant-zone3", "restaurant", "/images/restaurant/zone-restaurant3.webp", 1080, 1350, {
    cs: "Klidnější kout restaurace",
    en: "A quieter corner of the restaurant",
    de: "Eine ruhigere Ecke des Restaurants",
  }),
];

/* --------------------------------------------------------------------------
   Hotel — the rooms, apartments, reception, breakfast and the house itself.
   -------------------------------------------------------------------------- */
const hotelItems: readonly GalleryItem[] = [
  gi("hotel-facade", "hotel", "/images/hotel/facade.webp", 1023, 1537, {
    cs: "Fasáda Hotelu Klika",
    en: "The facade of Hotel Klika",
    de: "Fassade des Hotels Klika",
  }),
  gi("room-double", "hotel", "/images/rooms/double.webp", 1600, 1068, {
    cs: "Dvoulůžkový pokoj",
    en: "A double room",
    de: "Ein Doppelzimmer",
  }),
  gi("hotel-reception", "hotel", "/images/hotel/reception.webp", 1536, 1024, {
    cs: "Recepce hotelu",
    en: "The hotel reception",
    de: "Rezeption des Hotels",
  }),
  gi("room-apartment-sauna", "hotel", "/images/rooms/apartment-sauna.webp", 1537, 1023, {
    cs: "Dvoulůžkový apartmán se saunou",
    en: "A double apartment with a sauna",
    de: "Ein Doppelapartment mit Sauna",
  }),
  gi("hotel-breakfast", "hotel", "/images/hotel/breakfast.webp", 2400, 1350, {
    cs: "Snídaně formou bufetu",
    en: "The buffet breakfast",
    de: "Das Frühstücksbuffet",
  }),
  gi("room-triple", "hotel", "/images/rooms/triple.webp", 1535, 1024, {
    cs: "Třílůžkový pokoj",
    en: "A triple room",
    de: "Ein Dreibettzimmer",
  }),
  gi("room-apartment-four", "hotel", "/images/rooms/apartment-four.webp", 1537, 1023, {
    cs: "Čtyřlůžkový apartmán",
    en: "A four-bed apartment",
    de: "Ein Vierbett-Apartment",
  }),
  gi("hotel-house", "hotel", "/images/hotel/split-hotel.webp", 941, 1672, {
    cs: "Hotel Klika v historickém centru",
    en: "Hotel Klika in the historic centre",
    de: "Hotel Klika in der historischen Altstadt",
  }),
  gi("room-single", "hotel", "/images/rooms/single-limited.webp", 1535, 1024, {
    cs: "Jednolůžkový pokoj limited",
    en: "A single limited room",
    de: "Ein Einzelzimmer Limited",
  }),
  gi("room-apartment-sauna-detail", "hotel", "/images/rooms/apartment-sauna-detail.webp", 1023, 1537, {
    cs: "Apartmán s vlastní saunou",
    en: "The apartment's own sauna",
    de: "Das Apartment mit eigener Sauna",
  }),
];

/* --------------------------------------------------------------------------
   Surroundings and atmosphere — the street, the square and the river.
   -------------------------------------------------------------------------- */
const surroundingsItems: readonly GalleryItem[] = [
  gi("around-window", "surroundings", "/images/gallery/window-desktop.webp", 1672, 941, {
    cs: "Výdejní okénko do ulice",
    en: "The service window onto the street",
    de: "Das Ausgabefenster zur Straße",
  }),
  gi("around-piaristicke", "surroundings", "/images/location/piaristicke.png", 1400, 1400, {
    cs: "Piaristické náměstí hned vedle hotelu",
    en: "Piaristické náměstí right next to the hotel",
    de: "Das Piaristické náměstí direkt neben dem Hotel",
  }),
  gi("around-square", "surroundings", "/images/location/square.png", 1200, 1500, {
    cs: "Náměstí Přemysla Otakara II.",
    en: "Přemysl Otakar II Square",
    de: "Der Platz Přemysl Otakar II.",
  }),
  gi("around-river", "surroundings", "/images/location/river.png", 1600, 1200, {
    cs: "Soutok Vltavy a Malše",
    en: "Where the Vltava and Malše meet",
    de: "Zusammenfluss von Moldau und Maltsch",
  }),
];

/**
 * Builds the unfiltered "Vše" order: the four worlds are interleaved in
 * proportion to their size, so the gallery opens as a mix rather than forty
 * plates before the first room. Filtering preserves relative order, so each
 * category still starts with its own strongest, least-seen photographs.
 */
function interleaveByShare(
  lists: readonly (readonly GalleryItem[])[],
): readonly GalleryItem[] {
  const queues = lists
    .filter((list) => list.length > 0)
    .map((list) => ({ list, cursor: 0 }));
  const out: GalleryItem[] = [];

  for (;;) {
    // How far through its own list each candidate is — the least-advanced list
    // always goes next, which spreads the short lists evenly through the long
    // ones with no randomness at all.
    let pick: { list: readonly GalleryItem[]; cursor: number } | undefined;
    let lowest = Infinity;
    for (const queue of queues) {
      if (queue.cursor >= queue.list.length) continue;
      const progress = (queue.cursor + 0.5) / queue.list.length;
      if (progress < lowest) {
        lowest = progress;
        pick = queue;
      }
    }
    if (!pick) break;

    const next = pick.list[pick.cursor];
    pick.cursor += 1;
    if (next) out.push(next);
  }

  return out;
}

export const galleryItems: readonly GalleryItem[] = interleaveByShare([
  foodItems,
  restaurantItems,
  hotelItems,
  surroundingsItems,
]);

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

/** Builds an editorial group (one tall lead beside two stacked images). */
function group(id: string, large: string, stackedA: string, stackedB: string): GalleryGroup {
  return { id, large: item(large), stacked: [item(stackedA), item(stackedB)] };
}

/**
 * Landing-page gallery groups — a broad sweep of the whole house: food and
 * restaurant lead, with the hotel, the rooms and the surroundings present.
 */
export const landingGalleryGroups: readonly GalleryGroup[] = [
  group("landing-1", "food-36", "food-33", "food-34"),
  group("landing-2", "restaurant-indoor", "restaurant-conservatory", "food-27"),
  group("landing-3", "food-37", "food-35", "food-40"),
  group("landing-4", "hotel-facade", "hotel-reception", "hotel-breakfast"),
  group("landing-5", "food-18", "food-31", "food-25"),
  group("landing-6", "room-apartment-sauna", "room-double", "restaurant-garden"),
];

/** Flat item list for the lightbox, in the order the groups render. */
export const landingGalleryItems: readonly GalleryItem[] = landingGalleryGroups.flatMap(
  (group) => [group.large, ...group.stacked],
);

/**
 * Hotel subpage gallery — the same editorial system as the restaurant, but a
 * deliberately different story: the house, the rooms and the stay lead, and the
 * restaurant appears only at the end as an amenity the hotel happens to include.
 */
export const hotelGalleryGroups: readonly GalleryGroup[] = [
  group("hotel-g1", "hotel-facade", "hotel-house", "hotel-reception"),
  group("hotel-g2", "room-double", "room-triple", "hotel-breakfast"),
  group("hotel-g3", "room-apartment-sauna", "room-apartment-sauna-detail", "room-apartment-four"),
  group("hotel-g4", "room-single", "around-piaristicke", "around-river"),
  group("hotel-g5", "around-window", "restaurant-indoor", "food-24"),
];

export const hotelGalleryItems: readonly GalleryItem[] = hotelGalleryGroups.flatMap((group) => [
  group.large,
  ...group.stacked,
]);
