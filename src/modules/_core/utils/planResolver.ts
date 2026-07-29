import laboratorio from "../../../../plans/laboratorio.json";
import pyme from "../../../../plans/pyme.json";
import type { PlanConfig, PlanId } from "@/modules/_core/types";

export const PLANS: Record<PlanId, PlanConfig> = {
  laboratorio: laboratorio as PlanConfig,
  pyme: pyme as PlanConfig,
};

export const PLAN_LIST: PlanConfig[] = Object.values(PLANS);

export function getPlan(plan: PlanId): PlanConfig {
  return PLANS[plan] ?? PLANS.laboratorio;
}

export function isPlanId(value: unknown): value is PlanId {
  return value === "laboratorio" || value === "pyme";
}

/** Slugs enabled for a plan, as declared in `plans/*.json`. */
export function resolvePlanModules(plan: PlanId): string[] {
  return getPlan(plan).modules;
}

export function planAllows(plan: PlanId, moduleSlug: string): boolean {
  return resolvePlanModules(plan).includes(moduleSlug);
}
