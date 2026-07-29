"use client";

import { useMemo, useState } from "react";
import DataTable from "@/modules/_core/components/DataTable";
import StatCard from "@/modules/_core/components/StatCard";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import { referenceLabel, useReferences } from "@/modules/_core/hooks/useReferences";
import { formatDate, daysUntil } from "@/lib/utils";
import { movementColumns } from "@/modules/inventory/config";
import type { StockMovement } from "@/modules/inventory/types";
import { useLots } from "../hooks/useLots";

export function LotTraceability() {
  const { rows: lots, loading } = useLots();
  const { rows: movements } = useCrud<StockMovement>("stock_movements");
  const references = useReferences(["items", "suppliers", "lots"]);
  const [lotId, setLotId] = useState("");

  const lot = lots.find((entry) => entry.id === lotId) ?? null;
  const lotMovements = useMemo(
    () => movements.filter((movement) => movement.lot_id === lotId),
    [movements, lotId],
  );

  const balance = lotMovements.reduce((sum, movement) => {
    const amount = Number(movement.quantity ?? 0);
    if (movement.type === "in") return sum + amount;
    if (movement.type === "out") return sum - amount;
    return amount;
  }, 0);

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="lot-select" className="mb-1 block text-sm font-medium text-slate-700">
          Lote a rastrear
        </label>
        <select
          id="lot-select"
          value={lotId}
          onChange={(event) => setLotId(event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-500 sm:w-80"
        >
          <option value="">{loading ? "Cargando lotes..." : "Seleccionar lote..."}</option>
          {lots.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.code} · {referenceLabel(references, "items", "name", entry.item_id)}
            </option>
          ))}
        </select>
      </div>

      {!lot && (
        <p className="rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-400">
          Selecciona un lote para ver su trazabilidad.
        </p>
      )}

      {lot && (
        <>
          <div className="grid gap-3 sm:grid-cols-4">
            <StatCard
              label="Artículo"
              value={
                <span className="text-base">
                  {referenceLabel(references, "items", "name", lot.item_id)}
                </span>
              }
              hint={`Lote ${lot.code}`}
            />
            <StatCard
              label="Proveedor"
              value={
                <span className="text-base">
                  {referenceLabel(references, "suppliers", "name", lot.supplier_id)}
                </span>
              }
              hint={`Fabricado: ${formatDate(lot.manufactured_at)}`}
            />
            <StatCard
              label="Vencimiento"
              value={<span className="text-base">{formatDate(lot.expires_at)}</span>}
              hint={
                (daysUntil(lot.expires_at) ?? 0) < 0
                  ? "Vencido"
                  : `Faltan ${daysUntil(lot.expires_at)} días`
              }
              tone={(daysUntil(lot.expires_at) ?? 0) < 0 ? "danger" : "default"}
            />
            <StatCard
              label="Saldo por movimientos"
              value={balance}
              hint={`Cantidad declarada: ${lot.quantity}`}
              tone={balance === Number(lot.quantity) ? "success" : "warning"}
            />
          </div>

          <DataTable<StockMovement>
            columns={movementColumns}
            rows={lotMovements}
            references={references}
            emptyMessage="Este lote todavía no tiene movimientos"
          />

          {lot.notes && (
            <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">{lot.notes}</p>
          )}
        </>
      )}
    </div>
  );
}

export default LotTraceability;
