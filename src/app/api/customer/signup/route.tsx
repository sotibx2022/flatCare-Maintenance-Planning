
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { Customer,CustomerDocument } from '../../../../models/customer.models';

// Changed GET function parameter to NextRequest instead of NextResponse
export async function GET(request: NextRequest) { 
  ConnectToDb(); // Connect to the database

  try {
    const customers: CustomerDocument[] = await Customer.find();
    return NextResponse.json({ name: 'binaya', customers }); // Return JSON response with customers
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ message: 'Error fetching customers' }); // Return JSON error response
  }
}

// Removed response parameter from POST function
export async function POST(request: NextRequest,response:NextResponse) { 
  await ConnectToDb();

  try {
    const {
      fullName,
      imageUrl,
      email,
      password,
      buildingNumber,
      floorNumber,
      roomNumber,
      phoneNumber
    } = await request.json();
    console.log(fullName,imageUrl,email,password,buildingNumber,floorNumber,roomNumber,phoneNumber)
    const dbCustomer = await Customer.findOne({ email });
    if (dbCustomer) {
      // Removed alert and directly return response
      return NextResponse.json({
        message: "Customer already registered.",
        status: 409,
        success: false,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newCustomer = new Customer({
        fullName,
        imageUrl,
        email,
        password: hashedPassword,
        buildingNumber,
        floorNumber,
        roomNumber,
        phoneNumber
      });

      const result = await newCustomer.save();
      
      

      // Moved response creation after token creation
       response = NextResponse.json({
        message: 'Customer Details Saved Successfully',
        status: 200,
        success: true,
        data: result,
      });
      const token = jwt.sign({ userId: newCustomer._id }, process.env.SECRET_KEY!, {
        expiresIn: '1d',
      });
      // Setting the cookie properly
      response.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
      });
    
      return response;
    }
  } catch (error) {
    console.error('Error saving customer details:', error); // Added error logging
    return NextResponse.json({
      message: 'Error saving customer details',
      status: 500,
      success: false,
    });
  }
}
