import type { ModuleDefinition } from "@/modules/_core/types";
import stockLocationsConfig from "./config";
import StockLocationList from "./components/StockLocationList";

export const stockLocationsModule: ModuleDefinition = {
  config: stockLocationsConfig,
  View: StockLocationList,
};

export { stockLocationsConfig };
export { default as StockLocationList } from "./components/StockLocationList";
export { useStockLocations } from "./hooks/useStockLocations";
export type { StockLocation } from "./types";

export default stockLocationsModule;
