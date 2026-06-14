import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProveedoresPage } from "@/pages/ProveedoresPage";
import { CategoriasPage } from "@/pages/CategoriasPage";
import { MovimientosPage } from "@/pages/MovimientosPage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-surface-subtle text-ink dark:bg-ink-strong dark:text-surface">
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
            <Routes>
              <Route path="/" element={<Navigate to="/productos" replace />} />
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/proveedores" element={<ProveedoresPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/movimientos" element={<MovimientosPage />} />
              <Route path="*" element={<Navigate to="/productos" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
