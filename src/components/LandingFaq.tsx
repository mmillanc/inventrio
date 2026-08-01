"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from "lucide-react";

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

export function LandingFaq() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
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
  );
}

export default LandingFaq;
