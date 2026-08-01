import type { ModuleConfig } from "@/modules/_core/types";

export const giftcardsConfig: ModuleConfig = {
  id: "giftcards",
  slug: "giftcards",
  title: "Tarjetas de Regalo",
  description: "Tarjetas de regalo con saldo y vencimiento.",
  icon: "gift",
  plans: ["pyme"],
  order: 35,
  table: "giftcards",
  fields: [
    { name: "card_number", label: "Número de tarjeta", type: "text", required: true },
    { name: "value", label: "Valor inicial", type: "number", required: true, step: "0.01" },
    { name: "remaining_value", label: "Saldo restante", type: "number", step: "0.01" },
    {
      name: "customer_id",
      label: "Cliente",
      type: "reference",
      referenceTable: "customers",
      referenceLabel: "name",
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        { value: "active", label: "Activa" },
        { value: "used", label: "Usada" },
        { value: "expired", label: "Vencida" },
        { value: "disabled", label: "Desactivada" },
      ],
    },
    { name: "expires_at", label: "Vence", type: "date" },
  ],
  columns: [
    { key: "card_number", label: "Número" },
    { key: "value", label: "Valor", format: "currency" },
    { key: "remaining_value", label: "Saldo", format: "currency" },
    { key: "customer_id", label: "Cliente", referenceTable: "customers", referenceLabel: "name" },
    { key: "status", label: "Estado", format: "badge" },
    { key: "expires_at", label: "Vence", format: "date" },
  ],
  searchFields: ["card_number", "status"],
};

export default giftcardsConfig;
