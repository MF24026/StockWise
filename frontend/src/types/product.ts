import type { Categoria } from "./categoria";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  proveedorId: number;
  proveedorNombre: string;
  categorias: Categoria[];
  createdAt?: string;
}

export interface ProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  proveedorId: number;
  categoriaIds: number[];
}

export type Product = Producto;
export type ProductRequest = ProductoRequest;
export type ProductId = Producto["id"];

export type StockStatus = "out" | "low" | "ok";

export function getStockStatus(
  stock: number,
  stockMinimo: number,
): StockStatus {
  if (stock === 0) return "out";
  if (stock <= stockMinimo) return "low";
  return "ok";
}
