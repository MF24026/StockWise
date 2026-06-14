import { api } from "./client";
import type { Proveedor, ProveedorRequest } from "@/types/proveedor";

const PATH = "/proveedores";

export const proveedoresApi = {
  list: () => api.get<Proveedor[]>(PATH).then((r) => r.data),
  get: (id: number) => api.get<Proveedor>(`${PATH}/${id}`).then((r) => r.data),
  create: (data: ProveedorRequest) =>
    api.post<Proveedor>(PATH, data).then((r) => r.data),
  update: (id: number, data: ProveedorRequest) =>
    api.put<Proveedor>(`${PATH}/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete<void>(`${PATH}/${id}`).then(() => undefined),
};
