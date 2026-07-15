import { ArrowRight, Compass, MapPin } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { address, coordinates, directionsUrl } from "@/content/contact";
import { walkingDistances } from "@/content/location";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { LazyMap } from "@/components/location/LazyMap";

export function LocationPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  // Cream, not blue: FamilyFriendly directly above now carries the blue field,
  // and two identical tones in a row would erase the section break.
  return (
    <Section tone="cream">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={dict.locationPreview.eyebrow}
              title={dict.locationPreview.title}
            />

            <address className="mt-8 flex gap-3 text-base leading-relaxed not-italic">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 opacity-60" />
              <span>
                {dict.siteName}
                <br />
                {address.streetLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                {address.postalCode} {address.city}
              </span>
            </address>

            <p className="mt-4 flex items-center gap-3 text-sm opacity-70">
              <Compass aria-hidden="true" className="size-4 shrink-0 opacity-70" />
              <span className="sr-only">{dict.locationPreview.gps}: </span>
              {coordinates.display}
            </p>

            <h3 className="mt-8 mb-3 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
              {dict.locationPreview.walkingDistance}
            </h3>
            <ul className="space-y-2.5">
              {walkingDistances.map((entry) => (
                <li key={entry.id} className="flex items-baseline gap-3 text-sm">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 translate-y-1.5 rounded-full bg-sand-ink"
                  />
                  {entry.text[locale]}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={localePath(locale, "/location")}>
                {dict.actions.location}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                {dict.actions.navigate}
                <span className="sr-only">({dict.a11y.openInNewTab})</span>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LazyMap dict={dict} aspect="aspect-[4/3] lg:aspect-[16/12]" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
