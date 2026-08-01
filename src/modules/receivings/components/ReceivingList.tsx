"use client";

import CrudView from "@/modules/_core/components/CrudView";
import receivingsConfig from "../config";
import type { Receiving } from "../types";

export function ReceivingList() {
  return <CrudView<Receiving> config={receivingsConfig} newLabel="Nueva recepción" />;
}

export default ReceivingList;
