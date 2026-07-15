import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { hotelStats } from "@/content/hotel";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Rooftops } from "@/components/illustrations";

/**
 * Hotel in numbers.
 *
 * Real, supplied figures only — 85 beds, 26 rooms, 9 apartments, 3 minutes to
 * the square. No invented "guest satisfaction" or years-of-excellence metrics.
 */
export function HotelNumbers({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="blue-light" spacing="tight" className="relative overflow-hidden">
      <Rooftops
        aria-hidden="true"
        className="pointer-events-none absolute right-0 -bottom-1 h-20 w-[36rem] text-navy opacity-[0.07]"
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

          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {hotelStats.map((stat, index) => (
              <Reveal key={stat.id} delay={index * 70}>
                <div className="border-t border-navy/20 pt-4">
                  <dt className="sr-only">{stat.label[locale]}</dt>
                  <dd>
                    <span className="block font-display text-5xl leading-none text-navy sm:text-6xl">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-sm opacity-70">
                      {stat.label[locale]}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
