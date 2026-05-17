import type { CSSProperties } from "react";

export type IconName =
  | "menu"
  | "close"
  | "home"
  | "box"
  | "plus"
  | "search"
  | "edit"
  | "trash"
  | "check"
  | "checkCircle"
  | "alert"
  | "alertTri"
  | "arrowRight"
  | "chevronRight"
  | "chevronLeft"
  | "chevronDown"
  | "package"
  | "trending"
  | "dollar"
  | "refresh"
  | "filter"
  | "bell"
  | "user"
  | "logout"
  | "sparkle"
  | "sun"
  | "moon";

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
}

export function Icon({
  name,
  size = 20,
  stroke = 1.75,
  className,
  style,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  const common = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const path = (() => {
    switch (name) {
      case "menu":
        return (
          <>
            <line x1="3" y1="6" x2="21" y2="6" {...common} />
            <line x1="3" y1="12" x2="21" y2="12" {...common} />
            <line x1="3" y1="18" x2="21" y2="18" {...common} />
          </>
        );
      case "close":
        return (
          <>
            <line x1="6" y1="6" x2="18" y2="18" {...common} />
            <line x1="18" y1="6" x2="6" y2="18" {...common} />
          </>
        );
      case "home":
        return <path d="M3 11l9-8 9 8M5 10v10h4v-6h6v6h4V10" {...common} />;
      case "box":
        return (
          <>
            <path d="M3 7l9-4 9 4-9 4-9-4z" {...common} />
            <path d="M3 7v10l9 4 9-4V7" {...common} />
            <path d="M12 11v10" {...common} />
          </>
        );
      case "plus":
        return (
          <>
            <line x1="12" y1="5" x2="12" y2="19" {...common} />
            <line x1="5" y1="12" x2="19" y2="12" {...common} />
          </>
        );
      case "search":
        return (
          <>
            <circle cx="11" cy="11" r="7" {...common} />
            <line x1="20" y1="20" x2="16.5" y2="16.5" {...common} />
          </>
        );
      case "edit":
        return (
          <>
            <path d="M4 20h4l10-10-4-4L4 16v4z" {...common} />
            <path d="M14 6l4 4" {...common} />
          </>
        );
      case "trash":
        return (
          <>
            <polyline points="3 6 5 6 21 6" {...common} />
            <path
              d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"
              {...common}
            />
            <path d="M10 11v6M14 11v6" {...common} />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" {...common} />
          </>
        );
      case "check":
        return <polyline points="4 12 10 18 20 6" {...common} />;
      case "checkCircle":
        return (
          <>
            <circle cx="12" cy="12" r="9" {...common} />
            <polyline points="8 12 11 15 16 9" {...common} />
          </>
        );
      case "alert":
        return (
          <>
            <circle cx="12" cy="12" r="9" {...common} />
            <line x1="12" y1="8" x2="12" y2="13" {...common} />
            <line x1="12" y1="16" x2="12" y2="16.5" {...common} />
          </>
        );
      case "alertTri":
        return (
          <>
            <path d="M12 3L2 20h20L12 3z" {...common} />
            <line x1="12" y1="10" x2="12" y2="14" {...common} />
            <line x1="12" y1="17" x2="12" y2="17.5" {...common} />
          </>
        );
      case "arrowRight":
        return (
          <>
            <line x1="5" y1="12" x2="19" y2="12" {...common} />
            <polyline points="13 6 19 12 13 18" {...common} />
          </>
        );
      case "chevronRight":
        return <polyline points="9 6 15 12 9 18" {...common} />;
      case "chevronLeft":
        return <polyline points="15 6 9 12 15 18" {...common} />;
      case "chevronDown":
        return <polyline points="6 9 12 15 18 9" {...common} />;
      case "package":
        return (
          <>
            <path
              d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
              {...common}
            />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" {...common} />
            <line x1="12" y1="22.08" x2="12" y2="12" {...common} />
          </>
        );
      case "trending":
        return (
          <>
            <polyline points="3 17 9 11 13 15 21 7" {...common} />
            <polyline points="14 7 21 7 21 14" {...common} />
          </>
        );
      case "dollar":
        return (
          <>
            <line x1="12" y1="2" x2="12" y2="22" {...common} />
            <path
              d="M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
              {...common}
            />
          </>
        );
      case "refresh":
        return (
          <>
            <polyline points="20 4 20 10 14 10" {...common} />
            <path d="M20 10a8 8 0 10-2.34 5.66" {...common} />
          </>
        );
      case "filter":
        return (
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" {...common} />
        );
      case "bell":
        return (
          <>
            <path
              d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
              {...common}
            />
            <path d="M13.73 21a2 2 0 01-3.46 0" {...common} />
          </>
        );
      case "user":
        return (
          <>
            <path
              d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
              {...common}
            />
            <circle cx="12" cy="7" r="4" {...common} />
          </>
        );
      case "logout":
        return (
          <>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" {...common} />
            <polyline points="16 17 21 12 16 7" {...common} />
            <line x1="21" y1="12" x2="9" y2="12" {...common} />
          </>
        );
      case "sparkle":
        return (
          <path
            d="M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 15.6 10.3 11 6 9.3l4.3-1.7L12 3z"
            {...common}
          />
        );
      case "sun":
        return (
          <>
            <circle cx="12" cy="12" r="4" {...common} />
            <line x1="12" y1="2" x2="12" y2="5" {...common} />
            <line x1="12" y1="19" x2="12" y2="22" {...common} />
            <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" {...common} />
            <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" {...common} />
            <line x1="2" y1="12" x2="5" y2="12" {...common} />
            <line x1="19" y1="12" x2="22" y2="12" {...common} />
            <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" {...common} />
            <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" {...common} />
          </>
        );
      case "moon":
        return (
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            {...common}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{ flexShrink: 0, ...style }}
      aria-hidden={ariaHidden}
    >
      {path}
    </svg>
  );
}
