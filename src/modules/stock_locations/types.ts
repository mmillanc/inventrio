import type { BaseRecord } from "@/modules/_core/types";

export interface StockLocation extends BaseRecord {
  name: string;
  code: string;
  address: string;
  is_active: boolean;
}
