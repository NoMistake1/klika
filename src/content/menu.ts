import type { Allergen, AllergenNumber, LocalizedText, MenuCategory, MenuItem } from "@/types";

/* ==========================================================================
   Permanent à la carte menu.

   Replaceable by an API without touching the UI: the menu page groups whatever
   `menuItems` contains by `category`, so new items or categories need no
   component changes.

   Allergen numbers are stored as an array and rendered as separate labels.
   A source value written as "13710" means allergens 1, 3, 7 and 10 — never a
   price. Prices live in `priceCzk` and nowhere else.
   ========================================================================== */

/** EU allergen list (Regulation 1169/2011) as printed on the Klika menu. */
export const allergens: readonly Allergen[] = [
  {
    number: 1,
    name: {
      cs: "Obiloviny obsahující lepek",
      en: "Cereals containing gluten",
      de: "Glutenhaltiges Getreide",
    },
  },
  { number: 2, name: { cs: "Korýši", en: "Crustaceans", de: "Krebstiere" } },
  { number: 3, name: { cs: "Vejce", en: "Eggs", de: "Eier" } },
  { number: 4, name: { cs: "Ryby", en: "Fish", de: "Fische" } },
  {
    number: 5,
    name: { cs: "Podzemnice olejná (arašídy)", en: "Peanuts", de: "Erdnüsse" },
  },
  { number: 6, name: { cs: "Sójové boby", en: "Soybeans", de: "Sojabohnen" } },
  { number: 7, name: { cs: "Mléko", en: "Milk", de: "Milch" } },
  {
    number: 8,
    name: {
      cs: "Skořápkové plody (ořechy)",
      en: "Tree nuts",
      de: "Schalenfrüchte (Nüsse)",
    },
  },
  { number: 9, name: { cs: "Celer", en: "Celery", de: "Sellerie" } },
  { number: 10, name: { cs: "Hořčice", en: "Mustard", de: "Senf" } },
  {
    number: 11,
    name: { cs: "Sezamová semena", en: "Sesame seeds", de: "Sesamsamen" },
  },
  {
    number: 12,
    name: {
      cs: "Oxid siřičitý a siřičitany",
      en: "Sulphur dioxide and sulphites",
      de: "Schwefeldioxid und Sulfite",
    },
  },
  { number: 13, name: { cs: "Vlčí bob (lupina)", en: "Lupin", de: "Lupinen" } },
  { number: 14, name: { cs: "Měkkýši", en: "Molluscs", de: "Weichtiere" } },
];

export function getAllergen(number: AllergenNumber): Allergen | undefined {
  return allergens.find((allergen) => allergen.number === number);
}

/** Order the menu page renders categories in. */
export const menuCategoryOrder: readonly MenuCategory[] = [
  "soups",
  "small-dishes",
  "main-courses",
  "side-dishes",
  "children",
  "desserts",
];

export const menuItems: readonly MenuItem[] = [
  /* ---------------------------------------------------------------- soups */
  {
    id: "soup-of-the-day",
    category: "soups",
    name: { cs: "Polévka dne", en: "Soup of the day", de: "Tagessuppe" },
    description: {
      cs: "zeptejte se obsluhy na aktuální polévku",
      en: "ask your server what we are cooking today",
      de: "fragen Sie unser Personal nach der aktuellen Suppe",
    },
    priceCzk: 89,
    allergens: [],
  },
  {
    id: "spinach-veloute",
    category: "soups",
    name: { cs: "Špenátový krém", en: "Spinach velouté", de: "Spinatcremesuppe" },
    description: {
      cs: "vejce – krutonky – mascarpone",
      en: "egg – croutons – mascarpone",
      de: "Ei – Croûtons – Mascarpone",
    },
    priceCzk: 109,
    allergens: [1, 3, 7, 8],
    canBeGlutenFree: true,
  },

  /* --------------------------------------------------------- small dishes */
  {
    id: "poultry-pate",
    category: "small-dishes",
    name: {
      cs: "Paštika drůbeží 80 g",
      en: "Poultry pâté 80 g",
      de: "Geflügelpastete 80 g",
    },
    description: {
      cs: "opečená brioška – cibulová povidla – naložené ostružiny – pufovaná pohanka",
      en: "toasted brioche – onion jam – pickled blackberries – puffed buckwheat",
      de: "geröstete Brioche – Zwiebelkonfitüre – eingelegte Brombeeren – gepuffter Buchweizen",
    },
    priceCzk: 189,
    allergens: [1, 3, 7, 10],
  },
  {
    id: "fried-kohlrabi",
    category: "small-dishes",
    name: {
      cs: "Smažená kedlubna",
      en: "Fried kohlrabi",
      de: "Frittierter Kohlrabi",
    },
    description: {
      cs: "bylinkový kefír – nakládaná kedlubna – ředkvička",
      en: "herb kefir – pickled kohlrabi – radish",
      de: "Kräuterkefir – eingelegter Kohlrabi – Radieschen",
    },
    priceCzk: 139,
    allergens: [1, 3, 7],
    dietaryLabels: ["vegetarian"],
  },
  {
    id: "steak-tartare",
    category: "small-dishes",
    name: { cs: "Tatarák", en: "Steak tartare", de: "Tatar" },
    description: {
      cs: "stařené hovězí z Volar 80 g – parmazánová majonéza – kapary – opečený kváskový chléb",
      en: "aged beef from Volary 80 g – parmesan mayonnaise – capers – toasted sourdough bread",
      de: "gereiftes Rindfleisch aus Volary 80 g – Parmesan-Mayonnaise – Kapern – geröstetes Sauerteigbrot",
    },
    priceCzk: 249,
    allergens: [1, 3, 7],
  },

  /* --------------------------------------------------------- main courses */
  {
    id: "beef-sirloin",
    category: "main-courses",
    name: {
      cs: "Hovězí roštěná 180 g",
      en: "Beef sirloin 180 g",
      de: "Rinderroastbeef 180 g",
    },
    description: {
      cs: "máslová omáčka z lahůdkového droždí – nakládaný hnědý žampion – libečková majonéza",
      en: "butter sauce with nutritional yeast – pickled chestnut mushroom – lovage mayonnaise",
      de: "Buttersauce aus Edelhefe – eingelegter brauner Champignon – Liebstöckel-Mayonnaise",
    },
    priceCzk: 389,
    allergens: [3, 7],
  },
  {
    id: "chicken-schnitzel",
    category: "main-courses",
    name: { cs: "Kuřecí řízek", en: "Chicken schnitzel", de: "Hähnchenschnitzel" },
    description: {
      cs: "kuřecí prso z farmy Druhaz 200 g – strouhanka z čerstvých rohlíků – nakládaný patizon – Gran Moravia",
      en: "chicken breast from the Druhaz farm 200 g – breadcrumbs from fresh rolls – pickled patty pan squash – Gran Moravia",
      de: "Hähnchenbrust vom Hof Druhaz 200 g – Paniermehl aus frischen Brötchen – eingelegter Patisson – Gran Moravia",
    },
    priceCzk: 309,
    allergens: [1, 3, 7],
  },
  {
    id: "beef-ragout",
    category: "main-courses",
    name: { cs: "Hovězí ragú", en: "Beef ragout", de: "Rindsragout" },
    description: {
      cs: "hovězí krk z Volar 170 g – omáčka z červeného vína – kořenová zelenina",
      en: "beef neck from Volary 170 g – red wine sauce – root vegetables",
      de: "Rindernacken aus Volary 170 g – Rotweinsauce – Wurzelgemüse",
    },
    priceCzk: 309,
    allergens: [1, 12],
  },
  {
    id: "caesar-salad",
    category: "main-courses",
    name: { cs: "Caesar salát", en: "Caesar salad", de: "Caesar Salat" },
    description: {
      cs: "grilované sedlčanské kuřecí prso 180 g – římský salát – ančovičkový dresink – kapary – Gran Moravia – krutony",
      en: "grilled Sedlčany chicken breast 180 g – romaine lettuce – anchovy dressing – capers – Gran Moravia – croutons",
      de: "gegrillte Hähnchenbrust aus Sedlčany 180 g – Römersalat – Sardellendressing – Kapern – Gran Moravia – Croûtons",
    },
    priceCzk: 299,
    allergens: [1, 3, 4, 7, 10],
    canBeGlutenFree: true,
  },
  {
    id: "tacos",
    category: "main-courses",
    name: { cs: "Tacos", en: "Tacos", de: "Tacos" },
    description: {
      cs: "trhaná vepřová plec z Volar 200 g – pšeničné placky – nakládaná kedlubna – zakysaná smetana – chipotle salsa – koriandr",
      en: "pulled pork shoulder from Volary 200 g – wheat tortillas – pickled kohlrabi – sour cream – chipotle salsa – coriander",
      de: "Pulled Pork von der Schweineschulter aus Volary 200 g – Weizenfladen – eingelegter Kohlrabi – Sauerrahm – Chipotle-Salsa – Koriander",
    },
    priceCzk: 299,
    allergens: [1, 7],
  },
  {
    id: "fried-cheese",
    category: "main-courses",
    name: { cs: "Smažák", en: "Fried cheese", de: "Gebackener Käse" },
    description: {
      cs: "smažený bio eidam z farmy Struhy – bylinková majonéza",
      en: "fried organic Edam from the Struhy farm – herb mayonnaise",
      de: "gebackener Bio-Edamer vom Hof Struhy – Kräutermayonnaise",
    },
    priceCzk: 239,
    allergens: [1, 3, 7, 9, 10],
    dietaryLabels: ["vegetarian"],
  },
  {
    id: "halloumi-waffle",
    category: "main-courses",
    name: {
      cs: "Halloumi a amarantová vafle",
      en: "Halloumi and amaranth waffle",
      de: "Halloumi und Amaranth-Waffel",
    },
    description: {
      cs: "vafle z bio amarantové mouky – sýr od Diviše – rukolový salátek – bylinková omáčka",
      en: "waffle from organic amaranth flour – cheese from Diviš – rocket salad – herb sauce",
      de: "Waffel aus Bio-Amaranthmehl – Käse von Diviš – Rucolasalat – Kräutersauce",
    },
    priceCzk: 249,
    allergens: [7],
    dietaryLabels: ["vegetarian"],
  },

  /* ---------------------------------------------------------- side dishes */
  {
    id: "hay-smoked-potatoes",
    category: "side-dishes",
    name: {
      cs: "Brambory uzené v seně",
      en: "Potatoes smoked in hay",
      de: "In Heu geräucherte Kartoffeln",
    },
    priceCzk: 70,
    allergens: [],
  },
  {
    id: "grilled-polenta",
    category: "side-dishes",
    name: { cs: "Grilovaná polenta", en: "Grilled polenta", de: "Gegrillte Polenta" },
    priceCzk: 70,
    allergens: [7],
    dietaryLabels: ["vegetarian"],
  },
  {
    id: "potato-crackling-pancakes",
    category: "side-dishes",
    name: {
      cs: "Bramborovo-škvarkové placky a naše naložená zelenina",
      en: "Potato and crackling pancakes with our pickled vegetables",
      de: "Kartoffel-Grieben-Puffer und unser eingelegtes Gemüse",
    },
    priceCzk: 70,
    allergens: [1, 3],
  },
  {
    id: "farmers-salad",
    category: "side-dishes",
    name: {
      cs: "Farmářský salát s dresinkem a zelenými jahodami",
      en: "Farmer's salad with dressing and green strawberries",
      de: "Bauernsalat mit Dressing und grünen Erdbeeren",
    },
    priceCzk: 90,
    allergens: [10],
    dietaryLabels: ["vegetarian"],
  },
  {
    id: "potato-rosti",
    category: "side-dishes",
    name: { cs: "Bramborové rösti", en: "Potato rösti", de: "Kartoffel-Rösti" },
    priceCzk: 70,
    allergens: [3, 7],
    dietaryLabels: ["vegetarian"],
  },
  {
    id: "mashed-potatoes",
    category: "side-dishes",
    name: {
      cs: "Krémová bramborová kaše s bylinkovým pestem",
      en: "Creamy mashed potatoes with herb pesto",
      de: "Cremiges Kartoffelpüree mit Kräuterpesto",
    },
    priceCzk: 70,
    allergens: [7],
    dietaryLabels: ["vegetarian"],
  },

  /* ------------------------------------------------------------- children */
  {
    id: "child-chicken",
    category: "children",
    name: {
      cs: "Sedlčanský kuřecí plátek",
      en: "Sedlčany chicken escalope",
      de: "Hähnchenschnitzel aus Sedlčany",
    },
    description: {
      cs: "bramborová kaše",
      en: "mashed potatoes",
      de: "Kartoffelpüree",
    },
    priceCzk: 169,
    allergens: [7],
  },
  {
    id: "child-svickova",
    category: "children",
    name: {
      cs: "Svíčková z volarského hovězího",
      en: "Svíčková with Volary beef",
      de: "Svíčková vom Volary-Rind",
    },
    description: {
      cs: "houskový knedlík",
      en: "bread dumplings",
      de: "Semmelknödel",
    },
    priceCzk: 179,
    allergens: [1, 3, 7, 9],
  },

  /* ------------------------------------------------------------- desserts */
  {
    id: "strawberry-dumplings",
    category: "desserts",
    name: { cs: "Jahodové knedlíčky", en: "Strawberry dumplings", de: "Erdbeerknödel" },
    description: {
      cs: "tvarohové knedlíčky obalené v perníku, plněné čerstvými jahodami – jahodová omáčka – bezový sirup",
      en: "quark dumplings rolled in gingerbread, filled with fresh strawberries – strawberry sauce – elderflower syrup",
      de: "Quarkknödel in Lebkuchen gewälzt, gefüllt mit frischen Erdbeeren – Erdbeersauce – Holundersirup",
    },
    priceCzk: 159,
    allergens: [1, 3, 7],
    dietaryLabels: ["vegetarian"],
  },
];

/**
 * Notes printed under a category heading rather than attached to one dish.
 * The desserts note replaces what the source lists as a priceless "item".
 */
export const menuCategoryNotes: Partial<Record<MenuCategory, LocalizedText>> = {
  desserts: {
    cs: "Dezerty najdete vystavené ve vitríně u baru. Každý den pečeme vlastní dorty.",
    en: "You will find the desserts displayed in the cabinet by the bar. We bake our own cakes every day.",
    de: "Die Desserts finden Sie in der Vitrine an der Bar. Wir backen jeden Tag eigene Torten.",
  },
};

/** Groups the flat item list into render-ready categories, preserving order. */
export function getMenuByCategory(): ReadonlyArray<{
  category: MenuCategory;
  items: readonly MenuItem[];
}> {
  return menuCategoryOrder
    .map((category) => ({
      category,
      items: menuItems.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0 || menuCategoryNotes[group.category]);
}

/** Every allergen actually used on the menu, for the legend. */
export function getUsedAllergens(
  items: ReadonlyArray<{ allergens: readonly AllergenNumber[] }>,
): readonly Allergen[] {
  const used = new Set<AllergenNumber>();
  for (const item of items) {
    for (const number of item.allergens) used.add(number);
  }
  return allergens.filter((allergen) => used.has(allergen.number));
}
