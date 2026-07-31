"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import CrudDialog from "@/modules/_core/components/CrudDialog";
import DataTable from "@/modules/_core/components/DataTable";
import ExportTools from "@/modules/_core/components/ExportTools";
import SearchBar from "@/modules/_core/components/SearchBar";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import { useReferences, referenceLabel } from "@/modules/_core/hooks/useReferences";
import { todayISO } from "@/lib/utils";
import { movementColumns, movementFields } from "../config";
import type { StockMovement } from "../types";

export function StockMovements() {
  const { rows, loading, error, create } = useCrud<StockMovement>("stock_movements");
  const references = useReferences(["items", "lots", "operators"]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const visibleRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const sorted = [...rows].sort((a, b) => String(b.moved_at).localeCompare(String(a.moved_at)));
    if (!term) return sorted;
    return sorted.filter((movement) =>
      [
        movement.reason,
        movement.type,
        referenceLabel(references, "items", "name", movement.item_id),
        referenceLabel(references, "lots", "code", movement.lot_id),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [rows, search, references]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar movimientos..." />
        <div className="flex gap-2">
          <ExportTools filename="movimientos" columns={movementColumns} rows={visibleRows} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <Plus className="size-4" /> Registrar movimiento
          </button>
        </div>
      </div>

      <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
        Cada movimiento actualiza el stock del artículo: entrada suma, salida resta y el ajuste fija
        la cantidad indicada.
      </p>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <DataTable<StockMovement>
        columns={movementColumns}
        rows={visibleRows}
        references={references}
        loading={loading}
        emptyMessage="Sin movimientos registrados"
      />

      <CrudDialog
        open={open}
        title="Registrar movimiento de stock"
        fields={movementFields}
        initialValues={{ moved_at: todayISO(), type: "in" }}
        references={references}
        submitLabel="Registrar"
        onClose={() => setOpen(false)}
        onSubmit={create}
      />
    </div>
  );
}

export default StockMovements;
