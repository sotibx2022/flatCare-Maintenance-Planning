export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { Customer } from '../../../../models/customer.models';
import { isTokenExpired } from '../../../../helper/isTokenExpired';
import { uploadImage } from '../../../../helper/uploadImage';
export async function PUT(request: NextRequest) {
  try {
    // Connect to DB
    await ConnectToDb();
    // Get token from cookies
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
    // Parse form data
    const formData = await request.formData();
    const fullName = formData.get('fullName')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const buildingNumber = formData.get('buildingNumber')?.toString() || '';
    const floorNumber = formData.get('floorNumber')?.toString() || '';
    const roomNumber = formData.get('roomNumber')?.toString() || '';
    const file = formData.get('file') as unknown as File | null;
    // Retrieve original customer
    const originalCustomer = await Customer.findOne({ email });
    if (!originalCustomer) {
      return NextResponse.json({
        message: 'Customer not found.',
        status: 404,
        success: false,
      });
    }
    // Initialize file metadata
    let fileName = originalCustomer.fileName;
    let fileType = originalCustomer.fileType;
    let fileSize = originalCustomer.fileSize;
    let imageUrl = originalCustomer.imageUrl;
    // Upload new image if file is provided
    if (file) {
      const result = await uploadImage(
        file,
        'customerImages',
        originalCustomer.imageUniqueName.toString()
      );
      // Guard against null
      fileName = file.name;
      fileType = file.type;
      fileSize = file.size;
      imageUrl = result.downloadUrl || originalCustomer.imageUrl; // fallback to original
    }
    // Check if there are any changes
    const isSame =
      originalCustomer.fullName === fullName &&
      originalCustomer.buildingNumber === buildingNumber &&
      originalCustomer.floorNumber === floorNumber &&
      originalCustomer.roomNumber === roomNumber &&
      originalCustomer.fileName === fileName &&
      originalCustomer.fileType === fileType &&
      originalCustomer.fileSize === fileSize &&
      originalCustomer.imageUrl === imageUrl;
    if (isSame) {
      return NextResponse.json({
        message: 'There is nothing to update.',
        status: 200,
        success: false,
      });
    }
    // Update customer
    const updatedCustomer = await Customer.findOneAndUpdate(
      { email },
      {
        fullName,
        buildingNumber,
        floorNumber,
        roomNumber,
        fileName,
        fileType,
        fileSize,
        imageUrl,
      },
      { new: true }
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
      status: 500,
      success: false,
    });
  }
}
