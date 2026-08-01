import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "warning" | "danger" | "success";
}

const TONES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "border-slate-200 dark:border-slate-700 dark:bg-slate-800",
  warning: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950",
  danger: "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950",
  success: "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950",
};

export function StatCard({ label, value, hint, tone = "default" }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border bg-white p-4 dark:bg-slate-800", TONES[tone])}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}

export default StatCard;
