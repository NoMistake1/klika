"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** The overlay fade-out duration; must match the CSS transition below. */
const FADE_MS = 700;
/** Floor the intro stays up, so the logo's ease-in reads as intentional. */
const MIN_VISIBLE_MS = 1200;
/** Hard cap: the intro can never trap the page, whatever fails to load. */
const SAFETY_MS = 4000;
/** Fallback for the logo fade-in if next/image's onLoad never fires. */
const LOGO_FALLBACK_MS = 700;

/** The real above-the-fold hero posters, so we reveal only once one is ready. */
const POSTER_DESKTOP = "/images/hero/fallback-desktop.webp";
const POSTER_MOBILE = "/images/hero/fallback-mobile.webp";

/**
 * First-visit intro: the real Klika lockup easing in on the brand blue
 * (#AED3FA), navy artwork, while the hero media loads underneath.
 *
 * The motion is deliberately calm and Apple-like: the lockup starts invisible
 * and a touch small (opacity 0, scale 0.88) and glides to full size on a long
 * ease-out — but only once the artwork has actually decoded, so it never pops
 * in half-finished. The overlay then fades away only once three things are
 * true — the logo is in, the hero poster is ready, and a minimum on-screen time
 * has passed — revealing the already-playing hero video. A safety cap guarantees
 * it always leaves.
 *
 * Visibility is decided before first paint by `IntroGate`, not by React state:
 * an overlay that appears a frame after the page paints would be worse than
 * none. The markup is always server-rendered and kept hidden by CSS until the
 * inline gate stamps data-intro="show".
 *
 * Rules it follows deliberately:
 * - shown once per browser session, never on internal navigation
 * - the hero video autoplays underneath from mount, so there is no empty flash
 * - skipped entirely under prefers-reduced-motion (CSS gate) and without JS
 */
export function LoadingScreen() {
  const [logoIn, setLogoIn] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  // Mount: only run for a genuine first visit (the gate set data-intro="show").
  // Otherwise unmount immediately — nothing should animate for returning
  // visitors or under reduced motion, where the overlay is already hidden.
  useEffect(() => {
    if (document.documentElement.dataset.intro !== "show") {
      // Nothing to show (returning visitor / reduced motion): unmount. Deferred
      // to a callback so it is not a synchronous setState during the effect.
      const skip = window.setTimeout(() => setRemoved(true), 0);
      return () => window.clearTimeout(skip);
    }

    const minTimer = window.setTimeout(() => setMinElapsed(true), MIN_VISIBLE_MS);
    // If onLoad is missed (cache quirks), still fade the logo in.
    const logoTimer = window.setTimeout(() => setLogoIn(true), LOGO_FALLBACK_MS);
    // Whatever happens, don't hold the page hostage.
    const safety = window.setTimeout(() => {
      setLogoIn(true);
      setMediaReady(true);
      setMinElapsed(true);
    }, SAFETY_MS);

    // Wait on the real hero poster for this viewport, not a proxy timer.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const poster = new window.Image();
    const onPoster = () => setMediaReady(true);
    poster.onload = onPoster;
    poster.onerror = onPoster;
    poster.src = isMobile ? POSTER_MOBILE : POSTER_DESKTOP;
    if (poster.complete) onPoster();

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(logoTimer);
      window.clearTimeout(safety);
      poster.onload = null;
      poster.onerror = null;
    };
  }, []);

  // Begin the fade-out once the logo is in, the hero poster is ready and the
  // minimum on-screen time has elapsed. Scheduled via a timer (not
  // requestAnimationFrame, which pauses while the tab is backgrounded) so the
  // hand-off still completes if the visitor tabs away mid-intro, and so the
  // state change runs from a callback rather than synchronously in render.
  useEffect(() => {
    if (removed || leaving) return;
    if (!(logoIn && mediaReady && minElapsed)) return;
    const timer = window.setTimeout(() => {
      setLeaving(true);
      document.documentElement.dataset.intro = "leaving";
    }, 0);
    return () => window.clearTimeout(timer);
  }, [logoIn, mediaReady, minElapsed, leaving, removed]);

  // After the fade completes, unmount and let the hero take over.
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
        "intro-screen fixed inset-0 z-[100] items-center justify-center bg-blue",
        "transition-opacity duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        "data-[leaving=true]:pointer-events-none data-[leaving=true]:opacity-0",
      )}
    >
      <div
        className={cn(
          "px-10 will-change-[opacity,transform]",
          // The premium ease-out (easeOutExpo-like): a long, decelerating glide.
          "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          logoIn ? "scale-100 opacity-100" : "scale-[0.88] opacity-0",
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
