import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "cream";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Squared, editorial buttons — deliberately not pills. A 2px radius keeps the
 * interface from reading as a generic rounded-card template.
 * Every variant clears a 44px tap target at `md` and above.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-warm-white hover:bg-navy-soft active:bg-navy-soft border border-navy",
  secondary:
    "bg-terracotta text-warm-white hover:bg-[#a2532f] active:bg-[#a2532f] border border-terracotta",
  outline:
    "bg-transparent text-navy border border-navy/30 hover:border-navy hover:bg-navy/5",
  ghost:
    "bg-transparent text-navy border border-transparent hover:bg-navy/5 underline-offset-4",
  cream:
    "bg-cream text-navy border border-cream hover:bg-warm-white active:bg-warm-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-1.5 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-7 py-3 text-base",
};

const baseClasses = cn(
  "inline-flex items-center justify-center gap-2 rounded-[2px]",
  "font-medium tracking-wide no-underline",
  "transition-colors duration-300",
  "disabled:pointer-events-none disabled:opacity-50",
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
