import { useEffect, useState } from "react";
import type { Producto, ProductoRequest } from "@/types/product";
import type { Proveedor } from "@/types/proveedor";
import type { Categoria } from "@/types/categoria";
import { productosApi } from "@/api/productos";
import { proveedoresApi } from "@/api/proveedores";
import { categoriasApi } from "@/api/categorias";
import { apiErrorMessage } from "@/api/client";
import { ProductList } from "@/components/ProductList";
import { ProductFormModal } from "@/components/ProductFormModal";
import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { Button, Card, Icon } from "@/components/ui";

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; producto: Producto }
  | { type: "delete"; producto: Producto };

export function ProductsPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      const [prod, prov, cats] = await Promise.all([
        productosApi.list(),
        proveedoresApi.list(),
        categoriasApi.list(),
      ]);
      setProductos(prod);
      setProveedores(prov);
      setCategorias(cats);
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function handleSubmit(data: ProductoRequest) {
    if (modal.type === "edit") {
      await productosApi.update(modal.producto.id, data);
    } else {
      await productosApi.create(data);
    }
    await reload();
  }

  async function handleConfirmDelete() {
    if (modal.type !== "delete") return;
    await productosApi.remove(modal.producto.id);
    await reload();
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Productos</h1>
          <p className="text-sm text-ink-muted">Inventario del sistema StockWise.</p>
        </div>
        <Button
          leading={<Icon name="plus" size={16} />}
          onClick={() => setModal({ type: "create" })}
          disabled={proveedores.length === 0}
        >
          Nuevo producto
        </Button>
      </div>

      {loading && <Card className="py-8 text-center text-ink-muted">Cargando...</Card>}

      {error && (
        <Card className="border border-danger bg-danger-bg py-4 text-center text-danger-dark">
          {error}
        </Card>
      )}

      {!loading && !error && (
        <ProductList
          productos={productos}
          onEdit={(producto) => setModal({ type: "edit", producto })}
          onDelete={(producto) => setModal({ type: "delete", producto })}
        />
      )}

      <ProductFormModal
        open={modal.type === "create" || modal.type === "edit"}
        mode={modal.type === "edit" ? "editar" : "crear"}
        initialValue={modal.type === "edit" ? modal.producto : undefined}
        proveedores={proveedores}
        categorias={categorias}
        onClose={() => setModal({ type: "none" })}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        open={modal.type === "delete"}
        titulo="Eliminar producto"
        nombre={modal.type === "delete" ? modal.producto.nombre : undefined}
        onClose={() => setModal({ type: "none" })}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
