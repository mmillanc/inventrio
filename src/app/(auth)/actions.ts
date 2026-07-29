"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidLogin } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { insertRow, updateRow } from "@/lib/db";

export async function login(_state: string | null, formData: FormData): Promise<string | null> {
  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!(await isValidLogin(user, password))) {
    return "Usuario o contraseña incorrectos.";
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, user, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/login");
}

export async function register(_state: string | null, formData: FormData): Promise<string | null> {
  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const plan = String(formData.get("plan") ?? "");

  if (!user || !password) return "Usuario y contraseña son obligatorios.";
  if (password !== confirm) return "Las contraseñas no coinciden.";
  if (plan !== "laboratorio" && plan !== "pyme") return "Selecciona un plan válido.";

  let dbError = false;
  try {
    const values = { admin_user: user, admin_password: password, plan };
    const settings = await getSettings();
    if (settings) {
      await updateRow("settings", settings.id, values);
    } else {
      await insertRow("settings", values);
    }
  } catch (error) {
    console.error("register error:", error);
    dbError = true;
  }

  if (dbError) {
    return "No se pudo guardar la cuenta en la base de datos. Verifica que las migraciones de Supabase estén aplicadas.";
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, user, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/");
}
