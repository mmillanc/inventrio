import Link from "next/link";
import { Boxes, Check, FlaskConical, ShoppingBag } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Boxes className="size-7 text-teal-600" />
            <span className="text-lg font-semibold text-slate-900">Inventrio</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Inventario profesional para tu negocio
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          Inventrio se adapta a laboratorios y pymes con módulos específicos: trazabilidad, lotes, vencimientos, ventas y reportes.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Empezar ahora
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-2xl font-semibold text-slate-900">
          Elige tu versión
        </h2>
        <p className="mt-2 text-center text-slate-500">
          Selecciona el plan que mejor se adapte a tu operación durante el registro.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <FlaskConical className="size-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">InventaLab</h3>
            <p className="mt-1 text-sm text-slate-500">Diseñado para laboratorios.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {["Reactivos y lotes", "Trazabilidad por vencimientos", "Reportes de stock"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="size-4 text-teal-600" /> {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <ShoppingBag className="size-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">InventaShop</h3>
            <p className="mt-1 text-sm text-slate-500">Ideal para pymes y comercios.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {["Ventas y clientes", "Control de stock", "Reportes de ventas"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-teal-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Inventrio. Todos los derechos reservados.
      </footer>
    </div>
  );
}
