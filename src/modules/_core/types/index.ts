export * from "./plans";
export * from "./modules";

export interface BaseRecord {
  id: string;
  created_at: string;
  [key: string]: unknown;
}

export interface Settings {
  id: string;
  plan: import("./plans").PlanId;
  store_name: string;
  store_email: string;
  store_phone: string;
  store_address: string;
  currency: string;
  tax_rate: number;
  expiration_alert_days: number;
  admin_user?: string;
  admin_password?: string;
  created_at: string;
}
