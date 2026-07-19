"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import type { NavItem } from "@/types";
import type { Dictionary } from "@/content/dictionaries";
import { activeNavHref, localePath, type Locale } from "@/lib/i18n";
import { bookStayHref, bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { useScrollLock } from "@/lib/use-focus-trap";
import { cn } from "@/lib/utils";

/**
 * Site header.
 *
 * Transparent over the homepage hero, then condensing into a solid sticky bar
 * once scrolled. Over the hero it sits on a dark scrim (the video overlay), so
 * cream text stays readable against both the video and the poster fallback.
 */
export function Header({
  items,
  locale,
  dict,
}: {
  items: readonly NavItem[];
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() ?? localePath(locale);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Only the homepage has a hero to sit over.
  const isHome = pathname === localePath(locale) || pathname === `${localePath(locale)}/`;
  const overlay = isHome && !scrolled;

  // The single active nav item, by longest matching href.
  const currentNavHref = activeNavHref(
    pathname,
    items.map((item) => localePath(locale, item.href)),
  );

  useScrollLock(menuOpen);

  /**
   * Watches a sentinel at the top of the document instead of listening to
   * scroll. The observer fires off the main thread and reports the correct
   * state on load — including when the page is restored mid-scroll — where a
   * scroll listener only learns anything once the guest actually moves.
   */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry?.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /**
   * Close the panel on navigation — including browser back/forward, which the
   * links' own onClose never sees. Adjusting state during render is React's
   * documented pattern for reacting to a changed value; an effect would paint
   * the new route with the menu still open before closing it.
   *
   * A locale switch is the one navigation that should NOT close the panel, but
   * it also remounts this component (so this render-time close never even runs
   * for it) — that case is handled by the restore effect below. The
   * locale-stripped comparison here is a belt-and-braces guard for the event
   * that a locale change ever re-renders instead of remounting.
   */
  if (pathname !== lastPathname) {
    const pagePath = (p: string) => p.replace(/^\/[^/]+/, "") || "/";
    const samePage = pagePath(pathname) === pagePath(lastPathname);
    setLastPathname(pathname);
    if (!samePage) setMenuOpen(false);
  }

  /**
   * Re-open the panel after a mobile language switch. That navigation remounts
   * the layout, resetting menu state, so the selector leaves a one-shot flag
   * which we consume here on mount. Scheduled on the next frame so it runs from
   * a callback rather than synchronously during the effect.
   */
  useEffect(() => {
    let restore = false;
    try {
      restore = sessionStorage.getItem("klika:keep-menu-open") === "1";
    } catch {}
    if (!restore) return;
    // The flag is consumed inside the callback, not the effect body: under
    // React's dev double-invoke the first run's cleanup cancels this timer
    // before it fires, and the surviving run then still sees the flag. A timer
    // (not requestAnimationFrame) is used so it still runs if the page is
    // momentarily backgrounded during the locale navigation.
    const timer = window.setTimeout(() => {
      setMenuOpen(true);
      try {
        sessionStorage.removeItem("klika:keep-menu-open");
      } catch {}
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Scroll sentinel: sits in the document's initial containing block, so
          it scrolls away with the page while the header stays fixed. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-6 w-px"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,padding] duration-300",
          overlay
            ? "bg-transparent py-4 text-cream"
            : "bg-warm-white/95 py-2 text-navy shadow-[0_1px_0_0_var(--color-navy-12)] backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex w-full max-w-[85rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <Link
            href={localePath(locale)}
            onClick={(event) => {
              // Already on the landing page: don't reload, just glide back to
              // the top of the hero (instant under reduced motion).
              if (!isHome) return;
              event.preventDefault();
              const reduce =
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }}
            className="inline-flex min-h-11 items-center rounded-[2px]"
          >
            {/* Wordmark only, for a stronger single-mark presence. Decorative;
                the link's accessible name is the sr-only text. Inverted while
                the header floats over the hero video. */}
            <Logo variant="wordmark" height={30} onDark={overlay} priority decorative />
            <span className="sr-only">{dict.siteName}</span>
          </Link>

          <nav
            aria-label={dict.a11y.mainNavigation}
            className="hidden lg:flex lg:items-center lg:gap-1"
          >
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const href = localePath(locale, item.href);
                // Longest-match so /restaurant/menu highlights only "Menu", not
                // its parent "Restaurace" as a broad prefix would.
                const isCurrent = href === currentNavHref;

                return (
                  <li key={item.id}>
                    <Link
                      href={href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(
                        "link-underline inline-flex min-h-11 items-center px-3 text-sm font-medium transition-opacity",
                        isCurrent ? "opacity-100" : "opacity-75 hover:opacity-100",
                      )}
                    >
                      {item.label[locale]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Responsive display is applied to wrappers, never as a `hidden`
                class on a component that already sets its own display — in
                Tailwind's cascade `inline-flex` beats `hidden`, so that would
                silently do nothing. */}
            <div className="hidden md:block">
              <LanguageSwitcher locale={locale} dict={dict} />
            </div>

            <span aria-hidden="true" className="hidden h-5 w-px bg-current/20 lg:block" />

            <div className="hidden items-center gap-2 lg:flex">
              <Button
                href={localePath(locale, bookTableHref)}
                variant={overlay ? "cream" : "outline"}
                size="sm"
              >
                {dict.actions.bookTable}
              </Button>
              <Button
                href={localePath(locale, bookStayHref)}
                variant={overlay ? "secondary" : "primary"}
                size="sm"
              >
                {dict.actions.bookStay}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-[2px] transition-colors hover:bg-current/10 lg:hidden"
            >
              <Menu aria-hidden="true" className="size-6" />
              <span className="sr-only">{dict.a11y.openMenu}</span>
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={items}
        locale={locale}
        dict={dict}
        currentPath={pathname}
      />
    </>
  );
}
