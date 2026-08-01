import type { FaqItem } from "./FaqAccordion";

export const inventashopFaqs: FaqItem[] = [
  {
    q: "¿Cómo registro un nuevo producto?",
    a: "Ve a Inventario, click en 'Nuevo art\u00edculo'. Completa SKU, nombre, categor\u00eda, unidad de medida, stock m\u00ednimo, costo unitario y ubicaci\u00f3n. Click en Guardar. El producto quedar\u00e1 disponible para venta y recepci\u00f3n.",
  },
  {
    q: "¿Cómo funciona el punto de venta (POS)?",
    a: "Ve a Ventas, pesta\u00f1a 'POS'. Busca productos por nombre o SKU, agr\u00e9galos al carrito con un click. Selecciona cliente (opcional), modo de venta (venta, cotizaci\u00f3n, factura, orden de trabajo, devoluci\u00f3n), m\u00e9todo de pago y descuento. Al completar, el stock se actualiza autom\u00e1ticamente.",
  },
  {
    q: "¿Qué tipos de venta puedo registrar?",
    a: "El POS soporta cinco modos: Venta (completada inmediatamente), Cotizaci\u00f3n (presupuesto sin afectar stock), Orden de trabajo (venta en proceso), Factura (venta formal con referencia) y Devoluci\u00f3n (retorno de mercanc\u00eda).",
  },
  {
    q: "¿Puedo suspender una venta y retomarla después?",
    a: "S\u00ed. En el POS, click en 'Suspendida' para guardar la venta sin completarla. La venta queda registrada con estado 'suspendida' y puede consultarse en el historial.",
  },
  {
    q: "¿Cómo recibo mercancía de un proveedor?",
    a: "Ve a Recepci\u00f3n, click en 'Nueva recepci\u00f3n'. Selecciona proveedor, ubicaci\u00f3n de stock y modo (recibir, devolver, requisici\u00f3n). Registra la referencia del documento (factura, gu\u00eda) y el comentario. El total se calcula autom\u00e1ticamente.",
  },
  {
    q: "¿Qué son las ubicaciones de stock?",
    a: "Las ubicaciones representan bodegas o almacenes f\u00edsicos. Cada una tiene nombre, c\u00f3digo y direcci\u00f3n. Puedes gestionar m\u00faltiples bodegas y asociar productos y recepciones a ubicaciones espec\u00edficas.",
  },
  {
    q: "¿Cómo funcionan los kits o packs?",
    a: "Los kits son conjuntos de art\u00edculos que se venden como un solo producto con precio compuesto. Cada kit tiene c\u00f3digo, nombre, descripci\u00f3n, precio de costo total y precio de venta total. \u00datil para ofrecer combos o paquetes.",
  },
  {
    q: "¿Qué son las tarjetas de regalo?",
    a: "Las tarjetas de regalo tienen un n\u00famero \u00fanico, valor inicial, saldo restante, cliente asociado (opcional), estado (activa, usada, vencida, desactivada) y fecha de vencimiento. Pueden usarse como m\u00e9todo de pago en el POS.",
  },
  {
    q: "¿Cómo registro los gastos del negocio?",
    a: "Ve a Gastos, click en 'Nuevo gasto'. Registra fecha, categor\u00eda (arriendo, servicios, sueldos, insumos, mantenimiento, marketing, impuestos, otros), descripci\u00f3n, monto, m\u00e9todo de pago y proveedor (opcional). Permite llevar la contabilidad de egresos.",
  },
  {
    q: "¿Puedo importar productos masivamente?",
    a: "S\u00ed. En Inventario, click en 'Importar CSV'. Selecciona un archivo con las columnas: sku, name, category, unit, quantity, min_stock, unit_cost, location. El sistema valida e importa cada fila.",
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
