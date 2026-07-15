import type { Dictionary } from "@/content/dictionaries";
import { nightsBetween, parseIsoDate, todayIso } from "@/lib/utils";

/* ==========================================================================
   Booking validation.

   Shared by the hero booking bar and the multi-step wizard so the two can
   never disagree about what a valid stay is. Pure functions: they take values
   and a dictionary and return localized messages — no state, no side effects.
   ========================================================================== */

export const MAX_GUESTS = 12;

export interface StayInput {
  arrival: string;
  departure: string;
  guests: number;
}

export interface StayErrors {
  arrival?: string;
  departure?: string;
  guests?: string;
}

/** Validates dates and party size. */
export function validateStay(input: StayInput, dict: Dictionary): StayErrors {
  const errors: StayErrors = {};
  const today = todayIso();

  const arrivalDate = parseIsoDate(input.arrival);
  const departureDate = parseIsoDate(input.departure);

  if (!input.arrival) {
    errors.arrival = dict.validation.required;
  } else if (!arrivalDate) {
    errors.arrival = dict.validation.invalidDate;
  } else if (input.arrival < today) {
    errors.arrival = dict.validation.arrivalInPast;
  }

  if (!input.departure) {
    errors.departure = dict.validation.required;
  } else if (!departureDate) {
    errors.departure = dict.validation.invalidDate;
  } else if (arrivalDate && input.departure <= input.arrival) {
    errors.departure = dict.validation.departureBeforeArrival;
  }

  if (!Number.isFinite(input.guests) || input.guests < 1) {
    errors.guests = dict.validation.minGuests;
  } else if (input.guests > MAX_GUESTS) {
    errors.guests = dict.validation.maxGuests;
  }

  return errors;
}

export interface GuestDetailsInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type GuestDetailsErrors = Partial<Record<keyof GuestDetailsInput, string>>;

/**
 * Deliberately permissive patterns. The goal is catching typos, not policing
 * formats — an over-strict rule that rejects a real phone number or address is
 * worse than passing an odd one to reception.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+]?[\d\s()./-]{6,}$/;

export function validateGuestDetails(
  input: GuestDetailsInput,
  dict: Dictionary,
): GuestDetailsErrors {
  const errors: GuestDetailsErrors = {};

  if (!input.firstName.trim()) errors.firstName = dict.validation.required;
  if (!input.lastName.trim()) errors.lastName = dict.validation.required;

  if (!input.email.trim()) {
    errors.email = dict.validation.required;
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = dict.validation.invalidEmail;
  }

  if (!input.phone.trim()) {
    errors.phone = dict.validation.required;
  } else if (!PHONE_PATTERN.test(input.phone.trim())) {
    errors.phone = dict.validation.invalidPhone;
  }

  return errors;
}

export interface TableBookingInput {
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
}

export type TableBookingErrors = Partial<Record<keyof TableBookingInput, string>>;

export function validateTableBooking(
  input: TableBookingInput,
  dict: Dictionary,
): TableBookingErrors {
  const errors: TableBookingErrors = {};
  const today = todayIso();

  if (!input.date) {
    errors.date = dict.validation.required;
  } else if (!parseIsoDate(input.date)) {
    errors.date = dict.validation.invalidDate;
  } else if (input.date < today) {
    errors.date = dict.validation.dateInPast;
  }

  if (!input.time) errors.time = dict.validation.selectTime;

  if (!Number.isFinite(input.guests) || input.guests < 1) {
    errors.guests = dict.validation.minGuests;
  } else if (input.guests > MAX_GUESTS) {
    errors.guests = dict.validation.maxGuests;
  }

  if (!input.name.trim()) errors.name = dict.validation.required;

  if (!input.phone.trim()) {
    errors.phone = dict.validation.required;
  } else if (!PHONE_PATTERN.test(input.phone.trim())) {
    errors.phone = dict.validation.invalidPhone;
  }

  if (!input.email.trim()) {
    errors.email = dict.validation.required;
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = dict.validation.invalidEmail;
  }

  return errors;
}

/**
 * Indicative accommodation total: nightly rate × nights.
 *
 * Returns null when the room has no published rate, so the UI shows "price on
 * request" instead of a fabricated number. Excludes parking and the city
 * tourist fee, which are not part of the room rate — reception confirms the
 * final price.
 */
export function estimateStayTotal(
  nightlyRateCzk: number | null,
  arrival: string,
  departure: string,
): number | null {
  if (nightlyRateCzk === null) return null;
  const nights = nightsBetween(arrival, departure);
  if (nights <= 0) return null;
  return nightlyRateCzk * nights;
}
