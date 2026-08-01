import Link from "next/link";
import { useState } from "react";
import {
  Boxes,
  Check,
  FlaskConical,
  ShoppingBag,
  BarChart3,
  Package,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Layers,
  Clock,
  Users,
  FileText,
  Search,
  Upload,
  Bell,
  Lock,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Keyboard,
  Moon,
  Printer,
  BadgeCheck,
} from "lucide-react";

export default function LandingPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const faqs = [
    { q: "¿Cómo registro un nuevo artículo?", a: "Ve a Inventario → 'Nuevo artículo'. Completa SKU, nombre, categoría, unidad, stock mínimo, costo y ubicación. Para laboratorios también puedes ingresar número CAS, fórmula química y condición de almacenamiento." },
    { q: "¿Puedo importar artículos masivamente?", a: "Sí. En Inventario, click en 'Importar CSV'. Selecciona un archivo con las columnas: sku, name, category, unit, quantity, min_stock, unit_cost, etc. El sistema valida e importa cada fila." },
    { q: "¿Cómo funcionan las alertas de vencimiento?", a: "El dashboard muestra banners automáticos para lotes vencidos y por vencer. Los días de anticipación se configuran en Configuración → Alertas." },
    { q: "¿Qué registra la auditoría?", a: "Cada creación, modificación y eliminación en artículos, movimientos, lotes, proveedores y operadores se registra automáticamente con usuario, fecha y datos completos." },
    { q: "¿Puedo imprimir etiquetas con código de barras?", a: "Sí. En Inventario, click en 'Etiquetas' para generar etiquetas con nombre, SKU, categoría y código de barras visual para todos los artículos visibles." },
    { q: "¿Hay modo oscuro?", a: "Sí. Click en el icono de luna/sol en el sidebar o presiona Shift+D. La preferencia se guarda automáticamente." },
    { q: "¿Qué atajos de teclado hay?", a: "G→Dashboard, I→Inventario, L→Lotes, E→Vencimientos, S→Proveedores, O→Operadores, R→Reportes, C→Configuración, /→Búsqueda, Shift+D→Modo oscuro, Ctrl+K→Búsqueda global." },
    { q: "¿Puedo exportar datos?", a: "Sí. En cualquier módulo usa los botones CSV, JSON o PDF junto a la tabla. Se descargan los datos visibles respetando filtros." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-teal-600">
              <Boxes className="size-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Inventrio</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/faq"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              FAQ
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-md"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </nav>

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
              Sistema modular de inventario
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Inventario inteligente para
              <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                laboratorios y pymes
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Controla artículos, lotes, vencimientos, operadores, auditoría y reportes en un solo lugar.
              Inventrio se adapta a tu operación con planes específicos y funciones avanzadas de trazabilidad.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-lg"
              >
                Empezar gratis
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-sm"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:grid-cols-4">
          {[
            { label: "Artículos ilimitados", value: "∞" },
            { label: "Planes disponibles", value: "2" },
            { label: "Módulos activos", value: "8+" },
            { label: "Tiempo de setup", value: "< 5 min" },
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
            Todo lo que necesitas para gestionar tu inventario
          </h2>
          <p className="mt-3 text-slate-600">
            Funciones diseñadas para mantener tu stock bajo control y tu operación eficiente.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Package, title: "Gestión de artículos", desc: "Registra productos con SKU, categorías, precios, stock mínimo, unidades y campos químicos (CAS, fórmula, almacenamiento)." },
            { icon: Clock, title: "Control de lotes y vencimientos", desc: "Trazabilidad completa de lotes con alertas de vencimiento configurables y calendario visual." },
            { icon: TrendingUp, title: "Movimientos de stock", desc: "Entradas, salidas y ajustes con historial detallado, asociación obligatoria a lote y operador." },
            { icon: Users, title: "Gestión de operadores", desc: "Registra el personal del laboratorio que retira insumos, con departamento, contacto y estado activo." },
            { icon: ClipboardList, title: "Auditoría y trazabilidad", desc: "Trigger automático que registra cada creación, modificación y eliminación con usuario y datos completos." },
            { icon: BarChart3, title: "Reportes y gráficos", desc: "Gráficos interactivos con recharts, exportación CSV, JSON y PDF. Reportes por categoría, valor y movimientos." },
            { icon: Bell, title: "Alertas proactivas", desc: "Banners automáticos en el dashboard para stock bajo, lotes vencidos y vencimientos próximos." },
            { icon: Search, title: "Búsqueda global", desc: "Busca artículos por SKU, nombre o categoría directamente desde el sidebar en cualquier momento." },
            { icon: Upload, title: "Importación masiva", desc: "Importa artículos desde archivos CSV para cargar tu inventario en segundos." },
            { icon: ShieldCheck, title: "Seguro y confiable", desc: "Contraseñas con hash bcrypt, Row Level Security en Supabase y autenticación por cookies httpOnly." },
            { icon: FileText, title: "Exportación múltiple", desc: "Exporta cualquier tabla a CSV, JSON o PDF con un solo clic, formateado y listo para imprimir." },
            { icon: Lock, title: "Credenciales gestionables", desc: "Cambia usuario y contraseña del administrador desde la interfaz de configuración con validación." },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-teal-300 hover:shadow-lg"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="bg-slate-50/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Elige tu versión
            </h2>
            <p className="mt-3 text-slate-600">
              Selecciona el plan que mejor se adapte a tu operación durante el registro.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* InventaLab */}
            <div className="relative rounded-2xl border-2 border-teal-200 bg-white p-8 shadow-sm">
              <div className="absolute -top-3 left-8 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                Para laboratorios
              </div>
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <FlaskConical className="size-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">InventaLab</h3>
              <p className="mt-2 text-sm text-slate-500">
                Diseñado para laboratorios que necesitan trazabilidad y control de reactivos.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {[
                  "Reactivos con campos CAS, fórmula química y condición de almacenamiento",
                  "Trazabilidad por lotes con vencimientos y calendario",
                  "Gestión de operadores del laboratorio",
                  "Auditoría automática con trigger en cada operación",
                  "Alertas proactivas de stock bajo y vencimientos",
                  "Movimientos con lote y operador obligatorios",
                  "Gráficos interactivos y exportación CSV/JSON/PDF",
                  "Importación masiva de artículos por CSV",
                  "Búsqueda global desde el sidebar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
                      <Check className="size-3 text-teal-700" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-8 block rounded-lg bg-teal-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Crear cuenta InventaLab
              </Link>
            </div>

            {/* InventaShop */}
            <div className="relative rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-sm transition hover:border-teal-300">
              <div className="absolute -top-3 left-8 rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-white">
                Para pymes
              </div>
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <ShoppingBag className="size-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">InventaShop</h3>
              <p className="mt-2 text-sm text-slate-500">
                Ideal para pymes y comercios que necesitan ventas y control de stock.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {[
                  "Productos y categorías personalizables",
                  "Registro de ventas y clientes",
                  "Control de stock en tiempo real",
                  "Reportes de ventas y rentabilidad",
                  "Movimientos de entrada y salida",
                  "Alertas proactivas de stock bajo",
                  "Gráficos interactivos y exportación CSV/JSON/PDF",
                  "Importación masiva de productos por CSV",
                  "Búsqueda global desde el sidebar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
                      <Check className="size-3 text-teal-700" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-8 block rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Crear cuenta InventaShop
              </Link>
            </div>
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
            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-teal-700 shadow-sm transition hover:bg-teal-50"
            >
              Crear cuenta gratis
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50/50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-medium text-teal-700">
              <HelpCircle className="size-3.5" />
              Preguntas frecuentes
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Resolvemos tus dudas
            </h2>
            <p className="mt-3 text-slate-600">
              Todo lo que necesitas saber para empezar a usar Inventrio.
            </p>
          </div>
          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900">{faq.q}</span>
                  {faqOpen === index ? (
                    <ChevronUp className="size-5 shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="size-5 shrink-0 text-slate-400" />
                  )}
                </button>
                {faqOpen === index && (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 transition hover:text-teal-700"
            >
              Ver documentación completa
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-teal-600">
                <Boxes className="size-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">Inventrio</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/faq" className="transition hover:text-slate-900">
                FAQ
              </Link>
              <Link href="/login" className="transition hover:text-slate-900">
                Iniciar sesión
              </Link>
              <Link href="/register" className="transition hover:text-slate-900">
                Crear cuenta
              </Link>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Inventrio. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
