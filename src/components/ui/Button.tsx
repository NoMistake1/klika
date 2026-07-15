import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "cream";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Buttons in the Klika palette: dark navy, light blue and beige. No orange —
 * every fill below carries navy or warm-white text at 9.6:1 or better.
 *
 * Restrained geometry on purpose: a 3px radius, never a pill, so the interface
 * reads editorial rather than as a generic rounded-card template. Depth comes
 * from a hairline shadow that deepens on hover and collapses on press, which is
 * what gives the press a physical feel rather than a colour swap.
 *
 * Every variant clears a 44px tap target at `md` and above.
 */
const variantClasses: Record<ButtonVariant, string> = {
  // Dark navy — the primary action.
  primary:
    "bg-navy text-warm-white border border-navy hover:bg-navy-soft hover:border-navy-soft active:bg-navy",
  // Light blue — the secondary action; navy text at 9.6:1.
  secondary:
    "bg-blue text-navy border border-blue hover:bg-blue-light hover:border-blue-light active:bg-blue",
  // Beige — a quieter third action; navy text at 9.9:1.
  accent:
    "bg-sand text-navy border border-sand hover:bg-[#e6d5ba] hover:border-[#e6d5ba] active:bg-sand",
  // Flat by design: no lift, so they stay quiet next to a filled action.
  outline:
    "bg-transparent text-navy border border-navy/25 hover:border-navy hover:bg-navy/[0.04] active:bg-navy/[0.08] shadow-none hover:shadow-none active:shadow-none active:translate-y-0",
  ghost:
    "bg-transparent text-navy border border-transparent hover:bg-navy/[0.05] active:bg-navy/[0.09] underline-offset-4 shadow-none hover:shadow-none active:shadow-none active:translate-y-0",
  // For dark surfaces, where cream is the brightest available fill.
  cream:
    "bg-cream text-navy border border-cream hover:bg-warm-white hover:border-warm-white active:bg-cream",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 py-1.5 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-7 py-3 text-base",
};

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
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

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
