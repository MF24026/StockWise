import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E3A8A",
          hover: "#1E40AF",
          dark: "#172554",
        },
        accent: {
          DEFAULT: "#0EA5E9",
          light: "#E0F2FE",
        },
        success: {
          DEFAULT: "#10B981",
          bg: "#D1FAE5",
          dark: "#065F46",
        },
        warning: {
          DEFAULT: "#F59E0B",
          bg: "#FEF3C7",
          dark: "#92400E",
        },
        danger: {
          DEFAULT: "#EF4444",
          bg: "#FEE2E2",
          dark: "#991B1B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F9FAFB",
          subtle: "#F3F4F6",
        },
        ink: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
          subtle: "#9CA3AF",
          strong: "#111827",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        mono: ["ui-monospace", "Menlo", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        lg: "12px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
        DEFAULT:
          "0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.04)",
        lg: "0 4px 12px rgba(15, 23, 42, 0.06), 0 12px 28px rgba(15, 23, 42, 0.08)",
        xl: "0 16px 48px rgba(15, 23, 42, 0.18)",
      },
      keyframes: {
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        slideUp: "slideUp 0.25s cubic-bezier(.2,.7,.3,1)",
        shimmer: "shimmer 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
