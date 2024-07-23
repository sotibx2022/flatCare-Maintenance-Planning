import { NextRequest, NextResponse } from 'next/server';
import { Customer } from '../../../../models/customer.models';
import crypto from 'crypto';
export async function GET(request: NextRequest) {
  // This GET handler simply returns a JSON response
  return NextResponse.json({ message: 'Link Found' });
}
export async function POST(request: NextRequest) {
  const dataToSend = await request.json();
  const { userId, verifyToken } = dataToSend;
  // Check for missing credentials
  if (!userId || !verifyToken) {
    return NextResponse.json({
      message: 'Credentials are missing',
      status: 400,
      success: false,
    });
  }
  // Find the customer by userId
  const customer = await Customer.findOne({ _id: userId });
  if (!customer) {
    return NextResponse.json({
      message: 'No Customer with provided details',
      success: false,
      status: 400,
    });
  }
  // Check if the customer is not verified
  if (!customer.isVerified) {
    const hashedVerifyToken = crypto
      .createHash('sha256')
      .update(verifyToken)
      .digest('hex');
    // Validate the token
    if (hashedVerifyToken !== customer.verifyToken) {
      return NextResponse.json({
        message: 'Invalid Verification Token',
        status: 400,
        success: false,
      });
    } else if (
      customer.verifyTokenExpiry &&
      customer.verifyTokenExpiry < new Date()
    ) {
      return NextResponse.json({
        message: 'Token Already Expired',
        status: 400,
        success: false,
      });
    } else {
      // Update customer verification status
      customer.verifyToken = null;
      customer.verifyTokenExpiry = null;
      customer.isVerified = true;
      await customer.save();
      // Redirect after successful verification
      return NextResponse.json({
        message: 'User Verified SuccessFully',
        status: 200,
        success: true,
      });
    }
  } else {
    // Redirect if already verified
    return NextResponse.json({
      message: 'Your Email is Already Verified. Redirecting...',
      status: 200,
      success: true,
    });
  }
}
