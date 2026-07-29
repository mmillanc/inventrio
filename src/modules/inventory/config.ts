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
    {
      key: "supplier_id",
      label: "Proveedor",
      referenceTable: "suppliers",
      referenceLabel: "name",
    },
  ],
  searchFields: ["sku", "name", "category", "location"],
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
    referenceTable: "lots",
    referenceLabel: "code",
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
  { key: "type", label: "Tipo", format: "badge" },
  { key: "quantity", label: "Cantidad", format: "number" },
  { key: "reason", label: "Motivo" },
];

export default inventoryConfig;
