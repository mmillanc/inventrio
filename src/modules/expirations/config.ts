import type { ModuleConfig } from "@/modules/_core/types";

export const expirationsConfig: ModuleConfig = {
  id: "expirations",
  slug: "expirations",
  title: "Vencimientos",
  description: "Alertas y calendario de lotes próximos a vencer.",
  icon: "clock",
  plans: ["laboratorio"],
  order: 40,
  fields: [],
  columns: [
    { key: "code", label: "Lote" },
    { key: "item_id", label: "Artículo", referenceTable: "items", referenceLabel: "name" },
    { key: "quantity", label: "Cantidad", format: "number" },
    { key: "expires_at", label: "Vencimiento", format: "date" },
    { key: "days_left", label: "Días restantes", format: "number" },
    { key: "state", label: "Estado", format: "badge" },
  ],
  searchFields: ["code"],
};

export default expirationsConfig;
