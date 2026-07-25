import "server-only";

export const SESSION_COOKIE = "inventrio_session";

export function credentials(): { user: string; password: string } {
  return {
    user: process.env.APP_USER ?? "admin",
    password: process.env.APP_PASSWORD ?? "inventrio",
  };
}

export function isValidLogin(user: string, password: string): boolean {
  const expected = credentials();
  return user === expected.user && password === expected.password;
}
