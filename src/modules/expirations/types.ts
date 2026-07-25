import type { Lot } from "@/modules/lots/types";

export type ExpirationState = "vencido" | "por vencer" | "vigente";

export interface ExpirationEntry extends Lot {
  days_left: number;
  state: ExpirationState;
}
