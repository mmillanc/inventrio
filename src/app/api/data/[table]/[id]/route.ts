import { NextResponse } from "next/server";
import { deleteRow, updateRow } from "@/lib/db/local";
import { isTable } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ table: string; id: string }> },
) {
  const { table, id } = await params;
  if (!isTable(table)) {
    return NextResponse.json({ error: `Tabla desconocida: ${table}` }, { status: 404 });
  }
  const body = (await request.json()) as Record<string, unknown>;
  const row = updateRow(table, id, body);
  if (!row) {
    return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ data: row });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ table: string; id: string }> },
) {
  const { table, id } = await params;
  if (!isTable(table)) {
    return NextResponse.json({ error: `Tabla desconocida: ${table}` }, { status: 404 });
  }
  if (!deleteRow(table, id)) {
    return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ data: { id } });
}
