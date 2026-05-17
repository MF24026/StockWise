interface LogoProps {
  size?: number;
}

export function Logo({ size = 18 }: LogoProps) {
  return (
    <span
      className="inline-flex items-center font-bold tracking-tight leading-none text-ink-strong dark:text-surface"
      style={{ gap: size * 0.45, fontSize: size }}
    >
      <span
        className="inline-flex shrink-0 items-center justify-center text-white shadow-sm"
        style={{
          width: size * 1.55,
          height: size * 1.55,
          borderRadius: size * 0.36,
          background: "linear-gradient(135deg, #1E3A8A 0%, #0EA5E9 100%)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={size * 0.9}
          height={size * 0.9}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4 8l8-4 8 4-8 4-8-4z" />
          <path d="M4 12l8 4 8-4" />
          <path d="M4 16l8 4 8-4" />
        </svg>
      </span>
      <span>
        Stock<span className="font-extrabold">Wise</span>
      </span>
    </span>
  );
}
