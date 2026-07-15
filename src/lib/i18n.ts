import { locales, type Locale, type LocalizedText, type LocalizedList } from "@/types";

export { locales };
export type { Locale };

export const defaultLocale: Locale = "cs";

/** BCP 47 tags used for <html lang>, hreflang and Intl formatting. */
export const localeTags: Record<Locale, string> = {
  cs: "cs-CZ",
  en: "en-GB",
  de: "de-DE",
};

/** Labels for the language switcher. */
export const localeLabels: Record<Locale, { short: string; full: string }> = {
  cs: { short: "CZ", full: "Čeština" },
  en: { short: "EN", full: "English" },
  de: { short: "DE", full: "Deutsch" },
};

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/** Resolves an unknown route segment to a supported locale, falling back to Czech. */
export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Picks the current language out of a localized value. */
export function pick(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

/** Picks the current language out of a localized list. */
export function pickList(list: LocalizedList, locale: Locale): readonly string[] {
  return list[locale];
}

/**
 * Builds an absolute in-app path for a locale.
 * `localePath("cs", "/hotel/rooms")` -> "/cs/hotel/rooms"
 */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

/**
 * Rewrites the current pathname to another locale, preserving the page.
 * "/cs/hotel" + "en" -> "/en/hotel"
 * Unknown or missing leading locales fall back to the target locale root.
 */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  if (isLocale(first)) {
    return rest.length > 0 ? `/${nextLocale}/${rest.join("/")}` : `/${nextLocale}`;
  }

  return segments.length > 0 ? `/${nextLocale}/${segments.join("/")}` : `/${nextLocale}`;
}

/** Strips the locale prefix from a pathname: "/cs/hotel/rooms" -> "/hotel/rooms". */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;
  const path = isLocale(first) ? rest : segments;
  return path.length > 0 ? `/${path.join("/")}` : "/";
}
