"use client";

import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { Standard } from "../types";

export function useStandards() {
  return useCrud<Standard>("standards");
}
