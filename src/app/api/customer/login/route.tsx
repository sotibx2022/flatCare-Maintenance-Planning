import { ConnectToDb } from "@/helper/connectToDb";
import { Customer } from "@/models/customer.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
export async function GET(request: NextRequest) {
    try {
        ConnectToDb();
        const customers = await Customer.find();
        return NextResponse.json({
            message: "Customers found successfully",
            status: 200,
            success: true,
            customers
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Unknown error occurred.",
            status: 500,
            success: false
        });
    }
}

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        ConnectToDb();
        const { currentEmail, currentPassword } = await request.json();
        const customer = await Customer.findOne({ email: currentEmail });
        
        if (!customer) {
            response=  NextResponse.json({
                message: "There is no registered Customer",
                status: 400,
                success: false
            })
        } else {
            const isPasswordValid = await bcrypt.compare(currentPassword, customer.password);
            if (!isPasswordValid) {
                response=  NextResponse.json({
                    message: "Invalid Password",
                    status: 200,
                    success: true,
                    customer
                })
            }
            else {
                response=  NextResponse.json({
                    message: "There is  registered Customer",
                    status: 200,
                    success: true,
                    customer
                })
                const token = jwt.sign({Id:customer._id},process.env.SECRET_KEY!,{expiresIn:'1h'})
                response.cookies.set('token',token,{
                    httpOnly:true,
                    path:'/',
                    expires:new Date(Date.now() + 1*24*60*60*60)
                })
            }
return response;
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Unknown error occurred.",
            status: 500,
            success: false
        });
    }
}
