import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "inventrio_session";

export function middleware(request: NextRequest) {
  const authenticated = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = request.nextUrl.pathname === "/login";

  if (!authenticated && !isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (authenticated && isLogin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
