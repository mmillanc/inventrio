import type { ModuleConfig } from "@/modules/_core/types";

export const expensesConfig: ModuleConfig = {
  id: "expenses",
  slug: "expenses",
  title: "Gastos",
  description: "Registro de gastos y egresos del negocio.",
  icon: "receipt",
  plans: ["pyme"],
  order: 38,
  table: "expenses",
  fields: [
    { name: "expense_date", label: "Fecha", type: "date", required: true },
    {
      name: "category",
      label: "Categoría",
      type: "select",
      required: true,
      options: [
        { value: "general", label: "General" },
        { value: "arriendo", label: "Arriendo" },
        { value: "servicios", label: "Servicios" },
        { value: "sueldos", label: "Sueldos" },
        { value: "insumos", label: "Insumos" },
        { value: "mantenimiento", label: "Mantenimiento" },
        { value: "marketing", label: "Marketing" },
        { value: "impuestos", label: "Impuestos" },
        { value: "otros", label: "Otros" },
      ],
    },
    { name: "description", label: "Descripción", type: "text" },
    { name: "amount", label: "Monto", type: "number", required: true, step: "0.01" },
    {
      name: "payment_method",
      label: "Método de pago",
      type: "select",
      options: [
        { value: "efectivo", label: "Efectivo" },
        { value: "tarjeta", label: "Tarjeta" },
        { value: "transferencia", label: "Transferencia" },
        { value: "cheque", label: "Cheque" },
      ],
    },
    {
      name: "supplier_id",
      label: "Proveedor",
      type: "reference",
      referenceTable: "suppliers",
      referenceLabel: "name",
    },
    { name: "reference", label: "Referencia / Doc.", type: "text" },
  ],
  columns: [
    { key: "expense_date", label: "Fecha", format: "date" },
    { key: "category", label: "Categoría", format: "badge" },
    { key: "description", label: "Descripción" },
    { key: "amount", label: "Monto", format: "currency" },
    { key: "payment_method", label: "Pago", format: "badge" },
    { key: "supplier_id", label: "Proveedor", referenceTable: "suppliers", referenceLabel: "name" },
  ],
  searchFields: ["category", "description", "reference", "payment_method"],
};

export default expensesConfig;
