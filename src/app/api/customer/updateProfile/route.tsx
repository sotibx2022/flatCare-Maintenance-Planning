import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { Customer } from '../../../../models/customer.models';
import { isTokenExpired } from '../../../../helper/isTokenExpired';
import { uploadImage } from '../../../../helper/uploadImage';
import { INSTRUMENTATION_HOOK_FILENAME } from 'next/dist/lib/constants';
export async function PUT(request: NextRequest, response: NextResponse) {
  ConnectToDb();
  isTokenExpired(request, response);
  try {
    const formData = await request.formData();
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const buildingNumber = formData.get('buildingNumber');
    const floorNumber = formData.get('floorNumber');
    const roomNumber = formData.get('roomNumber');
    const file = formData.get('file') as unknown as File;
    let fileName = '';
    let fileType = '';
    let fileSize = 0;
    if (file) {
      fileName = file.name;
      fileType = file.type;
      fileSize = file.size;
    }
    // Retrieve the original customer data
    const originalCustomer = await Customer.findOne({ email: email });
    if (!originalCustomer) {
      return NextResponse.json({
        message: 'Customer not found.',
        status: 404,
        success: false,
      });
    }
    const result = await uploadImage(
      file,
      'customerImages',
      originalCustomer.imageUniqueName.toString(),
    );
    const { downloadUrl } = result;
    // Check if there are any changes
    const isSame =
      originalCustomer.fullName === fullName &&
      originalCustomer.buildingNumber === buildingNumber &&
      originalCustomer.floorNumber === floorNumber &&
      originalCustomer.roomNumber === roomNumber &&
      (file && (originalCustomer.fileName === fileName &&
        originalCustomer.fileType === fileType &&
        originalCustomer.fileSize === fileSize
      ))
    if (isSame) {
      return NextResponse.json({
        message: 'There is nothing to update.',
        status: 200,
        success: false,
      });
    }
    // Update the customer data if there are changes
    const updatedCustomer = await Customer.findOneAndUpdate(
      { email: email },
      {
        fullName,
        email,
        buildingNumber,
        floorNumber,
        roomNumber,
        fileName: file ? fileName : originalCustomer.fileName,
        fileSize: file ? fileSize : originalCustomer.fileSize,
        fileType: file ? fileType : originalCustomer.fileType,
        imageUrl: file ? downloadUrl : originalCustomer.imageUrl,
      },
      { new: true }, // Return the updated document
    );
    return NextResponse.json({
      message: 'Customer Details Updated Successfully.',
      status: 200,
      success: true,
      updatedCustomer,
    });
  } catch (error) {
    console.error('Error updating customer details:', error);
    return NextResponse.json({
      message: 'Error updating customer details.',
      status: 400,
      success: false,
    });
  }
}
