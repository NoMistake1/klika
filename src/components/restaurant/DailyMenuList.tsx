import type { DailyMenu } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { groupDailyMenu } from "@/content/daily-menu";
import { AllergenList, DietaryBadges, Price } from "@/components/ui/MenuBadges";

/**
 * Renders a daily menu grouped by course.
 *
 * The price and the allergen codes are placed in separate, visually distinct
 * columns — never side by side as bare numbers — so "196" and "1, 3, 7" can
 * never be confused for one another.
 */
export function DailyMenuList({
  menu,
  locale,
  dict,
}: {
  menu: DailyMenu;
  locale: Locale;
  dict: Dictionary;
}) {
  const groups = groupDailyMenu(menu);

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.category}>
          <h3 className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
            {dict.dailyMenu.categories[group.category]}
            <span aria-hidden="true" className="h-px flex-1 bg-current/15" />
          </h3>

          <ul className="divide-y divide-current/10">
            {group.items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <div className="flex-1">
                  <p className="font-medium text-pretty">{item.name[locale]}</p>
                  {item.note ? (
                    <p className="mt-1 text-sm opacity-60">{item.note[locale]}</p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <DietaryBadges labels={item.dietaryLabels} dict={dict} />
                    <AllergenList allergens={item.allergens} locale={locale} dict={dict} />
                  </div>
                </div>

                <Price
                  amountCzk={item.priceCzk}
                  locale={locale}
                  className="shrink-0 text-base sm:text-right"
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** Shown when no menu is published for the day. */
export function DailyMenuEmpty({ dict }: { dict: Dictionary }) {
  return (
    <div className="rule-t py-10 text-center">
      <p className="text-lg font-medium">{dict.dailyMenu.empty}</p>
      <p className="mt-2 text-sm opacity-70">{dict.dailyMenu.emptyHint}</p>
    </div>
  );
}
