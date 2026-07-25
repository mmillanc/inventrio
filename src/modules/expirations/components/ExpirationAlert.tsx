"use client";

import { useMemo, useState } from "react";
import DataTable from "@/modules/_core/components/DataTable";
import ExportTools from "@/modules/_core/components/ExportTools";
import SearchBar from "@/modules/_core/components/SearchBar";
import StatCard from "@/modules/_core/components/StatCard";
import { useReferences } from "@/modules/_core/hooks/useReferences";
import expirationsConfig from "../config";
import { useExpirations } from "../hooks/useExpirations";
import type { ExpirationEntry } from "../types";

export function ExpirationAlert() {
  const { entries, expired, expiringSoon, alertDays, loading } = useExpirations();
  const references = useReferences(["items"]);
  const [search, setSearch] = useState("");
  const [onlyAlerts, setOnlyAlerts] = useState(true);

  const visibleRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return entries
      .filter((entry) => (onlyAlerts ? entry.state !== "vigente" : true))
      .filter((entry) => !term || entry.code.toLowerCase().includes(term));
  }, [entries, onlyAlerts, search]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Lotes con vencimiento" value={entries.length} />
        <StatCard
          label={`Vencen en ${alertDays} días`}
          value={expiringSoon.length}
          tone={expiringSoon.length > 0 ? "warning" : "success"}
        />
        <StatCard
          label="Vencidos"
          value={expired.length}
          tone={expired.length > 0 ? "danger" : "success"}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar lote..." />
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={onlyAlerts}
              onChange={(event) => setOnlyAlerts(event.target.checked)}
              className="size-4 rounded border-slate-300"
            />
            Solo alertas
          </label>
        </div>
        <ExportTools
          filename="vencimientos"
          columns={expirationsConfig.columns}
          rows={visibleRows}
        />
      </div>

      <DataTable<ExpirationEntry>
        columns={expirationsConfig.columns}
        rows={visibleRows}
        references={references}
        loading={loading}
        emptyMessage="No hay lotes en alerta"
        rowClassName={(entry) =>
          entry.state === "vencido"
            ? "bg-red-50/70"
            : entry.state === "por vencer"
              ? "bg-amber-50/70"
              : ""
        }
      />
    </div>
  );
}

export default ExpirationAlert;
