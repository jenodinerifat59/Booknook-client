import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("better-auth.session_token");

  const isPrivateRoute =
    request.nextUrl.pathname.startsWith("/my-books") ||
    request.nextUrl.pathname.startsWith("/profile");

  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
matcher: ["/my-books/:path*", "/profile/:path*"],
};