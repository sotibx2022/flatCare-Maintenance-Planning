
import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { Customer } from '../../../../models/customer.models';
export async function PUT(request: NextRequest) {
  ConnectToDb();

  try {
    const { fullName, email, buildingNumber, floorNumber, roomNumber, imageUrl } = await request.json();

    // Retrieve the original customer data
    const originalCustomer = await Customer.findOne({ email: email });

    if (!originalCustomer) {
      return NextResponse.json({
        message: "Customer not found.",
        status: 404,
        success: false,
      });
    }

    // Check if there are any changes
    const isSame =
      originalCustomer.fullName === fullName &&
      originalCustomer.email === email &&
      originalCustomer.buildingNumber === buildingNumber &&
      originalCustomer.floorNumber === floorNumber &&
      originalCustomer.roomNumber === roomNumber &&
      originalCustomer.imageUrl === imageUrl;

    if (isSame) {
      return NextResponse.json({
        message: "There is nothing to update.",
        status: 200,
        success: false,
      });
    }

    // Update the customer data if there are changes
    const updatedCustomer = await Customer.findOneAndUpdate(
      { email: email },
      { fullName, email, buildingNumber, floorNumber, roomNumber, imageUrl },
      { new: true } // Return the updated document
    );

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
