import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { producers } from "@/content/restaurant";
import { Container, Section } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Reveal } from "@/components/ui/Reveal";
import { Sprig } from "@/components/illustrations";

/**
 * Local producers.
 *
 * Typographic marks only. No producer logos are invented — these are other
 * people's businesses, and a fabricated logo would misrepresent them.
 */
export function LocalProducers({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="navy" spacing="tight" className="relative overflow-hidden">
      <Sprig
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-6 h-48 w-24 text-blue opacity-10"
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
            <HandwrittenNote className="mt-5" arrow="right">
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
