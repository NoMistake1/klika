import type { AllergenNumber, DietaryLabel } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { getAllergen } from "@/content/menu";
import { formatPrice, cn } from "@/lib/utils";

/**
 * Allergen codes, rendered as individual labels.
 *
 * This is the component that keeps the "13710" problem from ever reaching the
 * page: allergens arrive as a number[] and each one is rendered in its own
 * box with its own accessible name, visually and structurally separate from
 * the price. They can never merge into something a guest could read as money.
 */
export function AllergenList({
  allergens,
  locale,
  dict,
  className,
}: {
  allergens: readonly AllergenNumber[];
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  if (allergens.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      <span className="sr-only">{dict.dailyMenu.allergensLabel}:</span>
      <span aria-hidden="true" className="text-[0.65rem] tracking-wider uppercase opacity-50">
        {dict.dailyMenu.allergensLabel}
      </span>
      {allergens.map((number) => {
        const allergen = getAllergen(number);
        return (
          <span
            key={number}
            title={allergen?.name[locale]}
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-[2px] border border-current/25 px-1 text-[0.65rem] font-medium tabular-nums opacity-70"
          >
            <span aria-hidden="true">{number}</span>
            <span className="sr-only">{allergen ? allergen.name[locale] : number}</span>
          </span>
        );
      })}
    </div>
  );
}

const dietaryToneClasses: Record<DietaryLabel, string> = {
  vegetarian: "border-terracotta/40 text-terracotta",
  vegan: "border-terracotta/40 text-terracotta",
  "gluten-free": "border-navy/30 text-navy/70",
};

export function DietaryBadges({
  labels,
  dict,
  className,
}: {
  labels: readonly DietaryLabel[] | undefined;
  dict: Dictionary;
  className?: string;
}) {
  if (!labels || labels.length === 0) return null;

  return (
    <span className={cn("flex flex-wrap gap-1.5", className)}>
      {labels.map((label) => (
        <span
          key={label}
          className={cn(
            "inline-flex items-center rounded-[2px] border px-1.5 py-0.5 text-[0.65rem] font-medium tracking-wide",
            dietaryToneClasses[label],
          )}
        >
          {dict.dailyMenu.dietary[label]}
        </span>
      ))}
    </span>
  );
}

/**
 * A price. Always rendered through Intl so CZK formatting is locale-correct,
 * and never adjacent to a bare allergen number.
 */
export function Price({
  amountCzk,
  locale,
  className,
  fallback,
  hasSeasonalException = false,
}: {
  amountCzk: number | null;
  locale: Locale;
  className?: string;
  /** Shown when there is no fixed price, e.g. "Cena na vyžádání". */
  fallback?: string;
  hasSeasonalException?: boolean;
}) {
  if (amountCzk === null) {
    return fallback ? (
      <span className={cn("text-sm opacity-70", className)}>{fallback}</span>
    ) : null;
  }

  return (
    <span className={cn("font-medium tabular-nums whitespace-nowrap", className)}>
      {formatPrice(amountCzk, locale)}
      {hasSeasonalException ? (
        <span aria-hidden="true" className="ml-0.5 align-super text-xs opacity-60">
          *
        </span>
      ) : null}
    </span>
  );
}

/** Full allergen legend for a menu page. */
export function AllergenLegend({
  allergens,
  locale,
  dict,
}: {
  allergens: ReadonlyArray<{ number: AllergenNumber; name: Record<Locale, string> }>;
  locale: Locale;
  dict: Dictionary;
}) {
  if (allergens.length === 0) return null;

  return (
    <div className="rule-t pt-6">
      <h2 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
        {dict.dailyMenu.allergenLegend}
      </h2>
      <p className="mt-2 max-w-2xl text-sm opacity-70">{dict.dailyMenu.allergenNote}</p>
      <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {allergens.map((allergen) => (
          <li key={allergen.number} className="flex items-baseline gap-2.5 text-sm">
            <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-[2px] border border-current/25 text-[0.65rem] font-medium tabular-nums opacity-70">
              {allergen.number}
            </span>
            <span className="opacity-80">{allergen.name[locale]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
