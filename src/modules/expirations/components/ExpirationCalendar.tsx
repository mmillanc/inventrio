"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { referenceLabel, useReferences } from "@/modules/_core/hooks/useReferences";
import { cn } from "@/lib/utils";
import { useExpirations } from "../hooks/useExpirations";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function monthLabel(date: Date): string {
  return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
}

function buildGrid(cursor: Date): (Date | null)[] {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), day));
  }
  return cells;
}

export function ExpirationCalendar() {
  const { byDate, alertDays } = useExpirations();
  const references = useReferences(["items"]);
  const [cursor, setCursor] = useState(() => new Date());

  const cells = buildGrid(cursor);
  const todayKey = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold capitalize text-slate-900">{monthLabel(cursor)}</h2>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Mes anterior"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date())}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
          >
            Hoy
          </button>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 text-sm">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="bg-slate-50 px-2 py-2 text-center text-xs font-semibold text-slate-500">
            {weekday}
          </div>
        ))}
        {cells.map((date, index) => {
          if (!date) return <div key={`empty-${index}`} className="min-h-24 bg-white" />;
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
            date.getDate(),
          ).padStart(2, "0")}`;
          const entries = byDate.get(key) ?? [];
          return (
            <div
              key={key}
              className={cn(
                "min-h-24 space-y-1 bg-white p-2 align-top",
                key === todayKey && "ring-2 ring-inset ring-teal-400",
              )}
            >
              <span className="text-xs font-medium text-slate-500">{date.getDate()}</span>
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  title={`${entry.code} · ${referenceLabel(references, "items", "name", entry.item_id)}`}
                  className={cn(
                    "truncate rounded px-1.5 py-0.5 text-[11px] font-medium",
                    entry.state === "vencido"
                      ? "bg-red-100 text-red-700"
                      : entry.state === "por vencer"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800",
                  )}
                >
                  {entry.code} · {referenceLabel(references, "items", "name", entry.item_id)}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500">
        Rojo: vencido · Ámbar: vence en {alertDays} días o menos · Verde: vigente.
      </p>
    </div>
  );
}

export default ExpirationCalendar;
