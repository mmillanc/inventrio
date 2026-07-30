import { NextResponse } from "next/server";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceKey ?? anonKey;

  const config = {
    supabaseUrl: url ? `${url.substring(0, 20)}...` : "NOT SET",
    serviceRoleKey: serviceKey ? "SET" : "NOT SET",
    anonKey: anonKey ? "SET" : "NOT SET",
    isConfigured: isSupabaseConfigured(),
    appUser: process.env.APP_USER || "admin (default)",
    appPassword: process.env.APP_PASSWORD ? "SET" : "inventrio (default)",
  };

  if (!isSupabaseConfigured() || !url || !key) {
    return NextResponse.json({
      ...config,
      supabaseClient: "null (not configured)",
      settingsTable: "skipped",
      message: "Supabase no está configurado. El registro no funcionará en Vercel sin Supabase.",
    });
  }

  const client = createServerClient();
  if (!client) {
    return NextResponse.json({
      ...config,
      supabaseClient: "null",
      message: "No se pudo crear el cliente de Supabase.",
    });
  }

  try {
    const { data, error } = await client.from("settings").select("*").limit(1);
    if (error) {
      return NextResponse.json({
        ...config,
        supabaseClient: "created",
        settingsTable: `ERROR: ${error.message}`,
        message: "La tabla 'settings' no existe o hay error de permisos. Ejecuta la migración 000_base.sql en Supabase.",
      });
    }

    return NextResponse.json({
      ...config,
      supabaseClient: "created",
      settingsTable: data.length > 0 ? `row exists: admin_user=${data[0].admin_user ?? "N/A"}` : "empty (no rows)",
      settingsRow: data[0] ?? null,
      message: data.length > 0
        ? "Supabase funciona. La tabla settings tiene datos."
        : "Supabase funciona pero la tabla settings está vacía. El registro debería poder insertar.",
    });
  } catch (err) {
    return NextResponse.json({
      ...config,
      supabaseClient: "created",
      settingsTable: `EXCEPTION: ${err instanceof Error ? err.message : "unknown"}`,
      message: "Error al conectar con Supabase.",
    });
  }
}
