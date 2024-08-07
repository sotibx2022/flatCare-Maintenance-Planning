import { NextRequest, NextResponse } from "next/server";
import { Material } from "../../../models/material.models";
import { ConnectToDb } from "../../../helper/connectToDb";
import { isTokenExpired } from "../../../helper/isTokenExpired";
import { Customer } from "../../../models/customer.models";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { MaterialDetailsData, PreviewSubmitProps } from "../../customer/dashboard/material/order";
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
    console.log('POST request received.');
    try {
        console.log('Connecting to database...');
        await ConnectToDb();
        console.log('Database connected.');
        console.log('Checking if token is expired...');
        await isTokenExpired(request, response);
        console.log('Token check complete.');
        console.log('Parsing request JSON...');
        const { materials, orderedBy, orderedFor, deliveryMethod, deliveryDetails, paymentDetails } = await request.json();
        console.log('Request JSON parsed successfully.');
        // Filter out materials where materialName is an empty string
        const filteredMaterials = materials.filter((item: MaterialDetailsData) => {
            // Check if materialName is not empty
            return item.materialName.trim() !== "";
        });
        console.log('Filtered materials:', filteredMaterials);
        // Handle case where no valid materials are left
        if (filteredMaterials.length === 0) {
            console.log('No valid materials to save.');
            return NextResponse.json({
                message: "No valid materials to save.",
                success: false,
                status: 400
            });
        }
        console.log('Creating new Material instance...');
        const newMaterial = new Material({
            materials: filteredMaterials,
            orderedBy,
            orderedFor,
            deliveryMethod,
            deliveryDetails,
            paymentDetails,
        });
        console.log('New Material instance created.');
        console.log('Saving new Material to the database...');
        await newMaterial.save();
        console.log('New Material saved successfully.');
        return NextResponse.json({
            message: "Data received successfully",
            success: true,
            status: 200,
            materials: filteredMaterials,
            orderedBy,
            orderedFor,
            deliveryMethod,
            deliveryDetails,
            paymentDetails
        });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({
            message: 'Error processing request',
            success: false,
            status: 500,
        });
    }
}