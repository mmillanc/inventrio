import type { ModuleDefinition } from "@/modules/_core/types";
import itemKitsConfig from "./config";
import ItemKitList from "./components/ItemKitList";

export const itemKitsModule: ModuleDefinition = {
  config: itemKitsConfig,
  View: ItemKitList,
};

export { itemKitsConfig };
export { default as ItemKitList } from "./components/ItemKitList";
export { useItemKits } from "./hooks/useItemKits";
export type { ItemKit, ItemKitItem } from "./types";

export default itemKitsModule;
