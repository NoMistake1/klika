import { ExternalLink } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { mapEmbedUrl, mapLink } from "@/content/contact";
import { cn } from "@/lib/utils";

/**
 * The Google Maps embed, mounted immediately — no click-to-load placeholder.
 *
 * Server component: the iframe is plain HTML, so the map ships no client
 * JavaScript of ours at all. `loading` defaults to eager because every current
 * placement (homepage preview, contact, location) is meant to be usable
 * without interaction; pass "lazy" if one ever moves far below the fold.
 *
 * The frame is bounded (relative + absolute inset-0 + overflow-hidden), so the
 * iframe can never contribute horizontal overflow to the page.
 *
 * The hotel and the restaurant share one address, so a single embed URL serves
 * every map on the site — never more than one per page.
 */
export function MapEmbed({
  dict,
  className,
  aspect = "aspect-[16/10]",
  loading = "eager",
}: {
  dict: Dictionary;
  className?: string;
  aspect?: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <figure
      className={cn(
        // Rounded and lifted to match the floating card surfaces elsewhere.
        "card-float relative overflow-hidden bg-blue-light",
        aspect,
        className,
      )}
    >
      <iframe
        src={mapEmbedUrl}
        title={dict.locationPreview.mapPlaceholderTitle}
        loading={loading}
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />

      <figcaption className="absolute right-0 bottom-0 left-0 flex items-center justify-between gap-3 bg-navy/85 px-4 py-2.5 text-[0.7rem] text-cream/80 backdrop-blur-sm">
        <span className="truncate">{dict.locationPreview.mapAttribution}</span>
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex shrink-0 items-center gap-1.5"
        >
          {dict.locationPreview.openInMaps}
          <ExternalLink aria-hidden="true" className="size-3" />
          <span className="sr-only">({dict.a11y.openInNewTab})</span>
        </a>
      </figcaption>
    </figure>
  );
}
