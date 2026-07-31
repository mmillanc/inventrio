"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { Report } from "../types";

interface ChartWidgetProps {
  report: Report;
  currency?: string;
}

const COLORS = [
  "#0d9488",
  "#0891b2",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
];

export function ChartWidget({ report, currency = "USD" }: ChartWidgetProps) {
  const data = report.points.map((point) => ({
    name: point.label,
    value: point.value,
  }));

  const formatValue = (value: number) =>
    report.unit === "currency"
      ? formatCurrency(value, currency)
      : formatNumber(value);

  const isCategoryReport = report.points.length > 0 && report.points[0].label.length > 3;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-900">{report.title}</h3>
      <p className="mb-4 text-sm text-slate-500">{report.description}</p>

      {data.length === 0 && <p className="text-sm text-slate-400">Sin datos.</p>}

      {data.length > 0 && (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={isCategoryReport ? "vertical" : "horizontal"}
              margin={{ top: 5, right: 20, bottom: 5, left: isCategoryReport ? 80 : 0 }}
            >
              {isCategoryReport ? (
                <>
                  <XAxis type="number" tickFormatter={formatValue} tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                </>
              ) : (
                <>
                  <XAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis type="number" tickFormatter={formatValue} tick={{ fontSize: 12 }} />
                </>
              )}
              <Tooltip
                formatter={(value) => [formatValue(Number(value)), report.title]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default ChartWidget;
