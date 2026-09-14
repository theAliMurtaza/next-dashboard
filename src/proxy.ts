import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth-constants";
import { readSessionToken } from "@/lib/session-token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasValidSession = Boolean(
    readSessionToken(request.cookies.get(SESSION_COOKIE)?.value ?? "")
  );
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = ["/login", "/register", "/forget-password"].includes(pathname);

  if (isDashboard && !hasValidSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && hasValidSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forget-password"],
};
