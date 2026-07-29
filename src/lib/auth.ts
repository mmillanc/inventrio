import "server-only";

import { getSettings } from "@/lib/settings";

export const SESSION_COOKIE = "inventrio_session";

export function credentials(): { user: string; password: string } {
  return {
    user: process.env.APP_USER ?? "admin",
    password: process.env.APP_PASSWORD ?? "inventrio",
  };
}

export async function isValidLogin(user: string, password: string): Promise<boolean> {
  const settings = await getSettings();
  if (settings?.admin_user && settings?.admin_password) {
    return user === settings.admin_user && password === settings.admin_password;
  }
  const expected = credentials();
  return user === expected.user && password === expected.password;
}
