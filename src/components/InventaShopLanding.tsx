import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
  Package,
  ShoppingCart,
  Truck,
  MapPin,
  Gift,
  Receipt,
  BarChart3,
  Bell,
  Search,
  Upload,
  ShieldCheck,
  Lock,
  Users,
} from "lucide-react";
import { LandingNav } from "./LandingNav";
import { LandingFooter } from "./LandingFooter";
import { FaqAccordion } from "./FaqAccordion";
import { inventashopFaqs } from "./inventashop-faqs";

const FEATURES = [
  { icon: ShoppingCart, title: "Punto de venta (POS)", desc: "Carrito de compras con b\u00fasqueda por nombre/SKU, m\u00faltiples modos de venta, descuentos, suspender y completar. Sin pasarela de pago, enfocado en registro contable." },
  { icon: Truck, title: "Recepci\u00f3n de mercanc\u00eda", desc: "Registra entradas de proveedores con modos recibir, devolver y requisici\u00f3n. Asocia proveedor, ubicaci\u00f3n y referencia documental." },
  { icon: MapPin, title: "Bodegas m\u00faltiples", desc: "Gestiona varias ubicaciones de stock con c\u00f3digo, direcci\u00f3n y estado activo. Asocia productos y recepciones a bodegas espec\u00edficas." },
  { icon: Package, title: "Kits y packs", desc: "Crea kits de art\u00edculos con precio compuesto, c\u00f3digo \u00fanico y descripci\u00f3n. Ideal para combos y paquetes." },
  { icon: Gift, title: "Tarjetas de regalo", desc: "Tarjetas con saldo, vencimiento, cliente asociado y estados (activa, usada, vencida, desactivada). Usables como m\u00e9todo de pago en el POS." },
  { icon: Receipt, title: "Gastos y contabilidad", desc: "Registra egresos por categor\u00eda (arriendo, servicios, sueldos, insumos, impuestos) con proveedor y referencia documental." },
  { icon: Users, title: "Gesti\u00f3n de clientes", desc: "Registra clientes con nombre, email, tel\u00e9fono, identificaci\u00f3n fiscal y direcci\u00f3n. Asocia ventas a clientes." },
  { icon: BarChart3, title: "Reportes y gr\u00e1ficos", desc: "Gr\u00e1ficos interactivos con recharts, exportaci\u00f3n CSV, JSON y PDF. Reportes por categor\u00eda, valor, ventas y movimientos." },
  { icon: Bell, title: "Alertas proactivas", desc: "Banners autom\u00e1ticos en el dashboard para stock bajo y vencimientos pr\u00f3ximos." },
  { icon: Search, title: "B\u00fasqueda global", desc: "Busca productos por SKU, nombre o categor\u00eda directamente desde el sidebar en cualquier momento." },
  { icon: Upload, title: "Importaci\u00f3n masiva", desc: "Importa productos desde archivos CSV para cargar tu inventario en segundos." },
  { icon: ShieldCheck, title: "Seguro y confiable", desc: "Contrase\u00f1as con hash bcrypt, Row Level Security en Supabase y autenticaci\u00f3n por cookies httpOnly." },
];

export function InventaShopLanding() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav active="shop" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white to-white" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2">
          <div className="size-[600px] rounded-full bg-slate-100/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-700">
              <ShoppingBag className="size-3.5" />
              Sistema de inventario y ventas para pymes
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              InventaShop
              <span className="block bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Vende, recibe y controla tu stock
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Punto de venta, recepción de mercancía, bodegas múltiples, kits, tarjetas de regalo,
              gastos y contabilidad. Todo lo que tu comercio necesita para operar.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900 hover:shadow-lg">
                Crear cuenta InventaShop
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
            { label: "Productos ilimitados", value: "\u221E" },
            { label: "Módulos", value: "11" },
            { label: "Modos de venta", value: "5" },
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
            Todo para tu comercio
          </h2>
          <p className="mt-3 text-slate-600">
            Funciones diseñadas específicamente para la gestión de ventas, stock y contabilidad de pymes.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-400 hover:shadow-lg">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-800 group-hover:text-white">
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
              Módulos de InventaShop
            </h2>
            <p className="mt-3 text-slate-600">
              11 módulos para la gestión integral de tu comercio.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Package, name: "Inventario", desc: "Productos y categorías" },
              { icon: ShoppingCart, name: "Ventas (POS)", desc: "Punto de venta con carrito" },
              { icon: Truck, name: "Recepción", desc: "Entrada de mercancía" },
              { icon: MapPin, name: "Bodegas", desc: "Ubicaciones de stock" },
              { icon: Users, name: "Clientes", desc: "Registro de clientes" },
              { icon: Package, name: "Kits/Packs", desc: "Productos compuestos" },
              { icon: Gift, name: "Tarjetas", desc: "Tarjetas de regalo" },
              { icon: Receipt, name: "Gastos", desc: "Contabilidad de egresos" },
              { icon: BarChart3, name: "Reportes", desc: "Gráficos y exportación" },
              { icon: Truck, name: "Proveedores", desc: "Contactos y datos fiscales" },
              { icon: Lock, name: "Configuración", desc: "Tienda y credenciales" },
            ].map((mod) => (
              <div key={mod.name} className="rounded-xl border border-slate-200 bg-white p-5 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-16 text-center shadow-lg">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Empieza a vender y controlar tu stock hoy
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Sin complicaciones. Crea tu cuenta en menos de 5 minutos y empieza a gestionar tu comercio.
            </p>
            <Link href="/register" className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100">
              Crear cuenta gratis
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              ¿Quieres probar? Usa la cuenta demo: <span className="font-mono font-semibold text-slate-200">admin / inventashop</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion
        items={inventashopFaqs}
        title="Preguntas sobre InventaShop"
        subtitle="Todo lo que necesitas saber para empezar a usar InventaShop."
        docsLink="/faq"
      />

      <LandingFooter />
    </div>
  );
}

export default InventaShopLanding;
