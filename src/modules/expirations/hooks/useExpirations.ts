"use client";

import { useMemo } from "react";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import { useSettings } from "@/modules/_core/hooks/useSettings";
import { daysUntil } from "@/lib/utils";
import type { Lot } from "@/modules/lots/types";
import type { ExpirationEntry, ExpirationState } from "../types";

export function useExpirations() {
  const { rows, loading, error, refresh } = useCrud<Lot>("lots");
  const { settings } = useSettings();
  const alertDays = settings?.expiration_alert_days ?? 30;

  const entries = useMemo<ExpirationEntry[]>(() => {
    return rows
      .filter((lot) => Boolean(lot.expires_at))
      .map((lot) => {
        const days = daysUntil(lot.expires_at) ?? 0;
        const state: ExpirationState =
          days < 0 ? "vencido" : days <= alertDays ? "por vencer" : "vigente";
        return { ...lot, days_left: days, state };
      })
      .sort((a, b) => a.days_left - b.days_left);
  }, [rows, alertDays]);

  const expired = entries.filter((entry) => entry.state === "vencido");
  const expiringSoon = entries.filter((entry) => entry.state === "por vencer");

  const byDate = useMemo(() => {
    const map = new Map<string, ExpirationEntry[]>();
    for (const entry of entries) {
      const key = String(entry.expires_at).slice(0, 10);
      map.set(key, [...(map.get(key) ?? []), entry]);
    }
    return map;
  }, [entries]);

  return { entries, expired, expiringSoon, byDate, alertDays, loading, error, refresh };
}
