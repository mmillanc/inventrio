export const TABLES = [
  "items",
  "stock_movements",
  "suppliers",
  "lots",
  "operators",
  "audit_log",
  "standards",
  "customers",
  "sales",
  "settings",
  "stock_locations",
  "receivings",
  "receiving_items",
  "item_kits",
  "item_kit_items",
  "giftcards",
  "expenses",
] as const;

export type TableName = (typeof TABLES)[number];

export function isTable(value: string): value is TableName {
  return (TABLES as readonly string[]).includes(value);
}
