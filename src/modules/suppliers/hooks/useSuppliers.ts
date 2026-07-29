"use client";

import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { Supplier } from "../types";

export function useSuppliers() {
  return useCrud<Supplier>("suppliers");
}
