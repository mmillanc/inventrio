import type { BaseRecord } from "@/modules/_core/types";

export interface Expense extends BaseRecord {
  expense_date: string;
  category: string;
  description: string;
  amount: number;
  payment_method: string;
  supplier_id: string;
  reference: string;
}
