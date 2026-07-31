import type { ModuleDefinition } from "@/modules/_core/types";
import operatorsConfig from "./config";
import OperatorsView from "./components/OperatorsView";

export const operatorsModule: ModuleDefinition = {
  config: operatorsConfig,
  View: OperatorsView,
};

export { operatorsConfig };
export { default as OperatorList } from "./components/OperatorList";
export { default as AuditView } from "./components/AuditView";
export { default as OperatorsView } from "./components/OperatorsView";
export type { Operator } from "./types";

export default operatorsModule;
