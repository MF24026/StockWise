import { NavLink } from "react-router-dom";
import { Button, Icon, Logo } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";

const links = [
  { to: "/productos", label: "Productos" },
  { to: "/proveedores", label: "Proveedores" },
  { to: "/categorias", label: "Categorias" },
  { to: "/movimientos", label: "Movimientos" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-20 border-b border-ink-subtle/30 bg-surface dark:border-ink-muted/40 dark:bg-ink-strong">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-8">
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
      </div>
      <nav className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-8">
        <ul className="flex gap-2 pb-2 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  [
                    "inline-block whitespace-nowrap rounded-md px-3 py-1.5 font-medium transition-colors",
                    isActive
                      ? "bg-brand text-white"
                      : "text-ink-muted hover:bg-ink-subtle/20 dark:hover:bg-ink-muted/20",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
