import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token');
  // Define public paths
  const publicPaths = [
    '/customer/login',
    '/customer/signup',
    '/',
    '/customer',
    '/technician',
    '/planner',
    '/technician/Login',
    '/planner/login',
    '/howitworks',
    '/contact'
  ];
  const isPublicPath = publicPaths.includes(path);
  // If token exists and trying to access a public path (except '/')
  if (token && isPublicPath) {
    // Redirect to the dashboard main page only if the current path is a public page
    if (path !== '/' && !path.startsWith('/customer/dashboard')) {
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
    '/customer/:path*',
    '/technician/:path*',
    '/planner/:path*',
    '/howitworks',
    '/contact',
  ],
};
