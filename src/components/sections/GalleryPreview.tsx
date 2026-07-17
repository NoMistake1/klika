import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { landingGalleryGroups, landingGalleryItems } from "@/content/gallery";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { EditorialGallery } from "@/components/gallery/EditorialGallery";

/**
 * Homepage gallery preview — an irregular, swipeable editorial strip. The full
 * browsable, filterable gallery lives on /gallery.
 */
export function GalleryPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="warm-white">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={dict.gallery.eyebrow}
            title={dict.gallery.title}
            lede={dict.gallery.subtitle}
          />
          <Button
            href={localePath(locale, "/gallery")}
            variant="ghost"
            className="shrink-0 self-start sm:self-auto"
          >
            {dict.actions.wholeGallery}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <div className="mt-12">
          <EditorialGallery
            groups={landingGalleryGroups}
            items={landingGalleryItems}
            locale={locale}
            dict={dict}
          />
        </div>
      </Container>
    </Section>
  );
}
