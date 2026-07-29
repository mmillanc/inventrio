"use client";

import { useMemo } from "react";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { Sale } from "../types";

export function useSales() {
  const crud = useCrud<Sale>("sales");

  const total = useMemo(
    () =>
      crud.rows.reduce(
        (sum, sale) => sum + Number(sale.quantity ?? 0) * Number(sale.unit_price ?? 0),
        0,
      ),
    [crud.rows],
  );

  return { ...crud, total };
}
