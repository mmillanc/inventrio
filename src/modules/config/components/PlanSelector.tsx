"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useSettings } from "@/modules/_core/hooks/useSettings";
import { PLAN_LIST } from "@/modules/_core/utils/planResolver";
import { getModuleConfig } from "@/modules/_core/utils/moduleRegistry";
import { cn } from "@/lib/utils";
import type { PlanId } from "@/modules/_core/types";

export function PlanSelector() {
  const { settings, save } = useSettings();
  const router = useRouter();

  const activate = async (plan: PlanId) => {
    await save({ plan });
    router.refresh();
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PLAN_LIST.map((plan) => {
        const active = settings?.plan === plan.id;
        return (
          <div
            key={plan.id}
            className={cn(
              "rounded-xl border bg-white p-5",
              active ? "border-teal-500 ring-2 ring-teal-100" : "border-slate-200",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">{plan.name}</h3>
              {active && (
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700">
                  <Check className="size-3" /> Activo
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {plan.modules.map((slug) => (
                <li key={slug}>· {getModuleConfig(slug)?.title ?? slug}</li>
              ))}
            </ul>
            <button
              type="button"
              disabled={active}
              onClick={() => activate(plan.id)}
              className="mt-4 w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-default disabled:bg-slate-200 disabled:text-slate-500"
            >
              {active ? "Plan actual" : `Activar plan ${plan.name}`}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanSelector;
