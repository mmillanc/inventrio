import type { ModuleConfig } from "@/modules/_core/types";

export const operatorsConfig: ModuleConfig = {
  id: "operators",
  slug: "operators",
  title: "Operadores",
  description: "Personal del laboratorio que retira insumos del inventario.",
  icon: "users",
  plans: ["laboratorio"],
  order: 25,
  table: "operators",
  fields: [
    { name: "name", label: "Nombre completo", type: "text", required: true },
    { name: "department", label: "Departamento / Área", type: "text", placeholder: "Ej. Química, Microbiología, Control de calidad..." },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Teléfono", type: "text" },
    {
      name: "active",
      label: "Activo",
      type: "select",
      options: [
        { value: "true", label: "Sí" },
        { value: "false", label: "No" },
      ],
    },
  ],
  columns: [
    { key: "name", label: "Nombre" },
    { key: "department", label: "Departamento" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Teléfono" },
    { key: "active", label: "Activo", format: "badge" },
  ],
  searchFields: ["name", "department", "email", "phone"],
};

export default operatorsConfig;
