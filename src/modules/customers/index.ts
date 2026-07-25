import type { ModuleDefinition } from "@/modules/_core/types";
import customersConfig from "./config";
import CustomerList from "./components/CustomerList";

export const customersModule: ModuleDefinition = {
  config: customersConfig,
  View: CustomerList,
};

export { customersConfig };
export { default as CustomerList } from "./components/CustomerList";
export { useCustomers } from "./hooks/useCustomers";
export type { Customer } from "./types";

export default customersModule;
