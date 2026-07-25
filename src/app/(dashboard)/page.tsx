import Link from "next/link";
import StatCard from "@/modules/_core/components/StatCard";
import ModuleIcon from "@/modules/_core/components/ModuleIcon";
import { listRows } from "@/lib/db/local";
import { getActivePlan, getSettings } from "@/lib/settings";
import { getModulesForPlan } from "@/modules/_core/utils/moduleRegistry";
import { formatCurrency, formatDate, daysUntil } from "@/lib/utils";
import type { Item, StockMovement } from "@/modules/inventory/types";
import type { Lot } from "@/modules/lots/types";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const plan = getActivePlan();
  const settings = getSettings();
  const currency = settings?.currency ?? "USD";
  const alertDays = settings?.expiration_alert_days ?? 30;
  const modules = getModulesForPlan(plan);

  const items = listRows("items") as unknown as Item[];
  const lots = listRows("lots") as unknown as Lot[];
  const movements = (listRows("stock_movements") as unknown as StockMovement[])
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

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">
          {settings?.store_name ?? "Inventrio"}
        </h1>
        <p className="text-sm text-slate-500">
          Resumen del plan <span className="capitalize">{plan}</span>.
        </p>
      </header>

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

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-base font-semibold text-slate-900">Últimos movimientos</h2>
          {movements.length === 0 && <p className="text-sm text-slate-400">Sin movimientos.</p>}
          <ul className="space-y-2 text-sm">
            {movements.map((movement) => (
              <li key={movement.id} className="flex items-center justify-between gap-3">
                <span className="truncate text-slate-700">{itemName(movement.item_id)}</span>
                <span className="shrink-0 text-slate-500">
                  {movement.type === "in" ? "+" : movement.type === "out" ? "−" : "="}
                  {movement.quantity} · {formatDate(movement.moved_at)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-base font-semibold text-slate-900">Artículos bajo mínimo</h2>
          {lowStock.length === 0 && (
            <p className="text-sm text-slate-400">Todo el stock está por encima del mínimo.</p>
          )}
          <ul className="space-y-2 text-sm">
            {lowStock.slice(0, 6).map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3">
                <span className="truncate text-slate-700">{item.name}</span>
                <span className="shrink-0 text-amber-700">
                  {item.quantity} / mín. {item.min_stock}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-slate-900">Módulos del plan</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.slug}
              href={`/${module.slug}`}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-300 hover:shadow-sm"
            >
              <span className="rounded-lg bg-teal-50 p-2 text-teal-700">
                <ModuleIcon name={module.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">{module.title}</span>
                <span className="block text-xs text-slate-500">{module.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
