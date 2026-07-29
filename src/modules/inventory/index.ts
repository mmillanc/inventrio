import type { ModuleDefinition } from "@/modules/_core/types";
import inventoryConfig from "./config";
import InventoryView from "./components/InventoryView";

export const inventoryModule: ModuleDefinition = {
  config: inventoryConfig,
  View: InventoryView,
};

export { inventoryConfig };
export { default as ItemList } from "./components/ItemList";
export { default as ItemForm } from "./components/ItemForm";
export { default as StockMovements } from "./components/StockMovements";
export { useItems } from "./hooks/useItems";
export type { Item, StockMovement } from "./types";

export default inventoryModule;
