"use client";

import CrudView from "@/modules/_core/components/CrudView";
import operatorsConfig from "../config";
import type { Operator } from "../types";

export function OperatorList() {
  return <CrudView<Operator> config={operatorsConfig} newLabel="Nuevo operador" />;
}

export default OperatorList;
