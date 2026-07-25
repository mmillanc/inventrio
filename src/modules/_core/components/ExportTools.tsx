"use client";

import { Download } from "lucide-react";
import type { ColumnConfig } from "@/modules/_core/types";

interface ExportToolsProps {
  filename: string;
  columns: ColumnConfig[];
  rows: Record<string, unknown>[];
}

function toCsv(columns: ColumnConfig[], rows: Record<string, unknown>[]): string {
  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const header = columns.map((column) => escape(column.label)).join(";");
  const body = rows
    .map((row) => columns.map((column) => escape(row[column.key])).join(";"))
    .join("\n");
  return `${header}\n${body}`;
}

function download(content: string, filename: string, type: string): void {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function ExportTools({ filename, columns, rows }: ExportToolsProps) {
  const stamp = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() =>
          download(toCsv(columns, rows), `${filename}-${stamp}.csv`, "text/csv;charset=utf-8")
        }
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <Download className="size-4" /> CSV
      </button>
      <button
        type="button"
        onClick={() =>
          download(
            JSON.stringify(rows, null, 2),
            `${filename}-${stamp}.json`,
            "application/json",
          )
        }
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <Download className="size-4" /> JSON
      </button>
    </div>
  );
}

export default ExportTools;
