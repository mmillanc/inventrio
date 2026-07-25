export type PlanId = "laboratorio" | "pyme";

export interface PlanConfig {
  id: PlanId;
  name: string;
  description: string;
  modules: string[];
}
