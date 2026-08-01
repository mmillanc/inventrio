import type { ModuleConfig } from "@/modules/_core/types";

export const salesConfig: ModuleConfig = {
  id: "sales",
  slug: "sales",
  title: "Ventas",
  description: "Registro de ventas, cotizaciones y facturas.",
  icon: "shopping-cart",
  plans: ["pyme"],
  order: 25,
  table: "sales",
  fields: [
    { name: "sold_at", label: "Fecha", type: "date", required: true },
    {
      name: "customer_id",
      label: "Cliente",
      type: "reference",
      referenceTable: "customers",
      referenceLabel: "name",
    },
    {
      name: "item_id",
      label: "Artículo",
      type: "reference",
      required: true,
      referenceTable: "items",
      referenceLabel: "name",
    },
    { name: "quantity", label: "Cantidad", type: "number", required: true, step: "0.01" },
    { name: "unit_price", label: "Precio unitario", type: "number", required: true, step: "0.01" },
    {
      name: "payment_method",
      label: "Método de pago",
      type: "select",
      options: [
        { value: "efectivo", label: "Efectivo" },
        { value: "tarjeta", label: "Tarjeta" },
        { value: "transferencia", label: "Transferencia" },
        { value: "giftcard", label: "Tarjeta de Regalo" },
      ],
    },
    {
      name: "sale_mode",
      label: "Tipo",
      type: "select",
      options: [
        { value: "sale", label: "Venta" },
        { value: "quote", label: "Cotización" },
        { value: "work_order", label: "Orden de trabajo" },
        { value: "invoice", label: "Factura" },
        { value: "return", label: "Devolución" },
      ],
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        { value: "completed", label: "Completada" },
        { value: "suspended", label: "Suspendida" },
        { value: "cancelled", label: "Cancelada" },
      ],
    },
    { name: "discount", label: "Descuento", type: "number", step: "0.01" },
    { name: "tax_amount", label: "Impuesto", type: "number", step: "0.01" },
    { name: "total", label: "Total", type: "number", step: "0.01" },
    { name: "reference", label: "Referencia / Doc.", type: "text" },
    { name: "notes", label: "Notas", type: "textarea" },
  ],
  columns: [
    { key: "sold_at", label: "Fecha", format: "date" },
    { key: "customer_id", label: "Cliente", referenceTable: "customers", referenceLabel: "name" },
    { key: "item_id", label: "Artículo", referenceTable: "items", referenceLabel: "name" },
    { key: "quantity", label: "Cantidad", format: "number" },
    { key: "unit_price", label: "Precio", format: "currency" },
    { key: "total", label: "Total", format: "currency" },
    { key: "sale_mode", label: "Tipo", format: "badge" },
    { key: "status", label: "Estado", format: "badge" },
    { key: "payment_method", label: "Pago", format: "badge" },
  ],
  searchFields: ["payment_method", "notes", "sale_mode", "status", "reference"],
};

export default salesConfig;
