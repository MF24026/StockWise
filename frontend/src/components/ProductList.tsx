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
    <>
    {/* vista movile */}
    <div className="grid gap-3 md:hidden">
      {products.map((p) => (
        <Card
          key={p.id}
          className="flex flex-col gap-3">
          <div >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-ink-muted">
                #{p.id}
              </span>
              <StockBadge
                stock={p.stock}
                stockMinimo={p.stockMinimo}
                size="sm" />
            </div>
            <div className="mt-2 font-semibold text-ink dark:text-surface">
              {p.nombre}
            </div>
            {p.descripcion && (
              <div className="text-sm text-ink-muted">{p.descripcion}</div>
            )}
            <div className="mt-3 grid gap-1 text-sm">
              <span>
                 Precio: <strong>${p.precio.toFixed(2)}</strong>
                 </span>
              <span >
                Stock: <strong>{p.stock}</strong>
              </span>
              <span>
                Stock minimo: <strong>{p.stockMinimo}</strong>
              </span>
            </div>
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

    {/* vista desktop: tabla */}
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-surface-muted text-ink-muted">
            <th className="px-3 py-3">ID</th>
            <th className="px-3 py-3">Nombre</th>
            <th className="px-3 py-3">Descripción</th>
            <th className="px-3 py-3">Precio</th>
            <th className="px-3 py-3">Stock</th>
            <th className="px-3 py-3">Stock Min</th>
            <th className="px-3 py-3">Estado</th>
            <th className="px-3 py-3 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-surface-muted">
              <td className="px-3 py-3 font-mono text-xs text-ink-muted">
                #{p.id}
              </td>
              <td className="px-3 py-3 font-semibold">{p.nombre}</td>
              <td className="px-3 py-3 text-ink-muted">
                {p.descripcion || "Sin descripción"}
              </td>
              <td className="px-3 py-3 font-bold">
                ${p.precio.toFixed(2)}
              </td>
              <td className="px-3 py-3">{p.stock}</td>
              <td className="px-3 py-3">{p.stockMinimo}</td>
              <td className="px-3 py-3">
                <StockBadge stock={p.stock} stockMinimo={p.stockMinimo} size="sm" />
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
    </div>
  </>

  );
}
