"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { useHydrated } from "@/lib/use-media-query";

/**
 * Persists a booking draft in sessionStorage.
 *
 * sessionStorage — not localStorage — is deliberate: a half-finished enquiry
 * holding someone's name, phone and e-mail should not outlive the browser tab
 * on a shared or public computer.
 *
 * The store is the source of truth and React subscribes to it via
 * `useSyncExternalStore`, rather than copying it into state from an effect.
 * That keeps the server render and hydration consistent without a cascading
 * re-render, and it is what the API exists for — storage really is an external
 * store.
 *
 * Storage can be unavailable (Safari private mode, disabled cookies, quota
 * exceeded). Every access is guarded and falls back to an in-memory map, so
 * the form keeps working; `storageAvailable` then lets the UI warn that the
 * draft will not survive a reload.
 */

/** Fallback when sessionStorage throws, so a draft is never simply lost. */
const memoryStore = new Map<string, string>();

const listeners = new Map<string, Set<() => void>>();

function subscribe(key: string) {
  return (onChange: () => void) => {
    const set = listeners.get(key) ?? new Set();
    set.add(onChange);
    listeners.set(key, set);
    return () => {
      set.delete(onChange);
    };
  };
}

function emit(key: string) {
  for (const listener of listeners.get(key) ?? []) listener();
}

/** Returns a stable string snapshot, which is what useSyncExternalStore needs. */
function readRaw(key: string): string | null {
  try {
    const stored = window.sessionStorage.getItem(key);
    if (stored !== null) return stored;
  } catch {
    // Fall through to the in-memory copy.
  }
  return memoryStore.get(key) ?? null;
}

/** Writes through to storage; reports whether real persistence succeeded. */
function writeRaw(key: string, value: string): boolean {
  memoryStore.set(key, value);
  let persisted = false;
  try {
    window.sessionStorage.setItem(key, value);
    persisted = true;
  } catch {
    persisted = false;
  }
  emit(key);
  return persisted;
}

function clearRaw(key: string): void {
  memoryStore.delete(key);
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Nothing to clean up if storage was never available.
  }
  emit(key);
}

export function useSessionDraft<T extends object>(
  key: string,
  initialValue: T,
): {
  value: T;
  setValue: (update: Partial<T>) => void;
  reset: () => void;
  storageAvailable: boolean;
  hydrated: boolean;
} {
  const [storageAvailable, setStorageAvailable] = useState(true);
  const hydrated = useHydrated();

  const raw = useSyncExternalStore(
    useMemo(() => subscribe(key), [key]),
    useCallback(() => readRaw(key), [key]),
    // The server has no draft; the first client render matches, then React
    // re-renders with the stored value.
    () => null,
  );

  const value = useMemo<T>(() => {
    if (!raw) return initialValue;
    try {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return { ...initialValue, ...(parsed as Partial<T>) };
      }
    } catch {
      // Corrupt draft (hand-edited, truncated): start clean rather than throw.
    }
    return initialValue;
  }, [raw, initialValue]);

  const setValue = useCallback(
    (update: Partial<T>) => {
      const next = { ...value, ...update };
      const persisted = writeRaw(key, JSON.stringify(next));
      // Called from an event handler, so this is not a cascading render.
      if (!persisted) setStorageAvailable(false);
    },
    [key, value],
  );

  const reset = useCallback(() => clearRaw(key), [key]);

  return { value, setValue, reset, storageAvailable, hydrated };
}
