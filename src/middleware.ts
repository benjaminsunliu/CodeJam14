import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/dbServer";

export async function middleware(request: NextRequest) {
  const isLoggedIn = await db.isAuthenticated(request.cookies);

  if (request.nextUrl.pathname) {
    if (isLoggedIn) {
      // return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}
