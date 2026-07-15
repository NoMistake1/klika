import type { Locale } from "@/lib/i18n";
import { cs, type Dictionary } from "./cs";
import { en } from "./en";
import { de } from "./de";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { cs, en, de };

/**
 * Returns the UI dictionary for a locale. Synchronous on purpose: the
 * dictionaries are small, statically imported and shared by Server Components,
 * so no async boundary or bundle split is needed.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Fills {placeholders} in a dictionary string.
 * interpolate("Step {current} of {total}", { current: 1, total: 6 })
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}
