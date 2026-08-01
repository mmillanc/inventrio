"use client";

import CrudView from "@/modules/_core/components/CrudView";
import itemKitsConfig from "../config";
import type { ItemKit } from "../types";

export function ItemKitList() {
  return <CrudView<ItemKit> config={itemKitsConfig} newLabel="Nuevo kit" />;
}

export default ItemKitList;
