import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token');
  // Define public paths
  const publicPaths = ['/customer/login', '/customer/signup', '/'];
  const isPublicPath = publicPaths.includes(path);
  // If token exists and trying to access a public path (except '/')
  if (token && !isPublicPath) {
    // Redirect only if not already on the dashboard main path
    if (path !== '/customer/dashboard/main') {
      return NextResponse.redirect(new URL('/customer/dashboard/main', request.url));
    }
  }
  // If token does not exist and trying to access a protected path
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/customer/login', request.url));
  }
  // Allow the request to proceed if none of the conditions match
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
