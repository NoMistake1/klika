import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * A decorative, full-bleed background photograph for a section or card.
 *
 * Built with `getImageProps` so an optional mobile source is genuinely art
 * directed — a phone downloads only the portrait/mobile asset and a desktop
 * only the wide one, via a `<picture>` with a `(max-width: …)` source. It fills
 * its positioned parent and is always decorative (`alt=""`, `aria-hidden`); the
 * caller supplies its own overlay and text on top.
 */
export function BackgroundPhoto({
  src,
  width,
  height,
  mobileSrc,
  mobileWidth,
  mobileHeight,
  className,
  sizes = "100vw",
  mobileBreakpoint = "(max-width: 1023px)",
  priority = false,
}: {
  src: string;
  width: number;
  height: number;
  mobileSrc?: string;
  mobileWidth?: number;
  mobileHeight?: number;
  /** Object-position / object-fit utilities, e.g. "object-cover object-center". */
  className?: string;
  sizes?: string;
  mobileBreakpoint?: string;
  priority?: boolean;
}) {
  const {
    props: { srcSet: desktopSrcSet, ...rest },
  } = getImageProps({ src, width, height, alt: "", sizes, quality: 80, priority });

  const mobileSrcSet =
    mobileSrc && mobileWidth && mobileHeight
      ? getImageProps({
          src: mobileSrc,
          width: mobileWidth,
          height: mobileHeight,
          alt: "",
          sizes,
          quality: 80,
        }).props.srcSet
      : undefined;

  return (
    <picture>
      {mobileSrcSet ? (
        <source media={mobileBreakpoint} srcSet={mobileSrcSet} sizes={sizes} />
      ) : null}
      {/* getImageProps renders an <img>: next/image's <Image> cannot art-direct
          a <picture> with distinct mobile and desktop sources. */}
      <img
        {...rest}
        srcSet={desktopSrcSet}
        alt=""
        aria-hidden="true"
        className={cn("absolute inset-0 size-full object-cover", className)}
      />
    </picture>
  );
}
