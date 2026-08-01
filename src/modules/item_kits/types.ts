import type { BaseRecord } from "@/modules/_core/types";

export interface ItemKit extends BaseRecord {
  kit_code: string;
  name: string;
  description: string;
  total_cost_price: number;
  total_unit_price: number;
}

export interface ItemKitItem extends BaseRecord {
  kit_id: string;
  item_id: string;
  quantity: number;
}
