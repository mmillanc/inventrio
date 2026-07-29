import type { ModuleConfig } from "@/modules/_core/types";

export const lotsConfig: ModuleConfig = {
  id: "lots",
  slug: "lots",
  title: "Lotes",
  description: "Lotes recibidos, su cantidad y su trazabilidad.",
  icon: "tags",
  plans: ["laboratorio"],
  order: 30,
  table: "lots",
  fields: [
    { name: "code", label: "Código de lote", type: "text", required: true },
    {
      name: "item_id",
      label: "Artículo",
      type: "reference",
      required: true,
      referenceTable: "items",
      referenceLabel: "name",
    },
    {
      name: "supplier_id",
      label: "Proveedor",
      type: "reference",
      referenceTable: "suppliers",
      referenceLabel: "name",
    },
    { name: "quantity", label: "Cantidad", type: "number", step: "0.01" },
    { name: "manufactured_at", label: "Fecha de fabricación", type: "date" },
    { name: "expires_at", label: "Fecha de vencimiento", type: "date", required: true },
    {
      name: "status",
      label: "Estado",
      type: "select",
      required: true,
      options: [
        { value: "activo", label: "Activo" },
        { value: "cuarentena", label: "En cuarentena" },
        { value: "agotado", label: "Agotado" },
        { value: "retirado", label: "Retirado" },
      ],
    },
    { name: "notes", label: "Notas", type: "textarea" },
  ],
  columns: [
    { key: "code", label: "Lote" },
    { key: "item_id", label: "Artículo", referenceTable: "items", referenceLabel: "name" },
    { key: "supplier_id", label: "Proveedor", referenceTable: "suppliers", referenceLabel: "name" },
    { key: "quantity", label: "Cantidad", format: "number" },
    { key: "manufactured_at", label: "Fabricación", format: "date" },
    { key: "expires_at", label: "Vencimiento", format: "date" },
    { key: "status", label: "Estado", format: "badge" },
  ],
  searchFields: ["code", "status", "notes"],
};

export default lotsConfig;
