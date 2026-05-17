import { useEffect, useState, type FormEvent } from "react";
import type { Product, ProductRequest } from "@/types/product";
import { Button, Card, Field, Input, Textarea } from "@/components/ui";

// Responsables compartidos de este componente:
//   - Ricardo Ernesto Paiz Lemus (PL23022): mejorar comportamiento del modo "crear"
//   - Carlos Chinchilla (cm23003): mejorar comportamiento del modo "editar"
// Tarea:
//   - Estilizar el modal segun el diseño de StockWise
//   - Añadir validaciones (nombre requerido, precio mayor a 0, stock no negativo)
//   - Mostrar mensajes de error en cada campo
//   - Layout mobile (full screen / sheet) y desktop (modal centrado)
// Las props ya estan definidas, no cambiarlas para no romper la integracion.

interface ProductFormModalProps {
  open: boolean;
  mode: "crear" | "editar";
  initialValue?: Product;
  onClose: () => void;
  onSubmit: (data: ProductRequest) => Promise<void> | void;
}

const EMPTY: ProductRequest = {
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  stockMinimo: 0,
};

export function ProductFormModal({
  open,
  mode,
  initialValue,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const [data, setData] = useState<ProductRequest>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setErrorMsg(null);
      setData(
        initialValue
          ? {
              nombre: initialValue.nombre,
              descripcion: initialValue.descripcion ?? "",
              precio: initialValue.precio,
              stock: initialValue.stock,
              stockMinimo: initialValue.stockMinimo ?? 0,
            }
          : EMPTY,
      );
    }
  }, [open, initialValue]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    try {
      await onSubmit(data);
      onClose();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "No se pudo guardar el producto.",
      );
    } finally {
      setSaving(false);
    }
  }

  const title = mode === "crear" ? "Nuevo producto" : "Editar producto";
  const submitLabel =
    mode === "crear" ? "Guardar producto" : "Guardar cambios";

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <Card className="w-full max-w-lg rounded-b-none sm:rounded-lg">
        <h2 className="mb-1 text-xl font-bold">{title}</h2>
        <p className="mb-4 text-sm text-ink-muted">
          Completa los datos del producto. Los campos con asterisco son
          obligatorios.
        </p>

        {errorMsg && (
          <div className="mb-4 rounded-lg border border-danger bg-danger-bg px-3 py-2 text-sm text-danger-dark">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Field label="Nombre" required>
            <Input
              value={data.nombre}
              onChange={(e) => setData({ ...data, nombre: e.target.value })}
              placeholder="Ej. Taladro inalambrico 18V"
              required
            />
          </Field>

          <Field label="Descripcion">
            <Textarea
              value={data.descripcion}
              onChange={(e) =>
                setData({ ...data, descripcion: e.target.value })
              }
              placeholder="Describe el producto"
            />
          </Field>

          <Field label="Precio" required>
            <Input
              type="number"
              step="0.01"
              min="0"
              prefix="$"
              value={data.precio}
              onChange={(e) =>
                setData({ ...data, precio: Number(e.target.value) })
              }
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Stock actual" required>
              <Input
                type="number"
                min="0"
                value={data.stock}
                onChange={(e) =>
                  setData({ ...data, stock: Number(e.target.value) })
                }
                required
              />
            </Field>
            <Field label="Stock minimo" hint="Para alertas">
              <Input
                type="number"
                min="0"
                value={data.stockMinimo}
                onChange={(e) =>
                  setData({ ...data, stockMinimo: Number(e.target.value) })
                }
              />
            </Field>
          </div>

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
              {saving ? "Guardando..." : submitLabel}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
