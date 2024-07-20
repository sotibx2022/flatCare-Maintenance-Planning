// Import necessary modules and functions
import { verify } from 'crypto';
import { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(request: NextRequest, response: NextResponse) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token');
    const isPublicPath = (path === "/customer/login" || path === "/customer/signup")
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/customer/dashboard/main', request.url));
    } else if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/customer/login', request.url));
    }
}
export const config = {
    matcher: ['/customer/dashboard/:path*',
        '/customer/login',
        '/customer/signup',
        '/'
    ],
};
