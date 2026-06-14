import { api } from "./client";
import type { Categoria, CategoriaRequest } from "@/types/categoria";

const PATH = "/categorias";

export const categoriasApi = {
  list: () => api.get<Categoria[]>(PATH).then((r) => r.data),
  get: (id: number) => api.get<Categoria>(`${PATH}/${id}`).then((r) => r.data),
  create: (data: CategoriaRequest) =>
    api.post<Categoria>(PATH, data).then((r) => r.data),
  update: (id: number, data: CategoriaRequest) =>
    api.put<Categoria>(`${PATH}/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete<void>(`${PATH}/${id}`).then(() => undefined),
};
