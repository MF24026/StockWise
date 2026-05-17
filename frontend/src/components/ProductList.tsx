import type { Product } from "@/types/product";
import { Button, Card, StockBadge } from "@/components/ui";

// Responsable: Belkis Carolina Ramirez Flores (rf24026)
// Tarea: mejorar este listado a un diseño responsive:
//   - Mobile: cards apiladas con la info del producto
//   - Desktop: tabla con columnas (ID, Nombre, Descripcion, Precio, Stock, Stock Min, Estado, Acciones)
//   - Buscador opcional, paginacion opcional
// Las props ya estan definidas, no cambiarlas para no romper la integracion.

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return (
      <Card className="py-12 text-center text-ink-muted">
        Aun no hay productos registrados.
      </Card>
    );
  }

  return (
    <div className="grid gap-3">
      {products.map((p) => (
        <Card
          key={p.id}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-muted">
                #{p.id}
              </span>
              <StockBadge
                stock={p.stock}
                stockMinimo={p.stockMinimo}
                size="sm"
              />
            </div>
            <div className="mt-1 font-semibold text-ink dark:text-surface">
              {p.nombre}
            </div>
            {p.descripcion && (
              <div className="text-sm text-ink-muted">{p.descripcion}</div>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="font-bold">${p.precio.toFixed(2)}</span>
              <span className="text-ink-muted">
                Stock: <strong>{p.stock}</strong>
              </span>
              <span className="text-ink-muted">
                Min: <strong>{p.stockMinimo}</strong>
              </span>
            </div>
          </div>
          <div className="flex gap-2 sm:flex-col sm:gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onEdit(p)}
              className="flex-1 sm:flex-none"
            >
              Editar
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete(p)}
              className="flex-1 sm:flex-none"
            >
              Eliminar
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
