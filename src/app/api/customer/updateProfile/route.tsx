
import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { Customer } from '../../../../models/customer.models';

export async function PUT(request: NextRequest) {
  ConnectToDb();

  try {
    const { fullName, email, buildingNumber, floorNumber, roomNumber, imageUrl } = await request.json();

    const updatedCustomer = await Customer.findOneAndUpdate(
      { email: email },
      { fullName, email, buildingNumber, floorNumber, roomNumber, imageUrl },
      { new: true } // Return the updated document
    );

    if (!updatedCustomer) {
      return NextResponse.json({
        message: "Customer not found.",
        status: 404,
        success: false,
      });
    }

    return NextResponse.json({
      message: "Customer Details Updated Successfully.",
      status: 200,
      success: true,
      updatedCustomer,
    });
  } catch (error) {
    console.error('Error updating customer details:', error);
    return NextResponse.json({
      message: "Error updating customer details.",
      status: 400,
      success: false,
    });
  }
}
