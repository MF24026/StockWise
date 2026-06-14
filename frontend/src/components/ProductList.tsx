import type { Producto } from "@/types/product";
import { Badge, Button, Card, StockBadge } from "@/components/ui";

interface ProductListProps {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (producto: Producto) => void;
}

export function ProductList({ productos, onEdit, onDelete }: ProductListProps) {
  if (productos.length === 0) {
    return (
      <Card className="py-12 text-center text-ink-muted">
        Aun no hay productos registrados.
      </Card>
    );
  }

  return (
    <div className="grid gap-3">
      {productos.map((p) => (
        <Card
          key={p.id}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-muted">#{p.id}</span>
              <StockBadge stock={p.stock} stockMinimo={p.stockMinimo} size="sm" />
            </div>
            <div className="mt-1 font-semibold text-ink dark:text-surface">
              {p.nombre}
            </div>
            {p.descripcion && (
              <div className="text-sm text-ink-muted">{p.descripcion}</div>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="font-bold">${Number(p.precio).toFixed(2)}</span>
              <span className="text-ink-muted">
                Stock: <strong>{p.stock}</strong>
              </span>
              <span className="text-ink-muted">
                Min: <strong>{p.stockMinimo}</strong>
              </span>
              <span className="text-ink-muted">
                Proveedor: <strong>{p.proveedorNombre}</strong>
              </span>
            </div>
            {p.categorias.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {p.categorias.map((c) => (
                  <Badge key={c.id} tone="neutral" size="sm">
                    {c.nombre}
                  </Badge>
                ))}
              </div>
            )}
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
