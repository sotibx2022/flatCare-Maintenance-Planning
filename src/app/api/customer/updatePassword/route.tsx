import { NextRequest, NextResponse } from 'next/server';
import { Customer, CustomerDocument } from '../../../../models/customer.models';
import { ConnectToDb } from '../../../../helper/connectToDb';
import bcrypt from 'bcryptjs';
import { isTokenExpired } from '../../../../helper/isTokenExpired';
export async function POST(request: NextRequest, response: NextResponse) {
  ConnectToDb();
  try {
    const { email, newPassword } = await request.json();
    console.log(email);
    const customer = await Customer.findOne({ email: email });
    if (customer) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const comparisonPromises = customer.passwordHistory.map(
        async (passwordObj) => {
          try {
            return await bcrypt.compare(newPassword, passwordObj.password);
          } catch (error) {
            console.error('Error comparing passwords:', error);
            return false; // Handle error condition and return a boolean
          }
        },
      );
      const comparisonValues = await Promise.all(comparisonPromises);
      const isRepeated = comparisonValues.some((result) => result);
      if (!isRepeated) {
        customer.password = hashedNewPassword;
        customer.passwordHistory.push({
          password: hashedNewPassword,
          createdAt: new Date(),
        });
        if (customer.passwordHistory.length > 5) {
          customer.passwordHistory.shift();
        }
        await customer.save();
        return NextResponse.json({
          message: 'Password updated successfully',
          success: true,
          status: 200,
        });
      } else {
        return NextResponse.json({
          message:
            'This password has been used before. Please choose a different one.',
          success: false,
          status: 400,
        });
      }
    } else {
      return NextResponse.json({
        message: 'Customer not found for the provided email.',
        success: false,
        status: 404,
      });
    }
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json({
      message: 'Error updating password.',
      success: false,
      status: 500,
    });
  }
}
