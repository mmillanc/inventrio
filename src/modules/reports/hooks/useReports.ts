"use client";

import { useMemo } from "react";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import { daysUntil } from "@/lib/utils";
import type { Item, StockMovement } from "@/modules/inventory/types";
import type { Lot } from "@/modules/lots/types";
import type { Report, ReportId } from "../types";

function groupSum<T>(rows: T[], key: (row: T) => string, value: (row: T) => number) {
  const map = new Map<string, number>();
  for (const row of rows) {
    const k = key(row) || "sin categoría";
    map.set(k, (map.get(k) ?? 0) + value(row));
  }
  return [...map.entries()]
    .map(([label, total]) => ({ label, value: Math.round(total * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
}

export function useReports(days = 30) {
  const items = useCrud<Item>("items");
  const lots = useCrud<Lot>("lots");
  const movements = useCrud<StockMovement>("stock_movements");

  const reports = useMemo<Record<ReportId, Report>>(() => {
    const since = Date.now() - days * 86_400_000;
    const recentMovements = movements.rows.filter(
      (movement) => new Date(String(movement.moved_at)).getTime() >= since,
    );

    return {
      stock_by_category: {
        id: "stock_by_category",
        title: "Stock por categoría",
        description: "Unidades disponibles agrupadas por categoría.",
        unit: "number",
        points: groupSum(items.rows, (item) => item.category, (item) => Number(item.quantity ?? 0)),
      },
      inventory_value: {
        id: "inventory_value",
        title: "Valorización del inventario",
        description: "Cantidad por costo unitario, agrupado por categoría.",
        unit: "currency",
        points: groupSum(
          items.rows,
          (item) => item.category,
          (item) => Number(item.quantity ?? 0) * Number(item.unit_cost ?? 0),
        ),
      },
      low_stock: {
        id: "low_stock",
        title: "Artículos bajo mínimo",
        description: "Diferencia entre stock actual y stock mínimo.",
        unit: "number",
        points: items.rows
          .filter((item) => Number(item.quantity) <= Number(item.min_stock))
          .map((item) => ({
            label: item.name,
            value: Number(item.quantity ?? 0),
          })),
      },
      movements: {
        id: "movements",
        title: `Movimientos (últimos ${days} días)`,
        description: "Unidades movidas por tipo de operación.",
        unit: "number",
        points: groupSum(
          recentMovements,
          (movement) =>
            movement.type === "in" ? "entradas" : movement.type === "out" ? "salidas" : "ajustes",
          (movement) => Number(movement.quantity ?? 0),
        ),
      },
      expirations: {
        id: "expirations",
        title: "Lotes por estado de vencimiento",
        description: "Cantidad de lotes vencidos, próximos a vencer y vigentes.",
        unit: "number",
        points: groupSum(
          lots.rows,
          (lot) => {
            const left = daysUntil(lot.expires_at);
            if (left === null) return "sin fecha";
            if (left < 0) return "vencidos";
            if (left <= 30) return "por vencer";
            return "vigentes";
          },
          () => 1,
        ),
      },
    };
  }, [items.rows, lots.rows, movements.rows, days]);

  return {
    reports,
    loading: items.loading || lots.loading || movements.loading,
  };
}
