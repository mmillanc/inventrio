"use client";

import CrudView from "@/modules/_core/components/CrudView";
import customersConfig from "../config";
import type { Customer } from "../types";

export function CustomerList() {
  return <CrudView<Customer> config={customersConfig} newLabel="Nuevo cliente" />;
}

export default CustomerList;
