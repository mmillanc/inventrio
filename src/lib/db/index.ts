import "server-only";

import { randomUUID } from "node:crypto";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Row } from "./local";
import * as local from "./local";
import type { TableName } from "./schema";

export type { Row, Database } from "./local";
export type { TableName } from "./schema";

function newId(): string {
  return randomUUID();
}

export async function listRows(table: TableName): Promise<Row[]> {
  if (!isSupabaseConfigured()) return local.listRows(table);

  const client = createServerClient();
  if (!client) return local.listRows(table);

  const { data, error } = await client.from(table).select("*");
  if (error) throw new Error(error.message);
  return (data as Row[] | null) ?? [];
}

export async function getRow(table: TableName, id: string): Promise<Row | undefined> {
  if (!isSupabaseConfigured()) return local.getRow(table, id);

  const client = createServerClient();
  if (!client) return local.getRow(table, id);

  const { data, error } = await client.from(table).select("*").eq("id", id).single();
  if (error) return undefined;
  return data as Row;
}

export async function insertRow(
  table: TableName,
  values: Record<string, unknown>,
): Promise<Row> {
  if (!isSupabaseConfigured()) return local.insertRow(table, values);

  const client = createServerClient();
  if (!client) return local.insertRow(table, values);

  const id = typeof values.id === "string" && values.id ? values.id : newId();
  const { data, error } = await client
    .from(table)
    .insert({ ...values, id })
    .select()
    .single();
  if (error || !data) throw new Error(error?.message ?? "No se pudo insertar el registro");
  return data as Row;
}

export async function updateRow(
  table: TableName,
  id: string,
  values: Record<string, unknown>,
): Promise<Row | undefined> {
  if (!isSupabaseConfigured()) return local.updateRow(table, id, values);

  const client = createServerClient();
  if (!client) return local.updateRow(table, id, values);

  const { id: _, created_at: __, ...rest } = values;
  const { data, error } = await client
    .from(table)
    .update(rest)
    .eq("id", id)
    .select()
    .single();
  if (error) return undefined;
  return data as Row;
}

export async function deleteRow(table: TableName, id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return local.deleteRow(table, id);

  const client = createServerClient();
  if (!client) return local.deleteRow(table, id);

  const { data, error } = await client.from(table).delete().eq("id", id).select("id");
  if (error) throw new Error(error.message);
  return (data?.length ?? 0) > 0;
}

export async function applyMovementToStock(movement: Row): Promise<void> {
  const itemId = String(movement.item_id ?? "");
  if (!itemId) return;

  const item = await getRow("items", itemId);
  if (!item) return;

  const current = Number(item.quantity ?? 0);
  const amount = Number(movement.quantity ?? 0);
  const type = String(movement.type);
  const next =
    type === "in" ? current + amount : type === "out" ? current - amount : amount;

  await updateRow("items", itemId, { quantity: Math.max(next, 0) });
}
