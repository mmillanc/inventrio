import Link from "next/link";
import { notFound } from "next/navigation";
import { getActivePlan } from "@/lib/settings";
import { getModule } from "@/modules/_core/utils/moduleRegistry";
import { planAllows } from "@/modules/_core/utils/planResolver";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

/** Renders any module registered in the module registry. */
export default async function ModulePage({ params }: PageProps) {
  const { slug } = await params;
  const definition = getModule(slug[0]);
  if (!definition) notFound();

  const plan = await getActivePlan();
  const { config } = definition;
  const allowed = planAllows(plan, config.slug) && config.plans.includes(plan);

  if (!allowed) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h1 className="text-lg font-semibold text-amber-900">
          {config.title} no está incluido en tu plan
        </h1>
        <p className="mt-1 text-sm text-amber-800">
          El plan actual es <span className="capitalize">{plan}</span>. Cambia de plan para
          habilitar este módulo.
        </p>
        <Link
          href="/config"
          className="mt-4 inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
        >
          Ir a configuración
        </Link>
      </div>
    );
  }

  const View = definition.View;
  return <View />;
}
