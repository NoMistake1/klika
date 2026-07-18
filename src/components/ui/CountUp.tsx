"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/** Fast, then settling — a count that arrives quickly but lands softly. */
const DURATION_MS = 1100;

/**
 * Counts from 0 up to `value` once the element scrolls into view, then never
 * again. The final value is what renders on the server and without JavaScript,
 * so the figure is always present; the animation is pure enhancement.
 *
 * The section this is used in sits below the fold, so the one-time reset to 0
 * (which arms the animation) happens off-screen and is never seen — the guest
 * only ever watches 0 → value as they arrive at it.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // No animation possible or wanted: the value already renders (it is the
    // initial state), so there is nothing to do.
    if (reducedMotion || typeof IntersectionObserver === "undefined") return;

    // Arm to 0 on the next frame — off-screen, so it is never seen — then count
    // up when the row scrolls into view. Doing it in a rAF (not synchronously
    // in the effect body) keeps state updates out of render.
    let frame = requestAnimationFrame(() => setDisplay(0));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();

          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min(1, (now - start) / DURATION_MS);
            // easeOutCubic: quick rise, gentle finish.
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
