# StockWise Frontend

Aplicacion SPA del sistema de gestion de inventario StockWise. Simulacion
visual del CRUD con datos hardcodeados, sin conexion real al backend.

## Stack

- Vite 6 + React 18 + TypeScript 5
- Tailwind CSS 3 con tokens propios y soporte de dark mode

## Requisitos

- Node.js 20+
- npm 10+

## Como correr

```bash
cd frontend
npm install
npm run dev
```

El servidor levanta en `http://localhost:5173` (si el puerto esta ocupado,
Vite usa el siguiente y lo indica en la terminal).

## Modelo de datos

`Product` (en `src/types/product.ts`):

```ts
interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
}
```

## Estructura

```
frontend/src/
  components/
    ui/                     primitivos (Button, Card, Badge, etc.)
    Navbar.tsx              header con toggle de tema
    ProductList.tsx         listado de productos
    ProductFormModal.tsx    form crear y editar
    DeleteConfirmModal.tsx  confirmar eliminacion
  context/ThemeContext.tsx
  hooks/useTheme.ts
  mocks/products.ts
  pages/ProductsPage.tsx
  types/product.ts
  App.tsx
  main.tsx
  index.css
```

## Comandos

| Comando | Descripcion |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve el build de produccion |
| `npm run lint` | Linter |
