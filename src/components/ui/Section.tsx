import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared page gutter. One source of truth for horizontal rhythm. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "default" && "max-w-[85rem]",
        size === "wide" && "max-w-[100rem]",
        size === "narrow" && "max-w-[52rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type SectionTone = "warm-white" | "cream" | "blue-light" | "navy" | "sand";

const toneClasses: Record<SectionTone, string> = {
  "warm-white": "bg-warm-white text-ink",
  cream: "bg-cream text-navy",
  "blue-light": "bg-blue-light text-navy",
  navy: "bg-navy text-cream",
  sand: "bg-sand text-navy",
};

/**
 * A page section with vertical rhythm and a brand tone.
 * Tone carries meaning: blue for the hotel world, cream for the restaurant.
 */
export function Section({
  children,
  className,
  tone = "warm-white",
  as: Tag = "section",
  spacing = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  as?: ElementType;
  spacing?: "default" | "tight" | "loose" | "none";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        toneClasses[tone],
        spacing === "default" && "py-16 sm:py-20 lg:py-28",
        spacing === "tight" && "py-10 sm:py-14",
        spacing === "loose" && "py-20 sm:py-28 lg:py-36",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Editorial section heading: a small eyebrow, a large title and optional lede.
 * `align="wide"` lets the title sit in a narrow measure while the section
 * itself stays full width — the asymmetry the design direction asks for.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
  headingLevel = "h2",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
  id?: string;
}) {
  const Heading = headingLevel;

  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-balance",
          headingLevel === "h1" ? "text-title" : "text-heading",
          "font-semibold",
        )}
      >
        {title}
      </Heading>
      {lede ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed opacity-75 sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
