import "server-only";
import { listRows } from "@/lib/db/local";
import { isPlanId } from "@/modules/_core/utils/planResolver";
import type { PlanId, Settings } from "@/modules/_core/types";

/** Server-side read of the workspace settings row. */
export function getSettings(): Settings | null {
  const [row] = listRows("settings");
  return (row as unknown as Settings) ?? null;
}

export function getActivePlan(): PlanId {
  const plan = getSettings()?.plan;
  return isPlanId(plan) ? plan : "laboratorio";
}
