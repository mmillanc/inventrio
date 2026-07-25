import type { ModuleConfig } from "@/modules/_core/types";

export const reportsConfig: ModuleConfig = {
  id: "reports",
  slug: "reports",
  title: "Reportes",
  description: "Indicadores de stock, valorización, movimientos y vencimientos.",
  icon: "bar-chart",
  plans: ["laboratorio", "pyme"],
  order: 50,
  fields: [],
  columns: [
    { key: "label", label: "Concepto" },
    { key: "value", label: "Valor", format: "number" },
  ],
  searchFields: [],
};

export default reportsConfig;
