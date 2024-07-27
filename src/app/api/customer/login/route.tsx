import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { Customer } from '../../../../models/customer.models';
export async function GET(request: NextRequest, response: NextResponse) {
  ConnectToDb();
  try {
    const customers = await Customer.find();
    return NextResponse.json({
      message: 'Customers found successfully',
      status: 200,
      success: true,
      customers,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message:
        error instanceof Error ? error.message : 'Unknown error occurred.',
      status: 500,
      success: false,
    });
  }
}
export async function POST(request: NextRequest, response: NextResponse) {
  ConnectToDb();
  try {
    const { currentEmail, currentPassword } = await request.json();
    const customer = await Customer.findOne({ email: currentEmail });
    if (!customer) {
      return NextResponse.json({
        message: 'There is no registered Customer',
        status: 400,
        success: false,
      });
    } else {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        customer.password,
      );
      if (!isPasswordValid) {
        response = NextResponse.json({
          message: 'Invalid Password',
          status: 200,
          success: false,
          customer,
        });
      } else {
        response = NextResponse.json({
          message: 'Login Successful',
          status: 200,
          success: true,
          customer,
        });
        const token = jwt.sign(
          { userId: customer._id },
          process.env.SECRET_KEY!,
          { expiresIn: '1h' },
        );
        response.cookies.set('token', token, {
          httpOnly: true,
          path: '/',
          expires: new Date(Date.now() + 60 * 60 * 1000),
        });
      }
      return response;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message:
        error instanceof Error ? error.message : 'Unknown error occurred.',
      status: 500,
      success: false,
    });
  }
}
