import type { ModuleDefinition } from "@/modules/_core/types";
import expensesConfig from "./config";
import ExpenseList from "./components/ExpenseList";

export const expensesModule: ModuleDefinition = {
  config: expensesConfig,
  View: ExpenseList,
};

export { expensesConfig };
export { default as ExpenseList } from "./components/ExpenseList";
export { useExpenses } from "./hooks/useExpenses";
export type { Expense } from "./types";

export default expensesModule;
