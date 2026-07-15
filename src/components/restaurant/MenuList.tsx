import type { MenuCategory, MenuItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { menuCategoryNotes } from "@/content/menu";
import { AllergenList, DietaryBadges, Price } from "@/components/ui/MenuBadges";

/**
 * The permanent menu, grouped by category.
 *
 * Prices sit in their own right-hand column; allergen codes sit under the dish
 * in bordered boxes. The two are never adjacent bare numbers, which is the
 * whole point — on the source menu "1, 3, 7" next to "196" is exactly the
 * ambiguity guests must not have to resolve.
 */
export function MenuList({
  groups,
  locale,
  dict,
}: {
  groups: ReadonlyArray<{ category: MenuCategory; items: readonly MenuItem[] }>;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="space-y-16">
      {groups.map((group) => {
        const note = menuCategoryNotes[group.category];

        return (
          <section key={group.category} id={`menu-${group.category}`} className="scroll-mt-28">
            <h2 className="flex items-center gap-4 text-heading font-semibold">
              {dict.menuPage.categories[group.category]}
              <span aria-hidden="true" className="h-px flex-1 bg-current/15" />
            </h2>

            {note ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-70">
                {note[locale]}
              </p>
            ) : null}

            {group.items.length > 0 ? (
              <ul className="mt-6 divide-y divide-current/10 border-t border-current/10">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-pretty">{item.name[locale]}</h3>

                      {item.description ? (
                        <p className="mt-1 text-sm leading-relaxed opacity-70">
                          {item.description[locale]}
                        </p>
                      ) : null}

                      {item.canBeGlutenFree ? (
                        <p className="mt-2 text-xs font-medium text-sand-ink">
                          {dict.menuPage.glutenFreeOption}
                        </p>
                      ) : null}

                      {item.note ? (
                        <p className="mt-1 text-sm opacity-60">{item.note[locale]}</p>
                      ) : null}

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <DietaryBadges labels={item.dietaryLabels} dict={dict} />
                        <AllergenList
                          allergens={item.allergens}
                          locale={locale}
                          dict={dict}
                        />
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
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
