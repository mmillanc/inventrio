import type { BaseRecord } from "@/modules/_core/types";

export interface Giftcard extends BaseRecord {
  card_number: string;
  value: number;
  remaining_value: number;
  customer_id: string;
  status: string;
  expires_at: string;
}
