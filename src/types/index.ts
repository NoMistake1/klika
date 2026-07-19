/* ==========================================================================
   Shared domain types.
   Data, presentation and translation strings are kept separate on purpose:
   every structure below is API-shaped so the local content modules in
   src/content can later be swapped for a CMS or admin panel without
   restructuring the UI.
   ========================================================================== */

export const locales = ["cs", "en", "de"] as const;

export type Locale = (typeof locales)[number];

/** A string that exists in every supported language. */
export type LocalizedText = Record<Locale, string>;

/** A list of strings that exists in every supported language. */
export type LocalizedList = Record<Locale, readonly string[]>;

/* -------------------------------------------------------------------------- */
/* Media                                                                      */
/* -------------------------------------------------------------------------- */

export interface ImageAsset {
  /** Path under /public. Replaceable with a final asset without code changes. */
  readonly src: string;
  readonly alt: LocalizedText;
  readonly width: number;
  readonly height: number;
  /** True while the image is a labelled placeholder rather than a real photo. */
  readonly isPlaceholder?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Hotel                                                                      */
/* -------------------------------------------------------------------------- */

export type RoomId =
  | "single-limited"
  | "double"
  | "triple"
  | "apartment-sauna"
  | "apartment-four"
  | "apartment-long-stay";

export interface Room {
  readonly id: RoomId;
  readonly name: LocalizedText;
  readonly description: LocalizedText;
  /**
   * Maximum number of guests the category sleeps. `null` where the supplied
   * content does not state a capacity — never guessed.
   */
  readonly capacity: number | null;
  readonly features: LocalizedList;
  /**
   * Nightly rate in CZK. `null` means the rate is quoted by reception on
   * request and must never be rendered as a number.
   */
  readonly priceCzk: number | null;
  /** Rate excluded during trade fairs and New Year's Eve (quoted on request). */
  readonly hasSeasonalException: boolean;
  readonly image: ImageAsset;
}

/** One line of the published price list. */
export interface PricingRow {
  readonly id: string;
  readonly label: LocalizedText;
  readonly note?: LocalizedText;
  readonly priceCzk: number | null;
  /**
   * Rendered as "/ night", "/ day", "/ person / day". `null` where the source
   * price list states no unit, in which case none is shown rather than assumed.
   */
  readonly unit: PricingUnit | null;
  readonly hasSeasonalException: boolean;
}

export type PricingUnit = "night" | "day" | "person-day" | "stay" | "person";

export interface PricingPeriod {
  readonly validFrom: string;
  readonly validTo: string;
}

/** One of the four buildings guests are accommodated in. */
export interface AccommodationArea {
  readonly id: string;
  readonly name: LocalizedText;
  readonly description: LocalizedText;
  readonly details: LocalizedList;
}

export interface HotelService {
  readonly id: string;
  readonly label: LocalizedText;
  readonly icon: IconName;
}

export interface HotelStat {
  readonly id: string;
  readonly value: string;
  readonly label: LocalizedText;
}

export interface SpecialOffer {
  readonly id: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly conditions: LocalizedText;
}

/* -------------------------------------------------------------------------- */
/* Restaurant                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Allergen numbers follow the EU list (Regulation 1169/2011) as printed on the
 * Klika menu. They are always rendered as separate labels, never merged with or
 * next to a price — a source value like "13710" means allergens 1, 3, 7 and 10.
 */
export type AllergenNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Allergen {
  readonly number: AllergenNumber;
  readonly name: LocalizedText;
}

export type DietaryLabel = "vegetarian" | "vegan" | "gluten-free";

export type DailyMenuCategory = "soup" | "main" | "dessert";

export interface DailyMenuItem {
  readonly id: string;
  readonly category: DailyMenuCategory;
  readonly name: LocalizedText;
  readonly priceCzk: number;
  readonly allergens: readonly AllergenNumber[];
  readonly dietaryLabels?: readonly DietaryLabel[];
  /** Free-form qualifier, e.g. "vegan without cheese". */
  readonly note?: LocalizedText;
}

export interface DailyMenu {
  /** ISO date (YYYY-MM-DD) the menu applies to. */
  readonly date: string;
  readonly items: readonly DailyMenuItem[];
}

export type MenuCategory =
  | "soups"
  | "small-dishes"
  | "main-courses"
  | "side-dishes"
  | "children"
  | "desserts";

export interface MenuItem {
  readonly id: string;
  readonly category: MenuCategory;
  readonly name: LocalizedText;
  /** Dash-separated component list as printed on the menu. */
  readonly description?: LocalizedText;
  /** `null` for items without a fixed price (e.g. "ask your server"). */
  readonly priceCzk: number | null;
  readonly allergens: readonly AllergenNumber[];
  readonly dietaryLabels?: readonly DietaryLabel[];
  /**
   * The dish is not gluten-free as served but the kitchen can prepare it
   * without gluten. Distinct from the "gluten-free" dietary label.
   */
  readonly canBeGlutenFree?: boolean;
  readonly note?: LocalizedText;
}

export type SeatingZoneId = "restaurant" | "conservatory" | "garden";

export interface SeatingZone {
  readonly id: SeatingZoneId;
  readonly name: LocalizedText;
  /** One concise paragraph carrying the zone's key facts. */
  readonly description: LocalizedText;
  /** `null` where the supplied content does not state an exact capacity. */
  readonly seats: number | null;
  readonly image: ImageAsset;
}

export interface Producer {
  readonly id: string;
  readonly name: string;
  readonly description: LocalizedText;
}

export interface Voucher {
  readonly id: string;
  readonly valueCzk: number;
}

/* -------------------------------------------------------------------------- */
/* Location                                                                   */
/* -------------------------------------------------------------------------- */

export type TravelMode =
  | "car"
  | "motorcycle"
  | "bicycle"
  | "train"
  | "bus"
  | "public-transport"
  | "taxi"
  | "plane"
  | "walking";

export interface TravelOption {
  readonly id: TravelMode;
  readonly label: LocalizedText;
  readonly icon: IconName;
  readonly summary: LocalizedText;
  readonly details: LocalizedList;
}

export interface TripTip {
  readonly id: string;
  readonly name: string;
  readonly description: LocalizedText;
  readonly image: ImageAsset;
}

export interface GeoCoordinates {
  readonly latitude: number;
  readonly longitude: number;
  /** Human-readable form exactly as published by the hotel. */
  readonly display: string;
}

/* -------------------------------------------------------------------------- */
/* Gallery                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Gallery filters. Four worlds rather than six: rooms belong to the hotel and
 * the garden is part of the restaurant, so the filter bar stays scannable on a
 * phone instead of splitting the same place across near-duplicate tabs.
 */
export type GalleryCategory = "food" | "restaurant" | "hotel" | "surroundings";

export interface GalleryItem {
  readonly id: string;
  readonly category: GalleryCategory;
  readonly image: ImageAsset;
  readonly caption: LocalizedText;
}

/**
 * One editorial group for the landing-page gallery: a tall lead image beside
 * two stacked images. Rendered as an irregular, horizontally swipeable strip.
 */
export interface GalleryGroup {
  readonly id: string;
  readonly large: GalleryItem;
  readonly stacked: readonly [GalleryItem, GalleryItem];
}

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

export interface PhoneNumber {
  /** Display form, e.g. "+420 774 328 555". */
  readonly display: string;
  /** E.164 form for tel: and WhatsApp links, e.g. "+420774328555". */
  readonly e164: string;
}

export interface OpeningHours {
  readonly id: string;
  readonly label: LocalizedText;
  readonly days: LocalizedText;
  /** Display form, e.g. "10:30–22:00". */
  readonly hours: string;
  /** Machine-readable opening spec for schema.org. */
  readonly schema?: {
    readonly opens: string;
    readonly closes: string;
    readonly dayOfWeek: readonly string[];
  };
}

export interface PostalAddress {
  readonly streetLines: readonly string[];
  readonly postalCode: string;
  readonly city: string;
  readonly country: LocalizedText;
  readonly countryCode: string;
}

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface BillingEntity {
  readonly id: string;
  readonly role: LocalizedText;
  readonly name: string;
  readonly addressLines: readonly string[];
  /** Czech company registration number. */
  readonly companyId: string;
  /** Czech VAT number. */
  readonly vatId: string;
}

/* -------------------------------------------------------------------------- */
/* Booking prototypes                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Front-end only. No availability check, no payment, no reservation is created.
 * Persisted in sessionStorage until the browser tab closes.
 */
export interface HotelBookingDraft {
  /** ISO date (YYYY-MM-DD). */
  readonly arrival: string;
  readonly departure: string;
  readonly guests: number;
  readonly roomId: RoomId | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly note: string;
}

export type HotelBookingStep =
  | "dates"
  | "room"
  | "room-detail"
  | "guest"
  | "summary"
  | "contact";

export interface TableBookingDraft {
  readonly date: string;
  readonly time: string;
  readonly guests: number;
  readonly zone: SeatingZoneId | "any";
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly note: string;
}

/** Field-level validation errors, keyed by form field name. */
export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Strips `readonly` from a type's own properties.
 * Domain types are readonly by default; this is for the few places that build
 * a value up field by field before handing it back as immutable.
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  readonly id: string;
  /** Path without the locale prefix, e.g. "/hotel/rooms". */
  readonly href: string;
  readonly label: LocalizedText;
  readonly children?: readonly NavItem[];
}

/**
 * Subset of lucide-react icon names used across the site. Keeping this as a
 * union rather than `string` means an unknown icon fails type checking instead
 * of rendering nothing at runtime.
 */
export type IconName =
  | "BedDouble"
  | "Bike"
  | "Bus"
  | "Baby"
  | "Car"
  | "Coffee"
  | "Croissant"
  | "Dog"
  | "Footprints"
  | "Wifi"
  | "Wine"
  | "Utensils"
  | "TreePine"
  | "Train"
  | "Plane"
  | "ParkingSquare"
  | "Phone"
  | "Printer"
  | "Luggage"
  | "Lock"
  | "Map"
  | "AlarmClock"
  | "Ticket"
  | "Scissors"
  | "ConciergeBell"
  | "Sparkles"
  | "Sun"
  | "Waves";
