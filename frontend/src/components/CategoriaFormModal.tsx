import { useEffect, useState, type FormEvent } from "react";
import type { Categoria, CategoriaRequest } from "@/types/categoria";
import { Button, Card, Field, Input, Textarea } from "@/components/ui";

interface CategoriaFormModalProps {
  open: boolean;
  mode: "crear" | "editar";
  initialValue?: Categoria;
  onClose: () => void;
  onSubmit: (data: CategoriaRequest) => Promise<void> | void;
}

const EMPTY: CategoriaRequest = { nombre: "", descripcion: "" };

export function CategoriaFormModal({
  open,
  mode,
  initialValue,
  onClose,
  onSubmit,
}: CategoriaFormModalProps) {
  const [data, setData] = useState<CategoriaRequest>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErrorMsg(null);
    setData(
      initialValue
        ? { nombre: initialValue.nombre, descripcion: initialValue.descripcion ?? "" }
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
        err instanceof Error ? err.message : "No se pudo guardar la categoria.",
      );
    } finally {
      setSaving(false);
    }
  }

  const title = mode === "crear" ? "Nueva categoria" : "Editar categoria";

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <Card className="w-full max-w-lg rounded-b-none sm:rounded-lg">
        <h2 className="mb-1 text-xl font-bold">{title}</h2>
        <p className="mb-4 text-sm text-ink-muted">
          Las categorias agrupan productos para facilitar la busqueda.
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
              placeholder="Ej. Herramientas electricas"
              required
            />
          </Field>

          <Field label="Descripcion">
            <Textarea
              value={data.descripcion ?? ""}
              onChange={(e) => setData({ ...data, descripcion: e.target.value })}
              placeholder="Describe la categoria"
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
