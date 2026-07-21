import type { PricingRow, PricingUnit } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Price } from "@/components/ui/MenuBadges";
import { cn } from "@/lib/utils";

/**
 * The price list.
 *
 * A rate card, not a three-column SaaS pricing table with a highlighted
 * "recommended" tier — and not a spreadsheet either. Each row is one grid:
 * the room on the left, the rate hard-right on its own baseline, and the
 * condition tucked under the room name where it belongs to.
 *
 * On a phone the grid collapses to a single column, so the name reads first and
 * the rate sits directly beneath it at full prominence rather than being
 * squeezed onto the same line. Nothing scrolls sideways at any width.
 *
 * Prices, units, notes and the seasonal asterisk all come from the content
 * layer untouched — including the rows the source price list gives no unit for,
 * which deliberately render without one rather than inventing "per night".
 */
export function PricingList({
  rows,
  locale,
  dict,
  className,
}: {
  rows: readonly PricingRow[];
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const unitLabel: Record<PricingUnit, string> = {
    night: dict.pricingPage.perNight,
    day: dict.pricingPage.perDay,
    "person-day": dict.pricingPage.perPersonDay,
    person: dict.pricingPage.perPerson,
    stay: dict.pricingPage.perStay,
  };

  return (
    <dl className={cn("divide-y divide-current/10 border-y border-current/10", className)}>
      {rows.map((row) => (
        <div
          key={row.id}
          className="grid gap-x-8 gap-y-1.5 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline"
        >
          <div className="min-w-0">
            <dt className="font-medium text-pretty">{row.label[locale]}</dt>
            {row.note ? (
              <p className="mt-1 text-xs leading-relaxed opacity-60">{row.note[locale]}</p>
            ) : null}
          </div>

          {/* Right-aligned from sm up so every rate lands on one optical
              column; left-aligned under the name on a phone. */}
          <dd className="flex items-baseline gap-1.5 sm:justify-self-end">
            <Price
              amountCzk={row.priceCzk}
              locale={locale}
              hasSeasonalException={row.hasSeasonalException}
              fallback={dict.rooms.priceOnRequest}
              className="text-xl font-semibold tabular-nums"
            />
            {row.priceCzk !== null && row.unit ? (
              <span className="text-xs whitespace-nowrap opacity-55">{unitLabel[row.unit]}</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
