"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Info, Mail, MessageCircle, Phone, Users } from "lucide-react";
import type { HotelBookingDraft, HotelBookingStep, Mutable, Room } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { interpolate } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { getRoomById, rooms } from "@/content/hotel";
import { hotelEmail, hotelMobile, hotelWhatsApp } from "@/content/contact";
import {
  estimateStayTotal,
  validateGuestDetails,
  validateStay,
  type GuestDetailsErrors,
  type StayErrors,
} from "@/lib/booking-validation";
import { useSessionDraft } from "@/lib/use-session-draft";
import { Button } from "@/components/ui/Button";
import { TextField, TextAreaField, ValidationSummary } from "@/components/ui/Field";
import { SafeImage } from "@/components/ui/SafeImage";
import { Price } from "@/components/ui/MenuBadges";
import {
  addDays,
  cn,
  formatDate,
  formatPrice,
  nightsBetween,
  telLink,
  todayIso,
  whatsAppLink,
} from "@/lib/utils";

const DRAFT_KEY = "klika:hotel-booking-draft";

const STEPS: readonly HotelBookingStep[] = [
  "dates",
  "room",
  "room-detail",
  "guest",
  "summary",
  "contact",
];

const emptyDraft: HotelBookingDraft = {
  arrival: "",
  departure: "",
  guests: 2,
  roomId: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  note: "",
};

/**
 * Hotel booking prototype.
 *
 * FRONT-END ONLY, AND HONEST ABOUT IT. This wizard takes no payment, checks no
 * availability, and creates no reservation. It ends by handing the guest a
 * summary and the reception's real phone, e-mail and WhatsApp — because that is
 * where a booking is actually made. There is no fake "Booking confirmed!"
 * screen anywhere in this flow, and there must never be one until a real
 * backend exists to make it true.
 *
 * FUTURE: with an availability API, steps 2 and 3 gain real inventory and the
 * final step can submit. The `HotelBookingDraft` type is the contract.
 */
export function HotelBookingWizard({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const { value: draft, setValue, reset, storageAvailable, hydrated } = useSessionDraft(
    DRAFT_KEY,
    emptyDraft,
  );

  const [step, setStep] = useState<HotelBookingStep>("dates");
  const [stayErrors, setStayErrors] = useState<StayErrors>({});
  const [guestErrors, setGuestErrors] = useState<GuestDetailsErrors>({});
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prefilled = useRef(false);

  // Pre-fill from the hero booking bar's query parameters, once, and only for
  // values the guest has not already typed into the draft.
  useEffect(() => {
    if (!hydrated || prefilled.current) return;
    prefilled.current = true;

    const arrival = searchParams.get("arrival");
    const departure = searchParams.get("departure");
    const guests = searchParams.get("guests");
    const roomId = searchParams.get("room");

    const update: Partial<Mutable<HotelBookingDraft>> = {};
    if (arrival && !draft.arrival) update.arrival = arrival;
    if (departure && !draft.departure) update.departure = departure;
    if (guests && Number.isFinite(Number(guests))) {
      const parsed = Number(guests);
      if (parsed >= 1) update.guests = parsed;
    }
    if (roomId && getRoomById(roomId)) update.roomId = roomId as HotelBookingDraft["roomId"];

    if (Object.keys(update).length > 0) setValue(update);
  }, [hydrated, searchParams, draft.arrival, draft.departure, setValue]);

  const stepIndex = STEPS.indexOf(step);
  const selectedRoom = draft.roomId ? getRoomById(draft.roomId) : undefined;
  const nights = nightsBetween(draft.arrival, draft.departure);

  const estimate = useMemo(
    () => estimateStayTotal(selectedRoom?.priceCzk ?? null, draft.arrival, draft.departure),
    [selectedRoom, draft.arrival, draft.departure],
  );

  function goToStep(next: HotelBookingStep) {
    setStep(next);
    // Move focus to the new step's heading so screen reader and keyboard users
    // are not left at the bottom of the previous step.
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  function onNext() {
    if (step === "dates") {
      const errors = validateStay(
        { arrival: draft.arrival, departure: draft.departure, guests: draft.guests },
        dict,
      );
      setStayErrors(errors);
      if (Object.keys(errors).length > 0) return;
      goToStep("room");
      return;
    }

    if (step === "room") {
      if (!draft.roomId) {
        setStayErrors({ arrival: dict.validation.selectRoom });
        return;
      }
      setStayErrors({});
      goToStep("room-detail");
      return;
    }

    if (step === "room-detail") {
      goToStep("guest");
      return;
    }

    if (step === "guest") {
      const errors = validateGuestDetails(
        {
          firstName: draft.firstName,
          lastName: draft.lastName,
          email: draft.email,
          phone: draft.phone,
        },
        dict,
      );
      setGuestErrors(errors);
      if (Object.keys(errors).length > 0) return;
      goToStep("summary");
      return;
    }

    if (step === "summary") goToStep("contact");
  }

  function onBack() {
    const previous = STEPS[stepIndex - 1];
    if (previous) goToStep(previous);
  }

  const summaryText = useMemo(() => {
    const lines = [
      `${dict.hotelBooking.stay}: ${draft.arrival} — ${draft.departure} (${nights} ${
        nights === 1 ? dict.bookingBar.night : dict.bookingBar.nights
      })`,
      `${dict.hotelBooking.guestCount}: ${draft.guests}`,
      `${dict.hotelBooking.selectedRoom}: ${selectedRoom?.name[locale] ?? "—"}`,
      `${dict.hotelBooking.firstName}: ${draft.firstName} ${draft.lastName}`,
      `${dict.hotelBooking.email}: ${draft.email}`,
      `${dict.hotelBooking.phone}: ${draft.phone}`,
    ];
    if (draft.note.trim()) lines.push(`${dict.hotelBooking.note}: ${draft.note.trim()}`);
    return lines.join("\n");
  }, [draft, nights, selectedRoom, locale, dict]);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the text stays selectable
      // on screen, so there is nothing to recover from.
    }
  }

  const mailtoHref = `mailto:${hotelEmail}?subject=${encodeURIComponent(
    `${dict.hotelBooking.eyebrow}: ${draft.arrival} — ${draft.departure}`,
  )}&body=${encodeURIComponent(summaryText)}`;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        {/* Progress. A continuous rail that fills as the guest advances, rather
            than six disconnected pills — the journey reads as one movement. */}
        <div className="mb-10">
          <div
            aria-hidden="true"
            className="relative h-px w-full bg-navy/12"
          >
            <span
              className="absolute inset-y-0 left-0 bg-navy transition-[width] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none"
              style={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%` }}
            />
          </div>

          <ol
            aria-label={dict.hotelBooking.progressLabel}
            className="mt-4 flex items-start justify-between gap-1"
          >
            {STEPS.map((entry, index) => {
              const isCurrent = entry === step;
              const isDone = index < stepIndex;

              return (
                <li key={entry} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                  <span
                    aria-current={isCurrent ? "step" : undefined}
                    className={cn(
                      "inline-flex size-6 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-medium tabular-nums",
                      "transition-[background-color,border-color,transform] duration-300",
                      isCurrent && "border-navy bg-navy text-warm-white",
                      // A completed step is confirmed, not active: light blue
                      // keeps it legible without competing with the current one.
                      isDone && "border-blue bg-blue text-navy",
                      !isCurrent && !isDone && "border-navy/25 text-navy/40",
                    )}
                  >
                    {isDone ? <Check aria-hidden="true" className="size-3" /> : index + 1}
                    <span className="sr-only">
                      {": "}
                      {dict.hotelBooking.steps[entry]}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "hidden text-center text-[0.7rem] leading-tight text-balance sm:block",
                      isCurrent ? "font-semibold text-navy" : "text-navy/45",
                    )}
                  >
                    {dict.hotelBooking.steps[entry]}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mb-2 text-xs tracking-[0.15em] uppercase opacity-45 sm:hidden">
          {interpolate(dict.hotelBooking.stepOf, {
            current: stepIndex + 1,
            total: STEPS.length,
          })}
        </p>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-heading font-semibold text-balance focus:outline-none"
        >
          {stepTitle(step, dict)}
        </h2>

        {!storageAvailable && hydrated ? (
          <p className="mt-4 flex gap-2 border-l-2 border-sand-ink pl-3 text-xs opacity-70">
            <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-sand-ink" />
            {dict.hotelBooking.storageUnavailable}
          </p>
        ) : null}

        {/* key restarts the entrance animation, so each step arrives rather
            than snapping into place. */}
        <div key={step} className="mt-8 animate-fade-up motion-reduce:animate-none">
          {step === "dates" ? (
            <DatesStep
              draft={draft}
              setValue={setValue}
              errors={stayErrors}
              dict={dict}
            />
          ) : null}

          {step === "room" ? (
            <RoomStep
              draft={draft}
              setValue={setValue}
              locale={locale}
              dict={dict}
              error={stayErrors.arrival}
            />
          ) : null}

          {step === "room-detail" ? (
            <RoomDetailStep room={selectedRoom} locale={locale} dict={dict} />
          ) : null}

          {step === "guest" ? (
            <GuestStep draft={draft} setValue={setValue} errors={guestErrors} dict={dict} />
          ) : null}

          {step === "summary" || step === "contact" ? (
            <SummaryStep
              draft={draft}
              room={selectedRoom}
              nights={nights}
              estimate={estimate}
              locale={locale}
              dict={dict}
            />
          ) : null}

          {step === "contact" ? (
            <div className="mt-8">
              {/* The one thing this prototype must never do is imply the room
                  is held. It says so, prominently, at the end of the flow —
                  carried by a solid navy panel rather than a colour shout. */}
              <p className="flex gap-3 rounded-md bg-navy p-5 text-sm leading-relaxed font-medium text-cream">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue" />
                {dict.hotelBooking.notConfirmed}
              </p>

              <p className="mt-6 text-sm opacity-75">{dict.hotelBooking.contactText}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={telLink(hotelMobile.e164)} variant="conversion" size="lg">
                  <Phone aria-hidden="true" className="size-4" />
                  {dict.actions.callReception}
                </Button>
                <Button href={mailtoHref} variant="outline" size="lg">
                  <Mail aria-hidden="true" className="size-4" />
                  {dict.actions.sendEmail}
                </Button>
                <Button
                  href={whatsAppLink(hotelWhatsApp.e164)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {dict.actions.whatsApp}
                  <span className="sr-only">({dict.a11y.openInNewTab})</span>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={copySummary} variant="ghost" size="sm">
                  {copied ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    <Copy aria-hidden="true" className="size-4" />
                  )}
                  {copied ? dict.hotelBooking.copied : dict.hotelBooking.copySummary}
                </Button>
                <Button
                  onClick={() => {
                    reset();
                    goToStep("dates");
                  }}
                  variant="ghost"
                  size="sm"
                >
                  {dict.actions.startOver}
                </Button>
              </div>

              <p aria-live="polite" className="sr-only">
                {copied ? dict.hotelBooking.copied : ""}
              </p>
            </div>
          ) : null}
        </div>

        {/* Navigation */}
        {step !== "contact" ? (
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-current/10 pt-6">
            <Button
              onClick={onBack}
              variant="ghost"
              disabled={stepIndex === 0}
              className={stepIndex === 0 ? "invisible" : undefined}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              {dict.actions.back}
            </Button>
            <Button onClick={onNext} size="lg">
              {dict.actions.continue}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        ) : null}
      </div>

      {/* Live summary rail */}
      <aside className="lg:col-span-5">
        <div className="card-float sticky top-24 bg-cream p-6 text-navy sm:p-8">
          <h2 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
            {dict.hotelBooking.summaryTitle}
          </h2>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-navy/10 pb-3">
              <dt className="opacity-60">{dict.hotelBooking.stay}</dt>
              <dd className="text-right">
                {draft.arrival && draft.departure ? (
                  <>
                    {formatDate(draft.arrival, locale)}
                    <br />
                    {formatDate(draft.departure, locale)}
                  </>
                ) : (
                  <span className="opacity-40">—</span>
                )}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-navy/10 pb-3">
              <dt className="opacity-60">{dict.hotelBooking.guestCount}</dt>
              <dd className="tabular-nums">{draft.guests}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-navy/10 pb-3">
              <dt className="opacity-60">{dict.hotelBooking.selectedRoom}</dt>
              <dd className="text-right">
                {selectedRoom ? (
                  selectedRoom.name[locale]
                ) : (
                  <span className="opacity-40">—</span>
                )}
              </dd>
            </div>
            {nights > 0 ? (
              <div className="flex justify-between gap-4 border-b border-navy/10 pb-3">
                <dt className="opacity-60">{dict.bookingBar.nights}</dt>
                <dd className="tabular-nums">{nights}</dd>
              </div>
            ) : null}
          </dl>

          {estimate !== null ? (
            <div className="mt-5">
              <p className="flex items-baseline justify-between gap-4">
                <span className="text-sm opacity-60">{dict.hotelBooking.estimateTitle}</span>
                <span className="text-xl font-semibold tabular-nums">
                  {formatPrice(estimate, locale)}
                </span>
              </p>
              <p className="mt-2 text-xs opacity-55">{dict.hotelBooking.estimateNote}</p>
            </div>
          ) : selectedRoom && selectedRoom.priceCzk === null ? (
            <p className="mt-5 text-sm opacity-70">{dict.rooms.priceOnRequest}</p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function stepTitle(step: HotelBookingStep, dict: Dictionary): string {
  switch (step) {
    case "dates":
      return dict.hotelBooking.datesTitle;
    case "room":
      return dict.hotelBooking.roomTitle;
    case "room-detail":
      return dict.hotelBooking.roomDetailTitle;
    case "guest":
      return dict.hotelBooking.guestTitle;
    case "summary":
      return dict.hotelBooking.summaryTitle;
    case "contact":
      return dict.hotelBooking.contactTitle;
  }
}

/* -------------------------------------------------------------------------- */
/* Steps                                                                      */
/* -------------------------------------------------------------------------- */

function DatesStep({
  draft,
  setValue,
  errors,
  dict,
}: {
  draft: HotelBookingDraft;
  setValue: (update: Partial<HotelBookingDraft>) => void;
  errors: StayErrors;
  dict: Dictionary;
}) {
  const today = todayIso();

  return (
    <div>
      <ValidationSummary
        title={dict.validation.summaryTitle}
        errors={Object.values(errors).filter((error): error is string => Boolean(error))}
        className="mb-6"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          type="date"
          label={dict.bookingBar.arrival}
          value={draft.arrival}
          min={today}
          required
          autoComplete="off"
          error={errors.arrival}
          requiredLabel={dict.a11y.required}
          onChange={(event) => setValue({ arrival: event.target.value })}
        />
        <TextField
          type="date"
          label={dict.bookingBar.departure}
          value={draft.departure}
          min={draft.arrival ? addDays(draft.arrival, 1) : addDays(today, 1)}
          required
          autoComplete="off"
          error={errors.departure}
          requiredLabel={dict.a11y.required}
          onChange={(event) => setValue({ departure: event.target.value })}
        />
        <TextField
          type="number"
          inputMode="numeric"
          label={dict.bookingBar.guests}
          value={draft.guests}
          min={1}
          max={12}
          step={1}
          required
          error={errors.guests}
          requiredLabel={dict.a11y.required}
          onChange={(event) => setValue({ guests: Number(event.target.value) })}
        />
      </div>
    </div>
  );
}

function RoomStep({
  draft,
  setValue,
  locale,
  dict,
  error,
}: {
  draft: HotelBookingDraft;
  setValue: (update: Partial<HotelBookingDraft>) => void;
  locale: Locale;
  dict: Dictionary;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{dict.hotelBooking.roomTitle}</legend>

      <ValidationSummary
        title={dict.validation.summaryTitle}
        errors={error ? [error] : []}
        className="mb-6"
      />

      <div className="space-y-3">
        {rooms.map((room) => {
          const isSelected = draft.roomId === room.id;
          const tooSmall = room.capacity !== null && room.capacity < draft.guests;

          return (
            <label
              key={room.id}
              className={cn(
                "flex cursor-pointer items-start gap-4 rounded-lg border p-4",
                "transition-[border-color,background-color,box-shadow,transform] duration-200",
                "hover:-translate-y-px motion-reduce:hover:translate-y-0",
                isSelected
                  ? "border-navy bg-navy/[0.04] shadow-[0_6px_20px_-8px_rgba(11,29,53,0.4)]"
                  : "border-navy/15 hover:border-navy/45 hover:shadow-[0_4px_14px_-8px_rgba(11,29,53,0.3)]",
                // Dimmed, not disabled: the guest may still want it and
                // reception can advise — we do not know their party's needs.
                tooSmall && "opacity-55",
              )}
            >
              <input
                type="radio"
                name="room"
                value={room.id}
                checked={isSelected}
                onChange={() => setValue({ roomId: room.id })}
                className="mt-1 size-4 shrink-0"
              />
              <span className="flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium">{room.name[locale]}</span>
                  {room.priceCzk !== null ? (
                    <Price
                      amountCzk={room.priceCzk}
                      locale={locale}
                      hasSeasonalException={room.hasSeasonalException}
                      className="text-sm"
                    />
                  ) : (
                    <span className="text-xs opacity-60">{dict.rooms.priceOnRequest}</span>
                  )}
                </span>

                {room.capacity !== null ? (
                  <span className="mt-1 flex items-center gap-1.5 text-xs opacity-60">
                    <Users aria-hidden="true" className="size-3" />
                    {interpolate(dict.rooms.upToGuests, { count: room.capacity })}
                  </span>
                ) : null}

                <span className="mt-2 block text-sm opacity-70">{room.description[locale]}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function RoomDetailStep({
  room,
  locale,
  dict,
}: {
  room: Room | undefined;
  locale: Locale;
  dict: Dictionary;
}) {
  if (!room) return <p className="opacity-70">{dict.hotelBooking.noRoomSelected}</p>;

  return (
    <article>
      <div className="relative aspect-[4/3] overflow-hidden bg-blue-light">
        <SafeImage image={room.image} locale={locale} fill sizes="(min-width: 1024px) 55vw, 100vw" />
      </div>

      <h3 className="mt-6 text-lg font-semibold">{room.name[locale]}</h3>
      <p className="mt-3 leading-relaxed opacity-75">{room.description[locale]}</p>

      <h4 className="mt-6 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
        {dict.rooms.features}
      </h4>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {room.features[locale].map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm opacity-75">
            <span aria-hidden="true" className="size-1 rounded-full bg-current opacity-50" />
            {feature}
          </li>
        ))}
      </ul>

      {room.hasSeasonalException ? (
        <p className="mt-6 text-xs opacity-55">{dict.rooms.seasonalException}</p>
      ) : null}
    </article>
  );
}

function GuestStep({
  draft,
  setValue,
  errors,
  dict,
}: {
  draft: HotelBookingDraft;
  setValue: (update: Partial<HotelBookingDraft>) => void;
  errors: GuestDetailsErrors;
  dict: Dictionary;
}) {
  return (
    <div>
      <ValidationSummary
        title={dict.validation.summaryTitle}
        errors={Object.values(errors).filter((error): error is string => Boolean(error))}
        className="mb-6"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label={dict.hotelBooking.firstName}
          value={draft.firstName}
          required
          autoComplete="given-name"
          error={errors.firstName}
          requiredLabel={dict.a11y.required}
          onChange={(event) => setValue({ firstName: event.target.value })}
        />
        <TextField
          label={dict.hotelBooking.lastName}
          value={draft.lastName}
          required
          autoComplete="family-name"
          error={errors.lastName}
          requiredLabel={dict.a11y.required}
          onChange={(event) => setValue({ lastName: event.target.value })}
        />
        <TextField
          type="email"
          label={dict.hotelBooking.email}
          value={draft.email}
          required
          autoComplete="email"
          inputMode="email"
          error={errors.email}
          requiredLabel={dict.a11y.required}
          onChange={(event) => setValue({ email: event.target.value })}
        />
        <TextField
          type="tel"
          label={dict.hotelBooking.phone}
          value={draft.phone}
          required
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
          requiredLabel={dict.a11y.required}
          onChange={(event) => setValue({ phone: event.target.value })}
        />
        <TextAreaField
          label={dict.hotelBooking.note}
          value={draft.note}
          placeholder={dict.hotelBooking.notePlaceholder}
          requiredLabel={dict.a11y.required}
          className="sm:col-span-2"
          onChange={(event) => setValue({ note: event.target.value })}
        />
      </div>
    </div>
  );
}

function SummaryStep({
  draft,
  room,
  nights,
  estimate,
  locale,
  dict,
}: {
  draft: HotelBookingDraft;
  room: Room | undefined;
  nights: number;
  estimate: number | null;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <dl className="divide-y divide-current/10 border-y border-current/10">
      <SummaryRow label={dict.hotelBooking.stay}>
        {draft.arrival && draft.departure
          ? `${formatDate(draft.arrival, locale)} — ${formatDate(draft.departure, locale)}`
          : "—"}
        {nights > 0 ? (
          <span className="opacity-55">
            {" "}
            ({nights} {nights === 1 ? dict.bookingBar.night : dict.bookingBar.nights})
          </span>
        ) : null}
      </SummaryRow>
      <SummaryRow label={dict.hotelBooking.guestCount}>{draft.guests}</SummaryRow>
      <SummaryRow label={dict.hotelBooking.selectedRoom}>
        {room?.name[locale] ?? "—"}
      </SummaryRow>
      <SummaryRow label={dict.hotelBooking.firstName}>
        {`${draft.firstName} ${draft.lastName}`.trim() || "—"}
      </SummaryRow>
      <SummaryRow label={dict.hotelBooking.email}>{draft.email || "—"}</SummaryRow>
      <SummaryRow label={dict.hotelBooking.phone}>{draft.phone || "—"}</SummaryRow>
      {draft.note.trim() ? (
        <SummaryRow label={dict.hotelBooking.note}>{draft.note}</SummaryRow>
      ) : null}
      {estimate !== null ? (
        <SummaryRow label={dict.hotelBooking.estimateTitle}>
          {formatPrice(estimate, locale)}
        </SummaryRow>
      ) : null}
    </dl>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-8">
      <dt className="text-sm opacity-55">{label}</dt>
      <dd className="text-sm sm:text-right">{children}</dd>
    </div>
  );
}
