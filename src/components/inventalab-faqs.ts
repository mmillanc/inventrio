import type { FaqItem } from "./FaqAccordion";

export const inventalabFaqs: FaqItem[] = [
  {
    q: "¿Cómo registro un nuevo reactivo o insumo?",
    a: "Ve a Inventario, click en 'Nuevo art\u00edculo'. Completa SKU, nombre, categor\u00eda, unidad de medida, stock m\u00ednimo, costo unitario y ubicaci\u00f3n. Para laboratorios tambi\u00e9n puedes ingresar n\u00famero CAS, f\u00f3rmula qu\u00edmica y condici\u00f3n de almacenamiento (ambiente, refrigerado, congelado, ultracongelado, nitr\u00f3geno l\u00edquido, oscuro, seco).",
  },
  {
    q: "¿Qué es el número CAS y por qué es importante?",
    a: "El n\u00famero CAS (Chemical Abstracts Service) es un identificador \u00fanico asignado a cada sustancia qu\u00edmica. Permite identificar reactivos sin ambig\u00fcedad, facilitar b\u00fasquedas en bases de datos cient\u00edficas y cumplir normativas de seguridad qu\u00edmica.",
  },
  {
    q: "¿Cómo funciona la trazabilidad de lotes?",
    a: "Cada lote registra art\u00edculo, n\u00famero de lote, fecha de vencimiento, cantidad inicial y proveedor. El sistema calcula autom\u00e1ticamente el saldo disponible restando las salidas. Cada movimiento de stock puede asociarse a un lote espec\u00edfico, permitiendo trazar qu\u00e9 lote se utiliz\u00f3, cu\u00e1ndo y por qui\u00e9n.",
  },
  {
    q: "¿Cómo funcionan las alertas de vencimiento?",
    a: "El dashboard muestra banners autom\u00e1ticos cuando hay lotes vencidos o por vencer. Los d\u00edas de anticipaci\u00f3n se configuran en Configuraci\u00f3n. Los lotes vencidos aparecen en rojo y los por vencer en naranja.",
  },
  {
    q: "¿Qué son los operadores del laboratorio?",
    a: "Los operadores son las personas del laboratorio que retiran insumos o reactivos del inventario. Se registran con nombre, departamento, email, tel\u00e9fono y estado (activo/inactivo). Cada movimiento de stock puede asociarse a un operador para saber qui\u00e9n retir\u00f3 qu\u00e9 material y cu\u00e1ndo.",
  },
  {
    q: "¿Qué son los estándares de calidad?",
    a: "Los est\u00e1ndares son normas y certificaciones que el laboratorio debe cumplir (ISO 17025, ASTM, USP, AOAC, NIST, etc.). Cada est\u00e1ndar registra c\u00f3digo, versi\u00f3n, organismo emisor, organismo certificador, fechas de emisi\u00f3n y vencimiento, estado, clase (primario, secundario, trabajo, referencia, certificado) y condiciones de almacenamiento.",
  },
  {
    q: "¿Cómo subo un certificado digital?",
    a: "Ve a Est\u00e1ndares, pesta\u00f1a 'Certificados digitales'. Cada est\u00e1ndar tiene un bot\u00f3n 'Subir certificado' que acepta archivos PDF, JPG, PNG, DOC o DOCX. El archivo se almacena asociado al est\u00e1ndar y puede descargarse o eliminarse en cualquier momento.",
  },
  {
    q: "¿Qué registra la auditoría?",
    a: "El sistema registra autom\u00e1ticamente cada creaci\u00f3n, modificaci\u00f3n y eliminaci\u00f3n en art\u00edculos, movimientos, lotes, proveedores, operadores, est\u00e1ndares y configuraci\u00f3n. Cada registro incluye usuario, fecha, datos anteriores y datos nuevos.",
  },
  {
    q: "¿Puedo importar reactivos masivamente?",
    a: "S\u00ed. En Inventario, click en 'Importar CSV'. Selecciona un archivo con las columnas: sku, name, category, unit, quantity, min_stock, unit_cost, location, cas_number, chemical_formula, storage_condition. El sistema valida e importa cada fila.",
  },
  {
    q: "¿Puedo imprimir etiquetas con código de barras?",
    a: "S\u00ed. En Inventario, click en 'Etiquetas' para generar etiquetas con nombre, SKU, categor\u00eda y c\u00f3digo de barras visual para todos los art\u00edculos visibles.",
  },
  {
    q: "¿Hay modo oscuro?",
    a: "S\u00ed. Click en el icono de luna/sol en el sidebar o presiona Shift+D. La preferencia se guarda autom\u00e1ticamente.",
  },
  {
    q: "¿Puedo exportar datos?",
    a: "S\u00ed. En cualquier m\u00f3dulo usa los botones CSV, JSON o PDF junto a la tabla. Se descargan los datos visibles respetando filtros.",
  },
];
