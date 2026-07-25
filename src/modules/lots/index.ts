import type { ModuleDefinition } from "@/modules/_core/types";
import lotsConfig from "./config";
import LotsView from "./components/LotsView";

export const lotsModule: ModuleDefinition = {
  config: lotsConfig,
  View: LotsView,
};

export { lotsConfig };
export { default as LotList } from "./components/LotList";
export { default as LotTraceability } from "./components/LotTraceability";
export { useLots } from "./hooks/useLots";
export type { Lot, LotStatus } from "./types";

export default lotsModule;
