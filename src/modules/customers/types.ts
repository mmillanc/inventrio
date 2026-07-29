import type { BaseRecord } from "@/modules/_core/types";

export interface Customer extends BaseRecord {
  name: string;
  email: string;
  phone: string;
  tax_id: string;
  address: string;
  notes: string;
}
