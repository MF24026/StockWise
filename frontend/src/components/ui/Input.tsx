import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  leading?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: boolean;
}

export function Input({
  leading,
  prefix,
  suffix,
  error,
  className = "",
  ...rest
}: InputProps) {
  return (
    <div
      className={[
        "flex h-[42px] items-center rounded-lg border bg-surface px-3 transition-shadow",
        "dark:bg-ink-strong",
        error
          ? "border-danger shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
          : "border-ink-subtle/40 dark:border-ink-muted/40",
      ].join(" ")}
    >
      {leading && (
        <span className="mr-2 flex shrink-0 text-ink-subtle">{leading}</span>
      )}
      {prefix && (
        <span className="mr-1.5 text-sm font-medium text-ink-muted">
          {prefix}
        </span>
      )}
      <input
        className={[
          "min-w-0 flex-1 border-none bg-transparent text-sm font-medium text-ink outline-none",
          "dark:text-surface placeholder:text-ink-subtle",
          className,
        ].join(" ")}
        {...rest}
      />
      {suffix && (
        <span className="ml-1.5 text-[13px] text-ink-muted">{suffix}</span>
      )}
    </div>
  );
}
