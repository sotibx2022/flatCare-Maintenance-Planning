export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { Material } from "../../../models/material.models";
import { ConnectToDb } from "../../../helper/connectToDb";
import { isTokenExpired } from "../../../helper/isTokenExpired";
import { Customer } from "../../../models/customer.models";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { MaterialDetailsData } from "../../customer/dashboard/material/order";
// GET all materials for logged-in customer
export async function GET(request: NextRequest) {
    try {
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
        // Decode token to get userId
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
        const { userId } = decodedToken;
        // Find customer
        const customer = await Customer.findOne({ _id: userId });
        if (!customer) {
            return NextResponse.json({
                message: "Customer not found",
                status: 404,
                success: false
            });
        }
        // Get customer's email
        const email = customer.email;
        // Find materials ordered by this customer
        const allMaterials = await Material.find();
        const selectedMaterials = allMaterials.filter((material) =>
            material.orderedBy.orderedByEmail === email
        );
        return NextResponse.json({
            message: "Materials Found Successfully",
            status: 200,
            success: true,
            materials: selectedMaterials
        });
    } catch (error) {
        console.error('An error occurred:', error);
        return NextResponse.json({
            message: "An error occurred",
            status: 500,
            success: false
        });
    }
}
// POST new materials
export async function POST(request: NextRequest) {
    try {
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
        const { materials, orderedBy, orderedFor, deliveryMethod, deliveryDetails, paymentDetails } = await request.json();
        // Filter out invalid materials
        const filteredMaterials = materials.filter((item: MaterialDetailsData) => item.materialName.trim() !== "");
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
            deliveryMethod: { deliveryOption: deliveryMethod },
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
        console.error('Error processing request:', error);
        return NextResponse.json({
            message: 'Error processing request',
            success: false,
            status: 500,
        });
    }
}
