"use client";

import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { StockLocation } from "../types";

export function useStockLocations() {
  return useCrud<StockLocation>("stock_locations");
}
