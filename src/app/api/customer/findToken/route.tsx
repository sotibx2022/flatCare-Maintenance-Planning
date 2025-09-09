export const dynamic = "force-dynamic"; // ensures dynamic rendering
import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { isTokenExpired } from '../../../../helper/isTokenExpired';
export async function GET(request: NextRequest) {
  try {
    // Connect to DB first
    await ConnectToDb();
    // Get token from cookies
    const tokenCookie = request.cookies.get('token');
    if (!tokenCookie) {
      return NextResponse.json({
        message: 'Token Not Found',
        status: 401,
        success: false,
      });
    }
    const token = tokenCookie.value;
    // Check if token is expired
    const expired = await isTokenExpired(token);
    if (expired) {
      return NextResponse.json({
        message: 'Token Expired',
        status: 401,
        success: false,
      });
    }
    // Verify JWT token
    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
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
    // Token is valid
    return NextResponse.json({
      message: 'Token Found Successfully',
      status: 200,
      success: true,
      decodedToken,
    });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      status: 500,
      success: false,
    });
  }
}
