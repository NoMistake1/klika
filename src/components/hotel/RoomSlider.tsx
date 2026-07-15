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
 * Autoplay is treated as a courtesy that yields to the guest: it stops on
 * hover, on focus anywhere inside, when the tab is hidden, when the user takes
 * manual control, and it never starts at all under prefers-reduced-motion.
 * There is also an explicit pause control, because auto-moving content that
 * cannot be stopped is an accessibility failure (WCAG 2.2.2).
 *
 * Slides are real DOM: inactive ones are `inert` and hidden from AT, so a
 * keyboard user never tabs into an off-screen slide.
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

  const autoplayActive = !reducedMotion && !paused && !userPaused && count > 1;

  useEffect(() => {
    if (!autoplayActive) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [autoplayActive, next]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setUserPaused(true);
      previous();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setUserPaused(true);
      next();
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

    setUserPaused(true);
    if (delta < 0) next();
    else previous();
  }

  if (count === 0) return null;

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
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative"
    >
      {/* Slides */}
      <div className="relative">
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
                "grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12",
                isActive
                  ? "animate-cross-fade"
                  : "pointer-events-none absolute inset-0 opacity-0",
              )}
            >
              {/* The room photograph reads as a print laid on the page — a
                  floating card rather than a full-bleed panel. */}
              <div className="card-float relative aspect-[4/3] overflow-hidden bg-blue lg:col-span-7">
                <SafeImage
                  image={room.image}
                  locale={locale}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  // The first slide is the only one worth eager-loading.
                  priority={slideIndex === 0}
                />
              </div>

              <div className="lg:col-span-5">
                <h3 className="text-heading font-semibold text-balance">
                  {room.name[locale]}
                </h3>
                <p className="mt-4 leading-relaxed opacity-75">{room.description[locale]}</p>

                <dl className="mt-6 space-y-3 text-sm">
                  {room.capacity !== null ? (
                    <div className="flex items-center gap-2">
                      <dt className="flex items-center gap-2 opacity-60">
                        <Users aria-hidden="true" className="size-4" />
                        {dict.rooms.capacity}
                      </dt>
                      <dd>
                        {interpolate(dict.rooms.upToGuests, { count: room.capacity })}
                      </dd>
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
                  <Button href={localePath(locale, bookStayHref)}>
                    {dict.actions.bookStay}
                  </Button>
                  <Button href={localePath(locale, "/hotel/rooms")} variant="outline">
                    {dict.actions.detail}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls.
          Wraps on purpose: the arrows/pause group (~152px) plus six 32px dots
          (~222px) exceed the 350px content width of a 390px phone, and without
          wrapping the dots ran past the viewport edge. */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-4 border-t border-current/10 pt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setUserPaused(true);
              previous();
            }}
            className="inline-flex size-11 items-center justify-center rounded-[2px] border border-current/20 transition-colors hover:border-current/60"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="sr-only">{dict.a11y.previous}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setUserPaused(true);
              next();
            }}
            className="inline-flex size-11 items-center justify-center rounded-[2px] border border-current/20 transition-colors hover:border-current/60"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
            <span className="sr-only">{dict.a11y.next}</span>
          </button>

          {!reducedMotion && count > 1 ? (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              className="ml-1 inline-flex size-11 items-center justify-center rounded-[2px] border border-current/20 transition-colors hover:border-current/60"
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

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {rooms.map((room, dotIndex) => (
            <button
              key={room.id}
              type="button"
              onClick={() => {
                setUserPaused(true);
                goTo(dotIndex);
              }}
              aria-current={dotIndex === index ? "true" : undefined}
              className="inline-flex size-8 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-1 rounded-full transition-all duration-300",
                  dotIndex === index ? "w-6 bg-current" : "w-1.5 bg-current opacity-30",
                )}
              />
              <span className="sr-only">
                {interpolate(dict.a11y.goToSlide, { index: dotIndex + 1 })}
              </span>
            </button>
          ))}
        </div>
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
