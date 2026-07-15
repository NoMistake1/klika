import type { DailyMenu, DailyMenuCategory, DailyMenuItem } from "@/types";

/* ==========================================================================
   DAILY MENU — STATIC DEMO CONTENT.

   This module is the single integration point for the future admin panel.
   `getDailyMenu()` is the only thing the UI calls; swapping this file's body
   for a fetch (and making the callers await it) requires no component changes.

   Allergen numbers are separate from prices. In the source material the
   allergens of the fried cheese are written together as "13710", which means
   allergens 1, 3, 7 and 10 — not a price of 13,710 CZK.
   ========================================================================== */

/** Marks the menu below as demo data so the UI can label it honestly. */
export const isDemoDailyMenu = true;

const dailyMenuItems: readonly DailyMenuItem[] = [
  /* ---------------------------------------------------------------- soups */
  {
    id: "tuscan-soup",
    category: "soup",
    name: {
      cs: "Pikantní toskánská polévka z kapusty od Cepákových, červených fazolí, rajčat a parmazánu",
      en: "Spicy Tuscan soup with kale from the Cepák family, red beans, tomatoes and parmesan",
      de: "Pikante toskanische Suppe mit Wirsing von der Familie Cepák, roten Bohnen, Tomaten und Parmesan",
    },
    priceCzk: 59,
    allergens: [7],
    dietaryLabels: ["vegetarian"],
    note: {
      cs: "Veganské bez sýra",
      en: "Vegan without the cheese",
      de: "Vegan ohne Käse",
    },
  },
  {
    id: "frankfurt-soup",
    category: "soup",
    name: {
      cs: "Frankfurtská polévka s bramborami",
      en: "Frankfurt sausage soup with potatoes",
      de: "Frankfurter Suppe mit Kartoffeln",
    },
    priceCzk: 56,
    allergens: [1, 7],
  },

  /* ----------------------------------------------------------- main dishes */
  {
    id: "herb-pork-roast",
    category: "main",
    name: {
      cs: "Bylinková vepřová pečeně sous-vide s gratinovanými bramborami, bylinkovou omáčkou a pečenou mrkví od Tří selek",
      en: "Sous-vide herb pork roast with gratin potatoes, herb sauce and roasted carrots from Tři selky",
      de: "Sous-vide Kräuter-Schweinebraten mit Kartoffelgratin, Kräutersauce und gebratenen Karotten von Tři selky",
    },
    priceCzk: 196,
    allergens: [1, 7],
  },
  {
    id: "chopped-schnitzel",
    category: "main",
    name: {
      cs: "Sekaný řízek z volarského masa s bramborovo-hořčičným pyré",
      en: "Chopped schnitzel from Volary meat with potato and mustard purée",
      de: "Gehacktes Schnitzel vom Volary-Fleisch mit Kartoffel-Senf-Püree",
    },
    priceCzk: 196,
    allergens: [1, 3, 7],
  },
  {
    id: "fried-cheese-struhy",
    category: "main",
    name: {
      cs: "Smažený sýr ze Struh s pečenými brambůrkami s rozmarýnem, míchaným salátkem a tatarskou omáčkou",
      en: "Fried cheese from Struhy with rosemary roast potatoes, mixed salad and tartare sauce",
      de: "Gebackener Käse aus Struhy mit Rosmarinkartoffeln, gemischtem Salat und Sauce tartare",
    },
    priceCzk: 189,
    // Source writes these as "13710" — four separate allergens, not a price.
    allergens: [1, 3, 7, 10],
    dietaryLabels: ["vegetarian"],
  },
  {
    id: "apricot-dumplings",
    category: "main",
    name: {
      cs: "Kynuté meruňkové knedlíky, meruňková omáčka a strouhanka na másle",
      en: "Yeast apricot dumplings with apricot sauce and buttered breadcrumbs",
      de: "Hefe-Marillenknödel mit Marillensauce und Butterbröseln",
    },
    priceCzk: 189,
    allergens: [1, 3, 7],
    dietaryLabels: ["vegetarian"],
  },

  /* -------------------------------------------------------------- desserts */
  {
    id: "apricot-tiramisu",
    category: "dessert",
    name: {
      cs: "Meruňkové tiramisu s marcipánem",
      en: "Apricot tiramisu with marzipan",
      de: "Marillen-Tiramisu mit Marzipan",
    },
    priceCzk: 99,
    allergens: [1, 3, 7],
    dietaryLabels: ["vegetarian"],
  },
  {
    id: "misa-venecek",
    category: "dessert",
    name: {
      cs: "Míša věneček",
      en: "“Míša” choux ring with quark cream",
      de: "„Míša“-Windbeutelkranz mit Quarkcreme",
    },
    priceCzk: 79,
    allergens: [1, 3, 7],
    dietaryLabels: ["vegetarian"],
  },
];

/** Order the daily menu renders categories in. */
export const dailyMenuCategoryOrder: readonly DailyMenuCategory[] = [
  "soup",
  "main",
  "dessert",
];

const dailyMenu: DailyMenu = {
  date: "2026-07-15",
  items: dailyMenuItems,
};

/**
 * Returns the current daily menu, or `null` when none is published — the UI
 * renders an empty state for `null` rather than a stale menu.
 *
 * FUTURE: replace the body with a fetch of `/api/daily-menu` and make callers
 * await it. The `DailyMenu` shape is the contract the admin panel must satisfy.
 */
export function getDailyMenu(): DailyMenu | null {
  return dailyMenu;
}

/** Groups a menu's items by category, dropping empty categories. */
export function groupDailyMenu(
  menu: DailyMenu,
): ReadonlyArray<{ category: DailyMenuCategory; items: readonly DailyMenuItem[] }> {
  return dailyMenuCategoryOrder
    .map((category) => ({
      category,
      items: menu.items.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);
}
