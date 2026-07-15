"use client";

import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { coordinates, mapEmbedUrl, mapLink } from "@/content/contact";
import { Rooftops, Waves } from "@/components/illustrations";
import { cn } from "@/lib/utils";

/**
 * Map that costs nothing until it is wanted.
 *
 * A third-party map iframe pulls in scripts, tiles and cookies on every page
 * load, for a widget most visitors never touch. So the default state is a
 * lightweight local illustration; the real embed mounts only on click.
 *
 * That also keeps the privacy default right — no request reaches OpenStreetMap
 * until the guest asks for it. The static "open in maps" link always works,
 * including without JavaScript.
 *
 * FUTURE: to swap in another provider (Google Maps, Mapbox), replace the
 * iframe src below. Everything else — the placeholder, the deferral, the
 * attribution — stays as is.
 */
export function LazyMap({
  dict,
  className,
  aspect = "aspect-[16/10]",
}: {
  dict: Dictionary;
  className?: string;
  aspect?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={cn("relative overflow-hidden bg-blue-light", aspect, className)}>
      {loaded ? (
        <iframe
          src={mapEmbedUrl}
          title={dict.locationPreview.mapPlaceholderTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-navy transition-colors hover:bg-blue/30"
        >
          {/* Local, decorative stand-in — no network request. */}
          <Rooftops
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-24 w-[85%] text-navy opacity-15"
          />
          <Waves
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-8 w-[85%] text-navy opacity-25"
          />

          <span className="relative flex size-12 items-center justify-center rounded-full bg-navy text-blue-light transition-transform duration-300 group-hover:scale-110">
            <MapPin aria-hidden="true" className="size-5" />
          </span>
          <span className="relative text-center">
            <span className="block text-sm font-semibold">
              {dict.locationPreview.loadMap}
            </span>
            <span className="mt-1 block max-w-xs px-6 text-xs opacity-60">
              {dict.locationPreview.mapPlaceholderText}
            </span>
          </span>
        </button>
      )}

      <figcaption className="absolute right-0 bottom-0 left-0 flex items-center justify-between gap-3 bg-navy/85 px-3 py-2 text-[0.65rem] text-cream/80 backdrop-blur-sm">
        <span>
          {loaded ? dict.locationPreview.mapAttribution : coordinates.display}
        </span>
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex shrink-0 items-center gap-1"
        >
          {dict.locationPreview.openInMaps}
          <ExternalLink aria-hidden="true" className="size-3" />
          <span className="sr-only">({dict.a11y.openInNewTab})</span>
        </a>
      </figcaption>
    </figure>
  );
}
