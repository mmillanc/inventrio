import type { ReactNode } from "react";
import { getActivePlan } from "@/lib/settings";
import { getModulesForPlan, toMetadata } from "@/modules/_core/utils/moduleCatalog";
import Sidebar from "./Sidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const plan = getActivePlan();
  const modules = getModulesForPlan(plan).map(toMetadata);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar modules={modules} plan={plan} />
      <main className="px-4 py-8 lg:pl-72 lg:pr-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
