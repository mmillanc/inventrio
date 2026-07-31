import type { BaseRecord } from "@/modules/_core/types";

export interface Operator extends BaseRecord {
  name: string;
  department: string;
  email: string;
  phone: string;
  active: boolean;
}
