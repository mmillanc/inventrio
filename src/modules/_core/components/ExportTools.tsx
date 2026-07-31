"use client";

import { Download, FileText } from "lucide-react";
import jsPDF from "jspdf";
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

function exportPdf(filename: string, columns: ColumnConfig[], rows: Record<string, unknown>[]): void {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const rowHeight = 22;
  const headerHeight = 30;
  const colCount = columns.length;
  const colWidth = (pageWidth - margin * 2) / colCount;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(filename, margin, margin);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  let y = margin + headerHeight;
  columns.forEach((column, index) => {
    const text = column.label.length > 20 ? column.label.slice(0, 18) + "..." : column.label;
    doc.text(text, margin + index * colWidth, y);
  });
  doc.line(margin, y - 6, pageWidth - margin, y - 6);

  doc.setFont("helvetica", "normal");
  rows.forEach((row) => {
    y += rowHeight;
    if (y > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin + headerHeight;
    }
    columns.forEach((column, index) => {
      const raw = row[column.key];
      const text = raw === null || raw === undefined ? "-" : String(raw);
      const truncated = text.length > 25 ? text.slice(0, 23) + "..." : text;
      doc.text(truncated, margin + index * colWidth, y, { maxWidth: colWidth - 4 });
    });
  });

  doc.save(`${filename}.pdf`);
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
      <button
        type="button"
        onClick={() => exportPdf(`${filename}-${stamp}`, columns, rows)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <FileText className="size-4" /> PDF
      </button>
    </div>
  );
}

export default ExportTools;
