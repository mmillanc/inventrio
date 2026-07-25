import type { ModuleConfig } from "@/modules/_core/types";

export const customersConfig: ModuleConfig = {
  id: "customers",
  slug: "customers",
  title: "Clientes",
  description: "Cartera de clientes del comercio.",
  icon: "users",
  plans: ["pyme"],
  order: 35,
  table: "customers",
  fields: [
    { name: "name", label: "Nombre", type: "text", required: true },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Teléfono", type: "text" },
    { name: "tax_id", label: "Identificación fiscal", type: "text" },
    { name: "address", label: "Dirección", type: "text" },
    { name: "notes", label: "Notas", type: "textarea" },
  ],
  columns: [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Teléfono" },
    { key: "tax_id", label: "NIF/RUC" },
    { key: "address", label: "Dirección" },
  ],
  searchFields: ["name", "email", "phone", "tax_id"],
};

export default customersConfig;
