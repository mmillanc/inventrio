"use client";

import CrudView from "@/modules/_core/components/CrudView";
import suppliersConfig from "../config";
import type { Supplier } from "../types";

export function SupplierList() {
  return <CrudView<Supplier> config={suppliersConfig} newLabel="Nuevo proveedor" />;
}

export default SupplierList;
