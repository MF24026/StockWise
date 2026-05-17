export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
}

export type ProductRequest = Omit<Product, "id">;

export type ProductId = Product["id"];

export type StockStatus = "out" | "low" | "ok";

export function getStockStatus(
  stock: number,
  stockMinimo: number,
): StockStatus {
  if (stock === 0) return "out";
  if (stock <= stockMinimo) return "low";
  return "ok";
}
