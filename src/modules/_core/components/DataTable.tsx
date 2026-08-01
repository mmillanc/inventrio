"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import type { ColumnConfig } from "@/modules/_core/types";
import { referenceLabel, type ReferenceMap } from "@/modules/_core/hooks/useReferences";
import { cn, formatCurrency, formatDate, formatNumber } from "@/lib/utils";

const PAGE_SIZE = 10;

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
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(rows.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(totalPages - 1, 0));
  const pageRows = useMemo(
    () => rows.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE),
    [rows, currentPage],
  );

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
          <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-700 dark:bg-slate-700 dark:text-slate-300">
            {String(value ?? "-")}
          </span>
        );
      default:
        return value === null || value === undefined || value === "" ? "-" : String(value);
    }
  };

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-3 text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {loading && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                  Cargando...
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {!loading &&
              pageRows.map((row) => (
                <tr
                  key={String(row.id)}
                  className={cn("transition hover:bg-slate-50 dark:hover:bg-slate-700/50", rowClassName?.(row))}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-slate-700 dark:text-slate-300">
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
                            className="rounded-md p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700 dark:text-slate-400 dark:hover:bg-teal-950 dark:hover:text-teal-300"
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
                            className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950 dark:hover:text-red-400"
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>
            Página {currentPage + 1} de {totalPages} · {rows.length} registro(s)
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => setPage(currentPage - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="size-4" /> Anterior
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages - 1}
              onClick={() => setPage(currentPage + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Siguiente <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
