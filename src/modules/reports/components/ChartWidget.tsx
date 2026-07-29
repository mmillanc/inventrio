"use client";

import { formatCurrency, formatNumber } from "@/lib/utils";
import type { Report } from "../types";

interface ChartWidgetProps {
  report: Report;
  currency?: string;
}

export function ChartWidget({ report, currency = "USD" }: ChartWidgetProps) {
  const max = Math.max(...report.points.map((point) => point.value), 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-900">{report.title}</h3>
      <p className="mb-4 text-sm text-slate-500">{report.description}</p>

      {report.points.length === 0 && <p className="text-sm text-slate-400">Sin datos.</p>}

      <ul className="space-y-3">
        {report.points.map((point) => (
          <li key={point.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="capitalize text-slate-700">{point.label}</span>
              <span className="font-medium text-slate-900">
                {report.unit === "currency"
                  ? formatCurrency(point.value, currency)
                  : formatNumber(point.value)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-500"
                style={{ width: `${Math.max((point.value / max) * 100, 2)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChartWidget;
