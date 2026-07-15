"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, switchLocalePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { cn } from "@/lib/utils";

/**
 * CZ / EN / DE switcher.
 *
 * Switching language keeps the guest on the same page — /cs/hotel becomes
 * /en/hotel — by rewriting only the locale segment of the current pathname.
 * These are real links, so they work without JavaScript and can be opened in a
 * new tab. `hrefLang` tells crawlers what each one points at.
 */
export function LanguageSwitcher({
  locale,
  dict,
  className,
  tone = "auto",
}: {
  locale: Locale;
  dict: Dictionary;
  className?: string;
  /** `auto` inherits the surrounding colour; useful over the hero and in the footer. */
  tone?: "auto" | "navy";
}) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <nav aria-label={dict.a11y.languageSwitcher} className={cn("flex items-center", className)}>
      <ul className="flex items-center gap-0.5">
        {locales.map((target, index) => {
          const isCurrent = target === locale;
          return (
            <li key={target} className="flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="mr-0.5 opacity-30 select-none">
                  /
                </span>
              ) : null}
              <Link
                href={switchLocalePath(pathname, target)}
                hrefLang={target}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center px-1.5 text-xs font-semibold tracking-wider transition-opacity",
                  isCurrent
                    ? "opacity-100 underline underline-offset-4"
                    : "opacity-50 hover:opacity-100",
                  tone === "navy" && "text-navy",
                )}
              >
                <span aria-hidden="true">{localeLabels[target].short}</span>
                <span className="sr-only">
                  {localeLabels[target].full}
                  {isCurrent ? ` — ${dict.a11y.currentLanguage}` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
