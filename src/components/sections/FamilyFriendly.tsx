import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { People } from "@/components/illustrations";

/**
 * Families with children. A scannable list beside one image — the brief is
 * explicit that this must not become a long text section.
 *
 * Layout intent: the photograph floats as a card on the light-blue field
 * rather than running edge to edge. The section deliberately keeps the Klika
 * blue visible around it — the site should not become wall-to-wall photography,
 * and the zones and hero already carry the edge-to-edge treatment.
 */
export function FamilyFriendly({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="blue-light" spacing="loose" className="relative overflow-hidden">
      {/* Two decorative figures tucked into the section's bottom-right corner,
          behind the content on both layouts. The section clips the overflow. */}
      <People
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-6 h-24 w-24 text-navy opacity-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          <Reveal className="relative lg:col-span-5">
            {/* Floating card: rounded, lifted, inset from the section edge. */}
            <div className="card-float relative aspect-[4/5] overflow-hidden bg-cream lg:rotate-[-1.25deg] motion-reduce:rotate-0">
              <SafeImage
                image={{
                  src: "/images/restaurant/garden-children.webp",
                  alt: {
                    cs: "Dětský koutek na zahrádce u řeky",
                    en: "The children's area in the riverside garden",
                    de: "Der Kinderbereich im Garten am Fluss",
                  },
                  width: 1122,
                  height: 1402,
                }}
                locale={locale}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={dict.family.eyebrow}
              title={dict.family.title}
              lede={dict.family.subtitle}
            />

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
              {dict.family.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-navy/10 py-3 text-sm"
                >
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-sand-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
