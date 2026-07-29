import { NextResponse } from "next/server";
import { getActivePlan } from "@/lib/settings";
import { getModulesForPlan, toMetadata } from "@/modules/_core/utils/moduleCatalog";

export const dynamic = "force-dynamic";

/** Metadata of the modules unlocked by the active plan. */
export async function GET() {
  const plan = await getActivePlan();
  return NextResponse.json({
    plan,
    modules: getModulesForPlan(plan).map(toMetadata),
  });
}
