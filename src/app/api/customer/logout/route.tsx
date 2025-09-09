import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
export const dynamic = "force-dynamic"; // ensures dynamic server rendering
export async function POST(request: NextRequest) {
  try {
    // Ensure DB connection (optional for logout)
    await ConnectToDb();
    // Create response
    const res = NextResponse.json({
      message: 'User Logout Successfully',
      status: 200,
      success: true,
    });
    // Clear the 'token' cookie
    res.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0), // Set expiry to past date
      path: '/',            // Ensure cookie is cleared site-wide
    });
    return res;
  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      status: 500,
      success: false,
    });
  }
}
