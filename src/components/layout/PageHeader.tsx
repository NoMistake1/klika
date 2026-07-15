import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export interface Crumb {
  readonly label: string;
  /** Path without the locale prefix. Omit for the current page. */
  readonly path?: string;
}

/**
 * Subpage masthead: breadcrumbs, the single H1 and an optional lede.
 *
 * Sits below the fixed header, so it carries the top padding that keeps the
 * title clear of it.
 */
export function PageHeader({
  locale,
  dict,
  eyebrow,
  title,
  lede,
  crumbs = [],
  tone = "cream",
  aside,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  eyebrow?: string;
  title: string;
  lede?: string;
  crumbs?: readonly Crumb[];
  tone?: "cream" | "blue-light" | "navy" | "warm-white";
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const toneClasses = {
    cream: "bg-cream text-navy",
    "blue-light": "bg-blue-light text-navy",
    navy: "bg-navy text-cream",
    "warm-white": "bg-warm-white text-ink",
  }[tone];

  return (
    <header className={cn("pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36", toneClasses)}>
      <Container>
        <nav aria-label={dict.a11y.breadcrumb} className="mb-8">
          <ol className="flex flex-wrap items-center gap-1 text-xs opacity-60">
            <li className="flex items-center gap-1">
              <Link href={localePath(locale)} className="link-underline py-1">
                {dict.a11y.home}
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1">
                <ChevronRight aria-hidden="true" className="size-3 opacity-50" />
                {crumb.path ? (
                  <Link href={localePath(locale, crumb.path)} className="link-underline py-1">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="py-1">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
            {eyebrow ? (
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-title font-semibold text-balance">{title}</h1>
            {lede ? (
              <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75 sm:text-lg">
                {lede}
              </p>
            ) : null}
            {children}
          </div>

          {aside ? (
            <div className="lg:col-span-5 lg:self-end lg:justify-self-end">{aside}</div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
