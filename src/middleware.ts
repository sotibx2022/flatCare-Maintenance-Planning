import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(path);

    // Correct evaluation of isPublicPath
    let isPublicPath = path === '/customer-account/login' || path === '/customer-account/signup';
    
    const token = request.cookies.get('token');

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/customer-account', request.url));
    } else if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/customer-account/login', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/customer-account/login',
        '/customer-account/signup',
        '/customer-account',
        '/'
    ]
};
