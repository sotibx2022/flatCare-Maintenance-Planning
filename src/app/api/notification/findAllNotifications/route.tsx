export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { Notification } from '../../../../models/notification.models';
import { isTokenExpired } from '../../../../helper/isTokenExpired';
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    ConnectToDb();
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
        message: 'JWT Token Expired',
        status: 401,
        success: false,
      });
    }
    const allNotifications = await Notification.find();
    return NextResponse.json({
      message: 'Notifications Found Succcessfully',
      status: 200,
      success: true,
      allNotifications,
    });
  } catch (error) { }
}
