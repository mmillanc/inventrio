import Link from "next/link";
import {
  FlaskConical,
  ShoppingBag,
  ArrowRight,
  Layers,
  ShieldCheck,
  BarChart3,
  Bell,
  Search,
  Upload,
  FileText,
} from "lucide-react";
import { LandingNav } from "./LandingNav";
import { LandingFooter } from "./LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav active="home" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/60 via-white to-white" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2">
          <div className="size-[600px] rounded-full bg-teal-100/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-medium text-teal-700">
              <Layers className="size-3.5" />
              Dos sistemas de inventario en una plataforma
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Inventario inteligente para
              <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                laboratorios y comercios
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Inventrio une dos sistemas especializados: <strong className="font-semibold text-slate-900">InventaLab</strong> para laboratorios que necesitan trazabilidad de reactivos y certificados de calidad, e <strong className="font-semibold text-slate-900">InventaShop</strong> para pymes que necesitan punto de venta, recepci&oacute;n de mercanc&iacute;a y control contable.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/inventalab" className="group inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-lg">
                Conocer InventaLab
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link href="/inventashop" className="group inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-sm">
                Conocer InventaShop
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:grid-cols-4">
          {[
            { label: "Art&iacute;culos ilimitados", value: "\u221E" },
            { label: "Sistemas disponibles", value: "2" },
            { label: "M&oacute;dulos totales", value: "15+" },
            { label: "Tiempo de setup", value: "< 5 min" },
          ].map((stat) => (
            <div key={stat.label} className="py-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="mt-1 text-xs font-medium text-slate-500" dangerouslySetInnerHTML={{ __html: stat.label }} />
            </div>
          ))}
        </div>
      </section>

      {/* Two systems side by side */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Dos sistemas especializados
          </h2>
          <p className="mt-3 text-slate-600">
            Cada sistema est&aacute; dise&ntilde;ado para las necesidades espec&iacute;ficas de su sector.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* InventaLab Card */}
          <Link
            href="/inventalab"
            className="group relative overflow-hidden rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-8 transition hover:border-teal-400 hover:shadow-xl"
          >
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-teal-100/50 blur-2xl transition group-hover:bg-teal-200/60" />
            <div className="relative">
              <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg">
                <FlaskConical className="size-8" />
              </div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                Laboratorios
              </div>
              <h3 className="text-2xl font-bold text-slate-900">InventaLab</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Control de reactivos, lotes, vencimientos, operadores, est&aacute;ndares de calidad y
                certificaci&oacute;n digital. Trazabilidad completa con auditor&iacute;a autom&aacute;tica para
                cumplimiento de normas ISO 17025, NIST y m&aacute;s.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Reactivos", "Lotes", "Vencimientos", "Operadores", "Est\u00e1ndares", "Auditor\u00eda"].map((tag) => (
                  <span key={tag} className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition group-hover:gap-3">
                Explorar InventaLab
                <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>

          {/* InventaShop Card */}
          <Link
            href="/inventashop"
            className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 transition hover:border-slate-400 hover:shadow-xl"
          >
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-slate-100/50 blur-2xl transition group-hover:bg-slate-200/60" />
            <div className="relative">
              <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-lg">
                <ShoppingBag className="size-8" />
              </div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                Pymes y comercios
              </div>
              <h3 className="text-2xl font-bold text-slate-900">InventaShop</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Punto de venta, recepci&oacute;n de mercanc&iacute;a, bodegas m&uacute;ltiples, kits/packs,
                tarjetas de regalo, gastos y contabilidad. Todo lo que un comercio necesita para
                vender y controlar su stock en tiempo real.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["POS", "Recepci\u00f3n", "Bodegas", "Kits", "Tarjetas", "Gastos"].map((tag) => (
                  <span key={tag} className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition group-hover:gap-3">
                Explorar InventaShop
                <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Shared features */}
      <section className="bg-slate-50/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Funciones compartidas
            </h2>
            <p className="mt-3 text-slate-600">
              Ambos sistemas comparten una base s&oacute;lida de gesti&oacute;n de inventario.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BarChart3, title: "Reportes y gr&aacute;ficos", desc: "Gr&aacute;ficos interactivos con recharts, exportaci&oacute;n CSV, JSON y PDF." },
              { icon: Bell, title: "Alertas proactivas", desc: "Banners autom&aacute;ticos para stock bajo, vencidos y vencimientos pr&oacute;ximos." },
              { icon: Search, title: "B&uacute;squeda global", desc: "Busca art&iacute;culos por SKU, nombre o categor&iacute;a desde el sidebar." },
              { icon: Upload, title: "Importaci&oacute;n masiva", desc: "Importa art&iacute;culos desde archivos CSV para cargar tu inventario en segundos." },
              { icon: ShieldCheck, title: "Seguro y confiable", desc: "Hash bcrypt, Row Level Security en Supabase y cookies httpOnly." },
              { icon: FileText, title: "Exportaci&oacute;n m&uacute;ltiple", desc: "Exporta cualquier tabla a CSV, JSON o PDF con un solo clic." },
            ].map((feature) => (
              <div key={feature.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-teal-300 hover:shadow-lg">
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900" dangerouslySetInnerHTML={{ __html: feature.title }} />
                <p className="mt-2 text-sm leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: feature.desc }} />
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
              Empieza a gestionar tu inventario hoy
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-teal-50">
              Sin complicaciones. Crea tu cuenta en menos de 5 minutos y empieza a controlar tu stock.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/inventalab" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-teal-700 shadow-sm transition hover:bg-teal-50">
                InventaLab
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/inventashop" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                InventaShop
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
