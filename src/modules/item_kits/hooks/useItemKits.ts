"use client";

import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { ItemKit } from "../types";

export function useItemKits() {
  return useCrud<ItemKit>("item_kits");
}
