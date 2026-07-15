import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments out of the index; only the canonical domain is
  // allowed to be crawled.
  const isProduction = siteUrl === "https://www.hotelklika.cz";

  return {
    rules: isProduction
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
