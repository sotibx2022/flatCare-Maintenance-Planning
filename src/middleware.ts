import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Correct evaluation of isPublicPath
    let isPublicPath = path === '/customer/login' || path === '/customer/signup';
    
    const token = request.cookies.get('token');

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/customer', request.url));
    } else if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/customer/login', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/customer/login',
        '/customer/signup',
        '/customer',
        '/'
    ]
};
