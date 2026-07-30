import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const key = serviceKey ?? anonKey;

    const info: Record<string, unknown> = {
      supabaseUrl: url ? `${url.substring(0, 30)}...` : "NOT SET",
      serviceRoleKey: serviceKey ? "SET" : "NOT SET",
      anonKey: anonKey ? "SET" : "NOT SET",
      hasKey: key ? "YES" : "NO",
      appUser: process.env.APP_USER || "admin (default)",
      appPassword: process.env.APP_PASSWORD ? "SET" : "inventrio (default)",
    };

    if (!url || !key) {
      info.supabaseClient = "null (not configured)";
      info.settingsTable = "skipped";
      info.message = "Supabase no esta configurado. El registro no funcionara en Vercel sin Supabase.";
      return NextResponse.json(info);
    }

    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(url, key, { auth: { persistSession: false } });
    info.supabaseClient = "created";

    const { data, error } = await client.from("settings").select("*").limit(1);
    if (error) {
      info.settingsTable = `ERROR: ${error.message}`;
      info.message = "La tabla settings no existe o hay error de permisos. Ejecuta la migracion 000_base.sql en Supabase.";
      return NextResponse.json(info);
    }

    info.settingsTable = data && data.length > 0 ? `row exists: admin_user=${data[0].admin_user ?? "N/A"}` : "empty (no rows)";
    info.settingsRow = data?.[0] ?? null;
    info.message = data && data.length > 0
      ? "Supabase funciona. La tabla settings tiene datos."
      : "Supabase funciona pero la tabla settings esta vacia. El registro deberia poder insertar.";
    return NextResponse.json(info);
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "unknown error",
      stack: err instanceof Error ? err.stack : undefined,
    });
  }
}
