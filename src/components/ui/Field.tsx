"use client";

import { useId, type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Form fields.
 *
 * Every control gets a real <label>, and errors and hints are wired through
 * aria-describedby with aria-invalid, so screen readers announce the reason a
 * field was rejected rather than just that it was.
 */

const controlClasses = cn(
  "min-h-11 w-full rounded-[2px] border bg-warm-white px-3 py-2.5 text-base text-ink",
  "border-navy/25 transition-colors",
  "hover:border-navy/50",
  "focus:border-navy focus:outline-none",
  "disabled:opacity-50",
);

const errorClasses = "border-terracotta bg-terracotta/5";

function FieldShell({
  id,
  label,
  error,
  hint,
  required,
  requiredLabel,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  requiredLabel: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="ml-1 text-terracotta" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> ({requiredLabel})</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs opacity-60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-xs font-medium text-terracotta"
        >
          <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string): string | undefined {
  const ids = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(
    Boolean,
  );
  return ids.length > 0 ? ids.join(" ") : undefined;
}

interface BaseFieldProps {
  label: string;
  error?: string;
  hint?: string;
  requiredLabel: string;
  className?: string;
}

export function TextField({
  label,
  error,
  hint,
  requiredLabel,
  className,
  id: providedId,
  ...props
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={props.required}
      requiredLabel={requiredLabel}
      className={className}
    >
      <input
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClasses, error && errorClasses)}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  error,
  hint,
  requiredLabel,
  className,
  id: providedId,
  children,
  ...props
}: BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={props.required}
      requiredLabel={requiredLabel}
      className={className}
    >
      <select
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClasses, "appearance-none pr-8", error && errorClasses)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230B1D35' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.6rem center",
          backgroundSize: "1.1rem",
        }}
      >
        {children}
      </select>
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  requiredLabel,
  className,
  id: providedId,
  ...props
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={props.required}
      requiredLabel={requiredLabel}
      className={className}
    >
      <textarea
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClasses, "min-h-24 resize-y py-2.5", error && errorClasses)}
      />
    </FieldShell>
  );
}

/**
 * Announces the collected errors after a rejected submit.
 * `aria-live="assertive"` because the user has just acted and is waiting.
 */
export function ValidationSummary({
  title,
  errors,
  className,
}: {
  title: string;
  errors: readonly string[];
  className?: string;
}) {
  return (
    <div aria-live="assertive" aria-atomic="true" className={className}>
      {errors.length > 0 ? (
        <div className="rounded-[2px] border border-terracotta bg-terracotta/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-terracotta">
            <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
            {title}
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-terracotta/90">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
