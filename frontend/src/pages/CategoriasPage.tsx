import { useEffect, useState } from "react";
import type { Categoria, CategoriaRequest } from "@/types/categoria";
import { categoriasApi } from "@/api/categorias";
import { apiErrorMessage } from "@/api/client";
import { CategoriaFormModal } from "@/components/CategoriaFormModal";
import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { Button, Card, Icon } from "@/components/ui";

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; categoria: Categoria }
  | { type: "delete"; categoria: Categoria };

export function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      setCategorias(await categoriasApi.list());
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function handleSubmit(data: CategoriaRequest) {
    if (modal.type === "edit") {
      await categoriasApi.update(modal.categoria.id, data);
    } else {
      await categoriasApi.create(data);
    }
    await reload();
  }

  async function handleConfirmDelete() {
    if (modal.type !== "delete") return;
    await categoriasApi.remove(modal.categoria.id);
    await reload();
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Categorias</h1>
          <p className="text-sm text-ink-muted">Clasificacion de productos.</p>
        </div>
        <Button
          leading={<Icon name="plus" size={16} />}
          onClick={() => setModal({ type: "create" })}
        >
          Nueva categoria
        </Button>
      </div>

      {loading && <Card className="py-8 text-center text-ink-muted">Cargando...</Card>}

      {error && (
        <Card className="border border-danger bg-danger-bg py-4 text-center text-danger-dark">
          {error}
        </Card>
      )}

      {!loading && !error && categorias.length === 0 && (
        <Card className="py-12 text-center text-ink-muted">
          Aun no hay categorias registradas.
        </Card>
      )}

      {!loading && !error && categorias.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {categorias.map((c) => (
            <Card key={c.id} className="flex flex-col gap-3">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs text-ink-muted">#{c.id}</div>
                <div className="mt-1 font-semibold text-ink dark:text-surface">
                  {c.nombre}
                </div>
                {c.descripcion && (
                  <div className="mt-1 text-sm text-ink-muted">{c.descripcion}</div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModal({ type: "edit", categoria: c })}
                  className="flex-1"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setModal({ type: "delete", categoria: c })}
                  className="flex-1"
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CategoriaFormModal
        open={modal.type === "create" || modal.type === "edit"}
        mode={modal.type === "edit" ? "editar" : "crear"}
        initialValue={modal.type === "edit" ? modal.categoria : undefined}
        onClose={() => setModal({ type: "none" })}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        open={modal.type === "delete"}
        titulo="Eliminar categoria"
        nombre={modal.type === "delete" ? modal.categoria.nombre : undefined}
        onClose={() => setModal({ type: "none" })}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
