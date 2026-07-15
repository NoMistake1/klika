import { cn } from "@/lib/utils";

/**
 * Klika logo.
 *
 * PLACEHOLDER. The official logo has not been supplied, and the reference
 * screenshots must not be traced. Until the final artwork arrives the wordmark
 * is set in Lobster — the actual brand display face — which is honest
 * typography rather than an invented mark, and the monogram is a neutral
 * stand-in echoing the rounded script.
 *
 * TO REPLACE with the official SVG: swap the body of `LogoMonogram` for the
 * final `<path>` data and render the wordmark from the supplied artwork. This
 * is the only file that needs to change — every call site uses this component.
 * Also replace src/app/icon.png, apple-icon.png and opengraph-image.png
 * (see scripts/generate-brand-assets.mjs).
 */

interface LogoProps {
  /** `wordmark` for the header, `monogram` for tight spaces. */
  variant?: "wordmark" | "monogram" | "stacked";
  className?: string;
  /** Draws the monogram stroke on mount. Ignored under reduced motion. */
  animated?: boolean;
}

function LogoMonogram({ animated = false }: { animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-full w-auto shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <g
        className={animated ? "[stroke-dasharray:120] animate-draw" : undefined}
        style={animated ? { ["--draw-length" as string]: "120" } : undefined}
      >
        <path d="M17.5 9.5 L14.5 38.5" />
        <path d="M38.5 9.5 L16 26" />
        <path d="M25.5 22.5 A11 11 0 1 0 37 38" />
      </g>
    </svg>
  );
}

export function Logo({ variant = "wordmark", className, animated = false }: LogoProps) {
  if (variant === "monogram") {
    return (
      <span className={cn("block", className)}>
        <LogoMonogram animated={animated} />
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span className={cn("flex flex-col items-center gap-2", className)}>
        <span className="h-12">
          <LogoMonogram animated={animated} />
        </span>
        <span className="font-display text-3xl leading-none">Klika</span>
      </span>
    );
  }

  return (
    <span className={cn("flex items-baseline gap-1.5", className)}>
      <span className="font-display text-2xl leading-none tracking-normal">Klika</span>
    </span>
  );
}

export { LogoMonogram };
