"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { ColumnConfig } from "@/modules/_core/types";
import { referenceLabel, type ReferenceMap } from "@/modules/_core/hooks/useReferences";
import { cn, formatCurrency, formatDate, formatNumber } from "@/lib/utils";

interface DataTableProps<T extends Record<string, unknown>> {
  columns: ColumnConfig[];
  rows: T[];
  references?: ReferenceMap;
  currency?: string;
  loading?: boolean;
  emptyMessage?: string;
  rowClassName?: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  references = {},
  currency = "USD",
  loading = false,
  emptyMessage = "Sin registros",
  rowClassName,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const renderCell = (row: T, column: ColumnConfig) => {
    const value = row[column.key];
    if (column.referenceTable) {
      return referenceLabel(references, column.referenceTable, column.referenceLabel, value);
    }
    switch (column.format) {
      case "number":
        return formatNumber(value);
      case "currency":
        return formatCurrency(value, currency);
      case "date":
        return formatDate(value);
      case "badge":
        return (
          <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-700">
            {String(value ?? "-")}
          </span>
        );
      default:
        return value === null || value === undefined || value === "" ? "-" : String(value);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold">
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3 text-right">Acciones</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {loading && (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-400">
                Cargando...
              </td>
            </tr>
          )}
          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          )}
          {!loading &&
            rows.map((row) => (
              <tr
                key={String(row.id)}
                className={cn("transition hover:bg-slate-50", rowClassName?.(row))}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-slate-700">
                    {renderCell(row, column)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      {onEdit && (
                        <button
                          type="button"
                          aria-label="Editar"
                          onClick={() => onEdit(row)}
                          className="rounded-md p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
                        >
                          <Pencil className="size-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          aria-label="Eliminar"
                          onClick={() => {
                            if (window.confirm("¿Eliminar este registro? Esta acción no se puede deshacer.")) {
                              onDelete(row);
                            }
                          }}
                          className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
