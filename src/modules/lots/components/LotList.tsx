"use client";

import CrudView from "@/modules/_core/components/CrudView";
import StatCard from "@/modules/_core/components/StatCard";
import { useSettings } from "@/modules/_core/hooks/useSettings";
import { daysUntil } from "@/lib/utils";
import lotsConfig from "../config";
import type { Lot } from "../types";

export function LotList() {
  const { settings } = useSettings();
  const alertDays = settings?.expiration_alert_days ?? 30;

  return (
    <CrudView<Lot>
      config={lotsConfig}
      newLabel="Nuevo lote"
      rowClassName={(lot) => {
        const days = daysUntil(lot.expires_at);
        if (days === null) return "";
        if (days < 0) return "bg-red-50/70";
        if (days <= alertDays) return "bg-amber-50/70";
        return "";
      }}
      header={(lots) => {
        const expired = lots.filter((lot) => (daysUntil(lot.expires_at) ?? Infinity) < 0);
        const soon = lots.filter((lot) => {
          const days = daysUntil(lot.expires_at);
          return days !== null && days >= 0 && days <= alertDays;
        });
        return (
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="Lotes" value={lots.length} hint="Registrados" />
            <StatCard
              label={`Vencen en ${alertDays} días`}
              value={soon.length}
              tone={soon.length > 0 ? "warning" : "success"}
            />
            <StatCard
              label="Vencidos"
              value={expired.length}
              tone={expired.length > 0 ? "danger" : "success"}
            />
          </div>
        );
      }}
    />
  );
}

export default LotList;
