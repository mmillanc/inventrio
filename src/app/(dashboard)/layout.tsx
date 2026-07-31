import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth";
import { getActivePlan } from "@/lib/settings";
import { getModulesForPlan, toMetadata } from "@/modules/_core/utils/moduleCatalog";
import Sidebar from "./Sidebar";
import ClientProviders from "./ClientProviders";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const store = await cookies();
  const session = store.get(SESSION_COOKIE)?.value;
  if (!session) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  const plan = await getActivePlan();
  const modules = getModulesForPlan(plan).map(toMetadata);

  return (
    <ClientProviders>
      <div className="min-h-screen bg-slate-50">
        <Sidebar modules={modules} plan={plan} />
        <main className="px-4 py-8 lg:pl-72 lg:pr-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </ClientProviders>
  );
}
