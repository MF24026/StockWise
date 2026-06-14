export type TipoMovimiento = "ENTRADA" | "SALIDA";

export interface MovimientoStock {
  id: number;
  productoId: number;
  productoNombre: string;
  tipo: TipoMovimiento;
  cantidad: number;
  motivo?: string;
  fecha: string;
}

export interface MovimientoStockRequest {
  productoId: number;
  tipo: TipoMovimiento;
  cantidad: number;
  motivo?: string;
}
