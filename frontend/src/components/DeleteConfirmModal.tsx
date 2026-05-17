import { useState } from "react";
import type { Product } from "@/types/product";
import { Button, Card, Icon } from "@/components/ui";
import toast from "react-hot-toast";

// Responsable: Andres Zavala Alvarado (za21010)
// Tarea:
//   - Estilizar el modal segun el diseño de StockWise
//   - Mobile: bottom sheet (deslizable desde abajo, swipe-down para cerrar)
//   - Desktop: modal centrado con icono de alerta destacado
//   - Toast verde de confirmacion tras eliminar
//   - Como ultima tarea: revisar responsive global de todas las vistas
//     y ajustar breakpoints donde sea necesario
// Las props ya estan definidas, no cambiarlas para no romper la integracion.

interface DeleteConfirmModalProps {
  open: boolean;
  product?: Product;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export function DeleteConfirmModal({
  open,
  product,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!open || !product) return null;

  async function handleConfirm() {
    setDeleting(true);
    setErrorMsg(null);
    try {
      await onConfirm();
      toast.success("Producto eliminado correctamente", {
  style: {
    background: "#22c55e",
    color: "#fff",
  },
});
      onClose();
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "No se pudo eliminar el producto.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <Card className="w-full max-w-md rounded-b-none sm:rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger-bg text-danger">
            <Icon name="alertTri" size={20} stroke={2} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">Eliminar producto</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Vas a eliminar <strong>"{product.nombre}"</strong>. Esta accion
              no se puede deshacer.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-3 rounded-lg border border-danger bg-danger-bg px-3 py-2 text-sm text-danger-dark">
            {errorMsg}
          </div>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            disabled={deleting}
            leading={<Icon name="trash" size={16} />}
          >
            {deleting ? "Eliminando..." : "Si, eliminar"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
