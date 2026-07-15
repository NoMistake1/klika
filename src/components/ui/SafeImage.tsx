"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageAsset } from "@/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FALLBACK_SRC = "/images/placeholders/generic.png";

interface SafeImageProps {
  image: ImageAsset;
  locale: Locale;
  /** Responsive `sizes`. Always pass a real value for `fill` images. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Fills the nearest positioned ancestor instead of using intrinsic size. */
  fill?: boolean;
  /** Object-fit when `fill` is set. */
  fit?: "cover" | "contain";
}

/**
 * next/image with a graceful missing-asset state.
 *
 * A broken or not-yet-supplied file falls back to the labelled generic
 * placeholder rather than a browser's broken-image icon. Intrinsic images
 * always render at their declared width/height so a swapped asset of the same
 * aspect ratio causes no layout shift.
 */
export function SafeImage({
  image,
  locale,
  sizes,
  priority = false,
  className,
  fill = false,
  fit = "cover",
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const src = failed ? FALLBACK_SRC : image.src;
  const alt = image.alt[locale];

  // `alt` is passed explicitly rather than spread, so jsx-a11y can verify it.
  const shared = {
    src,
    onError: () => setFailed(true),
    priority,
    // Below-the-fold images stay lazy; only true hero art passes priority.
    loading: priority ? ("eager" as const) : ("lazy" as const),
    quality: 82,
  };

  if (fill) {
    return (
      <Image
        {...shared}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
      />
    );
  }

  return (
    <Image
      {...shared}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className={className}
    />
  );
}
