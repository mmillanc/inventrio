import type { BaseRecord } from "@/modules/_core/types";

export interface Receiving extends BaseRecord {
  received_at: string;
  supplier_id: string;
  stock_location_id: string;
  mode: string;
  reference: string;
  comment: string;
  total: number;
  status: string;
}

export interface ReceivingItem extends BaseRecord {
  receiving_id: string;
  item_id: string;
  quantity: number;
  unit_cost: number;
  discount: number;
  total: number;
}
