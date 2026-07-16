import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { featuredRooms } from "@/content/hotel";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { RoomSlider } from "@/components/hotel/RoomSlider";

export function FeaturedRooms({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="warm-white">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={dict.rooms.eyebrow}
            title={dict.rooms.title}
            lede={dict.rooms.subtitle}
          />
          <Button
            href={localePath(locale, "/hotel/rooms")}
            variant="ghost"
            className="shrink-0 self-start sm:self-auto"
          >
            {dict.actions.allRooms}
          </Button>
        </div>

        <div className="mt-12">
          <RoomSlider rooms={featuredRooms} locale={locale} dict={dict} />
        </div>
      </Container>
    </Section>
  );
}
