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
        Aún no hay productos registrados en el inventario.
      </Card>
    );
  }

  return (
    <>
      {/* Vista mobile: cards */}
      <div className="grid gap-3 md:hidden">
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
              <div className="mt-2 font-semibold text-ink dark:text-surface">
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
                  Mínimo: <strong>{p.stockMinimo}</strong>
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
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(p)}
                className="flex-1"
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(p)}
                className="flex-1"
              >
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Vista desktop: tabla */}
      <Card className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink-subtle/30 text-ink-muted">
              <th className="px-3 py-3">ID</th>
              <th className="px-3 py-3">Nombre</th>
              <th className="px-3 py-3">Proveedor</th>
              <th className="px-3 py-3">Categorías</th>
              <th className="px-3 py-3 text-right">Precio</th>
              <th className="px-3 py-3 text-right">Stock</th>
              <th className="px-3 py-3 text-right">Mínimo</th>
              <th className="px-3 py-3">Estado</th>
              <th className="px-3 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-b border-ink-subtle/20">
                <td className="px-3 py-3 font-mono text-xs text-ink-muted">
                  #{p.id}
                </td>
                <td className="px-3 py-3">
                  <div className="font-semibold">{p.nombre}</div>
                  {p.descripcion && (
                    <div className="text-xs text-ink-muted">{p.descripcion}</div>
                  )}
                </td>
                <td className="px-3 py-3 text-ink-muted">{p.proveedorNombre}</td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.categorias.map((c) => (
                      <Badge key={c.id} tone="neutral" size="sm">
                        {c.nombre}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-3 text-right font-bold">
                  ${Number(p.precio).toFixed(2)}
                </td>
                <td className="px-3 py-3 text-right">{p.stock}</td>
                <td className="px-3 py-3 text-right">{p.stockMinimo}</td>
                <td className="px-3 py-3">
                  <StockBadge
                    stock={p.stock}
                    stockMinimo={p.stockMinimo}
                    size="sm"
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onEdit(p)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => onDelete(p)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
