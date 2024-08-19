import { NextRequest, NextResponse } from "next/server";
import { Material } from "../../../models/material.models";
import { ConnectToDb } from "../../../helper/connectToDb";
import { isTokenExpired } from "../../../helper/isTokenExpired";
import { Customer } from "../../../models/customer.models";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { MaterialDetailsData, PreviewSubmitProps } from "../../customer/dashboard/material/order";
//Get all Materials.
export async function GET(request: NextRequest, response: NextResponse) {
    try {
        // Connect to the database
        await ConnectToDb();
        // Check if token is expired
        await isTokenExpired(request, response);
        // Retrieve token from cookies
        const token = request.cookies.get('token');
        if (!token) {
            return NextResponse.json({ message: "No token found", status: 401, success: false });
        }
        // Verify the token
        let decodedToken: JwtPayload;
        try {
            decodedToken = jwt.verify(token.value, process.env.SECRET_KEY!) as JwtPayload;
        } catch (error) {
            return NextResponse.json({ message: "Invalid token", status: 401, success: false });
        }
        // Extract userId from token
        const { userId } = decodedToken;
        // Find customer by userId
        const customer = await Customer.findOne({ _id: userId });
        if (!customer) {
            return NextResponse.json({ message: "Customer not found", status: 404, success: false });
        }
        // Retrieve email from customer
        const email = customer.email;
        // Find materials by email
        const allMaterials = await Material.find();
        const selectedMaterials = allMaterials.filter((material) => {
            return material.orderedBy.orderedByEmail === email
        })
        return NextResponse.json({ message: "Materials Found Successfully", status: 200, success: true, materials: allMaterials });
    } catch (error) {
        console.error('An error occurred:', error);
        return NextResponse.json({ message: "An error occurred", status: 500, success: false });
    }
}
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await ConnectToDb();
        await isTokenExpired(request, response);
        const { materials, orderedBy, orderedFor, deliveryMethod, deliveryDetails, paymentDetails } = await request.json();
        // Filter out materials where materialName is an empty string
        const filteredMaterials = materials.filter((item: MaterialDetailsData) => {
            // Check if materialName is not empty
            return item.materialName.trim() !== "";
        });
        // Handle case where no valid materials are left
        if (filteredMaterials.length === 0) {
            return NextResponse.json({
                message: "No valid materials to save.",
                success: false,
                status: 400
            });
        }
        const newMaterial = new Material({
            materials: filteredMaterials,
            orderedBy,
            orderedFor,
            deliveryMethod,
            deliveryDetails,
            paymentDetails,
        });
        await newMaterial.save();
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
        return NextResponse.json({
            message: 'Error processing request',
            success: false,
            status: 500,
        });
    }
}