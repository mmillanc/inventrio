import type { ModuleDefinition } from "@/modules/_core/types";
import suppliersConfig from "./config";
import SupplierList from "./components/SupplierList";

export const suppliersModule: ModuleDefinition = {
  config: suppliersConfig,
  View: SupplierList,
};

export { suppliersConfig };
export { default as SupplierList } from "./components/SupplierList";
export { useSuppliers } from "./hooks/useSuppliers";
export type { Supplier } from "./types";

export default suppliersModule;
