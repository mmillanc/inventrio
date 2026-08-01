"use client";

import { useMemo, useState } from "react";
import DataTable from "@/modules/_core/components/DataTable";
import ExportTools from "@/modules/_core/components/ExportTools";
import SearchBar from "@/modules/_core/components/SearchBar";
import StatCard from "@/modules/_core/components/StatCard";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import { referenceLabel, useReferences } from "@/modules/_core/hooks/useReferences";
import { formatDate } from "@/lib/utils";
import type { BaseRecord } from "@/modules/_core/types";
import type { ColumnConfig } from "@/modules/_core/types";

interface AuditEntry extends BaseRecord {
  table_name: string;
  record_id: string;
  action: string;
  changed_by: string;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
}

const TABLE_LABELS: Record<string, string> = {
  items: "Artículos",
  stock_movements: "Movimientos",
  lots: "Lotes",
  suppliers: "Proveedores",
  operators: "Operadores",
  settings: "Configuración",
};

const ACTION_LABELS: Record<string, string> = {
  INSERT: "Creación",
  UPDATE: "Modificación",
  DELETE: "Eliminación",
};

const auditColumns: ColumnConfig[] = [
  { key: "created_at", label: "Fecha", format: "date" },
  { key: "table_name", label: "Tabla", format: "badge" },
  { key: "action", label: "Acción", format: "badge" },
  { key: "changed_by", label: "Usuario" },
  { key: "record_id", label: "Registro" },
];

export function AuditView() {
  const { rows, loading, error } = useCrud<AuditEntry>("audit_log");
  const references = useReferences(["items", "operators", "lots", "suppliers"]);
  const [search, setSearch] = useState("");
  const [tableFilter, setTableFilter] = useState("");

  const visibleRows = useMemo(() => {
    const sorted = [...rows].sort((a, b) =>
      String(b.created_at).localeCompare(String(a.created_at)),
    );
    const term = search.trim().toLowerCase();
    return sorted.filter((entry) => {
      const matchesTable = !tableFilter || entry.table_name === tableFilter;
      const matchesTerm =
        !term ||
        [entry.changed_by, entry.action, entry.table_name, entry.record_id]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesTable && matchesTerm;
    });
  }, [rows, search, tableFilter]);

  const tableOptions = Array.from(new Set(rows.map((r) => r.table_name))).sort();
  const insertCount = visibleRows.filter((r) => r.action === "INSERT").length;
  const updateCount = visibleRows.filter((r) => r.action === "UPDATE").length;
  const deleteCount = visibleRows.filter((r) => r.action === "DELETE").length;

  const renderSummary = (entry: AuditEntry): string => {
    const data = entry.new_data ?? entry.old_data ?? {};
    if (entry.table_name === "stock_movements" && data) {
      const item = referenceLabel(references, "items", "name", data.item_id);
      const operator = referenceLabel(references, "operators", "name", data.operator_id);
      const qty = data.quantity ?? "?";
      const type = data.type ?? "?";
      return `${item} — ${type} ${qty} ${operator ? `· ${operator}` : ""}`;
    }
    if (entry.table_name === "items" && data) {
      return String(data.name ?? data.sku ?? entry.record_id);
    }
    if (entry.table_name === "operators" && data) {
      return String(data.name ?? entry.record_id);
    }
    return entry.record_id.slice(0, 8);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Creaciones" value={insertCount} hint="Registros creados" />
        <StatCard label="Modificaciones" value={updateCount} hint="Registros actualizados" />
        <StatCard label="Eliminaciones" value={deleteCount} hint="Registros eliminados" tone={deleteCount > 0 ? "warning" : "success"} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar en auditoría..." />
          <select
            value={tableFilter}
            aria-label="Filtrar por tabla"
            onChange={(event) => setTableFilter(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="">Todas las tablas</option>
            {tableOptions.map((table) => (
              <option key={table} value={table}>
                {TABLE_LABELS[table] ?? table}
              </option>
            ))}
          </select>
        </div>
        <ExportTools filename="auditoria" columns={auditColumns} rows={visibleRows} />
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Tabla</th>
              <th className="px-4 py-3 font-semibold">Acción</th>
              <th className="px-4 py-3 font-semibold">Detalle</th>
              <th className="px-4 py-3 font-semibold">Usuario</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">Cargando...</td>
              </tr>
            )}
            {!loading && visibleRows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                  Sin registros de auditoría.
                </td>
              </tr>
            )}
            {!loading &&
              visibleRows.slice(0, 50).map((entry) => (
                <tr key={entry.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{formatDate(entry.created_at)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                      {TABLE_LABELS[entry.table_name] ?? entry.table_name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        entry.action === "INSERT"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : entry.action === "UPDATE"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      }`}
                    >
                      {ACTION_LABELS[entry.action] ?? entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{renderSummary(entry)}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{entry.changed_by || "system"}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {visibleRows.length > 50 && (
          <p className="px-4 py-2 text-xs text-slate-400 dark:text-slate-500">
            Mostrando 50 de {visibleRows.length} registros. Usa la búsqueda para filtrar.
          </p>
        )}
      </div>
    </div>
  );
}

export default AuditView;
