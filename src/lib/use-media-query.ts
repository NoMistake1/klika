"use client";

import { useSyncExternalStore } from "react";

/**
 * A media query is an external store, so it is read with `useSyncExternalStore`
 * rather than mirrored into state from an effect. React then handles the
 * server/client difference itself: the server snapshot is used for the initial
 * HTML and hydration, and a re-render follows with the real value — no
 * hydration mismatch and no cascading render.
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type Subscribe = (onChange: () => void) => () => void;

/**
 * One stable subscribe function per query string. A fresh closure on every
 * render would make useSyncExternalStore tear down and resubscribe the
 * matchMedia listener on each render.
 */
const subscribeCache = new Map<string, Subscribe>();

function subscribe(query: string): Subscribe {
  let cached = subscribeCache.get(query);
  if (!cached) {
    cached = (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    };
    subscribeCache.set(query, cached);
  }
  return cached;
}

/**
 * Generic media-query subscription. `serverSnapshot` is what the server and
 * the first client render assume; pick the value whose wrong guess costs
 * least (e.g. assume mobile so a phone never downloads desktop media).
 */
export function useMediaQuery(query: string, serverSnapshot: boolean): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  );
}

/**
 * True when the visitor has asked for reduced motion.
 *
 * The server snapshot is `true` — the conservative default. Anything gated on
 * this (background video, autoplaying carousels) is therefore absent from the
 * server HTML and only appears once the client confirms motion is welcome.
 * Guessing the other way would ship movement to someone who asked for none.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe(REDUCED_MOTION_QUERY),
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );
}

const emptySubscribe = () => () => {};

/**
 * False during server rendering and the first client render, true afterwards.
 * For content that can only be correct once the browser is available.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
