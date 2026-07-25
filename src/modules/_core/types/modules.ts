import type { ComponentType } from "react";
import type { PlanId } from "./plans";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "reference";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  step?: string;
  options?: FieldOption[];
  /** Table used to populate a `reference` field. */
  referenceTable?: string;
  /** Column of the referenced row shown to the user. */
  referenceLabel?: string;
  hideInTable?: boolean;
}

export interface ColumnConfig {
  key: string;
  label: string;
  /** Rendering hint used by DataTable. */
  format?: "text" | "number" | "currency" | "date" | "badge";
  referenceTable?: string;
  referenceLabel?: string;
}

export interface ModuleConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  plans: PlanId[];
  order: number;
  /** Table backing the module CRUD, when it has one. */
  table?: string;
  fields: FieldConfig[];
  columns: ColumnConfig[];
  searchFields: string[];
}

export interface ModuleDefinition {
  config: ModuleConfig;
  View: ComponentType;
}

/** Metadata sent to the client by `/api/modules`. */
export interface ModuleMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}
