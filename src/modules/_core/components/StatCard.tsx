import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "warning" | "danger" | "success";
}

const TONES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "border-slate-200",
  warning: "border-amber-300 bg-amber-50",
  danger: "border-red-300 bg-red-50",
  success: "border-emerald-300 bg-emerald-50",
};

export function StatCard({ label, value, hint, tone = "default" }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border bg-white p-4", TONES[tone])}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default StatCard;
