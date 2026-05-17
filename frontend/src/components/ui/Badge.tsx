import type { ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "danger" | "info" | "primary";
type Size = "sm" | "md";

interface BadgeProps {
  tone?: Tone;
  size?: Size;
  withDot?: boolean;
  leading?: ReactNode;
  children: ReactNode;
}

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-surface-subtle text-ink dark:bg-ink/40 dark:text-surface",
  success: "bg-success-bg text-success-dark",
  warning: "bg-warning-bg text-warning-dark",
  danger: "bg-danger-bg text-danger-dark",
  info: "bg-accent-light text-[#075985]",
  primary: "bg-[#E0E7FF] text-brand",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-5 px-2 text-[11px] gap-1",
  md: "h-6 px-2.5 text-xs gap-1.5",
};

export function Badge({
  tone = "neutral",
  size = "md",
  withDot,
  leading,
  children,
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full font-semibold tracking-wide whitespace-nowrap",
        SIZE_CLASSES[size],
        TONE_CLASSES[tone],
      ].join(" ")}
    >
      {withDot && (
        <span
          className={`rounded-full bg-current ${size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2"}`}
        />
      )}
      {leading}
      {children}
    </span>
  );
}
