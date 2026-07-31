export const TABLES = [
  "items",
  "stock_movements",
  "suppliers",
  "lots",
  "operators",
  "audit_log",
  "customers",
  "sales",
  "settings",
] as const;

export type TableName = (typeof TABLES)[number];

export function isTable(value: string): value is TableName {
  return (TABLES as readonly string[]).includes(value);
}
