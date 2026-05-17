import type { Product } from "@/types/product";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    nombre: "Taladro inalambrico 18V",
    descripcion:
      "Taladro percutor con bateria de litio, incluye cargador y maletin.",
    precio: 89.99,
    stock: 42,
    stockMinimo: 10,
  },
  {
    id: 2,
    nombre: "Cinta metrica 5m",
    descripcion:
      "Cinta metrica retractil con freno automatico, carcasa antigolpes.",
    precio: 4.5,
    stock: 8,
    stockMinimo: 15,
  },
  {
    id: 3,
    nombre: "Casco de seguridad industrial",
    descripcion:
      "Casco ANSI Z89.1 con suspension de 4 puntos, color amarillo.",
    precio: 12.99,
    stock: 24,
    stockMinimo: 12,
  },
  {
    id: 4,
    nombre: "Guantes de nitrilo (caja 100u)",
    descripcion:
      "Guantes desechables sin polvo, talla M, resistentes a quimicos.",
    precio: 8.99,
    stock: 3,
    stockMinimo: 20,
  },
  {
    id: 5,
    nombre: "Llave inglesa 12 pulgadas",
    descripcion:
      "Llave ajustable cromada con apertura maxima de 38 mm.",
    precio: 7.49,
    stock: 56,
    stockMinimo: 15,
  },
  {
    id: 6,
    nombre: "Lijadora orbital 240W",
    descripcion:
      "Lijadora orbital con sistema de extraccion de polvo integrado.",
    precio: 34.99,
    stock: 12,
    stockMinimo: 8,
  },
  {
    id: 7,
    nombre: "Caja organizadora 25L",
    descripcion:
      "Caja apilable con tapa hermetica y manijas reforzadas.",
    precio: 6.29,
    stock: 0,
    stockMinimo: 10,
  },
  {
    id: 8,
    nombre: "Set de destornilladores 6 piezas",
    descripcion:
      "Juego de destornilladores Phillips y planos con mango ergonomico.",
    precio: 15.5,
    stock: 31,
    stockMinimo: 10,
  },
];

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatUSD(value: number): string {
  return usdFormatter.format(value);
}
