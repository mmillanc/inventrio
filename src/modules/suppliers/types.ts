import type { BaseRecord } from "@/modules/_core/types";

export interface Supplier extends BaseRecord {
  name: string;
  contact_name: string;
  email: string;
  phone: string;
  tax_id: string;
  address: string;
  notes: string;
}
