import type { BaseRecord } from "@/modules/_core/types";

export interface Item extends BaseRecord {
  sku: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  min_stock: number;
  unit_cost: number;
  location: string;
  cas_number: string | null;
  chemical_formula: string | null;
  storage_condition: string | null;
  supplier_id: string | null;
  notes: string;
}

export type MovementType = "in" | "out" | "adjust";

export interface StockMovement extends BaseRecord {
  item_id: string;
  lot_id: string | null;
  type: MovementType;
  quantity: number;
  reason: string;
  moved_at: string;
}
