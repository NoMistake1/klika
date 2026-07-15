import type { PricingRow, PricingUnit } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Price } from "@/components/ui/MenuBadges";

/**
 * The price list.
 *
 * A plain description list on hairlines — not a three-column SaaS pricing table
 * with a highlighted "recommended" tier. A hotel rate card should read like a
 * rate card.
 */
export function PricingList({
  rows,
  locale,
  dict,
}: {
  rows: readonly PricingRow[];
  locale: Locale;
  dict: Dictionary;
}) {
  const unitLabel: Record<PricingUnit, string> = {
    night: dict.pricingPage.perNight,
    day: dict.pricingPage.perDay,
    "person-day": dict.pricingPage.perPersonDay,
    person: dict.pricingPage.perPerson,
    stay: dict.pricingPage.perStay,
  };

  return (
    <dl className="divide-y divide-current/10 border-y border-current/10">
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
        >
          <div className="flex-1">
            <dt className="font-medium text-pretty">{row.label[locale]}</dt>
            {row.note ? (
              <p className="mt-0.5 text-sm opacity-60">{row.note[locale]}</p>
            ) : null}
          </div>

          <dd className="flex shrink-0 items-baseline gap-1.5">
            <Price
              amountCzk={row.priceCzk}
              locale={locale}
              hasSeasonalException={row.hasSeasonalException}
              fallback={dict.rooms.priceOnRequest}
              className="text-lg"
            />
            {row.priceCzk !== null && row.unit ? (
              <span className="text-sm opacity-55">{unitLabel[row.unit]}</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
