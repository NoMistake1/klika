import type { MetadataRoute } from "next";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";

/**
 * Every page in every language, with hreflang alternates so crawlers can pair
 * the three versions of each page.
 */
const routes: ReadonlyArray<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/hotel", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hotel/rooms", priority: 0.8, changeFrequency: "monthly" },
  { path: "/hotel/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/hotel/booking", priority: 0.7, changeFrequency: "monthly" },
  { path: "/restaurant", priority: 0.9, changeFrequency: "monthly" },
  { path: "/restaurant/menu", priority: 0.8, changeFrequency: "monthly" },
  // The daily menu is the one page that genuinely changes every day.
  { path: "/restaurant/daily-menu", priority: 0.8, changeFrequency: "daily" },
  { path: "/restaurant/booking", priority: 0.7, changeFrequency: "monthly" },
  { path: "/restaurant/catering", priority: 0.6, changeFrequency: "yearly" },
  { path: "/location", priority: 0.7, changeFrequency: "yearly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, route.path)),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alternate) => [
            alternate,
            absoluteUrl(localePath(alternate, route.path)),
          ]),
        ),
      },
    })),
  );
}
