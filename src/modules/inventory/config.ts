import type { ColumnConfig, FieldConfig, ModuleConfig } from "@/modules/_core/types";

export const inventoryConfig: ModuleConfig = {
  id: "inventory",
  slug: "inventory",
  title: "Inventario",
  description: "Insumos, reactivos y materiales con su stock actual.",
  icon: "package",
  plans: ["laboratorio", "pyme"],
  order: 10,
  table: "items",
  fields: [
    { name: "sku", label: "Código / SKU", type: "text", required: true },
    { name: "name", label: "Nombre", type: "text", required: true },
    {
      name: "category",
      label: "Categoría",
      type: "text",
      required: true,
      placeholder: "Ej. Reactivo líquido, Columna HPLC, Guantes, Viales...",
    },
    {
      name: "unit",
      label: "Unidad",
      type: "select",
      required: true,
      options: [
        { value: "unidad", label: "Unidad" },
        { value: "caja", label: "Caja" },
        { value: "litro", label: "Litro" },
        { value: "ml", label: "Mililitro" },
        { value: "kg", label: "Kilogramo" },
        { value: "g", label: "Gramo" },
      ],
    },
    { name: "quantity", label: "Cantidad", type: "number", step: "0.01" },
    { name: "min_stock", label: "Stock mínimo", type: "number", step: "0.01" },
    { name: "unit_cost", label: "Costo unitario", type: "number", step: "0.01" },
    { name: "location", label: "Ubicación", type: "text" },
    {
      name: "cas_number",
      label: "Número CAS",
      type: "text",
      placeholder: "Ej. 7732-18-5",
      hideInTable: true,
    },
    {
      name: "chemical_formula",
      label: "Fórmula química",
      type: "text",
      placeholder: "Ej. H2O, NaCl, C8H10N4O2",
      hideInTable: true,
    },
    {
      name: "storage_condition",
      label: "Condición de almacenamiento",
      type: "select",
      options: [
        { value: "ambiente", label: "Temperatura ambiente" },
        { value: "refrigerado", label: "Refrigerado (2-8°C)" },
        { value: "congelado", label: "Congelado (-20°C)" },
        { value: "ultra_congelado", label: "Ultra congelado (-80°C)" },
        { value: "desecador", label: "Desecador" },
        { value: "oscuridad", label: "Protegido de la luz" },
      ],
    },
    {
      name: "supplier_id",
      label: "Proveedor",
      type: "reference",
      referenceTable: "suppliers",
      referenceLabel: "name",
    },
    { name: "notes", label: "Notas", type: "textarea", hideInTable: true },
  ],
  columns: [
    { key: "sku", label: "SKU" },
    { key: "name", label: "Nombre" },
    { key: "category", label: "Categoría", format: "badge" },
    { key: "quantity", label: "Cantidad", format: "number" },
    { key: "unit", label: "Unidad" },
    { key: "min_stock", label: "Mínimo", format: "number" },
    { key: "unit_cost", label: "Costo", format: "currency" },
    { key: "location", label: "Ubicación" },
    { key: "storage_condition", label: "Almacenamiento", format: "badge" },
    {
      key: "supplier_id",
      label: "Proveedor",
      referenceTable: "suppliers",
      referenceLabel: "name",
    },
  ],
  searchFields: ["sku", "name", "category", "location", "cas_number"],
};

/** Movements are registered from the inventory module but stored in their own table. */
export const movementFields: FieldConfig[] = [
  {
    name: "item_id",
    label: "Artículo",
    type: "reference",
    required: true,
    referenceTable: "items",
    referenceLabel: "name",
  },
  {
    name: "lot_id",
    label: "Lote",
    type: "reference",
    required: true,
    referenceTable: "lots",
    referenceLabel: "code",
  },
  {
    name: "operator_id",
    label: "Operador",
    type: "reference",
    required: true,
    referenceTable: "operators",
    referenceLabel: "name",
  },
  {
    name: "type",
    label: "Tipo de movimiento",
    type: "select",
    required: true,
    options: [
      { value: "in", label: "Entrada" },
      { value: "out", label: "Salida" },
      { value: "adjust", label: "Ajuste (fija el stock)" },
    ],
  },
  { name: "quantity", label: "Cantidad", type: "number", required: true, step: "0.01" },
  { name: "moved_at", label: "Fecha", type: "date", required: true },
  { name: "reason", label: "Motivo", type: "text" },
];

export const movementColumns: ColumnConfig[] = [
  { key: "moved_at", label: "Fecha", format: "date" },
  { key: "item_id", label: "Artículo", referenceTable: "items", referenceLabel: "name" },
  { key: "lot_id", label: "Lote", referenceTable: "lots", referenceLabel: "code" },
  { key: "operator_id", label: "Operador", referenceTable: "operators", referenceLabel: "name" },
  { key: "type", label: "Tipo", format: "badge" },
  { key: "quantity", label: "Cantidad", format: "number" },
  { key: "reason", label: "Motivo" },
];

export default inventoryConfig;
