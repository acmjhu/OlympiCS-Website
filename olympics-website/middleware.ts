import { NextRequest, NextResponse } from 'next/server';

const ADMIN_ROLE = 'ADMIN';

export function middleware(request: NextRequest) {
  const roleFromHeader = request.headers.get('x-user-role');
  const roleFromCookie = request.cookies.get('user-role')?.value;
  const role = roleFromHeader ?? roleFromCookie;

  if (role === ADMIN_ROLE) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    return NextResponse.json(
      { error: 'Forbidden: admin role required' },
      { status: 403 }
    );
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = '/';
  redirectUrl.searchParams.set('error', 'forbidden');
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
