import Link from "next/link";
import {
  FlaskConical,
  ArrowRight,
  Package,
  Clock,
  Users,
  ClipboardList,
  BarChart3,
  Bell,
  Search,
  Upload,
  ShieldCheck,
  FileText,
  Lock,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import { LandingNav } from "./LandingNav";
import { LandingFooter } from "./LandingFooter";
import { FaqAccordion } from "./FaqAccordion";
import { inventalabFaqs } from "./inventalab-faqs";

const FEATURES = [
  { icon: Package, title: "Gesti\u00f3n de reactivos", desc: "Registra reactivos con SKU, n\u00famero CAS, f\u00f3rmula qu\u00edmica, condici\u00f3n de almacenamiento, categor\u00eda, stock m\u00ednimo y unidad de medida." },
  { icon: Clock, title: "Lotes y vencimientos", desc: "Trazabilidad completa de lotes con alertas de vencimiento configurables, calendario visual y saldo autom\u00e1tico." },
  { icon: TrendingUp, title: "Movimientos de stock", desc: "Entradas, salidas y ajustes con historial detallado, asociaci\u00f3n obligatoria a lote y operador." },
  { icon: Users, title: "Operadores del laboratorio", desc: "Registra el personal que retira insumos, con departamento, contacto y estado activo/inactivo." },
  { icon: BadgeCheck, title: "Est\u00e1ndares de calidad", desc: "Normas ISO 17025, NIST, USP, ASTM con certificados digitales, control de cumplimiento y revisiones programadas." },
  { icon: ClipboardList, title: "Auditor\u00eda autom\u00e1tica", desc: "Trigger autom\u00e1tico que registra cada creaci\u00f3n, modificaci\u00f3n y eliminaci\u00f3n con usuario y datos completos." },
  { icon: BarChart3, title: "Reportes y gr\u00e1ficos", desc: "Gr\u00e1ficos interactivos con recharts, exportaci\u00f3n CSV, JSON y PDF. Reportes por categor\u00eda, valor y movimientos." },
  { icon: Bell, title: "Alertas proactivas", desc: "Banners autom\u00e1ticos en el dashboard para stock bajo, lotes vencidos, vencimientos pr\u00f3ximos y est\u00e1ndares por vencer." },
  { icon: Search, title: "B\u00fasqueda global", desc: "Busca art\u00edculos por SKU, nombre o categor\u00eda directamente desde el sidebar en cualquier momento." },
  { icon: Upload, title: "Importaci\u00f3n masiva", desc: "Importa reactivos desde archivos CSV para cargar tu inventario en segundos." },
  { icon: ShieldCheck, title: "Seguro y confiable", desc: "Contrase\u00f1as con hash bcrypt, Row Level Security en Supabase y autenticaci\u00f3n por cookies httpOnly." },
  { icon: FileText, title: "Exportaci\u00f3n m\u00faltiple", desc: "Exporta cualquier tabla a CSV, JSON o PDF con un solo clic, formateado y listo para imprimir." },
];

export function InventaLabLanding() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav active="lab" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/60 via-white to-white" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2">
          <div className="size-[600px] rounded-full bg-teal-100/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-medium text-teal-700">
              <FlaskConical className="size-3.5" />
              Sistema de inventario para laboratorios
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              InventaLab
              <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Trazabilidad de reactivos y calidad
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Control completo de reactivos, lotes, vencimientos, operadores y estándares de calidad.
              Diseñado para laboratorios que necesitan cumplimiento normativo y trazabilidad total.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-lg">
                Crear cuenta InventaLab
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-sm">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:grid-cols-4">
          {[
            { label: "Reactivos ilimitados", value: "\u221E" },
            { label: "M\u00f3dulos", value: "8" },
            { label: "Normativas soportadas", value: "6+" },
            { label: "Setup", value: "< 5 min" },
          ].map((stat) => (
            <div key={stat.label} className="py-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="mt-1 text-xs font-medium text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Todo para tu laboratorio
          </h2>
          <p className="mt-3 text-slate-600">
            Funciones diseñadas específicamente para la gestión de reactivos y calidad en laboratorios.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-teal-300 hover:shadow-lg">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="bg-slate-50/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              M\u00f3dulos de InventaLab
            </h2>
            <p className="mt-3 text-slate-600">
              8 módulos especializados para la gestión integral del laboratorio.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Package, name: "Inventario", desc: "Reactivos con CAS y almacenamiento" },
              { icon: Clock, name: "Lotes", desc: "Trazabilidad y vencimientos" },
              { icon: Bell, name: "Vencimientos", desc: "Alertas y calendario" },
              { icon: Users, name: "Operadores", desc: "Personal del laboratorio" },
              { icon: BadgeCheck, name: "Est\u00e1ndares", desc: "Normas y certificados" },
              { icon: ClipboardList, name: "Auditor\u00eda", desc: "Log autom\u00e1tico" },
              { icon: BarChart3, name: "Reportes", desc: "Gr\u00e1ficos y exportaci\u00f3n" },
              { icon: Lock, name: "Configuraci\u00f3n", desc: "Tienda y credenciales" },
            ].map((mod) => (
              <div key={mod.name} className="rounded-xl border border-slate-200 bg-white p-5 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <mod.icon className="size-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{mod.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-700 px-8 py-16 text-center shadow-lg">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Empieza a controlar tu laboratorio hoy
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-teal-50">
              Sin complicaciones. Crea tu cuenta en menos de 5 minutos y empieza a gestionar tus reactivos.
            </p>
            <Link href="/register" className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-teal-700 shadow-sm transition hover:bg-teal-50">
              Crear cuenta gratis
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-4 text-sm text-teal-100">
              ¿Quieres probar? Usa la cuenta demo: <span className="font-mono font-semibold">admin / inventrio</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion
        items={inventalabFaqs}
        title="Preguntas sobre InventaLab"
        subtitle="Todo lo que necesitas saber para empezar a usar InventaLab."
        docsLink="/faq"
      />

      <LandingFooter />
    </div>
  );
}

export default InventaLabLanding;
