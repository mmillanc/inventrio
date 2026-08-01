import type { ModuleConfig } from "@/modules/_core/types";

export const stockLocationsConfig: ModuleConfig = {
  id: "stock_locations",
  slug: "stock_locations",
  title: "Ubicaciones",
  description: "Bodegas y ubicaciones de stock para el inventario.",
  icon: "map-pin",
  plans: ["pyme"],
  order: 15,
  table: "stock_locations",
  fields: [
    { name: "name", label: "Nombre", type: "text", required: true },
    { name: "code", label: "Código", type: "text", required: true },
    { name: "address", label: "Dirección", type: "text" },
    {
      name: "is_active",
      label: "Activa",
      type: "select",
      options: [
        { value: "true", label: "Sí" },
        { value: "false", label: "No" },
      ],
    },
  ],
  columns: [
    { key: "name", label: "Nombre" },
    { key: "code", label: "Código" },
    { key: "address", label: "Dirección" },
    { key: "is_active", label: "Activa", format: "badge" },
  ],
  searchFields: ["name", "code", "address"],
};

export default stockLocationsConfig;
