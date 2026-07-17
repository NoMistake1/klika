import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema } from "@/lib/structured-data";
import { galleryCategoryOrder, galleryItems } from "@/content/gallery";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/gallery",
    title: dict.gallery.title,
    description: dict.gallery.subtitle,
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.gallery.eyebrow}
        title={dict.gallery.title}
        lede={dict.gallery.subtitle}
        crumbs={[{ label: dict.gallery.eyebrow }]}
        background={{
          src: "/images/gallery/window-desktop.webp",
          width: 1672,
          height: 941,
          mobileSrc: "/images/gallery/window-mobile.webp",
          mobileWidth: 1350,
          mobileHeight: 1687,
          imgClassName: "object-center",
        }}
        aside={<HandwrittenNote arrow="left">{dict.hero.handwritten}</HandwrittenNote>}
      />

      <Section tone="warm-white">
        <Container>
          <GalleryGrid
            items={galleryItems}
            categories={galleryCategoryOrder}
            locale={locale}
            dict={dict}
          />
        </Container>
      </Section>

      <JsonLdScript
        schemas={[breadcrumbSchema(locale, [{ name: dict.gallery.eyebrow, path: "/gallery" }])]}
      />
    </>
  );
}
