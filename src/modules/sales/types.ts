import type { BaseRecord } from "@/modules/_core/types";

export interface Sale extends BaseRecord {
  sold_at: string;
  customer_id: string | null;
  item_id: string;
  quantity: number;
  unit_price: number;
  payment_method: string;
  notes: string;
  sale_mode: string;
  status: string;
  subtotal: number;
  discount: number;
  tax_amount: number;
  total: number;
  stock_location_id: string | null;
  reference: string;
}
