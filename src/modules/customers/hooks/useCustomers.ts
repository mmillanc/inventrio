"use client";

import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { Customer } from "../types";

export function useCustomers() {
  return useCrud<Customer>("customers");
}
