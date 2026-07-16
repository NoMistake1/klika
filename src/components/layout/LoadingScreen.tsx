"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Hard ceiling — the intro can never hold the page hostage. */
const MAX_DURATION_MS = 1600;

/**
 * First-visit intro: the real Klika lockup breathing gently on the brand blue
 * (#AED3FA) while the critical hero media loads underneath.
 *
 * The original PNG artwork is used here on purpose — this is the one place the
 * logo renders large — still resized through next/image, with `priority` so it
 * is fetched before anything below it.
 *
 * Visibility is decided before first paint by `IntroGate`, not by React state:
 * an overlay that appears a frame after the page paints would be worse than
 * none. This component only handles its own exit, which happens as soon as the
 * window load event fires — the poster (a priority image) is loaded by then —
 * capped by a hard timeout. The hero video autoplays underneath and is already
 * playing or ready when the fade completes.
 *
 * Rules it follows deliberately:
 * - shown once per browser session, never on internal navigation
 * - no artificial delay
 * - skipped entirely under prefers-reduced-motion (CSS gate) and without JS
 */
export function LoadingScreen() {
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let hideTimer: number;

    // Every setState below runs from a callback, never synchronously in the
    // effect body, so no cascading render is triggered.
    const dismiss = () => {
      setLeaving(true);
      document.documentElement.dataset.intro = "done";
      hideTimer = window.setTimeout(() => setRemoved(true), 600);
    };

    const readyTimer = window.setTimeout(dismiss, 0);
    if (document.readyState !== "complete") {
      window.clearTimeout(readyTimer);
      window.addEventListener("load", dismiss, { once: true });
    }

    const maxTimer = window.setTimeout(dismiss, MAX_DURATION_MS);

    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(maxTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("load", dismiss);
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
        "transition-opacity duration-600 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
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
  const script = `try{var d=document.documentElement;
if(sessionStorage.getItem('klika:intro-shown')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='skip'}
else{sessionStorage.setItem('klika:intro-shown','1');d.dataset.intro='show'}}catch(e){document.documentElement.dataset.intro='skip'}`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
