import { useEffect, useState, type FormEvent } from "react";
import type { Producto, ProductoRequest } from "@/types/product";
import type { Proveedor } from "@/types/proveedor";
import type { Categoria } from "@/types/categoria";
import { Button, Card, Field, Input, Textarea } from "@/components/ui";

interface ProductFormModalProps {
  open: boolean;
  mode: "crear" | "editar";
  initialValue?: Producto;
  proveedores: Proveedor[];
  categorias: Categoria[];
  onClose: () => void;
  onSubmit: (data: ProductoRequest) => Promise<void> | void;
}

const EMPTY: ProductoRequest = {
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  stockMinimo: 0,
  proveedorId: 0,
  categoriaIds: [],
};

export function ProductFormModal({
  open,
  mode,
  initialValue,
  proveedores,
  categorias,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const [data, setData] = useState<ProductoRequest>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (!open) return;
    setErrorMsg(null);
    if (initialValue) {
      setData({
        nombre: initialValue.nombre,
        descripcion: initialValue.descripcion ?? "",
        precio: Number(initialValue.precio),
        stock: initialValue.stock,
        stockMinimo: initialValue.stockMinimo,
        proveedorId: initialValue.proveedorId,
        categoriaIds: initialValue.categorias.map((c) => c.id),
      });
    } else {
      setData({
        ...EMPTY,
        proveedorId: proveedores[0]?.id ?? 0,
      });
    }
  }, [open, initialValue, proveedores]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.proveedorId) {
      setErrorMsg("Debes seleccionar un proveedor.");
      return;
    }
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

  function toggleCategoria(id: number) {
    setData((prev) => ({
      ...prev,
      categoriaIds: prev.categoriaIds.includes(id)
        ? prev.categoriaIds.filter((c) => c !== id)
        : [...prev.categoriaIds, id],
    }));
  }

  const title = mode === "crear" ? "Registrar producto" : "Actualizar producto";
  const submitLabel = mode === "crear" ? "Guardar producto" : "Guardar cambios";

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <Card className="max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-b-none sm:rounded-lg">
        <h2 className="mb-1 text-xl font-bold">{title}</h2>
        <p className="mb-4 text-sm text-ink-muted">
          Completa la información del producto. Los campos marcados con (*) son
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
              placeholder="Ej. Taladro inalámbrico 18V"
              required
            />
            {fieldErrors.nombre && (
  <p className="text-sm text-red-500">{fieldErrors.nombre}</p>
)}
          </Field>

          <Field label="Descripción">
            <Textarea
              value={data.descripcion}
              onChange={(e) => setData({ ...data, descripcion: e.target.value })}
              placeholder="Ingrese una descripción del producto"
            />
          </Field>

          <Field label="Precio" required>
            <Input
              type="number"
              step="0.01"
              min="0"
              prefix="$"
              value={data.precio}
              onChange={(e) => setData({ ...data, precio: Number(e.target.value) })}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Stock actual" required>
              <Input
                type="number"
                min="0"
                value={data.stock}
                onChange={(e) => setData({ ...data, stock: Number(e.target.value) })}
                required
              />
            </Field>

            <Field label="Stock mínimo" hint="Cantidad mínima para generar alertas">
              <Input
                type="number"
                min="0"
                value={data.stockMinimo}
                onChange={(e) =>
                  setData({ ...data, stockMinimo: Number(e.target.value) })
                }
               />

               {fieldErrors.stockMinimo && (
               <p className="text-sm text-red-500">{fieldErrors.stockMinimo}</p>
                )}
            </Field>


          </div>

          <Field label="Proveedor" required>
            <select
              className="w-full rounded-md border border-ink-subtle/40 bg-surface px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none dark:bg-ink-strong dark:text-surface"
              value={data.proveedorId}
              onChange={(e) =>
                setData({ ...data, proveedorId: Number(e.target.value) })
              }
              required
            >
              <option value={0} disabled>
                Seleccione un proveedor
              </option>
              {proveedores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Categorías" hint="Seleccione una o varias categorías">
            <div className="flex flex-wrap gap-2">
              {categorias.map((c) => {
                const active = data.categoriaIds.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategoria(c.id)}
                    className={[
                      "rounded-full border px-3 py-1 text-xs transition-colors",
                      active
                        ? "border-brand bg-brand text-white"
                        : "border-ink-subtle/40 text-ink-muted hover:bg-ink-subtle/10",
                    ].join(" ")}
                  >
                    {c.nombre}
                  </button>
                );
              })}
            </div>
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
              {saving ? "Guardando información..." : submitLabel}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
