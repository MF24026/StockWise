import { useEffect, useState, type FormEvent } from "react";
import type { Proveedor, ProveedorRequest } from "@/types/proveedor";
import { Button, Card, Field, Input } from "@/components/ui";

interface ProveedorFormModalProps {
  open: boolean;
  mode: "crear" | "editar";
  initialValue?: Proveedor;
  onClose: () => void;
  onSubmit: (data: ProveedorRequest) => Promise<void> | void;
}

const EMPTY: ProveedorRequest = {
  nombre: "",
  telefono: "",
  email: "",
  direccion: "",
};

export function ProveedorFormModal({
  open,
  mode,
  initialValue,
  onClose,
  onSubmit,
}: ProveedorFormModalProps) {
  const [data, setData] = useState<ProveedorRequest>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErrorMsg(null);
    setData(
      initialValue
        ? {
            nombre: initialValue.nombre,
            telefono: initialValue.telefono ?? "",
            email: initialValue.email ?? "",
            direccion: initialValue.direccion ?? "",
          }
        : EMPTY,
    );
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
        err instanceof Error ? err.message : "No se pudo guardar el proveedor.",
      );
    } finally {
      setSaving(false);
    }
  }

  const title = mode === "crear" ? "Nuevo proveedor" : "Editar proveedor";

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <Card className="w-full max-w-lg rounded-b-none sm:rounded-lg">
        <h2 className="mb-1 text-xl font-bold">{title}</h2>
        <p className="mb-4 text-sm text-ink-muted">
          Datos del proveedor que suministra productos al inventario.
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
              placeholder="Ej. Ferreteria El Martillo"
              required
            />
          </Field>

          <Field label="Telefono">
            <Input
              value={data.telefono ?? ""}
              onChange={(e) => setData({ ...data, telefono: e.target.value })}
              placeholder="Ej. 2222-1010"
            />
          </Field>

          <Field label="Email">
            <Input
              type="email"
              value={data.email ?? ""}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="contacto@proveedor.sv"
            />
          </Field>

          <Field label="Direccion">
            <Input
              value={data.direccion ?? ""}
              onChange={(e) => setData({ ...data, direccion: e.target.value })}
              placeholder="Ciudad, calle"
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
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
