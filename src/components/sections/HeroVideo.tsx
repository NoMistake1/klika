"use client";

import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media-query";

/** Matches Tailwind's `md` — below it the portrait mobile media is used. */
const MOBILE_QUERY = "(max-width: 767px)";

const VIDEO_DESKTOP = "/video/video-loop-desktop-optimized.mp4";
const VIDEO_MOBILE = "/video/video-loop-mobile-optimized.mp4";
const POSTER_DESKTOP = { src: "/images/hero/fallback-desktop.webp", width: 1535, height: 1025 };
const POSTER_MOBILE = { src: "/images/hero/fallback-mobile.webp", width: 1440, height: 1796 };

/**
 * Background video for the hero, art-directed for phone and desktop.
 *
 * The poster is the real above-the-fold asset. It is served through a
 * `<picture>` built with `getImageProps` — the documented art-direction
 * pattern — so a phone downloads only the portrait fallback and a desktop only
 * the landscape one, never both, while still getting Next's optimized URLs.
 *
 * The video mounts client-side only (the server assumes reduced motion), and
 * its source is chosen by the same viewport query, so the desktop loop is
 * never fetched on a phone. Only the *-optimized.mp4 files are referenced
 * anywhere; the raw exports stay in /public/video purely as backups.
 *
 * Every failure mode — missing file, blocked autoplay, unsupported codec,
 * reduced motion, data saver — simply leaves the poster in place. Nothing is
 * lost but the movement.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();
  // Assume mobile until the client says otherwise: the cheaper wrong guess.
  const isMobile = useMediaQuery(MOBILE_QUERY, true);

  const videoEnabled = !prefersReducedMotion;
  const videoSrc = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP;
  const posterSrc = isMobile ? POSTER_MOBILE.src : POSTER_DESKTOP.src;

  useEffect(() => {
    if (!videoEnabled) return;
    const video = videoRef.current;
    if (!video) return;

    // Autoplay can reject (power saving, data saver, iOS low-power mode).
    // Treat it as a non-event: the poster is already correct.
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => setPlaying(false));
    }
  }, [videoEnabled, videoSrc]);

  // Art-directed poster. Shared props keep both variants identical apart
  // from the artwork itself.
  const common = { alt: "", sizes: "100vw", quality: 80 } as const;
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, ...POSTER_MOBILE });
  const {
    props: { srcSet: desktopSrcSet, ...desktopRest },
  } = getImageProps({ ...common, ...POSTER_DESKTOP, priority: true });

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      <picture>
        <source media={MOBILE_QUERY} srcSet={mobileSrcSet} sizes="100vw" />
        {/* Decorative background: the hero's meaning is carried by the
            heading beside it, so the poster is intentionally alt="". */}
        <img
          {...desktopRest}
          srcSet={desktopSrcSet}
          alt=""
          // Explicit: getImageProps does not forward priority's fetch hint.
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>

      {videoEnabled ? (
        <video
          ref={videoRef}
          // key remounts the element when the viewport class changes, so the
          // browser never keeps buffering the wrong file.
          key={videoSrc}
          poster={posterSrc}
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
          <source src={videoSrc} type="video/mp4" />
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
