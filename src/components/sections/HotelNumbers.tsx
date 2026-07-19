import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { hotelStats } from "@/content/hotel";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { DecorImage } from "@/components/ui/DecorImage";

/**
 * Hotel in numbers.
 *
 * Real, supplied figures only — 85 beds, 26 rooms, 9 apartments, 3 minutes to
 * the square. No invented "guest satisfaction" or years-of-excellence metrics.
 */
export function HotelNumbers({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="blue-light" spacing="tight" className="relative overflow-hidden">
      {/* One hand-drawn houses illustration on both layouts (no second SVG
          system): bottom-left and bleeding off the edge on mobile, moved to
          the right and enlarged on desktop. Kept clearly visible but low
          enough in opacity to stay decorative behind the figures. The section
          clips the overflow, so it never adds page scroll. */}
      <DecorImage
        src="/images/logos/drawings/houses-tr.webp"
        className="-bottom-4 -left-8 h-28 w-96 opacity-40 sm:h-32 sm:w-[26rem] lg:left-auto lg:-right-4 lg:-bottom-3 lg:h-36 lg:w-[44rem]"
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
              {dict.numbers.eyebrow}
            </p>
            <p className="text-xl leading-snug text-balance sm:text-2xl">
              {dict.numbers.title}
            </p>
          </div>

          {/* Each figure reveals in turn, left→right, ~110ms apart, once the
              row enters view. Under reduced-motion / no JS they are just
              visible (see the reveal utility). */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {hotelStats.map((stat, index) => {
              const numeric = Number(stat.value);
              return (
                <Reveal key={stat.id} delay={index * 110}>
                  <div className="border-t border-navy/20 pt-4">
                    <dt className="sr-only">{stat.label[locale]}</dt>
                    <dd>
                      <span className="block font-display text-5xl leading-none text-navy sm:text-6xl">
                        {Number.isFinite(numeric) ? (
                          <CountUp value={numeric} />
                        ) : (
                          stat.value
                        )}
                      </span>
                      <span className="mt-2 block text-sm opacity-70">
                        {stat.label[locale]}
                      </span>
                    </dd>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
