export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "../../../../helper/isTokenExpired";
import { ConnectToDb } from "../../../../helper/connectToDb";
import { Material } from "../../../../models/material.models";
export async function GET(request: NextRequest, response: NextResponse) {
    ConnectToDb()
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
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const materialId = pathSegments.pop();
    const material = await Material.findOne({ _id: materialId })
    return NextResponse.json({ material });
}