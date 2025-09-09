export const dynamic = "force-dynamic"; // ✅ tells Next.js this route must be dynamic
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
  await ConnectToDb();
  isTokenExpired(request, NextResponse); // ⚠️ check what this returns (might need handling)
  try {
    const tokenCookie = request.cookies.get('token');
    if (!tokenCookie) {
      return NextResponse.json<CustomerData>({
        message: 'Token Not Found',
        status: 404,
        success: false,
      });
    }
    const token = tokenCookie.value;
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
      const { userId } = decodedToken;
      const customer = await Customer.findOne({ _id: userId });
      if (customer) {
        return NextResponse.json<CustomerData>({
          message: 'Customer Details Found Successfully',
          status: 200,
          success: true,
          customer,
        });
      } else {
        return NextResponse.json<CustomerData>({
          message: 'Customer Not Found',
          status: 404,
          success: false,
        });
      }
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
  } catch (error) {
    console.error('Error retrieving token or connecting to database:', error);
    return NextResponse.json<CustomerData>({
      message: 'Internal Server Error',
      status: 500,
      success: false,
    });
  }
}
