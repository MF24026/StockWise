import { useEffect, useState, type FormEvent } from "react";
import type { MovimientoStockRequest, TipoMovimiento } from "@/types/movimiento";
import type { Producto } from "@/types/product";
import { Button, Card, Field, Input } from "@/components/ui";

interface MovimientoFormModalProps {
  open: boolean;
  productos: Producto[];
  onClose: () => void;
  onSubmit: (data: MovimientoStockRequest) => Promise<void> | void;
}

const EMPTY: MovimientoStockRequest = {
  productoId: 0,
  tipo: "ENTRADA",
  cantidad: 1,
  motivo: "",
};

export function MovimientoFormModal({
  open,
  productos,
  onClose,
  onSubmit,
}: MovimientoFormModalProps) {
  const [data, setData] = useState<MovimientoStockRequest>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErrorMsg(null);
    setData({ ...EMPTY, productoId: productos[0]?.id ?? 0 });
  }, [open, productos]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.productoId) {
      setErrorMsg("Debes seleccionar un producto.");
      return;
    }
    setSaving(true);
    setErrorMsg(null);
    try {
      await onSubmit(data);
      onClose();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "No se pudo registrar el movimiento.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <Card className="w-full max-w-lg rounded-b-none sm:rounded-lg">
        <h2 className="mb-1 text-xl font-bold">Nuevo movimiento</h2>
        <p className="mb-4 text-sm text-ink-muted">
          Las entradas suman stock y las salidas lo restan.
        </p>

        {errorMsg && (
          <div className="mb-4 rounded-lg border border-danger bg-danger-bg px-3 py-2 text-sm text-danger-dark">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Field label="Producto" required>
            <select
              className="w-full rounded-md border border-ink-subtle/40 bg-surface px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none dark:bg-ink-strong dark:text-surface"
              value={data.productoId}
              onChange={(e) =>
                setData({ ...data, productoId: Number(e.target.value) })
              }
              required
            >
              <option value={0} disabled>
                Selecciona un producto
              </option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} (stock {p.stock})
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tipo" required>
            <div className="flex gap-2">
              {(["ENTRADA", "SALIDA"] as TipoMovimiento[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setData({ ...data, tipo: t })}
                  className={[
                    "flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                    data.tipo === t
                      ? "border-brand bg-brand text-white"
                      : "border-ink-subtle/40 text-ink-muted hover:bg-ink-subtle/10",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Cantidad" required>
            <Input
              type="number"
              min="1"
              value={data.cantidad}
              onChange={(e) => setData({ ...data, cantidad: Number(e.target.value) })}
              required
            />
          </Field>

          <Field label="Motivo">
            <Input
              value={data.motivo ?? ""}
              onChange={(e) => setData({ ...data, motivo: e.target.value })}
              placeholder="Ej. Compra al proveedor / Venta mayorista"
            />
          </Field>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
