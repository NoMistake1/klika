"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Users } from "lucide-react";
import type { Room } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { interpolate } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { bookStayHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { Price } from "@/components/ui/MenuBadges";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

/**
 * Featured rooms carousel, built from scratch — no carousel dependency.
 *
 * Layout: the photograph and its controls are one unit. The dots and arrows
 * sit in a single compact row directly under the image on every viewport, so
 * on a phone the pagination is where the thumb already is instead of below
 * the description and buttons.
 *
 * Autoplay is a courtesy that yields to the guest: it runs only while the
 * carousel is actually in the viewport, and stops on hover, on focus anywhere
 * inside, while the tab is hidden, after any manual interaction, and entirely
 * under prefers-reduced-motion. The explicit pause control exists because
 * auto-moving content that cannot be stopped is an accessibility failure
 * (WCAG 2.2.2).
 *
 * Only the active image and its two neighbours are mounted, so five slides do
 * not mean five downloads on page load — the browser cache makes remounting a
 * previously seen slide free.
 */
export function RoomSlider({
  rooms,
  locale,
  dict,
}: {
  rooms: readonly Room[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const reducedMotion = usePrefersReducedMotion();
  const count = rooms.length;

  const goTo = useCallback((next: number) => setIndex((next + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  // Pause while the tab is in the background — animating off-screen is pure
  // battery waste.
  useEffect(() => {
    function onVisibilityChange() {
      setPaused(document.visibilityState === "hidden");
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Autoplay begins when the carousel enters the viewport and stops when it
  // leaves — advancing slides nobody can see helps no one.
  useEffect(() => {
    const region = regionRef.current;
    if (!region || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.35 },
    );
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  const autoplayActive = !reducedMotion && !paused && !userPaused && inView && count > 1;

  useEffect(() => {
    if (!autoplayActive) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [autoplayActive, next]);

  function interact(action: () => void) {
    // Any manual step ends automatic progression for good.
    setUserPaused(true);
    action();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      interact(previous);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      interact(next);
    }
  }

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: React.TouchEvent) {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined) return;

    const delta = end - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    interact(delta < 0 ? next : previous);
  }

  /** Wrap-aware distance from the active slide. */
  function distance(slideIndex: number): number {
    const raw = Math.abs(slideIndex - index);
    return Math.min(raw, count - raw);
  }

  if (count === 0) return null;

  const controlButton =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-current/20 transition-colors hover:border-current/60";

  return (
    <div
      ref={regionRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={dict.rooms.title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
      }}
      onKeyDown={onKeyDown}
      className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12"
    >
      {/* Photograph + controls: one unit, controls directly under the image. */}
      <div className="lg:col-span-7">
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="card-float relative aspect-[4/3] overflow-hidden bg-blue"
        >
          {rooms.map((room, slideIndex) => {
            const isActive = slideIndex === index;
            // Active image plus its neighbours; the rest stay unmounted.
            if (distance(slideIndex) > 1) return null;

            return (
              <div
                key={room.id}
                aria-hidden={!isActive}
                className={cn(
                  "absolute inset-0",
                  isActive ? "animate-cross-fade" : "pointer-events-none opacity-0",
                )}
              >
                <SafeImage
                  image={room.image}
                  locale={locale}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  // The first slide is the only one worth eager-loading.
                  priority={slideIndex === 0}
                />
              </div>
            );
          })}
        </div>

        {/* Controls row: arrows left, dots centred, pause right. Compact by
            design so it never wraps, even at 375px. */}
        <div className="mt-3 flex items-center gap-1">
          <button type="button" onClick={() => interact(previous)} className={controlButton}>
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="sr-only">{dict.a11y.previous}</span>
          </button>
          <button type="button" onClick={() => interact(next)} className={controlButton}>
            <ArrowRight aria-hidden="true" className="size-4" />
            <span className="sr-only">{dict.a11y.next}</span>
          </button>

          <div className="flex flex-1 items-center justify-center">
            {rooms.map((room, dotIndex) => (
              <button
                key={room.id}
                type="button"
                onClick={() => interact(() => goTo(dotIndex))}
                aria-current={dotIndex === index ? "true" : undefined}
                className="inline-flex size-8 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    dotIndex === index
                      ? "w-6 bg-accent"
                      : "w-1.5 bg-current opacity-30",
                  )}
                />
                <span className="sr-only">
                  {interpolate(dict.a11y.goToSlide, { index: dotIndex + 1 })}
                </span>
              </button>
            ))}
          </div>

          {!reducedMotion && count > 1 ? (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-pressed={userPaused}
              className={controlButton}
            >
              {userPaused ? (
                <Play aria-hidden="true" className="size-4" />
              ) : (
                <Pause aria-hidden="true" className="size-4" />
              )}
              <span className="sr-only">
                {userPaused ? dict.a11y.playSlider : dict.a11y.pauseSlider}
              </span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Room details. Inactive slides stay mounted but inert, so switching is
          instant and a keyboard user can never tab into hidden content. */}
      <div className="relative lg:col-span-5">
        {rooms.map((room, slideIndex) => {
          const isActive = slideIndex === index;

          return (
            <div
              key={room.id}
              inert={!isActive}
              aria-hidden={!isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={interpolate(dict.a11y.slideOf, {
                current: slideIndex + 1,
                total: count,
              })}
              className={cn(
                isActive
                  ? "animate-fade-in"
                  : "pointer-events-none absolute inset-0 opacity-0",
              )}
            >
              <h3 className="text-heading font-semibold text-balance">{room.name[locale]}</h3>
              <p className="mt-4 leading-relaxed opacity-75">{room.description[locale]}</p>

              <dl className="mt-6 space-y-3 text-sm">
                {room.capacity !== null ? (
                  <div className="flex items-center gap-2">
                    <dt className="flex items-center gap-2 opacity-60">
                      <Users aria-hidden="true" className="size-4" />
                      {dict.rooms.capacity}
                    </dt>
                    <dd>{interpolate(dict.rooms.upToGuests, { count: room.capacity })}</dd>
                  </div>
                ) : null}

                <div>
                  <dt className="sr-only">{dict.rooms.features}</dt>
                  <dd className="flex flex-wrap gap-x-3 gap-y-1.5 opacity-75">
                    {room.features[locale].map((feature) => (
                      <span key={feature} className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="size-1 rounded-full bg-current opacity-40"
                        />
                        {feature}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex items-baseline gap-2 border-t border-current/10 pt-5">
                {room.priceCzk !== null ? (
                  <>
                    <span className="text-sm opacity-60">{dict.rooms.from}</span>
                    <Price
                      amountCzk={room.priceCzk}
                      locale={locale}
                      hasSeasonalException={room.hasSeasonalException}
                      className="text-2xl"
                    />
                    <span className="text-sm opacity-60">{dict.rooms.perNight}</span>
                  </>
                ) : (
                  <Price
                    amountCzk={null}
                    locale={locale}
                    fallback={dict.rooms.priceOnRequest}
                    className="text-base"
                  />
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={localePath(locale, bookStayHref)}>{dict.actions.bookStay}</Button>
                <Button href={localePath(locale, "/hotel/rooms")} variant="outline">
                  {dict.actions.detail}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Announces slide changes without moving focus. */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {interpolate(dict.a11y.slideOf, { current: index + 1, total: count })}
        {": "}
        {rooms[index]?.name[locale]}
      </div>
    </div>
  );
}
