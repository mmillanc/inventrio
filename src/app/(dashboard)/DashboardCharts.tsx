"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface DashboardChartsProps {
  categoryData: { name: string; value: number; count: number }[];
  stockData: { name: string; stock: number; min: number }[];
  currency: string;
}

const COLORS = ["#0d9488", "#0891b2", "#2563eb", "#7c3aed", "#db2777", "#ea580c", "#ca8a04", "#16a34a"];

export function DashboardCharts({ categoryData, stockData, currency }: DashboardChartsProps) {
  const pieData = categoryData.filter((d) => d.value > 0);

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {pieData.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-1 text-base font-semibold text-slate-900 dark:text-slate-100">Valor por categoría</h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Distribución del valor del inventario</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={2}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value), currency)}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #334155", background: "#1e293b", color: "#f1f5f9", fontSize: "13px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1">
            {pieData.map((entry, index) => (
              <li key={entry.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span
                    className="size-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="capitalize">{entry.name}</span>
                </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {formatCurrency(entry.value, currency)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {stockData.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-1 text-base font-semibold text-slate-900 dark:text-slate-100">Stock por artículo</h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Cantidad actual vs. stock mínimo (top 10)</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stockData}
                layout="vertical"
                margin={{ top: 5, right: 20, bottom: 5, left: 80 }}
              >
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
                <Tooltip
                  formatter={(value) => formatNumber(Number(value))}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #334155", background: "#1e293b", color: "#f1f5f9", fontSize: "13px" }}
                />
                <Bar dataKey="stock" fill="#0d9488" radius={[0, 4, 4, 0]} name="Stock actual" />
                <Bar dataKey="min" fill="#fbbf24" radius={[0, 4, 4, 0]} name="Stock mínimo" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-teal-600" /> Stock actual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-amber-400" /> Stock mínimo
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default DashboardCharts;
