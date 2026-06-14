import { useState } from "react";
import { Button, Card, Icon } from "@/components/ui";

interface ConfirmDeleteModalProps {
  open: boolean;
  titulo: string;
  nombre?: string;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export function ConfirmDeleteModal({
  open,
  titulo,
  nombre,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!open) return null;

  async function handleConfirm() {
    setDeleting(true);
    setErrorMsg(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "No se pudo eliminar el registro.",
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
            <h2 className="text-lg font-bold">{titulo}</h2>
            {nombre && (
              <p className="mt-1 text-sm text-ink-muted">
                Vas a eliminar <strong>"{nombre}"</strong>. Esta accion no se
                puede deshacer.
              </p>
            )}
          </div>
        </div>

        {errorMsg && (
          <div className="mt-3 rounded-lg border border-danger bg-danger-bg px-3 py-2 text-sm text-danger-dark">
            {errorMsg}
          </div>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={deleting}>
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
