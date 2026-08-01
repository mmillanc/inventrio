"use client";

import CrudView from "@/modules/_core/components/CrudView";
import stockLocationsConfig from "../config";
import type { StockLocation } from "../types";

export function StockLocationList() {
  return <CrudView<StockLocation> config={stockLocationsConfig} newLabel="Nueva ubicación" />;
}

export default StockLocationList;
