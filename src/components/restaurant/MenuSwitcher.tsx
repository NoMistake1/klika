"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useRef, type KeyboardEvent } from "react";
import { CalendarDays } from "lucide-react";
import type { Allergen, DailyMenu, MenuCategory, MenuItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { DailyMenuEmpty, DailyMenuList } from "@/components/restaurant/DailyMenuList";
import { MenuList } from "@/components/restaurant/MenuList";
import { AllergenLegend } from "@/components/ui/MenuBadges";
import { formatDate, formatWeekday, cn } from "@/lib/utils";

type Panel = "daily" | "permanent";

/**
 * Segmented switcher between the daily and the à la carte menu.
 *
 * Both menus on one page meant a very long scroll; splitting them halves it
 * without hiding anything. The menus themselves stay ordinary vertical
 * reading lists — a menu is content to read, never something to swipe through.
 *
 * Implemented as real WAI-ARIA tabs (roving tabindex, arrow keys, Home/End)
 * rather than a styled div: the segmented look is presentation, the semantics
 * underneath are what a screen reader needs. Both panels stay mounted so
 * switching is instant and in-page search still finds either menu.
 *
 * The active tab is stored in the URL (`?view=daily|permanent`), not in local
 * state, so a deep link opens the right menu, a refresh keeps it, and browser
 * back/forward move between the two views.
 */
export function MenuSwitcher({
  dailyMenu,
  groups,
  dailyAllergens,
  permanentAllergens,
  isDemoDaily,
  locale,
  dict,
}: {
  dailyMenu: DailyMenu | null;
  groups: ReadonlyArray<{ category: MenuCategory; items: readonly MenuItem[] }>;
  dailyAllergens: readonly Allergen[];
  permanentAllergens: readonly Allergen[];
  isDemoDaily: boolean;
  locale: Locale;
  dict: Dictionary;
}) {
  const baseId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabRefs = useRef<Map<Panel, HTMLButtonElement>>(new Map());

  // The URL is the source of truth; anything other than "permanent" is daily.
  const panel: Panel = searchParams.get("view") === "permanent" ? "permanent" : "daily";

  function selectPanel(next: Panel) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", next);
    // push (not replace) so browser back returns to the previous view.
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const panels: ReadonlyArray<{ id: Panel; label: string }> = [
    { id: "daily", label: dict.dailyMenu.title },
    { id: "permanent", label: dict.menuPage.title },
  ];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = panels.findIndex((entry) => entry.id === panel);
    let next: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % panels.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + panels.length) % panels.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = panels.length - 1;
        break;
      default:
        return;
    }

    const target = panels[next];
    if (!target) return;
    event.preventDefault();
    selectPanel(target.id);
    tabRefs.current.get(target.id)?.focus();
  }

  const activeIndex = panels.findIndex((entry) => entry.id === panel);

  return (
    <div>
      {/* Segmented control */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label={dict.menuPage.jumpTo}
          // Grid, not flex: equal-width columns are what let the sliding
          // indicator line up exactly. With flex-1 each tab still takes its own
          // min-content width, so "Denní menu" and "Stálé menu" came out 142px
          // and 138px and the pill never matched either.
          className="relative grid rounded-lg bg-navy/[0.06] p-1"
          style={{ gridTemplateColumns: `repeat(${panels.length}, minmax(0, 1fr))` }}
        >
          {/* Sliding indicator: one element that moves, so the change reads as
              a single continuous motion instead of two colour swaps. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 rounded-md bg-navy shadow-[0_2px_8px_-2px_rgba(11,29,53,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none"
            style={{
              width: `calc((100% - 0.5rem) / ${panels.length})`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />

          {panels.map((entry) => {
            const isActive = entry.id === panel;
            return (
              <button
                key={entry.id}
                ref={(node) => {
                  if (node) tabRefs.current.set(entry.id, node);
                  else tabRefs.current.delete(entry.id);
                }}
                type="button"
                role="tab"
                id={`${baseId}-${entry.id}-tab`}
                aria-selected={isActive}
                aria-controls={`${baseId}-${entry.id}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectPanel(entry.id)}
                onKeyDown={onKeyDown}
                className={cn(
                  "relative z-10 inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-medium whitespace-nowrap sm:px-8",
                  "transition-colors duration-300",
                  isActive ? "text-warm-white" : "text-navy/60 hover:text-navy",
                )}
              >
                {entry.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily */}
      <div
        role="tabpanel"
        id={`${baseId}-daily-panel`}
        aria-labelledby={`${baseId}-daily-tab`}
        hidden={panel !== "daily"}
        tabIndex={0}
        className="mt-10 focus-visible:outline-2"
      >
        {/* key forces the entrance animation to replay on each switch */}
        <div key={panel} className="animate-fade-up motion-reduce:animate-none">
          {dailyMenu ? (
            <>
              <p className="mb-8 flex items-center justify-center gap-2 text-sm font-medium">
                <CalendarDays aria-hidden="true" className="size-4 opacity-60" />
                <time dateTime={dailyMenu.date}>
                  <span className="capitalize">{formatWeekday(dailyMenu.date, locale)}</span>
                  {" · "}
                  {formatDate(dailyMenu.date, locale)}
                </time>
              </p>

              <DailyMenuList menu={dailyMenu} locale={locale} dict={dict} />

              <div className="mt-14">
                <AllergenLegend allergens={dailyAllergens} locale={locale} dict={dict} />
              </div>

              {isDemoDaily ? (
                <p className="mt-8 text-xs opacity-50">{dict.dailyMenu.demoNotice}</p>
              ) : null}
            </>
          ) : (
            <DailyMenuEmpty dict={dict} />
          )}
        </div>
      </div>

      {/* Permanent */}
      <div
        role="tabpanel"
        id={`${baseId}-permanent-panel`}
        aria-labelledby={`${baseId}-permanent-tab`}
        hidden={panel !== "permanent"}
        tabIndex={0}
        className="mt-10 focus-visible:outline-2"
      >
        <div key={panel} className="animate-fade-up motion-reduce:animate-none">
          <p className="mb-8 text-center text-sm opacity-65">{dict.menuPage.intro}</p>
          <MenuList groups={groups} locale={locale} dict={dict} />
          <div className="mt-16">
            <AllergenLegend allergens={permanentAllergens} locale={locale} dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
