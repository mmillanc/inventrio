"use client";

import { useMemo } from "react";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { Item } from "../types";

export function useItems() {
  const crud = useCrud<Item>("items");

  const lowStock = useMemo(
    () => crud.rows.filter((item) => Number(item.quantity) <= Number(item.min_stock)),
    [crud.rows],
  );

  const totalValue = useMemo(
    () =>
      crud.rows.reduce(
        (sum, item) => sum + Number(item.quantity ?? 0) * Number(item.unit_cost ?? 0),
        0,
      ),
    [crud.rows],
  );

  return { ...crud, lowStock, totalValue };
}
