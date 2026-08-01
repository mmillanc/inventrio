import type { ModuleConfig } from "@/modules/_core/types";

export const receivingsConfig: ModuleConfig = {
  id: "receivings",
  slug: "receivings",
  title: "Recepción",
  description: "Recepción de mercancía y órdenes de compra a proveedores.",
  icon: "truck",
  plans: ["pyme"],
  order: 22,
  table: "receivings",
  fields: [
    { name: "received_at", label: "Fecha", type: "date", required: true },
    {
      name: "supplier_id",
      label: "Proveedor",
      type: "reference",
      referenceTable: "suppliers",
      referenceLabel: "name",
    },
    {
      name: "stock_location_id",
      label: "Ubicación de stock",
      type: "reference",
      referenceTable: "stock_locations",
      referenceLabel: "name",
    },
    {
      name: "mode",
      label: "Modo",
      type: "select",
      required: true,
      options: [
        { value: "receive", label: "Recibir" },
        { value: "return", label: "Devolver" },
        { value: "requisition", label: "Requisición" },
      ],
    },
    { name: "reference", label: "Referencia / Doc.", type: "text" },
    { name: "comment", label: "Comentario", type: "textarea" },
    { name: "total", label: "Total", type: "number", step: "0.01" },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        { value: "completed", label: "Completado" },
        { value: "pending", label: "Pendiente" },
        { value: "cancelled", label: "Cancelado" },
      ],
    },
  ],
  columns: [
    { key: "received_at", label: "Fecha", format: "date" },
    { key: "supplier_id", label: "Proveedor", referenceTable: "suppliers", referenceLabel: "name" },
    { key: "mode", label: "Modo", format: "badge" },
    { key: "reference", label: "Referencia" },
    { key: "total", label: "Total", format: "currency" },
    { key: "status", label: "Estado", format: "badge" },
  ],
  searchFields: ["reference", "comment", "mode", "status"],
};

export default receivingsConfig;
