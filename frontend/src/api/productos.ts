import { api } from "./client";
import type { Producto, ProductoRequest } from "@/types/product";

const PATH = "/productos";

export const productosApi = {
  list: () => api.get<Producto[]>(PATH).then((r) => r.data),
  get: (id: number) => api.get<Producto>(`${PATH}/${id}`).then((r) => r.data),
  create: (data: ProductoRequest) =>
    api.post<Producto>(PATH, data).then((r) => r.data),
  update: (id: number, data: ProductoRequest) =>
    api.put<Producto>(`${PATH}/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete<void>(`${PATH}/${id}`).then(() => undefined),
};
