import { useState } from "react";
import type { Product, ProductRequest } from "@/types/product";
import { SAMPLE_PRODUCTS } from "@/mocks/products";
import { Navbar } from "@/components/Navbar";
import { ProductList } from "@/components/ProductList";
import { ProductFormModal } from "@/components/ProductFormModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { Button, Icon } from "@/components/ui";

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; product: Product }
  | { type: "delete"; product: Product };

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [modal, setModal] = useState<ModalState>({ type: "none" });

  function nextId(): number {
    return products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  }

  function handleSubmit(data: ProductRequest) {
    if (modal.type === "edit") {
      const editingId = modal.product.id;
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...data, id: editingId } : p)),
      );
    } else {
      setProducts((prev) => [...prev, { ...data, id: nextId() }]);
    }
  }

  function handleConfirmDelete() {
    if (modal.type !== "delete") return;
    const targetId = modal.product.id;
    setProducts((prev) => prev.filter((p) => p.id !== targetId));
  }

  return (
    <div className="min-h-screen bg-surface-subtle text-ink dark:bg-ink-strong dark:text-surface">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Productos
            </h1>
            <p className="text-sm text-ink-muted">
              Inventario del sistema StockWise.
            </p>
          </div>
          <Button
            leading={<Icon name="plus" size={16} />}
            onClick={() => setModal({ type: "create" })}
          >
            Nuevo producto
          </Button>
        </div>

        <ProductList
          products={products}
          onEdit={(product) => setModal({ type: "edit", product })}
          onDelete={(product) => setModal({ type: "delete", product })}
        />
      </main>

      <ProductFormModal
        open={modal.type === "create" || modal.type === "edit"}
        mode={modal.type === "edit" ? "editar" : "crear"}
        initialValue={modal.type === "edit" ? modal.product : undefined}
        onClose={() => setModal({ type: "none" })}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmModal
        open={modal.type === "delete"}
        product={modal.type === "delete" ? modal.product : undefined}
        onClose={() => setModal({ type: "none" })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
