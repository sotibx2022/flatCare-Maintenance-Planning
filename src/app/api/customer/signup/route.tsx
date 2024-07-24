import { NextRequest, NextResponse } from 'next/server';
import { Customer } from '../../../../models/customer.models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmailToCustomer } from '../../../../helper/sendEmailToCustomer';
import fs from 'fs';
import path from 'path';
import { uploadImage } from '../../../../helper/uploadImage';
import { ConnectToDb } from '../../../../helper/connectToDb';
import EmailVerificationTemplate from '../../../emailTemplates/EmailVerificationTemplate';
function generateUniqueName(length = 16) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export async function POST(req: NextRequest) {
  try {
    await ConnectToDb();
    // Parse form data from the request
    const formData = await req.formData();
    // Extract fields from form data
    const email = formData.get('email') as string;
    const fullName = formData.get('fullName') as string;
    const password = formData.get('password') as string;
    const buildingNumber = formData.get('buildingNumber') as string;
    const roomNumber = formData.get('roomNumber') as string;
    const floorNumber = formData.get('floorNumber') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const file = formData.get('file') as unknown as File;
    const fileName = file.name;
    const fileSize = file.size;
    const fileType = file.type;
    // Check if file base64 string is provided
    if (!file) {
      return NextResponse.json(
        {
          message: 'No file provided',
        },
        { status: 400 },
      );
    }
    // Check if customer already exists with the provided email
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return NextResponse.json({
        message: 'There is already an account with the provided email.',
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Decode base64 string and upload the image
    const imageUniqueName = generateUniqueName();
    const result = await uploadImage(file, 'customerImages', imageUniqueName);
    const { error, progress, downloadUrl } = result;
    console.log(result.error, result.progress, result.downloadUrl);
    if (!downloadUrl) {
      return NextResponse.json({ message: 'File upload failed', status: 400 });
    }
    // Create a new Customer document
    const newCustomer = new Customer({
      email,
      fullName,
      buildingNumber,
      roomNumber,
      floorNumber,
      phoneNumber,
      imageUrl: downloadUrl,
      password: hashedPassword,
      fileName,
      fileType,
      fileSize,
      imageUniqueName,
    });
    // Generate the VerifyToken.
    const verifyToken = newCustomer.getVerificationToken();
    // Save the new Customer to the database
    const savedCustomer = await newCustomer.save();
    savedCustomer.passwordHistory.push({
      password: hashedPassword,
      createdAt: new Date(),
    });
    await savedCustomer.save();
    // generate verification Link
    const verificationLink = `${process.env.WEBSITE_URL}/customer/verify-customer?userId=${newCustomer._id}&verifyToken=${verifyToken.toString()}`;
    // Send Email to user
    // Call Email Verification Template
    const registerEmail = EmailVerificationTemplate(verificationLink);
    await sendEmailToCustomer(
      email,
      'Customer Registration Verification',
      registerEmail,
    );
    const response: NextResponse = NextResponse.json({
      message: 'User details saved successfully',
      success: true,
      status: 200,
    });
    return response;
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error saving customer details:', error);
    return NextResponse.json({ message: 'Internal server error', status: 500 });
  }
}
function uuidv4() {
  throw new Error('Function not implemented.');
}
