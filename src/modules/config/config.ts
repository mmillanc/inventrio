import type { ModuleConfig } from "@/modules/_core/types";

export const configModuleConfig: ModuleConfig = {
  id: "config",
  slug: "config",
  title: "Configuración",
  description: "Datos del negocio, impuestos y plan activo.",
  icon: "settings",
  plans: ["laboratorio", "pyme"],
  order: 90,
  table: "settings",
  fields: [],
  columns: [],
  searchFields: [],
};

export default configModuleConfig;
