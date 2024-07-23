import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token');
  const isPublicPath =
    path === '/customer/login' || path === '/customer/signup';
  // If token exists and is trying to access a public path
  if (token && isPublicPath) {
    return NextResponse.redirect(
      new URL('/customer/dashboard/main', request.url),
    );
  }
  // If token does not exist and trying to access a protected path
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/customer/login', request.url));
  }
  // If none of the conditions match, allow the request to proceed
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/customer/dashboard/:path*',
    '/customer/login',
    '/customer/signup',
    '/',
  ],
};
