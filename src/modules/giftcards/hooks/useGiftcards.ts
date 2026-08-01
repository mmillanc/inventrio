"use client";

import { useCrud } from "@/modules/_core/hooks/useCrud";
import type { Giftcard } from "../types";

export function useGiftcards() {
  return useCrud<Giftcard>("giftcards");
}
