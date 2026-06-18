import { useEffect, useState } from "react";
import type { Proveedor, ProveedorRequest } from "@/types/proveedor";
import { proveedoresApi } from "@/api/proveedores";
import { apiErrorMessage } from "@/api/client";
import { ProveedorFormModal } from "@/components/ProveedorFormModal";
import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { Button, Card, Icon } from "@/components/ui";

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; proveedor: Proveedor }
  | { type: "delete"; proveedor: Proveedor };

export function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      setProveedores(await proveedoresApi.list());
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function handleSubmit(data: ProveedorRequest) {
    if (modal.type === "edit") {
      await proveedoresApi.update(modal.proveedor.id, data);
    } else {
      await proveedoresApi.create(data);
    }
    await reload();
  }

  async function handleConfirmDelete() {
    if (modal.type !== "delete") return;
    await proveedoresApi.remove(modal.proveedor.id);
    await reload();
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Proveedores</h1>
          <p className="text-sm text-ink-muted">Administra y consulta los proveedores registrados en el sistema.</p>
        </div>
        <Button
          leading={<Icon name="plus" size={16} />}
          onClick={() => setModal({ type: "create" })}
        >
          Nuevo proveedor
        </Button>
      </div>

      {loading && <Card className="py-8 text-center text-ink-muted">Cargando...</Card>}

      {error && (
        <Card className="border border-danger bg-danger-bg py-4 text-center text-danger-dark">
          {error}
        </Card>
      )}

      {!loading && !error && proveedores.length === 0 && (
        <Card className="py-12 text-center text-ink-muted">
          Aún no se han registrado proveedores...
        </Card>
      )}

      {!loading && !error && proveedores.length > 0 && (
        <div className="grid gap-3">
          {proveedores.map((p) => (
            <Card
              key={p.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs text-ink-muted">#{p.id}</div>
                <div className="mt-1 font-semibold text-ink dark:text-surface">
                  {p.nombre}
                </div>
                <div className="mt-1 text-sm text-ink-muted">
                  {p.email && <span className="mr-3">{p.email}</span>}
                  {p.telefono && <span className="mr-3">{p.telefono}</span>}
                  {p.direccion && <span>{p.direccion}</span>}
                </div>
              </div>
              <div className="flex gap-2 sm:flex-col">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModal({ type: "edit", proveedor: p })}
                  className="flex-1 sm:flex-none"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setModal({ type: "delete", proveedor: p })}
                  className="flex-1 sm:flex-none"
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ProveedorFormModal
        open={modal.type === "create" || modal.type === "edit"}
        mode={modal.type === "edit" ? "editar" : "crear"}
        initialValue={modal.type === "edit" ? modal.proveedor : undefined}
        onClose={() => setModal({ type: "none" })}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        open={modal.type === "delete"}
        titulo="Eliminar proveedor"
        nombre={modal.type === "delete" ? modal.proveedor.nombre : undefined}
        onClose={() => setModal({ type: "none" })}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
