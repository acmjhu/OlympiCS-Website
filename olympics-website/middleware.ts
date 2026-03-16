import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; //FIXED THIS IMPORT

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAdmin = token?.role === "ADMIN";
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    if (!isAdmin) {
      return NextResponse.rewrite(new URL("/403", req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
