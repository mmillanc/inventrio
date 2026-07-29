import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "inventrio_session";
const PUBLIC_PATHS = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
  const authenticated = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const isPublic = PUBLIC_PATHS.includes(request.nextUrl.pathname);

  if (!authenticated && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (authenticated && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
