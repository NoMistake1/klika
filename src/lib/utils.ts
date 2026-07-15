import { localeTags, type Locale } from "@/lib/i18n";

/** Minimal class name joiner. Falsy values are dropped. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a CZK amount for the active locale.
 * Czech and German render "2 200 Kč"; English renders "CZK 2,200".
 * Prices are always whole crowns.
 */
export function formatPrice(amountCzk: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency: "CZK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountCzk);
}

/** Formats an ISO date (YYYY-MM-DD) as a long, localized date. */
export function formatDate(isoDate: string, locale: Locale): string {
  const date = parseIsoDate(isoDate);
  if (!date) return isoDate;

  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Formats an ISO date as a localized weekday, e.g. "úterý". */
export function formatWeekday(isoDate: string, locale: Locale): string {
  const date = parseIsoDate(isoDate);
  if (!date) return "";
  return new Intl.DateTimeFormat(localeTags[locale], { weekday: "long" }).format(date);
}

/**
 * Parses YYYY-MM-DD into a UTC date. Returns null for malformed input so
 * callers can render an empty state instead of "Invalid Date".
 */
export function parseIsoDate(isoDate: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  // Rejects impossible dates that JS would otherwise roll over (e.g. 2026-02-31).
  if (
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() !== Number(month) - 1 ||
    date.getUTCDate() !== Number(day)
  ) {
    return null;
  }

  return date;
}

/** Today as YYYY-MM-DD in the browser's / server's local time. */
export function todayIso(): string {
  return toIsoDate(new Date());
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Adds whole days to an ISO date, returning a new ISO date. */
export function addDays(isoDate: string, days: number): string {
  const date = parseIsoDate(isoDate);
  if (!date) return isoDate;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Whole nights between two ISO dates. Negative when departure precedes arrival. */
export function nightsBetween(arrival: string, departure: string): number {
  const from = parseIsoDate(arrival);
  const to = parseIsoDate(departure);
  if (!from || !to) return 0;
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

/** Builds a wa.me link from an E.164 number. */
export function whatsAppLink(e164: string): string {
  return `https://wa.me/${e164.replace(/[^\d]/g, "")}`;
}

/** Builds a tel: href from an E.164 number. */
export function telLink(e164: string): string {
  return `tel:${e164}`;
}
