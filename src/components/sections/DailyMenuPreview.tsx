import { ArrowRight, CalendarDays } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { getDailyMenu, isDemoDailyMenu } from "@/content/daily-menu";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Reveal } from "@/components/ui/Reveal";
import { Sprig } from "@/components/illustrations";
import { DailyMenuEmpty, DailyMenuList } from "@/components/restaurant/DailyMenuList";
import { formatDate, formatWeekday } from "@/lib/utils";

/**
 * Daily menu on the homepage — deliberately high up the page and rendered in
 * full rather than teased, because it is the single thing local guests come
 * here to check.
 */
export function DailyMenuPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const menu = getDailyMenu();

  return (
    <Section tone="cream" id="explore" className="relative overflow-hidden">
      <Sprig
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-4 h-56 w-28 text-navy opacity-[0.06] lg:right-16 lg:h-72 lg:w-36"
      />

      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={dict.dailyMenu.eyebrow}
            title={dict.dailyMenu.title}
            lede={dict.dailyMenu.subtitle}
          />

          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
            {menu ? (
              <p className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays aria-hidden="true" className="size-4 opacity-60" />
                <time dateTime={menu.date}>
                  <span className="capitalize">{formatWeekday(menu.date, locale)}</span>
                  {" · "}
                  {formatDate(menu.date, locale)}
                </time>
              </p>
            ) : null}
            <p className="text-sm opacity-60">{dict.dailyMenu.servedFrom}</p>
          </div>
        </div>

        <Reveal className="mt-12">
          {menu ? (
            <>
              <div className="grid gap-x-16 lg:grid-cols-[1fr_auto]">
                <DailyMenuList menu={menu} locale={locale} dict={dict} />

                <aside className="mt-10 flex flex-col justify-between gap-6 border-t border-navy/10 pt-6 lg:mt-0 lg:w-56 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                  <HandwrittenNote arrow="left" className="lg:flex-col lg:items-start">
                    {dict.dailyMenu.eyebrow}
                  </HandwrittenNote>

                  <div className="flex flex-col gap-3">
                    <Button
                      href={localePath(locale, "/restaurant/daily-menu")}
                      variant="primary"
                    >
                      {dict.actions.fullDailyMenu}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Button>
                    <Button href={localePath(locale, "/restaurant/menu")} variant="outline">
                      {dict.actions.fullMenu}
                    </Button>
                  </div>
                </aside>
              </div>

              {isDemoDailyMenu ? (
                <p className="mt-10 border-t border-navy/10 pt-4 text-xs opacity-50">
                  {dict.dailyMenu.demoNotice}
                </p>
              ) : null}
            </>
          ) : (
            <DailyMenuEmpty dict={dict} />
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
