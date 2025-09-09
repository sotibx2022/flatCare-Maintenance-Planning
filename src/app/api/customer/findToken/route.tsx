export const dynamic = "force-dynamic"; // ✅ ensures dynamic rendering
import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { isTokenExpired } from '../../../../helper/isTokenExpired';
export async function GET(request: NextRequest) {
  await ConnectToDb();
  // Optional: Check token expiration (modify isTokenExpired to return boolean if needed)
  isTokenExpired(request, NextResponse);
  try {
    // Retrieve token from cookies
    const tokenCookie = request.cookies.get('token');
    if (!tokenCookie) {
      return NextResponse.json({
        message: 'Token Not Found',
        status: 404,
        success: false,
      });
    }
    const token = tokenCookie.value;
    try {
      // Verify JWT token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
      return NextResponse.json({
        message: 'Token Found Successfully',
        status: 200,
        success: true,
        decodedToken,
      });
    } catch (error) {
      console.error('Error verifying token:', error);
      if (error instanceof TokenExpiredError) {
        return NextResponse.json({
          message: 'Token Expired',
          status: 401,
          success: false,
        });
      } else if (error instanceof JsonWebTokenError) {
        return NextResponse.json({
          message: 'Invalid Token',
          status: 401,
          success: false,
        });
      } else {
        return NextResponse.json({
          message: 'Internal Server Error',
          status: 500,
          success: false,
        });
      }
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      status: 500,
      success: false,
    });
  }
}
