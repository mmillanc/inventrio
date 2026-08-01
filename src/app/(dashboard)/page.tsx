import Link from "next/link";
import { AlertTriangle, Package, Clock, XCircle } from "lucide-react";
import { cookies } from "next/headers";
import StatCard from "@/modules/_core/components/StatCard";
import ModuleIcon from "@/modules/_core/components/ModuleIcon";
import DashboardCharts from "./DashboardCharts";
import { listRows } from "@/lib/db";
import { getActivePlan, getSettings } from "@/lib/settings";
import { getModulesForPlan } from "@/modules/_core/utils/moduleCatalog";
import { formatCurrency, formatDate, daysUntil } from "@/lib/utils";
import { SESSION_COOKIE } from "@/lib/auth";
import LandingPage from "@/components/LandingPage";
import type { Item, StockMovement } from "@/modules/inventory/types";
import type { Lot } from "@/modules/lots/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const store = await cookies();
  const session = store.get(SESSION_COOKIE)?.value;
  if (!session) return <LandingPage />;

  const plan = await getActivePlan();
  const settings = await getSettings();
  const currency = settings?.currency ?? "USD";
  const alertDays = settings?.expiration_alert_days ?? 30;
  const modules = getModulesForPlan(plan);

  const items = (await listRows("items")) as unknown as Item[];
  const lots = (await listRows("lots")) as unknown as Lot[];
  const movements = ((await listRows("stock_movements")) as unknown as StockMovement[])
    .slice()
    .sort((a, b) => String(b.moved_at).localeCompare(String(a.moved_at)))
    .slice(0, 5);

  const lowStock = items.filter((item) => Number(item.quantity) <= Number(item.min_stock));
  const inventoryValue = items.reduce(
    (sum, item) => sum + Number(item.quantity ?? 0) * Number(item.unit_cost ?? 0),
    0,
  );
  const expiringSoon = lots.filter((lot) => {
    const days = daysUntil(lot.expires_at);
    return days !== null && days >= 0 && days <= alertDays;
  });
  const expired = lots.filter((lot) => (daysUntil(lot.expires_at) ?? Infinity) < 0);

  const itemName = (id: string) => items.find((item) => item.id === id)?.name ?? "-";

  // Chart data: value by category and stock comparison
  const categoryMap = new Map<string, { value: number; count: number }>();
  for (const item of items) {
    const cat = item.category || "sin categoría";
    const existing = categoryMap.get(cat) ?? { value: 0, count: 0 };
    existing.value += Number(item.quantity ?? 0) * Number(item.unit_cost ?? 0);
    existing.count += 1;
    categoryMap.set(cat, existing);
  }
  const categoryData = Array.from(categoryMap.entries())
    .map(([name, data]) => ({ name, value: Math.round(data.value), count: data.count }))
    .sort((a, b) => b.value - a.value);

  const stockData = items
    .slice()
    .sort((a, b) => Number(b.quantity) - Number(a.quantity))
    .slice(0, 10)
    .map((item) => ({
      name: item.name.length > 15 ? item.name.slice(0, 13) + "..." : item.name,
      stock: Number(item.quantity ?? 0),
      min: Number(item.min_stock ?? 0),
    }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {settings?.store_name ?? "Inventrio"}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Resumen del plan <span className="capitalize">{plan}</span>.
        </p>
      </header>

      {(lowStock.length > 0 || expired.length > 0 || expiringSoon.length > 0) && (
        <div className="space-y-2">
          {lowStock.length > 0 && (
            <Link
              href="/inventory"
              className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 transition hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:hover:bg-amber-900"
            >
              <AlertTriangle className="size-5 shrink-0 text-amber-600" />
              <span className="text-sm text-amber-900 dark:text-amber-200">
                <strong>{lowStock.length}</strong> artículo(s) bajo el stock mínimo. Revisa y realiza pedidos.
              </span>
            </Link>
          )}
          {expired.length > 0 && (
            <Link
              href="/expirations"
              className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:hover:bg-red-900"
            >
              <XCircle className="size-5 shrink-0 text-red-600" />
              <span className="text-sm text-red-900 dark:text-red-200">
                <strong>{expired.length}</strong> lote(s) vencido(s). Requiere acción inmediata.
              </span>
            </Link>
          )}
          {expiringSoon.length > 0 && (
            <Link
              href="/expirations"
              className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 transition hover:bg-orange-100 dark:border-orange-800 dark:bg-orange-950 dark:hover:bg-orange-900"
            >
              <Clock className="size-5 shrink-0 text-orange-600" />
              <span className="text-sm text-orange-900 dark:text-orange-200">
                <strong>{expiringSoon.length}</strong> lote(s) vencen en los próximos {alertDays} días.
              </span>
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Artículos" value={items.length} hint="Referencias activas" />
        <StatCard
          label="Stock bajo"
          value={lowStock.length}
          hint="En o bajo el mínimo"
          tone={lowStock.length > 0 ? "warning" : "success"}
        />
        <StatCard
          label="Valor del inventario"
          value={formatCurrency(inventoryValue, currency)}
          hint="Cantidad × costo"
        />
        {plan === "laboratorio" ? (
          <StatCard
            label="Lotes en alerta"
            value={expiringSoon.length + expired.length}
            hint={`${expired.length} vencidos · ${expiringSoon.length} por vencer`}
            tone={expired.length > 0 ? "danger" : expiringSoon.length > 0 ? "warning" : "success"}
          />
        ) : (
          <StatCard label="Lotes" value={lots.length} hint="Registrados" />
        )}
      </div>

      <DashboardCharts categoryData={categoryData} stockData={stockData} currency={currency} />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">Últimos movimientos</h2>
          {movements.length === 0 && <p className="text-sm text-slate-400 dark:text-slate-500">Sin movimientos.</p>}
          <ul className="space-y-2 text-sm">
            {movements.map((movement) => (
              <li key={movement.id} className="flex items-center justify-between gap-3">
                <span className="truncate text-slate-700 dark:text-slate-300">{itemName(movement.item_id)}</span>
                <span className="shrink-0 text-slate-500 dark:text-slate-400">
                  {movement.type === "in" ? "+" : movement.type === "out" ? "−" : "="}
                  {movement.quantity} · {formatDate(movement.moved_at)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">Artículos bajo mínimo</h2>
          {lowStock.length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500">Todo el stock está por encima del mínimo.</p>
          )}
          <ul className="space-y-2 text-sm">
            {lowStock.slice(0, 6).map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3">
                <span className="truncate text-slate-700 dark:text-slate-300">{item.name}</span>
                <span className="shrink-0 text-amber-700 dark:text-amber-400">
                  {item.quantity} / mín. {item.min_stock}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">Módulos del plan</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.slug}
              href={`/${module.slug}`}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-teal-700"
            >
              <span className="rounded-lg bg-teal-50 p-2 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                <ModuleIcon name={module.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{module.title}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{module.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
