export const dynamic = "force-dynamic"; // force dynamic rendering
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { Customer } from '../../../../models/customer.models';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { isTokenExpired } from '../../../../helper/isTokenExpired';
interface CustomerData {
  message: string;
  status: number;
  success: boolean;
  customer?: object;
}
export async function GET(request: NextRequest) {
  try {
    // Connect to DB first
    await ConnectToDb();
    // Get token from cookies
    const tokenCookie = request.cookies.get('token');
    if (!tokenCookie) {
      return NextResponse.json<CustomerData>({
        message: 'Token Not Found',
        status: 401,
        success: false,
      });
    }
    const token = tokenCookie.value;
    // Optional: check expiration using helper
    const expired = await isTokenExpired(token);
    if (expired) {
      return NextResponse.json<CustomerData>({
        message: 'JWT Token Expired',
        status: 401,
        success: false,
      });
    }
    // Verify token
    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return NextResponse.json<CustomerData>({
          message: 'JWT Token Expired',
          status: 401,
          success: false,
        });
      } else if (error instanceof JsonWebTokenError) {
        return NextResponse.json<CustomerData>({
          message: 'Invalid JWT Token',
          status: 401,
          success: false,
        });
      } else {
        console.error('Error verifying JWT token:', error);
        return NextResponse.json<CustomerData>({
          message: 'Internal Server Error',
          status: 500,
          success: false,
        });
      }
    }
    // Fetch customer data
    const customer = await Customer.findOne({ _id: decodedToken.userId });
    if (!customer) {
      return NextResponse.json<CustomerData>({
        message: 'Customer Not Found',
        status: 404,
        success: false,
      });
    }
    return NextResponse.json<CustomerData>({
      message: 'Customer Details Found Successfully',
      status: 200,
      success: true,
      customer,
    });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json<CustomerData>({
      message: 'Internal Server Error',
      status: 500,
      success: false,
    });
  }
}
