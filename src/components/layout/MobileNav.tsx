"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { NavItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import {
  activeNavHref,
  localeLabels,
  localePath,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";
import { bookStayHref, bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Waves } from "@/components/illustrations";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation panel.
 *
 * A modal dialog in the accessibility sense: focus is trapped inside, the
 * background is inert, Escape closes it, and focus returns to the trigger.
 *
 * The motion is what makes it feel like an application rather than a website
 * menu: the panel eases in on a spring-like curve while its rows stagger in
 * behind it, each on a small delay. Every one of those transforms is disabled
 * under prefers-reduced-motion, where the panel simply appears.
 *
 * Rows are full-width touch targets with a pressed state, so a thumb gets the
 * same feedback it would in a native app.
 */
export function MobileNav({
  open,
  onClose,
  items,
  locale,
  dict,
  currentPath,
}: {
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
  locale: Locale;
  dict: Dictionary;
  currentPath: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap({ active: open, containerRef: panelRef, onEscape: onClose });

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  // The single active nav item, by longest matching href — so /restaurant/menu
  // highlights only "Menu", never also its parent "Restaurace".
  const currentNavHref = activeNavHref(
    currentPath,
    items.map((item) => localePath(locale, item.href)),
  );

  return (
    <div
      // Kept mounted so the transition can run; fully inert while closed.
      inert={!open}
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-navy/50 backdrop-blur-md transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open || undefined}
        aria-label={dict.a11y.mainNavigation}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col bg-blue-light text-navy",
          "shadow-[-24px_0_60px_-20px_rgba(11,29,53,0.45)]",
          // A slightly overshooting ease is what reads as "app" rather than "CSS transition".
          "transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
          "motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-navy/45 uppercase">
            {dict.a11y.mainNavigation}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full transition-[background-color,transform] duration-200 hover:bg-navy/10 active:scale-90 motion-reduce:active:scale-100"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">{dict.a11y.closeMenu}</span>
          </button>
        </div>

        <nav
          aria-label={dict.a11y.mainNavigation}
          className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4"
        >
          <ul className="flex flex-col gap-0.5">
            {items.map((item, index) => {
              const href = localePath(locale, item.href);
              const isCurrent = href === currentNavHref;

              return (
                <li
                  key={item.id}
                  className={cn(
                    "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:opacity-100",
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                  )}
                  // Rows arrive just behind the panel, one after another.
                  style={{ transitionDelay: open ? `${120 + index * 45}ms` : "0ms" }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "group flex min-h-14 items-center justify-between gap-4 rounded-xl px-3 py-2",
                      "transition-[background-color,transform] duration-200",
                      "active:scale-[0.98] motion-reduce:active:scale-100",
                      isCurrent ? "bg-navy text-warm-white" : "hover:bg-navy/[0.06]",
                    )}
                  >
                    <span className="text-[1.35rem] leading-tight font-medium tracking-tight">
                      {item.label[locale]}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 transition-[opacity,transform] duration-200",
                        isCurrent
                          ? "opacity-70"
                          : "opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-40",
                      )}
                    />
                  </Link>

                  {item.children ? (
                    <ul className="mt-0.5 mb-1 flex flex-wrap gap-x-1 gap-y-0.5 pl-3">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={localePath(locale, child.href)}
                            onClick={onClose}
                            className="inline-flex min-h-9 items-center rounded-lg px-2 text-sm text-navy/60 transition-colors hover:bg-navy/[0.06] hover:text-navy"
                          >
                            {child.label[locale]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language selector — inside the menu, as its own navigation landmark
            so it is reachable directly rather than only by walking the list. */}
        <nav aria-labelledby="mobile-language-label" className="px-6 pt-2 pb-4">
          <p
            id="mobile-language-label"
            className="mb-2 text-[0.7rem] font-semibold tracking-[0.2em] text-navy/45 uppercase"
          >
            {dict.a11y.chooseLanguage}
          </p>
          <ul className="flex gap-1.5">
            {locales.map((target) => {
              const isCurrent = target === locale;
              return (
                <li key={target} className="flex-1">
                  <Link
                    href={switchLocalePath(currentPath, target)}
                    hrefLang={target}
                    // Switching language keeps the panel open so the guest
                    // closes it themselves. A locale change remounts the
                    // layout (and this Header), so we can't just hold React
                    // state — we leave a one-shot flag the remounted Header
                    // reads to re-open itself.
                    onClick={() => {
                      if (isCurrent) return;
                      try {
                        sessionStorage.setItem("klika:keep-menu-open", "1");
                      } catch {}
                    }}
                    aria-current={isCurrent ? "true" : undefined}
                    className={cn(
                      "flex min-h-11 items-center justify-center gap-1.5 rounded-lg text-sm font-medium",
                      "transition-[background-color,transform] duration-200 active:scale-[0.97] motion-reduce:active:scale-100",
                      isCurrent
                        ? "bg-navy text-warm-white"
                        : "bg-navy/[0.06] text-navy/70 hover:bg-navy/[0.12] hover:text-navy",
                    )}
                  >
                    {isCurrent ? (
                      <Check aria-hidden="true" className="size-3.5" />
                    ) : null}
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

        {/* Actions */}
        <div className="relative overflow-hidden border-t border-navy/10 px-6 pt-4 pb-6">
          <Waves
            className="pointer-events-none absolute -bottom-3 left-0 h-8 w-full text-navy opacity-10"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-2.5">
            <Button href={localePath(locale, bookStayHref)} onClick={onClose} variant="conversion" size="lg">
              {dict.actions.bookStay}
            </Button>
            <Button
              href={localePath(locale, bookTableHref)}
              onClick={onClose}
              variant="secondary"
              size="lg"
              // Match the conversion button's enforced 1.2rem label so both
              // booking actions read at exactly the same text size.
              className="text-[1.2rem] leading-none font-bold"
            >
              {dict.actions.bookTable}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
