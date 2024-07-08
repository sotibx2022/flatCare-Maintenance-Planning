import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function GET(request: NextRequest) {
    await ConnectToDb(); // Assuming ConnectToDb() returns a promise

    try {
        // Retrieve token from cookies
        let token;
        const tokenCookie: RequestCookie = request.cookies.get('token')!
        if (tokenCookie) {
            token = tokenCookie.value;
        }


        if (!token) {
            return NextResponse.json({
                message: 'Token Not Found',
                status: 404,
                success: false
            });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
        } catch (error) {
            console.error('Error verifying token:', error);
            if (error instanceof TokenExpiredError) {

                return NextResponse.json({
                    message: 'Token Expired',
                    status: 401,
                    success: false
                });
            } else if (error instanceof JsonWebTokenError) {
                return NextResponse.json({
                    message: 'Invalid Token',
                    status: 401,
                    success: false
                });
            } else {
                return NextResponse.json({
                    message: 'Internal Server Error',
                    status: 500,
                    success: false
                });
            }
        }

        return NextResponse.json({
            message: 'Token Found Successfully',
            status: 200,
            success: true,
            decodedToken
        });

    } catch (error) {
        console.error('Error retrieving token:', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
            success: false
        });
    }
}
