import type { ModuleDefinition } from "@/modules/_core/types";
import salesConfig from "./config";
import SaleList from "./components/SaleList";

export const salesModule: ModuleDefinition = {
  config: salesConfig,
  View: SaleList,
};

export { salesConfig };
export { default as SaleList } from "./components/SaleList";
export { useSales } from "./hooks/useSales";
export type { Sale } from "./types";

export default salesModule;
