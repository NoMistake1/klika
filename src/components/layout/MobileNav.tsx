"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { NavItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { bookStayHref, bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Waves } from "@/components/illustrations";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation panel.
 *
 * A modal dialog in the accessibility sense: focus is trapped inside it, the
 * background is inert to scroll, Escape closes it, and focus returns to the
 * trigger on close. Styled as a warm editorial index rather than a generic
 * fullscreen gradient — numbered entries, hairlines, one handwritten aside.
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

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  return (
    <div
      // Kept mounted so the open/close transition can run; hidden from AT and
      // pointer input entirely while closed.
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
          "absolute inset-0 bg-navy/40 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open || undefined}
        aria-label={dict.a11y.mainNavigation}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-blue-light text-navy shadow-2xl",
          "transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <LanguageSwitcher locale={locale} dict={dict} tone="navy" />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-[2px] transition-colors hover:bg-navy/10"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">{dict.a11y.closeMenu}</span>
          </button>
        </div>

        <nav
          aria-label={dict.a11y.mainNavigation}
          className="flex-1 overflow-y-auto overscroll-contain px-6 pb-4"
        >
          <ul className="divide-y divide-navy/10 border-y border-navy/10">
            {items.map((item, index) => {
              const href = localePath(locale, item.href);
              const isCurrent = currentPath === href;

              return (
                <li key={item.id} className="py-1">
                  <Link
                    href={href}
                    onClick={onClose}
                    aria-current={isCurrent ? "page" : undefined}
                    className="group flex min-h-12 items-baseline gap-4 py-2"
                  >
                    <span
                      aria-hidden="true"
                      className="w-5 shrink-0 text-xs tabular-nums opacity-40"
                    >
                      {`0${index + 1}`}
                    </span>
                    <span
                      className={cn(
                        "text-2xl font-medium transition-colors group-hover:text-terracotta",
                        isCurrent && "text-terracotta",
                      )}
                    >
                      {item.label[locale]}
                    </span>
                  </Link>

                  {item.children ? (
                    <ul className="mb-2 ml-9 flex flex-wrap gap-x-4 gap-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={localePath(locale, child.href)}
                            onClick={onClose}
                            className="link-underline inline-flex min-h-8 items-center text-sm opacity-70 hover:opacity-100"
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

          <div className="mt-8 flex items-center justify-center">
            <HandwrittenNote arrow="right">{dict.hero.handwritten}</HandwrittenNote>
          </div>
        </nav>

        <div className="relative overflow-hidden border-t border-navy/10 px-6 py-5">
          <Waves
            className="absolute -bottom-2 left-0 h-8 w-full text-navy opacity-10"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-2.5">
            <Button href={localePath(locale, bookStayHref)} onClick={onClose} size="lg">
              {dict.actions.bookStay}
            </Button>
            <Button
              href={localePath(locale, bookTableHref)}
              onClick={onClose}
              variant="secondary"
              size="lg"
            >
              {dict.actions.bookTable}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
