import type { ModuleConfig } from "@/modules/_core/types";

export const suppliersConfig: ModuleConfig = {
  id: "suppliers",
  slug: "suppliers",
  title: "Proveedores",
  description: "Contactos y datos fiscales de los proveedores.",
  icon: "truck",
  plans: ["laboratorio", "pyme"],
  order: 20,
  table: "suppliers",
  fields: [
    { name: "name", label: "Nombre", type: "text", required: true },
    { name: "contact_name", label: "Persona de contacto", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Teléfono", type: "text" },
    { name: "tax_id", label: "Identificación fiscal", type: "text" },
    { name: "address", label: "Dirección", type: "text" },
    { name: "notes", label: "Notas", type: "textarea" },
  ],
  columns: [
    { key: "name", label: "Nombre" },
    { key: "contact_name", label: "Contacto" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Teléfono" },
    { key: "tax_id", label: "NIF/RUC" },
    { key: "address", label: "Dirección" },
  ],
  searchFields: ["name", "contact_name", "email", "phone", "tax_id"],
};

export default suppliersConfig;
