"use client";

import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { Receiving } from "../types";

export function useReceivings() {
  return useCrud<Receiving>("receivings");
}
