import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/dbServer";

export async function middleware(request: NextRequest) {
  const isLoggedIn = await db.isAuthenticated(request.cookies);
  const pathname = request.nextUrl.pathname;

  if (pathname && pathname.includes("/auth")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.endsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}
