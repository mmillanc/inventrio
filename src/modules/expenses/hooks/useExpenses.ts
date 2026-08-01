"use client";

import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { Expense } from "../types";

export function useExpenses() {
  return useCrud<Expense>("expenses");
}
