import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { seedDatabase } from "./seed";
import type { TableName } from "./schema";

export type Row = Record<string, unknown> & { id: string; created_at: string };
export type Database = Record<TableName, Row[]>;

const DATA_DIR = process.env.INVENTRIO_DATA_DIR
  ? path.resolve(process.env.INVENTRIO_DATA_DIR)
  : path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "db.json");

function read(): Database {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const seeded = seedDatabase();
      try { write(seeded); } catch { /* read-only fs (e.g. Vercel) */ }
      return seeded;
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) as Database;
  } catch {
    return seedDatabase();
  }
}

function write(db: Database): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch { /* read-only filesystem – noop */ }
}

export function listRows(table: TableName): Row[] {
  return read()[table] ?? [];
}

export function getRow(table: TableName, id: string): Row | undefined {
  return listRows(table).find((row) => row.id === id);
}

export function insertRow(
  table: TableName,
  values: Record<string, unknown>,
): Row {
  const db = read();
  const row: Row = {
    ...values,
    id: typeof values.id === "string" && values.id ? values.id : randomUUID(),
    created_at: new Date().toISOString(),
  };
  db[table] = [...(db[table] ?? []), row];
  write(db);
  return row;
}

export function updateRow(
  table: TableName,
  id: string,
  values: Record<string, unknown>,
): Row | undefined {
  const db = read();
  const rows = db[table] ?? [];
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) return undefined;
  const updated: Row = { ...rows[index], ...values, id, created_at: rows[index].created_at };
  rows[index] = updated;
  db[table] = rows;
  write(db);
  return updated;
}

export function deleteRow(table: TableName, id: string): boolean {
  const db = read();
  const rows = db[table] ?? [];
  const next = rows.filter((row) => row.id !== id);
  if (next.length === rows.length) return false;
  db[table] = next;
  write(db);
  return true;
}

/** Applies a stock movement to the related item quantity. */
export function applyMovementToStock(movement: Row): void {
  const itemId = String(movement.item_id ?? "");
  const item = getRow("items", itemId);
  if (!item) return;
  const current = Number(item.quantity ?? 0);
  const amount = Number(movement.quantity ?? 0);
  const type = String(movement.type);
  const next =
    type === "in" ? current + amount : type === "out" ? current - amount : amount;
  updateRow("items", itemId, { quantity: Math.max(next, 0) });
}

export function resetDatabase(): Database {
  const seeded = seedDatabase();
  write(seeded);
  return seeded;
}
