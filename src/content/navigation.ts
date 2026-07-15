import type { NavItem } from "@/types";

/**
 * Site navigation. `href` never contains the locale prefix — it is added at
 * render time by `localePath()`, which keeps the switcher on the current page.
 */
export const mainNavigation: readonly NavItem[] = [
  {
    id: "hotel",
    href: "/hotel",
    label: { cs: "Hotel", en: "Hotel", de: "Hotel" },
    children: [
      {
        id: "hotel-rooms",
        href: "/hotel/rooms",
        label: { cs: "Pokoje", en: "Rooms", de: "Zimmer" },
      },
      {
        id: "hotel-pricing",
        href: "/hotel/pricing",
        label: { cs: "Ceník", en: "Prices", de: "Preise" },
      },
      {
        id: "hotel-booking",
        href: "/hotel/booking",
        label: {
          cs: "Rezervace pobytu",
          en: "Book a stay",
          de: "Aufenthalt buchen",
        },
      },
    ],
  },
  {
    id: "restaurant",
    href: "/restaurant",
    label: { cs: "Restaurace", en: "Restaurant", de: "Restaurant" },
    children: [
      {
        id: "restaurant-daily-menu",
        href: "/restaurant/daily-menu",
        label: { cs: "Denní menu", en: "Daily menu", de: "Tagesmenü" },
      },
      {
        id: "restaurant-catering",
        href: "/restaurant/catering",
        label: {
          cs: "Akce a catering",
          en: "Events and catering",
          de: "Events und Catering",
        },
      },
      {
        id: "restaurant-booking",
        href: "/restaurant/booking",
        label: {
          cs: "Rezervace stolu",
          en: "Book a table",
          de: "Tisch reservieren",
        },
      },
    ],
  },
  {
    id: "menu",
    href: "/restaurant/menu",
    label: { cs: "Menu", en: "Menu", de: "Speisekarte" },
  },
  {
    id: "location",
    href: "/location",
    label: { cs: "Lokalita", en: "Location", de: "Lage" },
  },
  {
    id: "gallery",
    href: "/gallery",
    label: { cs: "Galerie", en: "Gallery", de: "Galerie" },
  },
  {
    id: "contact",
    href: "/contact",
    label: { cs: "Kontakt", en: "Contact", de: "Kontakt" },
  },
];

/** Compact link list used in the footer. */
export const footerNavigation: readonly NavItem[] = [
  ...mainNavigation.filter((item) => item.id !== "menu"),
  {
    id: "menu",
    href: "/restaurant/menu",
    label: { cs: "Jídelní lístek", en: "Menu", de: "Speisekarte" },
  },
  {
    id: "daily-menu",
    href: "/restaurant/daily-menu",
    label: { cs: "Denní menu", en: "Daily menu", de: "Tagesmenü" },
  },
  {
    id: "pricing",
    href: "/hotel/pricing",
    label: { cs: "Ceník", en: "Prices", de: "Preise" },
  },
];

export const bookStayHref = "/hotel/booking";
export const bookTableHref = "/restaurant/booking";
