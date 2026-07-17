import { ArrowRight, CalendarDays } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { getDailyMenu } from "@/content/daily-menu";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { DecorImage } from "@/components/ui/DecorImage";
import { Reveal } from "@/components/ui/Reveal";
import { DailyMenuEmpty, DailyMenuList } from "@/components/restaurant/DailyMenuList";
import { formatDate, formatWeekday } from "@/lib/utils";

/**
 * Daily menu on the homepage — deliberately high up the page and rendered in
 * full rather than teased, because it is the single thing local guests come
 * here to check.
 *
 * The menu-page CTAs carry the target view in the URL (`?view=daily` /
 * `?view=permanent`) so each opens the switcher already on the right tab.
 */
export function DailyMenuPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const menu = getDailyMenu();
  const menuHref = localePath(locale, "/restaurant/menu");

  return (
    <Section tone="cream" id="explore" className="relative overflow-hidden">
      {/* Decorative tomato, upper-right, reaching upward and bleeding a little
          past the screen. The section clips the overflow, so it never causes
          horizontal scroll; it sits behind the relative Container and is kept
          light, so the content stays fully readable. The date now lives on the
          left, leaving this corner clear. */}
      <DecorImage
        src="/images/food/rajce.webp"
        className="-top-10 -right-16 h-64 w-64 opacity-30 sm:-top-14 sm:-right-20 sm:h-80 sm:w-80 lg:-top-20 lg:-right-16 lg:h-[26rem] lg:w-[26rem]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow={dict.dailyMenu.eyebrow}
          title={dict.dailyMenu.title}
          lede={dict.dailyMenu.subtitle}
        />

        {/* Date + serving time, on the left, clear of the tomato and the
            right-hand CTA divider. */}
        {menu ? (
          <div className="mt-6 flex flex-col gap-1.5">
            <p className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays aria-hidden="true" className="size-4 opacity-60" />
              <time dateTime={menu.date}>
                <span className="capitalize">{formatWeekday(menu.date, locale)}</span>
                {" · "}
                {formatDate(menu.date, locale)}
              </time>
            </p>
            <p className="text-sm opacity-60">{dict.dailyMenu.servedFrom}</p>
          </div>
        ) : null}

        <Reveal className="mt-12">
          {menu ? (
            <div className="grid gap-x-16 lg:grid-cols-[1fr_auto]">
              <DailyMenuList menu={menu} locale={locale} dict={dict} />

              <aside className="mt-10 flex flex-col gap-5 border-t border-navy/10 pt-6 lg:mt-0 lg:w-56 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                {/* Arrow only on desktop (leading down-right to the buttons);
                    on mobile the text sits flush-left above the buttons. */}
                <HandwrittenNote arrow="downRight" arrowClassName="hidden lg:inline-block">
                  {dict.dailyMenu.eyebrow}
                </HandwrittenNote>

                <div className="flex flex-col gap-3">
                  <Button href={`${menuHref}?view=daily`} variant="primary">
                    {dict.actions.fullDailyMenu}
                    {/* Arrow on this button only on mobile. */}
                    <ArrowRight aria-hidden="true" className="size-4 lg:hidden" />
                  </Button>
                  <Button href={`${menuHref}?view=permanent`} variant="outline">
                    {dict.actions.fullMenu}
                    {/* Arrow on this button only on desktop. */}
                    <ArrowRight aria-hidden="true" className="hidden size-4 lg:inline-block" />
                  </Button>
                </div>
              </aside>
            </div>
          ) : (
            <DailyMenuEmpty dict={dict} />
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
