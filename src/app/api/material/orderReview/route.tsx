import { NextRequest, NextResponse } from "next/server";
import { MaterialReview } from "../../../../models/materialReview.models";
import { ConnectToDb } from "../../../../helper/connectToDb";
import { isTokenExpired } from "../../../../helper/isTokenExpired";
export async function GET() {
}
export async function POST(request: NextRequest, response: NextResponse) {
    ConnectToDb();
    isTokenExpired(request, response);
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
