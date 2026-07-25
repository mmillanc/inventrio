"use client";

import { useState } from "react";
import ModuleLayout from "@/modules/_core/components/ModuleLayout";
import { useSettings } from "@/modules/_core/hooks/useSettings";
import reportsConfig from "../config";
import { useReports } from "../hooks/useReports";
import type { ReportId } from "../types";
import ChartWidget from "./ChartWidget";
import ExportPanel from "./ExportPanel";

const RANGES = [7, 30, 90, 365];

export function ReportBuilder() {
  const [days, setDays] = useState(30);
  const [selected, setSelected] = useState<ReportId>("stock_by_category");
  const { reports, loading } = useReports(days);
  const { currency } = useSettings();

  const report = reports[selected];

  return (
    <ModuleLayout
      title={reportsConfig.title}
      description={reportsConfig.description}
      toolbar={
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            aria-label="Reporte"
            value={selected}
            onChange={(event) => setSelected(event.target.value as ReportId)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-500"
          >
            {Object.values(reports).map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.title}
              </option>
            ))}
          </select>
          <select
            aria-label="Rango de días"
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-500"
          >
            {RANGES.map((range) => (
              <option key={range} value={range}>
                Últimos {range} días
              </option>
            ))}
          </select>
        </div>
      }
    >
      {loading ? (
        <p className="text-sm text-slate-400">Calculando reportes...</p>
      ) : (
        <div className="space-y-5">
          <ExportPanel report={report} />
          <ChartWidget report={report} currency={currency} />
          <div className="grid gap-4 lg:grid-cols-2">
            {Object.values(reports)
              .filter((entry) => entry.id !== selected)
              .map((entry) => (
                <ChartWidget key={entry.id} report={entry} currency={currency} />
              ))}
          </div>
        </div>
      )}
    </ModuleLayout>
  );
}

export default ReportBuilder;
