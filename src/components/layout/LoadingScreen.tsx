"use client";

import { useEffect, useState } from "react";
import { LogoMonogram } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Hard ceiling — the intro can never hold the page hostage. */
const MAX_DURATION_MS = 1600;

/**
 * Brief intro screen: the Klika mark drawing itself on a light blue field.
 *
 * Visibility is decided before first paint by `IntroGate` below, not by React
 * state — an overlay that appears a frame *after* the page paints would be
 * worse than none at all. This component only handles its own exit.
 *
 * Rules it follows deliberately:
 * - shown once per session, never on internal navigation
 * - no artificial delay; it leaves as soon as the window load event fires
 * - a hard timeout guarantees it goes even if an asset stalls
 * - skipped entirely under prefers-reduced-motion (CSS) and without JS
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
      hideTimer = window.setTimeout(() => setRemoved(true), 500);
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
        "intro-screen fixed inset-0 z-[100] items-center justify-center bg-blue-light",
        "transition-opacity duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        "data-[leaving=true]:pointer-events-none data-[leaving=true]:opacity-0",
      )}
    >
      <span className="h-20 text-navy sm:h-24">
        <LogoMonogram animated />
      </span>
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
