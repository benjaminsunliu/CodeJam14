import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/dbServer";

export async function middleware(request: NextRequest) {
  const isLoggedIn = await db.isAuthenticated(request.cookies as any);
  const pathname = request.nextUrl.pathname;

  if (pathname && pathname.includes("/auth")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.endsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (pathname && pathname.includes("/features")) {
    if (isLoggedIn) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
