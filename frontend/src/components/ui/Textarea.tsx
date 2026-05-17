import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({
  error,
  className = "",
  rows = 3,
  ...rest
}: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={[
        "w-full rounded-lg border bg-surface px-3 py-2.5 text-sm font-medium text-ink outline-none transition-shadow",
        "dark:bg-ink-strong dark:text-surface placeholder:text-ink-subtle",
        error
          ? "border-danger shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
          : "border-ink-subtle/40 dark:border-ink-muted/40",
        "resize-y",
        className,
      ].join(" ")}
      {...rest}
    />
  );
}
