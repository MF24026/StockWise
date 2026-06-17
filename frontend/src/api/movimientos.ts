import { api } from "./client";
import type {
  MovimientoStock,
  MovimientoStockRequest,
} from "@/types/movimiento";

const PATH = "/movimientos";

export const movimientosApi = {
  list: (productoId?: number) =>
    api
      .get<MovimientoStock[]>(PATH, {
        params: productoId ? { productoId } : undefined,
      })
      .then((r) => r.data),
  create: (data: MovimientoStockRequest) =>
    api.post<MovimientoStock>(PATH, data).then((r) => r.data),
};
