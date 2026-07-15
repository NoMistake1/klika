"use client";

import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { coordinates, mapEmbedUrl, mapLink } from "@/content/contact";
import { Rooftops, Waves } from "@/components/illustrations";
import { cn } from "@/lib/utils";

/**
 * Google Maps embed that costs nothing until it is wanted.
 *
 * The embed pulls in Google's scripts, tiles and cookies on every page load,
 * for a widget most visitors never touch. So the default state is a lightweight
 * local illustration and the real iframe mounts only on click.
 *
 * That also keeps the privacy default right — no request reaches Google until
 * the guest asks for it — and it is why the map never delays the initial
 * render. The "open in maps" link always works, including without JavaScript.
 *
 * The hotel and the restaurant share an address, so both use the same embed.
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
    <figure
      className={cn(
        // Rounded and lifted to match the floating card surfaces elsewhere.
        "card-float relative overflow-hidden bg-blue-light",
        aspect,
        className,
      )}
    >
      {loaded ? (
        <iframe
          src={mapEmbedUrl}
          title={dict.locationPreview.mapPlaceholderTitle}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-navy transition-colors duration-300 hover:bg-blue/30"
        >
          {/* Local, decorative stand-in — no network request. */}
          <Rooftops
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-24 w-[85%] text-navy opacity-15"
          />
          <Waves
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-8 w-[85%] text-navy opacity-25"
          />

          <span className="relative flex size-12 items-center justify-center rounded-full bg-navy text-blue-light shadow-[0_6px_20px_-6px_rgba(11,29,53,0.6)] transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
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

      <figcaption className="absolute right-0 bottom-0 left-0 flex items-center justify-between gap-3 bg-navy/85 px-4 py-2.5 text-[0.7rem] text-cream/80 backdrop-blur-sm">
        <span className="truncate">
          {loaded ? dict.locationPreview.mapAttribution : coordinates.display}
        </span>
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
