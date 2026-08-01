import type { ModuleConfig } from "@/modules/_core/types";

export const itemKitsConfig: ModuleConfig = {
  id: "item_kits",
  slug: "item_kits",
  title: "Packs",
  description: "Kits y packs de artículos con precio compuesto.",
  icon: "package",
  plans: ["pyme"],
  order: 18,
  table: "item_kits",
  fields: [
    { name: "kit_code", label: "Código", type: "text", required: true },
    { name: "name", label: "Nombre del kit", type: "text", required: true },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "total_cost_price", label: "Precio de costo", type: "number", step: "0.01" },
    { name: "total_unit_price", label: "Precio de venta", type: "number", step: "0.01" },
  ],
  columns: [
    { key: "kit_code", label: "Código" },
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "total_cost_price", label: "Costo", format: "currency" },
    { key: "total_unit_price", label: "Venta", format: "currency" },
  ],
  searchFields: ["kit_code", "name", "description"],
};

export default itemKitsConfig;
