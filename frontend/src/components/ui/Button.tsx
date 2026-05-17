import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success"
  | "outline";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand text-white border-transparent shadow-sm hover:bg-brand-hover",
  secondary:
    "bg-surface text-ink border-ink-subtle/40 shadow-sm hover:bg-surface-muted dark:bg-ink-strong dark:text-surface dark:border-ink-muted",
  ghost:
    "bg-transparent text-ink-muted border-transparent hover:bg-surface-subtle dark:text-surface dark:hover:bg-ink/40",
  danger:
    "bg-danger text-white border-transparent shadow-sm hover:bg-danger-dark",
  success: "bg-success text-white border-transparent hover:bg-success-dark",
  outline:
    "bg-surface text-brand border-brand shadow-sm hover:bg-surface-muted",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-[15px] gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  block,
  leading,
  trailing,
  children,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-lg border font-semibold tracking-tight transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        block ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
}
