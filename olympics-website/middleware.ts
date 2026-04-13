import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_EMAILS = ["egeeskisar@gmail.com", "jhuacmofficers@gmail.com"];
// const HARDCODED_SECRET = "ege_override_secret_123456789"; 
// Do not use this secret, I put it here for debugging, it is highly unsecure; but it is guaranteed to work

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  const email = token?.email;
  const isAdmin = !!(email && ADMIN_EMAILS.includes(email));

  console.log(`[BOUNCER] Email: ${email || "NONE"} | Admin: ${isAdmin}`);

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    if (!isAdmin) {
      return NextResponse.rewrite(new URL("/403", req.url));
    }
  }

  return NextResponse.next();
}

export const config = { 
  matcher: ["/admin/:path*"] 
};
