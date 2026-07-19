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
        className="-bottom-12 -left-16 h-64 w-64 opacity-20 [filter:brightness(0)_invert(1)] sm:-left-20 sm:h-80 sm:w-80 lg:-bottom-24 lg:h-96 lg:w-96"
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
            {/* Exactly one annotation shows per breakpoint. The display toggle
                lives on wrapper divs (block by default) rather than on the
                note's own inline-flex span, so `hidden` actually wins — cn() is
                a plain join, not a tailwind-merge, so a `hidden` on the span
                would sit alongside its base `inline-flex` and never hide it.
                Mobile uses the open-V "downRight" geometry (like "Útulné
                spaní"); desktop keeps the flatter right/alt arc. */}
            <div className="mt-5 lg:hidden">
              <HandwrittenNote arrow="downRight">{dict.producers.note}</HandwrittenNote>
            </div>
            <div className="mt-5 hidden lg:block">
              <HandwrittenNote arrow="right" curve="alt">{dict.producers.note}</HandwrittenNote>
            </div>
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
