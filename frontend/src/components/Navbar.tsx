import { Button, Icon, Logo } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-ink-subtle/30 bg-surface px-4 dark:border-ink-muted/40 dark:bg-ink-strong sm:h-16 sm:px-8">
      <Logo size={18} />
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        leading={<Icon name={isDark ? "sun" : "moon"} size={18} />}
      >
        <span className="hidden sm:inline">{isDark ? "Claro" : "Oscuro"}</span>
      </Button>
    </header>
  );
}
