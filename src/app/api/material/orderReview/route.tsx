export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { MaterialReview } from "../../../../models/materialReview.models";
import { ConnectToDb } from "../../../../helper/connectToDb";
import { isTokenExpired } from "../../../../helper/isTokenExpired";
export async function GET() {
}
export async function POST(request: NextRequest, response: NextResponse) {
    ConnectToDb();
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
    const { orderNumber, remarks, heading } = await request.json();
    const existingOrder = await MaterialReview.findOne({ orderNumber });
    if (existingOrder) {
        existingOrder.remarks.push(remarks);
        await existingOrder.save();
        return NextResponse.json({ message: "Material Order Remarks Updated on Existing remarks." });
    } else {
        const newMaterialRemarks = new MaterialReview({
            orderNumber,
            remarks: [remarks],
            heading,
        });
        await newMaterialRemarks.save();
        return NextResponse.json({
            message: "Material Order Remarks Saved Successfully",
            success: true,
            status: 200,
        });
    }
}
