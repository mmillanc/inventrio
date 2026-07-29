import type { BaseRecord } from "@/modules/_core/types";

export type LotStatus = "activo" | "cuarentena" | "agotado" | "retirado";

export interface Lot extends BaseRecord {
  code: string;
  item_id: string;
  supplier_id: string | null;
  quantity: number;
  manufactured_at: string;
  expires_at: string;
  status: LotStatus;
  notes: string;
}
