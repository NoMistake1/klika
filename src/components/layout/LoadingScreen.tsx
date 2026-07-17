"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** How long the intro holds before it begins fading out. */
const HOLD_MS = 2000;
/** The fade-out duration; must match the CSS transition below. */
const FADE_MS = 700;

/**
 * First-visit intro: the real Klika lockup fading in on the brand blue
 * (#AED3FA), navy artwork, while the hero media loads underneath.
 *
 * The original PNG artwork is used here on purpose — this is the one place the
 * logo renders large — still resized through next/image, with `priority` so it
 * is fetched first.
 *
 * Visibility is decided before first paint by `IntroGate`, not by React state:
 * an overlay that appears a frame after the page paints would be worse than
 * none. This component only handles its own exit: it holds for ~2s (long
 * enough to read as intentional and for the hero poster/video to be ready
 * underneath), then fades out, revealing the already-playing hero video. The
 * hold is a plain timer, so it can never block the page.
 *
 * Rules it follows deliberately:
 * - shown once per browser session, never on internal navigation
 * - the hero video autoplays underneath from mount, so there is no empty flash
 * - skipped entirely under prefers-reduced-motion (CSS gate) and without JS
 */
export function LoadingScreen() {
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Both setState calls run from timer callbacks, never synchronously in the
    // effect body, so no cascading render is triggered.
    const holdTimer = window.setTimeout(() => {
      setLeaving(true);
      // Lets the hero underneath know the handoff has started.
      document.documentElement.dataset.intro = "leaving";
    }, HOLD_MS);

    const removeTimer = window.setTimeout(() => {
      setRemoved(true);
      document.documentElement.dataset.intro = "done";
    }, HOLD_MS + FADE_MS);

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

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
      <div className="intro-logo px-10">
        <Logo variant="fullOriginal" height={120} priority className="h-auto w-64 sm:w-80" />
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
