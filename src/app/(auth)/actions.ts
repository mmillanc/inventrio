"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidLogin, hashPassword } from "@/lib/auth";
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
  redirect("/");
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
  let errorMsg = "";
  try {
    const hashed = await hashPassword(password);
    const values = { admin_user: user, admin_password: hashed, plan };
    const settings = await getSettings();
    if (settings) {
      await updateRow("settings", settings.id, values);
    } else {
      await insertRow("settings", values);
    }

    const verify = await getSettings();
    if (!verify?.admin_user || verify.admin_user !== user) {
      dbError = true;
      errorMsg = "Los datos no se persistieron. Si estás en Vercel sin Supabase, el registro no funcionará.";
    }
  } catch (error) {
    console.error("register error:", error);
    dbError = true;
    errorMsg = error instanceof Error ? error.message : "Error desconocido";
  }

  if (dbError) {
    return `No se pudo guardar la cuenta: ${errorMsg}. Verifica la configuración de Supabase en Vercel.`;
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
