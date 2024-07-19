import { NextRequest, NextResponse } from 'next/server';
import { verify, JwtPayload } from 'jsonwebtoken'; // Import verify function and JwtPayload type

export const isTokenExpired = async (request: NextRequest, response: NextResponse): Promise<boolean> => {
    const tokenCookie = request.cookies.get('token');
    const token = tokenCookie?.value;

    if (!token) {
        return true; // Token not found or invalid
    }

    try {
        const decodedToken = verify(token, process.env.SECRET_KEY!) as JwtPayload;

        if (decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
            response.cookies.set('token', token, {
                httpOnly: true,
                path: '/',
                expires: new Date(0)
            })
        }

        return true; // Token is expired or invalid
    } catch (error) {
        console.error('Error verifying token:', error);
        return true; // Error occurred during token verification
    }
};
