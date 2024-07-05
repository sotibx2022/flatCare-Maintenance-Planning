import { ConnectToDb } from '@/helper/connectToDb';
import { Customer, CustomerDocument } from '@/models/customer.models';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
export async function GET(response: NextResponse) {
  ConnectToDb(); // Connect to the database

  try {
    const customers: CustomerDocument[] = await Customer.find();
    return NextResponse.json({ name: 'binaya', customers }); // Return JSON response with customers
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ message: 'Error fetching customers' }); // Return JSON error response
  }
}
export async function POST(request: NextRequest,response:NextResponse) {
    try {
      await ConnectToDb();
  
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        buildingNumber,
        floorNumber,
        roomNumber,
        phoneNumber
      } = await request.json();
      const dbCustomer = await Customer.findOne({email});
if(dbCustomer){
  alert("Customer already registered...")
  return NextResponse.json({
    message:"Customer already registered.",
    status:409,
    success:false,
  })
}else{
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt)

      const newCustomer = new Customer({
        firstName,
        lastName,
        userName,
        email,
        password:hashedPassword,
        buildingNumber,
        floorNumber,
        roomNumber,
        phoneNumber
      });
  
      const result = await newCustomer.save();
      const response =  NextResponse.json({
        message: 'Customer Details Saved Successfully',
        status: 200,
        success: true,
        data: result,
      });
      const token = jwt.sign({userId:newCustomer._id,userName:userName,email:email},
        "flatCare-maintenance-planning",
        {expiresIn:`1d`}
      );
     response.cookies.set('token',token,{
      httpOnly:true,
      path:'/'
     })
  
   return response;  
}
  
    } catch (error) {
      return NextResponse.json({
        message: 'Error saving customer details',
        status: 500,
        success: false,
       
      });
    }
  }
