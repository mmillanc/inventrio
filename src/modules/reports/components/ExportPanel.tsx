"use client";

import ExportTools from "@/modules/_core/components/ExportTools";
import reportsConfig from "../config";
import type { Report } from "../types";

export function ExportPanel({ report }: { report: Report }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Exportar reporte</h3>
        <p className="text-sm text-slate-500">
          Descarga «{report.title}» con {report.points.length} fila(s).
        </p>
      </div>
      <ExportTools filename={`reporte-${report.id}`} columns={reportsConfig.columns} rows={report.points} />
    </div>
  );
}

export default ExportPanel;
