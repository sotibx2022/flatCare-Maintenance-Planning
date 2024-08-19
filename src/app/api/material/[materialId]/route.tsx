import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "../../../../helper/isTokenExpired";
import { ConnectToDb } from "../../../../helper/connectToDb";
import { Material } from "../../../../models/material.models";
export async function GET(request: NextRequest, response: NextResponse) {
    ConnectToDb()
    isTokenExpired(request, response)
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const materialId = pathSegments.pop();
    const material = await Material.findOne({ _id: materialId })
    return NextResponse.json({ material });
}