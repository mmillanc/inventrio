import "server-only";
import { listRows } from "@/lib/db";
import { isPlanId } from "@/modules/_core/utils/planResolver";
import type { PlanId, Settings } from "@/modules/_core/types";

/** Server-side read of the workspace settings row. */
export async function getSettings(): Promise<Settings | null> {
  try {
    const [row] = await listRows("settings");
    return (row as unknown as Settings) ?? null;
  } catch {
    return null;
  }
}

export async function getActivePlan(): Promise<PlanId> {
  try {
    const settings = await getSettings();
    const plan = settings?.plan;
    return isPlanId(plan) ? plan : "laboratorio";
  } catch {
    return "laboratorio";
  }
}
