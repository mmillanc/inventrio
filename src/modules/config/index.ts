import type { ModuleDefinition } from "@/modules/_core/types";
import configModuleConfig from "./config";
import ConfigView from "./components/ConfigView";

export const configModule: ModuleDefinition = {
  config: configModuleConfig,
  View: ConfigView,
};

export { configModuleConfig };
export { default as StoreInfo } from "./components/StoreInfo";
export { default as TaxSettings } from "./components/TaxSettings";
export { default as PlanSelector } from "./components/PlanSelector";

export default configModule;
