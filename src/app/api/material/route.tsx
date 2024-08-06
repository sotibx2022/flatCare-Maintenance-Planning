import { NextRequest, NextResponse } from "next/server";
import { Material } from "../../../models/material.models";
import { ConnectToDb } from "../../../helper/connectToDb";
import { isTokenExpired } from "../../../helper/isTokenExpired";
import { Customer } from "../../../models/customer.models";
import jwt, { JwtPayload } from 'jsonwebtoken'
//Get all Materials.
export async function GET(request: NextRequest, response: NextResponse) {
    await ConnectToDb()
    await isTokenExpired(request, response);
    const token = request.cookies.get('token');
    const decodedToken = jwt.verify('cookie', process.env.SECRET_KEY!);
    const { userId } = decodedToken as JwtPayload;
    const customer = await Customer.findOne({ _id: userId });
    const email = customer?.email;
    const allMaterials = Material.find({ email: email })
    return NextResponse.json({ message: "Materials Found Successfully", status: 200, scuccess: true })
}
export async function POST(request: NextRequest, response: NextResponse) {
    await ConnectToDb();
    await isTokenExpired(request, response);
    const { materials, orderedBy, orderedFor, deliveryMethod, deliveryDetails, paymentDetails } = await request.json();
    return NextResponse.json({ message: "Data's received Successfully", success: true, status: 200, materials, orderedBy, orderedFor, deliveryMethod, deliveryDetails, paymentDetails },)
}