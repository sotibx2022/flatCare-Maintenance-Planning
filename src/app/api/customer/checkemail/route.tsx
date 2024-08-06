import { NextRequest, NextResponse } from 'next/server';
import { Customer } from '../../../../models/customer.models';
import { ConnectToDb } from '../../../../helper/connectToDb';
export async function POST(request: NextRequest, response: NextResponse) {
  await ConnectToDb();
  const { originalEmail } = await request.json();
  if (!originalEmail) {
    return NextResponse.json({
      message: 'Invalid email format provided',
      success: false,
      status: 400,
    });
  }
  // Find the customer by email
  const customer = await Customer.findOne({ email: originalEmail });
  // Check if customer exists
  if (!customer) {
    return NextResponse.json({
      message: 'There is no user registered with the provided email',
      success: false,
      status: 400,
    });
  } else {
    return NextResponse.json({
      message: 'Email found, please update the new password',
      success: true,
      status: 200,
    });
  }
}
