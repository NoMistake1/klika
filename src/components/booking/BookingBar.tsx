"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { bookStayHref } from "@/content/navigation";
import { validateStay, type StayErrors } from "@/lib/booking-validation";
import { addDays, cn, todayIso } from "@/lib/utils";

/**
 * Hero booking bar.
 *
 * Collects dates and guests, then hands off to the booking prototype via query
 * parameters. It reserves nothing and checks no availability — it is a way into
 * the enquiry, not a transaction.
 */
export function BookingBar({
  locale,
  dict,
  className,
}: {
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const router = useRouter();
  const today = todayIso();

  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(2);
  const [errors, setErrors] = useState<StayErrors>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateStay({ arrival, departure, guests }, dict);
    setErrors(result);
    if (Object.keys(result).length > 0) return;

    const query = new URLSearchParams({
      arrival,
      departure,
      guests: String(guests),
    });
    router.push(`${localePath(locale, bookStayHref)}?${query.toString()}`);
  }

  const errorList = Object.values(errors).filter(Boolean);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label={dict.bookingBar.title}
      className={cn(
        "rounded-[3px] border border-cream/25 bg-navy/70 p-3 backdrop-blur-md sm:p-4",
        className,
      )}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end">
        <BarField
          id="booking-bar-arrival"
          label={dict.bookingBar.arrival}
          error={errors.arrival}
        >
          <input
            id="booking-bar-arrival"
            type="date"
            value={arrival}
            min={today}
            required
            autoComplete="off"
            onChange={(event) => setArrival(event.target.value)}
            aria-invalid={errors.arrival ? true : undefined}
            aria-describedby={errors.arrival ? "booking-bar-arrival-error" : undefined}
            className={inputClasses(Boolean(errors.arrival))}
          />
        </BarField>

        <BarField
          id="booking-bar-departure"
          label={dict.bookingBar.departure}
          error={errors.departure}
        >
          <input
            id="booking-bar-departure"
            type="date"
            value={departure}
            // Departure can never precede arrival; the picker enforces it too.
            min={arrival ? addDays(arrival, 1) : addDays(today, 1)}
            required
            autoComplete="off"
            onChange={(event) => setDeparture(event.target.value)}
            aria-invalid={errors.departure ? true : undefined}
            aria-describedby={errors.departure ? "booking-bar-departure-error" : undefined}
            className={inputClasses(Boolean(errors.departure))}
          />
        </BarField>

        <BarField
          id="booking-bar-guests"
          label={dict.bookingBar.guests}
          error={errors.guests}
        >
          <input
            id="booking-bar-guests"
            type="number"
            inputMode="numeric"
            value={guests}
            min={1}
            max={12}
            step={1}
            required
            onChange={(event) => setGuests(Number(event.target.value))}
            aria-invalid={errors.guests ? true : undefined}
            aria-describedby={errors.guests ? "booking-bar-guests-error" : undefined}
            className={cn(inputClasses(Boolean(errors.guests)), "lg:w-24")}
          />
        </BarField>

        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] bg-cream px-6 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-warm-white"
        >
          {dict.bookingBar.submit}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>

      {/* Announced together after a rejected submit; individual messages sit
          under their own field for sighted users. */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {errorList.length > 0 ? `${dict.validation.summaryTitle}. ${errorList.join(". ")}` : ""}
      </div>
    </form>
  );
}

function inputClasses(hasError: boolean): string {
  return cn(
    "min-h-11 w-full rounded-[2px] border bg-navy/40 px-3 py-2 text-sm text-cream",
    "[color-scheme:dark] transition-colors",
    "focus:outline-none focus:ring-0",
    hasError ? "border-terracotta" : "border-cream/30 hover:border-cream/60 focus:border-cream",
  );
}

function BarField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium tracking-wide text-cream/70">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-terracotta">
          {error}
        </p>
      ) : null}
    </div>
  );
}
