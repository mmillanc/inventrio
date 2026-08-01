import type { ModuleDefinition } from "@/modules/_core/types";
import salesConfig from "./config";
import SalesView from "./components/SalesView";

export const salesModule: ModuleDefinition = {
  config: salesConfig,
  View: SalesView,
};

export { salesConfig };
export { default as SalesView } from "./components/SalesView";
export { useSales } from "./hooks/useSales";
export type { Sale } from "./types";

export default salesModule;
