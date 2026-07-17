import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { producers } from "@/content/restaurant";
import { Container, Section } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { DecorImage } from "@/components/ui/DecorImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Local producers.
 *
 * Typographic marks only. No producer logos are invented — these are other
 * people's businesses, and a fabricated logo would misrepresent them.
 */
export function LocalProducers({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="navy" spacing="tight" className="relative overflow-hidden">
      {/* Decorative mushroom near the left edge, bleeding past it (clipped by
          the section). The navy surface needs a light mark, so the brown line
          art is inverted to a faint cream and kept low. */}
      <DecorImage
        src="/images/food/zampion.webp"
        className="-bottom-10 -left-16 h-56 w-56 opacity-20 [filter:brightness(0)_invert(1)] sm:-left-20 sm:h-72 sm:w-72 lg:h-80 lg:w-80"
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-blue/70">
              {dict.producers.eyebrow}
            </p>
            <p className="text-xl leading-snug text-balance sm:text-2xl">
              {dict.producers.title}
            </p>
            {/* Arrow leads left→right toward the supplier list; the arc is
                flipped (curve="alt") per the mobile correction. */}
            <HandwrittenNote className="mt-5" arrow="right" curve="alt">
              {dict.producers.note}
            </HandwrittenNote>
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-6 self-center sm:grid-cols-3">
            {producers.map((producer, index) => (
              <Reveal key={producer.id} as="li" delay={index * 60}>
                <div className="border-t border-cream/20 pt-3">
                  <p className="font-display text-2xl leading-none text-cream">
                    {producer.name}
                  </p>
                  <p className="mt-1.5 text-xs tracking-wide text-cream/55">
                    {producer.description[locale]}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
