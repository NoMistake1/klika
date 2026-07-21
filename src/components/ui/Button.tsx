import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "conversion"
  | "primary"
  | "secondary"
  | "outline"
  | "outline-cream"
  | "ghost"
  | "cream";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button hierarchy in the Klika palette:
 *
 * 1. `conversion` — the booking actions. Terracotta fill, warm-white label,
 *    darker terracotta hover. Terracotta/warm-white is 3.67:1, which only
 *    clears WCAG as *large* text, so this variant enforces its own label size
 *    (≥19px bold) regardless of the `size` prop and must not be given
 *    additional small text.
 * 2. `primary` — dark navy, warm-white text (17.1:1).
 * 3. `secondary` — light brand blue, navy text (11.2:1).
 * 4. `outline` / `ghost` — quiet actions. `cream` — for dark surfaces, with
 *    `outline-cream` as its quiet counterpart when a dark band needs a second,
 *    subordinate action beside a filled one.
 *
 * Depth comes from a hairline shadow that deepens on hover and collapses on
 * press; geometry stays a 3px radius so the interface reads editorial rather
 * than as a rounded-card template. Every variant clears a 44px tap target at
 * `md` and above.
 */
const variantClasses: Record<ButtonVariant, string> = {
  conversion:
    "bg-accent text-warm-white border border-accent hover:bg-accent-hover hover:border-accent-hover active:bg-accent-hover",
  primary:
    "bg-navy text-warm-white border border-navy hover:bg-navy-soft hover:border-navy-soft active:bg-navy",
  secondary:
    "bg-blue text-navy border border-blue hover:bg-blue-light hover:border-blue-light active:bg-blue",
  // Flat by design: no lift, so they stay quiet next to a filled action.
  outline:
    "bg-transparent text-navy border border-navy/25 hover:border-navy hover:bg-navy/[0.04] active:bg-navy/[0.08] shadow-none hover:shadow-none active:shadow-none active:translate-y-0",
  // The same flat treatment as `outline`, inverted for navy and photographic
  // surfaces where navy-on-navy would vanish.
  "outline-cream":
    "bg-transparent text-cream border border-cream/35 hover:border-cream hover:bg-cream/[0.08] active:bg-cream/[0.14] shadow-none hover:shadow-none active:shadow-none active:translate-y-0",
  ghost:
    "bg-transparent text-navy border border-transparent hover:bg-navy/[0.05] active:bg-navy/[0.09] underline-offset-4 shadow-none hover:shadow-none active:shadow-none active:translate-y-0",
  // For dark surfaces, where cream is the brightest available fill.
  cream:
    "bg-cream text-navy border border-cream hover:bg-warm-white hover:border-warm-white active:bg-cream",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 py-1.5",
  md: "min-h-11 px-5 py-2.5",
  lg: "min-h-12 px-7 py-3",
};

/**
 * Label size lives apart from box size so the conversion variant can enforce
 * its large-text requirement deterministically — two competing font-size
 * utilities in one class list would leave the winner to stylesheet order.
 */
function labelClasses(variant: ButtonVariant, size: ButtonSize): string {
  if (variant === "conversion") return "text-[1.2rem] leading-none font-bold";
  return size === "lg" ? "text-base" : "text-sm";
}

const baseClasses = cn(
  "inline-flex items-center justify-center gap-2 rounded-[3px]",
  "font-medium tracking-wide no-underline select-none",
  // Fills lift slightly on hover and settle on press.
  "shadow-[0_1px_2px_rgba(11,29,53,0.08)] hover:shadow-[0_4px_14px_-4px_rgba(11,29,53,0.35)]",
  "active:shadow-[0_1px_1px_rgba(11,29,53,0.10)] active:translate-y-px",
  "transition-[background-color,border-color,box-shadow,transform,opacity] duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
  "disabled:pointer-events-none disabled:opacity-50",
  // The lift is decoration; reduced-motion users get the colour change only.
  "motion-reduce:transition-[background-color,border-color] motion-reduce:active:translate-y-0",
);

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type AnchorProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

type NativeButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: never };

export type ButtonProps = AnchorProps | NativeButtonProps;

function isLink(props: ButtonProps): props is AnchorProps {
  return typeof (props as AnchorProps).href === "string";
}

/** Renders a `<Link>` when given `href`, otherwise a native `<button>`. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    labelClasses(variant, size),
    className,
  );

  if (isLink(props)) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...linkProps } = props;
    return (
      <Link {...linkProps} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } = props;
  return (
    <button {...buttonProps} type={buttonProps.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
