import "server-only";

import bcrypt from "bcryptjs";
import { getSettings } from "@/lib/settings";

export const SESSION_COOKIE = "inventrio_session";

export function credentials(): { user: string; password: string } {
  return {
    user: process.env.APP_USER || "admin",
    password: process.env.APP_PASSWORD || "inventrio",
  };
}

/** Hash a password using bcrypt (10 rounds). */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/** Verify a password against a stored hash (or plaintext for backward compat). */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")) {
    return bcrypt.compare(password, stored);
  }
  return password === stored;
}

export async function isValidLogin(user: string, password: string): Promise<boolean> {
  try {
    const settings = await getSettings();
    if (settings?.admin_user && settings?.admin_password) {
      const userMatch = user === settings.admin_user;
      const passMatch = await verifyPassword(password, settings.admin_password);
      return userMatch && passMatch;
    }
  } catch {
    /* fall back to env credentials */
  }
  const expected = credentials();
  return user === expected.user && password === expected.password;
}
