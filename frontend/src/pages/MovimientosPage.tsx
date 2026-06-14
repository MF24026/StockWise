import { useEffect, useState } from "react";
import type {
  MovimientoStock,
  MovimientoStockRequest,
} from "@/types/movimiento";
import type { Producto } from "@/types/product";
import { movimientosApi } from "@/api/movimientos";
import { productosApi } from "@/api/productos";
import { apiErrorMessage } from "@/api/client";
import { MovimientoFormModal } from "@/components/MovimientoFormModal";
import { Badge, Button, Card, Icon } from "@/components/ui";

export function MovimientosPage() {
  const [movimientos, setMovimientos] = useState<MovimientoStock[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      const [movs, prods] = await Promise.all([
        movimientosApi.list(),
        productosApi.list(),
      ]);
      setMovimientos(
        movs.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
        ),
      );
      setProductos(prods);
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function handleSubmit(data: MovimientoStockRequest) {
    await movimientosApi.create(data);
    await reload();
  }

  function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString("es-SV", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Movimientos</h1>
          <p className="text-sm text-ink-muted">
            Historial de entradas y salidas de stock.
          </p>
        </div>
        <Button
          leading={<Icon name="plus" size={16} />}
          onClick={() => setOpen(true)}
          disabled={productos.length === 0}
        >
          Nuevo movimiento
        </Button>
      </div>

      {loading && <Card className="py-8 text-center text-ink-muted">Cargando...</Card>}

      {error && (
        <Card className="border border-danger bg-danger-bg py-4 text-center text-danger-dark">
          {error}
        </Card>
      )}

      {!loading && !error && movimientos.length === 0 && (
        <Card className="py-12 text-center text-ink-muted">
          No hay movimientos registrados.
        </Card>
      )}

      {!loading && !error && movimientos.length > 0 && (
        <div className="grid gap-3">
          {movimientos.map((m) => (
            <Card key={m.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink-muted">#{m.id}</span>
                  <Badge
                    tone={m.tipo === "ENTRADA" ? "success" : "warning"}
                    size="sm"
                  >
                    {m.tipo}
                  </Badge>
                </div>
                <div className="mt-1 font-semibold text-ink dark:text-surface">
                  {m.productoNombre}
                </div>
                {m.motivo && (
                  <div className="text-sm text-ink-muted">{m.motivo}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">
                  {m.tipo === "ENTRADA" ? "+" : "-"}
                  {m.cantidad}
                </div>
                <div className="text-xs text-ink-muted">{formatDate(m.fecha)}</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <MovimientoFormModal
        open={open}
        productos={productos}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
