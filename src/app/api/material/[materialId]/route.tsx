import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
    const url = new URL(request.url);
    return NextResponse.json({ url })
}