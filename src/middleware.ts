import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
const path = request.nextUrl.pathname;
const token = request.cookies.get('token')
const isPublicPath = (path ==="/customer/login" || path === "/customer/signup" ||path ==="/")
if(token && isPublicPath){
    return NextResponse.redirect(new URL('/customer/dashboard', request.url))
} else if(!token && !isPublicPath){
    return NextResponse.redirect(new URL('/customer/login', request.url))
}else{
    return NextResponse.next()
}
  
}
export const config = {
  matcher: [
    "/customer/login",
    "/customer/signup",
    "/",
    "/customer/dashboard/main",
    "/customer/dashboard/:path*"
  ],
}