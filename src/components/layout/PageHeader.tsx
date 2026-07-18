import Link from "next/link";
import { getImageProps } from "next/image";
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
 * A responsive background photograph for the masthead. When a `mobile` source
 * is given, an art-directed `<picture>` downloads only the source that matches
 * the viewport, so a phone never fetches the wide desktop asset.
 */
export interface PageHeaderBackground {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Optional portrait source for phones. */
  readonly mobileSrc?: string;
  readonly mobileWidth?: number;
  readonly mobileHeight?: number;
  /** Responsive object-position utilities, e.g. "object-[50%_35%] sm:object-center". */
  readonly imgClassName?: string;
  /** Alt text; empty string keeps it decorative behind the heading. */
  readonly alt?: string;
}

/**
 * Subpage masthead: breadcrumbs, the single H1 and an optional lede, optionally
 * over a photograph.
 *
 * Sits below the fixed header, so it carries the top padding that keeps the
 * title clear of it. With a background image the surface goes navy with a dark
 * scrim, so the cream heading stays legible.
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
  background,
  className,
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
  background?: PageHeaderBackground;
  /** Extra classes on the masthead — e.g. taller padding for a more immersive
   *  photographic hero on a given page. */
  className?: string;
}) {
  const toneClasses = {
    cream: "bg-cream text-navy",
    "blue-light": "bg-blue-light text-navy",
    navy: "bg-navy text-cream",
    "warm-white": "bg-warm-white text-ink",
  }[tone];

  return (
    <header
      className={cn(
        "relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36",
        background ? "bg-navy text-cream" : toneClasses,
        className,
      )}
    >
      {background ? <BackgroundImage {...background} /> : null}

      <Container className={background ? "relative" : undefined}>
        <nav aria-label={dict.a11y.breadcrumb} className="mb-8">
          <ol className="flex flex-wrap items-center gap-1 text-xs opacity-70">
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
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-title font-semibold text-balance">{title}</h1>
            {lede ? (
              <p
                className={cn(
                  "mt-6 max-w-2xl text-base leading-relaxed sm:text-lg",
                  background ? "opacity-90" : "opacity-75",
                )}
              >
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

/**
 * Art-directed cover photo plus a dark scrim. Built with getImageProps so the
 * `<picture>` downloads exactly one source per viewport and keeps Next's
 * optimized URLs. Decorative by default; the heading carries the meaning.
 */
function BackgroundImage({
  src,
  width,
  height,
  mobileSrc,
  mobileWidth,
  mobileHeight,
  imgClassName,
  alt = "",
}: PageHeaderBackground) {
  const {
    props: { srcSet: desktopSrcSet, ...rest },
  } = getImageProps({ src, width, height, alt, sizes: "100vw", quality: 80, priority: true });

  const mobileSrcSet =
    mobileSrc && mobileWidth && mobileHeight
      ? getImageProps({
          src: mobileSrc,
          width: mobileWidth,
          height: mobileHeight,
          alt,
          sizes: "100vw",
          quality: 78,
        }).props.srcSet
      : undefined;

  return (
    <div aria-hidden={alt === "" ? true : undefined} className="absolute inset-0">
      <picture>
        {mobileSrcSet ? (
          <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
        ) : null}
        {/* getImageProps renders an <img>: next/image's <Image> cannot
            art-direct a <picture> with distinct mobile and desktop sources. */}
        <img
          {...rest}
          srcSet={desktopSrcSet}
          alt={alt}
          className={cn("absolute inset-0 size-full object-cover", imgClassName)}
        />
      </picture>
      {/* Scrim for legible cream text over any photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/65 to-navy/45" />
    </div>
  );
}
