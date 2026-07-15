import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { galleryCategoryOrder, galleryItems } from "@/content/gallery";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

/** A trimmed selection on the homepage; the full set lives on /gallery. */
const PREVIEW_COUNT = 8;

export function GalleryPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const preview = galleryItems.slice(0, PREVIEW_COUNT);

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
          <GalleryGrid
            items={preview}
            categories={galleryCategoryOrder}
            locale={locale}
            dict={dict}
            showFilter={false}
            swipeOnMobile
          />
        </div>
      </Container>
    </Section>
  );
}
