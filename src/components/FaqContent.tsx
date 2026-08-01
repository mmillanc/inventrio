"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Keyboard, Package, Clock, TrendingUp, Users, ClipboardList, BarChart3, Bell, Search, Upload, Printer, Moon, FileText, BadgeCheck } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  icon: typeof Package;
  title: string;
  items: FaqItem[];
}

const SECTIONS: FaqSection[] = [
  {
    icon: Package,
    title: "Gestión de artículos",
    items: [
      {
        question: "¿Cómo registro un nuevo artículo?",
        answer: "Ve a Inventario → click en 'Nuevo artículo'. Completa SKU, nombre, categoría, unidad de medida, stock mínimo, costo unitario y ubicación. Para laboratorios, también puedes ingresar número CAS, fórmula química y condición de almacenamiento. Click en Guardar.",
      },
      {
        question: "¿Qué es el SKU y por qué es obligatorio?",
        answer: "El SKU (Stock Keeping Unit) es un código único que identifica cada artículo. No pueden existir dos artículos con el mismo SKU. Se usa para búsquedas rápidas, importación CSV y generación de etiquetas.",
      },
      {
        question: "¿Cómo importo artículos masivamente?",
        answer: "En Inventario, click en 'Importar CSV'. Selecciona un archivo CSV con columnas: sku, name, category, unit, quantity, min_stock, unit_cost, location, supplier_id, cas_number, chemical_formula, storage_condition. El sistema valida cada fila e importa los registros válidos, omitiendo los duplicados o con errores.",
      },
      {
        question: "¿Puedo imprimir etiquetas para los artículos?",
        answer: "Sí. En Inventario, click en 'Etiquetas'. Se generan etiquetas con nombre, SKU, categoría y código de barras visual para todos los artículos visibles (respeta los filtros activos). Se abre una ventana de impresión con layout de 3 columnas optimizado para impresoras estándar.",
      },
    ],
  },
  {
    icon: Clock,
    title: "Lotes y vencimientos",
    items: [
      {
        question: "¿Cómo registro un lote?",
        answer: "Ve a Lotes → 'Nuevo lote'. Selecciona el artículo, ingresa el número de lote, fecha de vencimiento, cantidad inicial y proveedor. El sistema calcula automáticamente el saldo disponible restando las salidas registradas.",
      },
      {
        question: "¿Cómo funcionan las alertas de vencimiento?",
        answer: "El dashboard muestra banners automáticos cuando hay lotes vencidos o por vencer. Los días de anticipación se configuran en Configuración → Alertas. Los lotes vencidos aparecen en rojo y los por vencer en naranja.",
      },
      {
        question: "¿Qué es la trazabilidad de lotes?",
        answer: "Cada movimiento de stock puede asociarse a un lote específico. En Lotes → click en un lote para ver su detalle: saldo actual, todos los movimientos (entradas/salidas), fechas y operadores responsables.",
      },
    ],
  },
  {
    icon: TrendingUp,
    title: "Movimientos de stock",
    items: [
      {
        question: "¿Cómo registro una entrada o salida de stock?",
        answer: "Ve a Inventario → pestaña 'Movimientos' → 'Nuevo movimiento'. Selecciona tipo (entrada/salida/ajuste), artículo, cantidad y lote. En laboratorios, también selecciona el operador que retira el material. El stock del artículo se actualiza automáticamente.",
      },
      {
        question: "¿Qué tipos de movimiento existen?",
        answer: "Entrada (+): agrega stock al artículo. Salida (−): reduce stock. Ajuste (=): establece un valor exacto de stock. Todos los movimientos quedan registrados con fecha, usuario y datos completos para auditoría.",
      },
    ],
  },
  {
    icon: Users,
    title: "Operadores",
    items: [
      {
        question: "¿Qué son los operadores?",
        answer: "Los operadores son las personas del laboratorio que retiran insumos o reactivos del inventario. Se registran con nombre, departamento, email, teléfono y estado (activo/inactivo). Cada movimiento de stock puede asociarse a un operador para saber quién retiró qué material.",
      },
      {
        question: "¿Cómo registro un operador?",
        answer: "Ve a Operadores → pestaña 'Operadores' → 'Nuevo operador'. Completa nombre, departamento, email y teléfono. El operador quedará disponible en el dropdown de movimientos de stock.",
      },
    ],
  },
  {
    icon: ClipboardList,
    title: "Auditoría",
    items: [
      {
        question: "¿Qué registra la auditoría?",
        answer: "El sistema registra automáticamente cada creación (INSERT), modificación (UPDATE) y eliminación (DELETE) en las tablas: artículos, movimientos, lotes, proveedores, operadores y configuración. Cada registro incluye usuario, fecha, datos anteriores y datos nuevos.",
      },
      {
        question: "¿Cómo veo el log de auditoría?",
        answer: "Ve a Operadores → pestaña 'Auditoría'. Puedes filtrar por tabla, buscar por texto y ver tarjetas resumen con el total de creaciones, modificaciones y eliminaciones. También puedes exportar a CSV, JSON o PDF.",
      },
    ],
  },
  {
    icon: BarChart3,
    title: "Reportes y gráficos",
    items: [
      {
        question: "¿Qué gráficos muestra el dashboard?",
        answer: "El dashboard incluye un gráfico de torta con el valor del inventario por categoría y un gráfico de barras con el stock actual vs. stock mínimo de los 10 artículos más relevantes. Los gráficos son interactivos (hover para ver detalles).",
      },
      {
        question: "¿Cómo exporto datos?",
        answer: "En cualquier módulo, usa los botones CSV, JSON o PDF junto a la tabla. Se descarga un archivo con los datos visibles (respeta filtros y búsqueda). El PDF está formateado para impresión con encabezados y columnas alineadas.",
      },
    ],
  },
  {
    icon: Bell,
    title: "Alertas proactivas",
    items: [
      {
        question: "¿Qué alertas muestra el sistema?",
        answer: "El dashboard muestra banners automáticos para: (1) artículos bajo el stock mínimo, (2) lotes vencidos que requieren acción inmediata, y (3) lotes que vencen en los próximos días configurados. Cada alerta es un link directo al módulo correspondiente.",
      },
      {
        question: "¿Cómo configuro los días de anticipación para vencimientos?",
        answer: "Ve a Configuración → campo 'Días de alerta de vencimiento'. El valor por defecto es 30 días. Los lotes que vencen dentro de ese período aparecerán como alerta en el dashboard.",
      },
    ],
  },
  {
    icon: Search,
    title: "Búsqueda global",
    items: [
      {
        question: "¿Cómo busco un artículo rápidamente?",
        answer: "Usa la barra de búsqueda en el sidebar (barra lateral izquierda). Escribe por SKU, nombre o categoría. Los resultados aparecen al instante y puedes hacer click para ir directamente al inventario.",
      },
      {
        question: "¿Puedo filtrar por categoría en el inventario?",
        answer: "Sí. En Inventario, junto a la barra de búsqueda hay un dropdown de categorías. Selecciona una categoría para filtrar. Combina búsqueda por texto + filtro de categoría para encontrar artículos específicos.",
      },
    ],
  },
  {
    icon: Keyboard,
    title: "Atajos de teclado",
    items: [
      {
        question: "¿Qué atajos de teclado están disponibles?",
        answer: "G → Dashboard · I → Inventario · L → Lotes · E → Vencimientos · S → Proveedores · O → Operadores · R → Reportes · C → Configuración · / → Enfocar búsqueda · Shift+D → Alternar modo oscuro · Ctrl+K → Búsqueda global. Los atajos no funcionan cuando estás escribiendo en un campo.",
      },
    ],
  },
  {
    icon: Moon,
    title: "Modo oscuro",
    items: [
      {
        question: "¿Cómo activo el modo oscuro?",
        answer: "Click en el icono de luna/sol en la parte superior del sidebar, o presiona Shift+D. La preferencia se guarda automáticamente y se aplica en cada visita. El sistema también respeta la configuración de tu sistema operativo.",
      },
    ],
  },
  {
    icon: FileText,
    title: "Configuración y cuenta",
    items: [
      {
        question: "¿Cómo cambio mi usuario o contraseña?",
        answer: "Ve a Configuración → sección 'Credenciales'. Ingresa el nuevo usuario y/o contraseña. La contraseña se hashea con bcrypt antes de guardarse. Los cambios surten efecto inmediatamente.",
      },
      {
        question: "¿Cómo cambio el nombre del laboratorio o la moneda?",
        answer: "Ve a Configuración → sección 'Tienda'. Cambia el nombre, la moneda (USD, EUR, etc.) y los días de alerta de vencimiento. Estos valores se reflejan en el dashboard y reportes.",
      },
    ],
  },
  {
    icon: BadgeCheck,
    title: "Estándares y certificados de calidad",
    items: [
      {
        question: "¿Qué son los estándares?",
        answer: "Los estándares son normas y certificaciones de calidad que el laboratorio debe cumplir (ISO 17025, ASTM, USP, AOAC, NIST, etc.). Cada estándar registra código, versión, organismo emisor, organismo certificador, fechas de emisión y vencimiento, estado y alcance.",
      },
      {
        question: "¿Cómo subo un certificado digital?",
        answer: "Ve a Estándares → pestaña 'Certificados digitales'. Cada estándar tiene un botón 'Subir certificado' que acepta archivos PDF, JPG, PNG, DOC o DOCX. El archivo se almacena asociado al estándar y puede descargarse o eliminarse en cualquier momento.",
      },
      {
        question: "¿Cómo funciona el control de cumplimiento?",
        answer: "La pestaña 'Cumplimiento' muestra automáticamente: (1) estándares vencidos que requieren renovación inmediata, (2) estándares que vencen en los próximos 30 días, y (3) revisiones de calidad programadas que están vencidas. Cada alerta incluye el código, nombre y fecha relevante.",
      },
      {
        question: "¿Puedo asociar un estándar a un artículo del inventario?",
        answer: "Sí. Al crear o editar un estándar, el campo 'Artículo asociado' permite vincularlo a un item específico del inventario. Esto es útil para materiales de referencia certificados (CRM) o reactivos que deben cumplir una norma particular.",
      },
      {
        question: "¿Los estándares son auditables?",
        answer: "Sí. Cada creación, modificación y eliminación de un estándar se registra automáticamente en el log de auditoría con usuario, fecha y datos completos. Esto permite demostrar cumplimiento ante inspecciones de control de calidad.",
      },
    ],
  },
];

export function FaqContent() {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Preguntas frecuentes
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Guía completa de uso de Inventrio para laboratorios y pymes.
        </p>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((section, sectionIndex) => (
          <div
            key={section.title}
            className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              type="button"
              onClick={() => setOpenSection(openSection === sectionIndex ? null : sectionIndex)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-300">
                  <section.icon className="size-5" />
                </span>
                <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {section.title}
                </span>
              </div>
              {openSection === sectionIndex ? (
                <ChevronUp className="size-5 shrink-0 text-slate-400" />
              ) : (
                <ChevronDown className="size-5 shrink-0 text-slate-400" />
              )}
            </button>

            {openSection === sectionIndex && (
              <div className="space-y-2 border-t border-slate-100 px-5 py-3 dark:border-slate-700">
                {section.items.map((item) => {
                  const itemId = `${sectionIndex}-${item.question}`;
                  const isOpen = openItem === itemId;
                  return (
                    <div key={item.question} className="rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOpenItem(isOpen ? null : itemId)}
                        className="flex w-full items-center justify-between gap-2 py-2 text-left"
                      >
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="size-4 shrink-0 text-slate-400" />
                        ) : (
                          <ChevronDown className="size-4 shrink-0 text-slate-400" />
                        )}
                      </button>
                      {isOpen && (
                        <p className="pb-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqContent;
