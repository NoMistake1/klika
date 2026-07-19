"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Nominal time for the progress meter to travel 0 → 100. */
const PROGRESS_MS = 2200;
/** How long the complete (100) state holds before the overlay fades. */
const HOLD_MS = 260;
/** The overlay fade-out duration; matches the CSS transition below. */
const FADE_MS = 600;
/** Hard cap: the intro can never trap the page, whatever fails to load. */
const SAFETY_MS = 5000;

/** The real above-the-fold hero posters — progress tracks whichever loads. */
const POSTER_DESKTOP = "/images/hero/fallback-desktop.webp";
const POSTER_MOBILE = "/images/hero/fallback-mobile.webp";

/**
 * First-visit intro on the brand blue (#AED3FA): the real navy Klika lockup
 * emerges from small, a restrained 0–100 progress counter runs beneath it, and
 * once it completes the overlay fades to reveal the already-playing hero video.
 *
 * The sequence is component-driven and deterministic:
 * - The logo renders hidden and small first (opacity 0, scale 0.72, +8px), and
 *   only after the first paint does a rAF flip it to its resting state, so the
 *   ease never plays from a full-opacity frame and there is no pop.
 * - Progress is a time-based easeOut advanced by requestAnimationFrame, capped
 *   just below 100 until the hero poster for this viewport has actually loaded,
 *   so it responds to readiness and never lands on a blank hero. A safety timer
 *   guarantees completion if the poster or rAF ever stalls.
 * - At 100 the state holds briefly, then the overlay fades over ~600ms (kept
 *   visible by the CSS `leaving` rule) before the component unmounts.
 *
 * Visibility is decided before first paint by `IntroGate`, not React state: the
 * markup is always server-rendered and hidden by CSS until the inline gate
 * stamps data-intro="show". Shown once per session; skipped entirely under
 * prefers-reduced-motion and without JavaScript.
 */
export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [logoIn, setLogoIn] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);
  const posterReady = useRef(false);

  // Mount: run the sequence only for a genuine first visit; otherwise unmount.
  useEffect(() => {
    if (document.documentElement.dataset.intro !== "show") {
      const skip = window.setTimeout(() => setRemoved(true), 0);
      return () => window.clearTimeout(skip);
    }

    // Flip the logo to its resting state only after the hidden/small state has
    // painted (double rAF), with a timer fallback if rAF is throttled.
    const paint = requestAnimationFrame(() =>
      requestAnimationFrame(() => setLogoIn(true)),
    );
    const logoFallback = window.setTimeout(() => setLogoIn(true), 220);

    // Preload the correct hero poster; mark ready on load or error.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const poster = new window.Image();
    const onPoster = () => {
      posterReady.current = true;
    };
    poster.onload = onPoster;
    poster.onerror = onPoster;
    poster.src = isMobile ? POSTER_MOBILE : POSTER_DESKTOP;
    if (poster.complete) onPoster();

    // Smooth progress: easeOut over PROGRESS_MS, held below 100 until the poster
    // is ready so the number tracks real readiness rather than only the clock.
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / PROGRESS_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      const target = posterReady.current ? eased * 100 : Math.min(eased * 100, 90);
      setProgress((prev) => Math.max(prev, Math.round(target)));
      if (target >= 100 && posterReady.current) return;
      frame = requestAnimationFrame(tick);
    });

    // Safety: guarantee completion even if the poster or rAF never resolves.
    const safety = window.setTimeout(() => {
      posterReady.current = true;
      setLogoIn(true);
      setProgress(100);
    }, SAFETY_MS);

    return () => {
      cancelAnimationFrame(paint);
      cancelAnimationFrame(frame);
      window.clearTimeout(logoFallback);
      window.clearTimeout(safety);
      poster.onload = null;
      poster.onerror = null;
    };
  }, []);

  // Once progress reaches 100, hold briefly then begin the fade. Setting
  // data-intro="leaving" both keeps the overlay displayed (CSS) through the fade
  // and signals the hero, whose video is already playing underneath.
  useEffect(() => {
    if (removed || leaving || progress < 100) return;
    const timer = window.setTimeout(() => {
      setLeaving(true);
      document.documentElement.dataset.intro = "leaving";
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [progress, leaving, removed]);

  // After the fade completes, unmount and hand the page to the hero.
  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => {
      setRemoved(true);
      document.documentElement.dataset.intro = "done";
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      data-leaving={leaving}
      className={cn(
        // bg-blue is the authoritative #AED3FA brand token.
        "intro-screen fixed inset-0 z-[100] flex-col items-center justify-center bg-blue",
        "transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        "data-[leaving=true]:pointer-events-none data-[leaving=true]:opacity-0",
      )}
    >
      <div
        className={cn(
          "px-10 will-change-[opacity,transform]",
          // Premium ease-out; ~1s glide from small/low to resting.
          "transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          logoIn
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.72] opacity-0",
        )}
      >
        <Logo
          variant="fullOriginal"
          height={110}
          priority
          onLoad={() => setLogoIn(true)}
          className="h-auto w-56 sm:w-72"
        />
      </div>

      {/* Progress — a restrained number over a thin line, below the logo. */}
      <div className="mt-10 flex w-40 flex-col items-center gap-2.5 sm:w-48">
        <span className="text-sm font-semibold tracking-[0.25em] text-navy/55 tabular-nums">
          {progress}
        </span>
        <span className="relative block h-px w-full overflow-hidden bg-navy/15">
          <span
            className="absolute inset-y-0 left-0 bg-navy/55"
            style={{ width: `${progress}%` }}
          />
        </span>
      </div>
    </div>
  );
}

/**
 * Decides — before the browser paints — whether the intro should appear, by
 * stamping `data-intro` on <html>. The CSS in globals.css keeps the overlay
 * hidden unless it reads "show".
 *
 * Doing this in an inline script rather than in React is what avoids both a
 * flash of content before the overlay and a flash of overlay for a returning
 * visitor. If JavaScript is off the attribute is never set, so the overlay
 * stays hidden and the site is simply usable — which is the point.
 */
export function IntroGate() {
  // Also stamps `js` on <html> so the reveal-on-scroll utility can hide content
  // only when JavaScript is running (progressive enhancement — see globals.css).
  const script = `try{var d=document.documentElement;d.classList.add('js');
if(sessionStorage.getItem('klika:intro-shown')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='skip'}
else{sessionStorage.setItem('klika:intro-shown','1');d.dataset.intro='show'}}catch(e){document.documentElement.classList.add('js');document.documentElement.dataset.intro='skip'}`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
