import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Customer } from '../../../../models/customer.models';
import { ConnectToDb } from '../../../../helper/connectToDb';

export async function POST(request: NextRequest) {
  ConnectToDb(); // Assuming ConnectToDb() handles the database connection correctly

  try {
    const { email, originalPassword } = await request.json();

    // Find the customer by userId
    const customer = await Customer.findOne({ email: email });

    if (customer) {
      const isValidPassword = await bcrypt.compare(
        originalPassword,
        customer.password,
      );
      if (isValidPassword) {
        return NextResponse.json({
          success: true,
          message: 'Valid Password',
        });
      }
      return NextResponse.json({
        success: false,
        message: 'Invalid Password',
      });
    }
    return NextResponse.json({
      success: false,
      message: 'User not Found',
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Error Checking password.',
      status: 500,
      success: false,
    });
  }
}
