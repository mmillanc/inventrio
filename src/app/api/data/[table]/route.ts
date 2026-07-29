import { NextResponse } from "next/server";
import { applyMovementToStock, insertRow, listRows } from "@/lib/db";
import { isTable } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ table: string }> },
) {
  const { table } = await params;
  if (!isTable(table)) {
    return NextResponse.json({ error: `Tabla desconocida: ${table}` }, { status: 404 });
  }
  return NextResponse.json({ data: await listRows(table) });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ table: string }> },
) {
  const { table } = await params;
  if (!isTable(table)) {
    return NextResponse.json({ error: `Tabla desconocida: ${table}` }, { status: 404 });
  }
  const body = (await request.json()) as Record<string, unknown>;
  const row = await insertRow(table, body);
  if (table === "stock_movements") await applyMovementToStock(row);
  return NextResponse.json({ data: row }, { status: 201 });
}
