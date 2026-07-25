"use client";

import CrudView from "@/modules/_core/components/CrudView";
import { useSettings } from "@/modules/_core/hooks/useSettings";
import salesConfig from "../config";
import type { Sale } from "../types";

export function SaleList() {
  const { currency } = useSettings();
  return <CrudView<Sale> config={salesConfig} newLabel="Nueva venta" currency={currency} />;
}

export default SaleList;
