"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { Info, Mail, Phone } from "lucide-react";
import type { Mutable, SeatingZoneId, TableBookingDraft } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { bookingTimeSlots } from "@/content/restaurant";
import { restaurantEmail, restaurantPhone } from "@/content/contact";
import { validateTableBooking, type TableBookingErrors } from "@/lib/booking-validation";
import { useSessionDraft } from "@/lib/use-session-draft";
import { Button } from "@/components/ui/Button";
import {
  SelectField,
  TextAreaField,
  TextField,
  ValidationSummary,
} from "@/components/ui/Field";
import { formatDate, telLink, todayIso } from "@/lib/utils";

const DRAFT_KEY = "klika:table-booking-draft";

const ZONE_OPTIONS: ReadonlyArray<SeatingZoneId | "any"> = [
  "any",
  "restaurant",
  "conservatory",
  "garden",
];

const emptyDraft: TableBookingDraft = {
  date: "",
  time: "",
  guests: 2,
  zone: "any",
  name: "",
  phone: "",
  email: "",
  note: "",
};

/**
 * Table booking prototype.
 *
 * FRONT-END ONLY. Submitting does not send anything and does not reserve a
 * table. It moves to a summary that says so in as many words and hands over
 * the restaurant's real phone and e-mail. There is deliberately no "Reservation
 * confirmed" state — showing one would be a lie that costs a guest their
 * evening.
 *
 * The form also never silently discards what was typed: the draft is kept in
 * sessionStorage, and the summary screen can be edited back into.
 *
 * FUTURE: with a backend, `handleSubmit` posts the `TableBookingDraft` and the
 * summary can become a real pending-request state.
 */
export function TableBookingForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { value: draft, setValue, reset, storageAvailable, hydrated } = useSessionDraft(
    DRAFT_KEY,
    emptyDraft,
  );

  const [errors, setErrors] = useState<TableBookingErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const zoneLabels = useMemo(
    () => ({
      any: dict.restaurantBooking.zones.any,
      restaurant: dict.restaurantBooking.zones.restaurant,
      conservatory: dict.restaurantBooking.zones.conservatory,
      garden: dict.restaurantBooking.zones.garden,
    }),
    [dict],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateTableBooking(
      {
        date: draft.date,
        time: draft.time,
        guests: draft.guests,
        name: draft.name,
        phone: draft.phone,
        email: draft.email,
      },
      dict,
    );
    setErrors(result);
    if (Object.keys(result).length > 0) return;

    // No network request: nothing to send to yet, and a fake one would only
    // teach the guest to expect a confirmation that never comes.
    setSubmitted(true);
    window.requestAnimationFrame(() => summaryRef.current?.focus());
  }

  const update = (patch: Partial<Mutable<TableBookingDraft>>) => setValue(patch);

  if (submitted) {
    return (
      <div
        ref={summaryRef}
        tabIndex={-1}
        className="focus:outline-none"
      >
        <h2 className="text-heading font-semibold">{dict.restaurantBooking.summaryTitle}</h2>

        {/* Never implies the table is held — see the component docblock. */}
        <p className="mt-5 flex gap-3 rounded-md bg-navy p-5 text-sm leading-relaxed font-medium text-cream">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue" />
          {dict.restaurantBooking.notConfirmed}
        </p>

        <dl className="mt-8 divide-y divide-current/10 border-y border-current/10">
          <Row label={dict.restaurantBooking.date}>{formatDate(draft.date, locale)}</Row>
          <Row label={dict.restaurantBooking.time}>{draft.time}</Row>
          <Row label={dict.restaurantBooking.guests}>{draft.guests}</Row>
          <Row label={dict.restaurantBooking.zone}>{zoneLabels[draft.zone]}</Row>
          <Row label={dict.restaurantBooking.name}>{draft.name}</Row>
          <Row label={dict.restaurantBooking.phone}>{draft.phone}</Row>
          <Row label={dict.restaurantBooking.email}>{draft.email}</Row>
          {draft.note.trim() ? (
            <Row label={dict.restaurantBooking.note}>{draft.note}</Row>
          ) : null}
        </dl>

        <p className="mt-8 text-sm opacity-75">{dict.restaurantBooking.contactText}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button href={telLink(restaurantPhone.e164)} size="lg">
            <Phone aria-hidden="true" className="size-4" />
            {dict.actions.callRestaurant}
          </Button>
          <Button
            href={`mailto:${restaurantEmail}?subject=${encodeURIComponent(
              `${dict.restaurantBooking.eyebrow}: ${draft.date} ${draft.time}`,
            )}`}
            variant="outline"
            size="lg"
          >
            <Mail aria-hidden="true" className="size-4" />
            {dict.actions.sendEmail}
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-current/10 pt-6">
          {/* Back to the form with the answers still in place. */}
          <Button onClick={() => setSubmitted(false)} variant="ghost" size="sm">
            {dict.actions.editSelection}
          </Button>
          <Button
            onClick={() => {
              reset();
              setSubmitted(false);
            }}
            variant="ghost"
            size="sm"
          >
            {dict.restaurantBooking.newRequest}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ValidationSummary
        title={dict.validation.summaryTitle}
        errors={Object.values(errors).filter((error): error is string => Boolean(error))}
        className="mb-6"
      />

      {!storageAvailable && hydrated ? (
        <p className="mb-6 flex gap-2 border-l-2 border-sand-ink pl-3 text-xs opacity-70">
          <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-sand-ink" />
          {dict.hotelBooking.storageUnavailable}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          type="date"
          label={dict.restaurantBooking.date}
          value={draft.date}
          min={todayIso()}
          required
          autoComplete="off"
          error={errors.date}
          requiredLabel={dict.a11y.required}
          onChange={(event) => update({ date: event.target.value })}
        />

        <SelectField
          label={dict.restaurantBooking.time}
          value={draft.time}
          required
          error={errors.time}
          requiredLabel={dict.a11y.required}
          onChange={(event) => update({ time: event.target.value })}
        >
          <option value="">—</option>
          {bookingTimeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </SelectField>

        <TextField
          type="number"
          inputMode="numeric"
          label={dict.restaurantBooking.guests}
          value={draft.guests}
          min={1}
          max={12}
          step={1}
          required
          error={errors.guests}
          requiredLabel={dict.a11y.required}
          onChange={(event) => update({ guests: Number(event.target.value) })}
        />

        <SelectField
          label={dict.restaurantBooking.zone}
          value={draft.zone}
          hint={dict.restaurantBooking.zoneHint}
          requiredLabel={dict.a11y.required}
          onChange={(event) =>
            update({ zone: event.target.value as TableBookingDraft["zone"] })
          }
        >
          {ZONE_OPTIONS.map((zone) => (
            <option key={zone} value={zone}>
              {zoneLabels[zone]}
            </option>
          ))}
        </SelectField>

        <TextField
          label={dict.restaurantBooking.name}
          value={draft.name}
          required
          autoComplete="name"
          error={errors.name}
          requiredLabel={dict.a11y.required}
          className="sm:col-span-2"
          onChange={(event) => update({ name: event.target.value })}
        />

        <TextField
          type="tel"
          label={dict.restaurantBooking.phone}
          value={draft.phone}
          required
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
          requiredLabel={dict.a11y.required}
          onChange={(event) => update({ phone: event.target.value })}
        />

        <TextField
          type="email"
          label={dict.restaurantBooking.email}
          value={draft.email}
          required
          autoComplete="email"
          inputMode="email"
          error={errors.email}
          requiredLabel={dict.a11y.required}
          onChange={(event) => update({ email: event.target.value })}
        />

        <TextAreaField
          label={dict.restaurantBooking.note}
          value={draft.note}
          placeholder={dict.restaurantBooking.notePlaceholder}
          requiredLabel={dict.a11y.required}
          className="sm:col-span-2"
          onChange={(event) => update({ note: event.target.value })}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" variant="secondary">
          {dict.restaurantBooking.submit}
        </Button>
        <p className="text-xs opacity-60">{dict.restaurantBooking.openingNote}</p>
      </div>
    </form>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-8">
      <dt className="text-sm opacity-55">{label}</dt>
      <dd className="text-sm sm:text-right">{children}</dd>
    </div>
  );
}
