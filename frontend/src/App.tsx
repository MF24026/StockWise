import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/context/ThemeContext";
import { ProductsPage } from "@/pages/ProductsPage";

export default function App() {
  return (
    <ThemeProvider>
      <ProductsPage />
    </ThemeProvider>
  );
}
