"use client";

import CrudView from "@/modules/_core/components/CrudView";
import giftcardsConfig from "../config";
import type { Giftcard } from "../types";

export function GiftcardList() {
  return <CrudView<Giftcard> config={giftcardsConfig} newLabel="Nueva tarjeta" />;
}

export default GiftcardList;
