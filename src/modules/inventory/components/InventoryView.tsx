"use client";

import ModuleLayout from "@/modules/_core/components/ModuleLayout";
import Tabs from "@/modules/_core/components/Tabs";
import inventoryConfig from "../config";
import ItemList from "./ItemList";
import StockMovements from "./StockMovements";

export function InventoryView() {
  return (
    <ModuleLayout title={inventoryConfig.title} description={inventoryConfig.description}>
      <Tabs
        items={[
          { id: "items", label: "Artículos", content: <ItemList /> },
          { id: "movements", label: "Movimientos", content: <StockMovements /> },
        ]}
      />
    </ModuleLayout>
  );
}

export default InventoryView;
