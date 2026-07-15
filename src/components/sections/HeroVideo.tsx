"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/**
 * Background video for the hero.
 *
 * The poster image is the real above-the-fold asset: it is priority-loaded and
 * always painted, and the video fades in on top only once it can actually play.
 * That means first paint never waits on video bytes, and every failure mode —
 * missing file, blocked autoplay, codec unsupported, reduced-motion, data
 * saver — simply leaves the poster in place. Nothing is lost but the movement.
 *
 * No audio track, no controls, and `preload="metadata"` so we fetch headers
 * rather than the whole file up front.
 */
export function HeroVideo({
  poster,
  posterAlt,
  sources,
}: {
  poster: string;
  posterAlt: string;
  /** Ordered by preference; the browser picks the first type it supports. */
  sources: ReadonlyArray<{ src: string; type: string }>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // A looping background video is exactly the ambient movement this setting
  // exists to suppress, so the video is never mounted when it is on.
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = !prefersReducedMotion && sources.length > 0;

  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;

    // Autoplay can reject (power saving, data saver, iOS low-power mode).
    // Treat it as a non-event: the poster is already correct.
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => setPlaying(false));
    }
  }, [enabled]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        quality={80}
        className="object-cover"
      />

      {enabled ? (
        <video
          ref={videoRef}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      ) : null}

      {/* Readability scrim. Kept subtle and biased to the bottom-left, where
          the headline sits, rather than flattening the whole frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/45 to-navy/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent"
      />
    </div>
  );
}
