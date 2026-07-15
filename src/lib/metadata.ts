import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { localePath, locales, type Locale } from "@/lib/i18n";

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL on Vercel (e.g. per preview
 * deployment); the production domain is the fallback.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hotelklika.cz"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds hreflang alternates for a page across all three locales, plus
 * x-default pointing at Czech (the default locale).
 */
function buildAlternates(path: string, locale: Locale): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const target of locales) {
    languages[target] = absoluteUrl(localePath(target, path));
  }
  languages["x-default"] = absoluteUrl(localePath("cs", path));

  return {
    canonical: absoluteUrl(localePath(locale, path)),
    languages,
  };
}

interface PageMetadataOptions {
  locale: Locale;
  /** Path without the locale prefix, e.g. "/hotel/rooms". */
  path: string;
  title: string;
  description: string;
  /** Set false for utility pages that should stay out of the index. */
  index?: boolean;
}

/**
 * Per-page metadata: localized title/description, canonical URL, hreflang
 * alternates and Open Graph / Twitter cards.
 *
 * No rating, award, review count or price range is ever emitted — none of that
 * is present in the supplied content, and inventing it would be a lie to both
 * guests and crawlers.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  index = true,
}: PageMetadataOptions): Metadata {
  const dict = getDictionary(locale);
  const url = absoluteUrl(localePath(locale, path));

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale,
      url,
      title: `${title} | ${dict.siteName}`,
      description,
      siteName: dict.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${dict.siteName}`,
      description,
    },
  };
}
