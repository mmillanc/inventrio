import type { ModuleDefinition } from "@/modules/_core/types";
import receivingsConfig from "./config";
import ReceivingList from "./components/ReceivingList";

export const receivingsModule: ModuleDefinition = {
  config: receivingsConfig,
  View: ReceivingList,
};

export { receivingsConfig };
export { default as ReceivingList } from "./components/ReceivingList";
export { useReceivings } from "./hooks/useReceivings";
export type { Receiving, ReceivingItem } from "./types";

export default receivingsModule;
