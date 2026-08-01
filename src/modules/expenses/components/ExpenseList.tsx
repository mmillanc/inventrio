"use client";

import CrudView from "@/modules/_core/components/CrudView";
import expensesConfig from "../config";
import type { Expense } from "../types";

export function ExpenseList() {
  return <CrudView<Expense> config={expensesConfig} newLabel="Nuevo gasto" />;
}

export default ExpenseList;
