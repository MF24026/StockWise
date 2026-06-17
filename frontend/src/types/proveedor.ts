export interface Proveedor {
  id: number;
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  createdAt?: string;
}

export interface ProveedorRequest {
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
}
