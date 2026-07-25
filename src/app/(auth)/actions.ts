"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidLogin } from "@/lib/auth";

export async function login(_state: string | null, formData: FormData): Promise<string | null> {
  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!isValidLogin(user, password)) {
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
