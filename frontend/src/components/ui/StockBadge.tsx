import { getStockStatus } from "@/types/product";
import { Badge } from "./Badge";

interface StockBadgeProps {
  stock: number;
  stockMinimo: number;
  size?: "sm" | "md";
}

export function StockBadge({ stock, stockMinimo, size = "md" }: StockBadgeProps) {
  const status = getStockStatus(stock, stockMinimo);
  if (status === "out") {
    return (
      <Badge tone="danger" size={size} withDot>
        Sin stock
      </Badge>
    );
  }
  if (status === "low") {
    return (
      <Badge tone="warning" size={size} withDot>
        Stock bajo
      </Badge>
    );
  }
  return (
    <Badge tone="success" size={size} withDot>
      En stock
    </Badge>
  );
}
