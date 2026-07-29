export type ReportId =
  | "stock_by_category"
  | "inventory_value"
  | "low_stock"
  | "movements"
  | "expirations";

export interface ReportPoint extends Record<string, unknown> {
  label: string;
  value: number;
}

export interface Report {
  id: ReportId;
  title: string;
  description: string;
  unit: "number" | "currency";
  points: ReportPoint[];
}
