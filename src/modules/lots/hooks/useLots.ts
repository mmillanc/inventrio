"use client";

import { useMemo } from "react";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import { daysUntil } from "@/lib/utils";
import type { Lot } from "../types";

export function useLots(alertDays = 30) {
  const crud = useCrud<Lot>("lots");

  const expired = useMemo(
    () => crud.rows.filter((lot) => (daysUntil(lot.expires_at) ?? Infinity) < 0),
    [crud.rows],
  );

  const expiringSoon = useMemo(
    () =>
      crud.rows.filter((lot) => {
        const days = daysUntil(lot.expires_at);
        return days !== null && days >= 0 && days <= alertDays;
      }),
    [crud.rows, alertDays],
  );

  return { ...crud, expired, expiringSoon };
}
