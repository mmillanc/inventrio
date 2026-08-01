import type { BaseRecord } from "@/modules/_core/types";

export interface Standard extends BaseRecord {
  code: string;
  name: string;
  description: string;
  standard_type: string;
  standard_class: string;
  brand: string;
  version: string;
  issuing_body: string;
  certification_body: string;
  issue_date: string;
  expiry_date: string;
  status: string;
  scope: string;
  storage_condition: string;
  weight_received: number;
  weight_unit: string;
  linked_item_id: string | null;
  certificate_url: string;
  certificate_filename: string;
  certificate_uploaded_at: string | null;
  review_frequency_days: number;
  last_reviewed_at: string | null;
  next_review_at: string | null;
  notes: string;
}
