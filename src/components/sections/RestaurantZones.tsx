import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { seatingZones } from "@/content/restaurant";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { ZoneShowcase } from "@/components/restaurant/ZoneShowcase";

export function RestaurantZones({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="cream">
      <Container>
        <SectionHeading
          eyebrow={dict.zones.eyebrow}
          title={dict.zones.title}
          lede={dict.zones.subtitle}
        />
        <div className="mt-12">
          <ZoneShowcase zones={seatingZones} locale={locale} dict={dict} />
        </div>
      </Container>
    </Section>
  );
}
