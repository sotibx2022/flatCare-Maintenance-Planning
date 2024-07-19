import { NextRequest, NextResponse } from "next/server";
import { ConnectToDb } from "../../../../helper/connectToDb";
import { isTokenExpired } from "../../../../helper/isTokenExpired";

export async function POST(request: NextRequest, response: NextResponse) {
    ConnectToDb()
    isTokenExpired(request, response);
    try {
        let response = NextResponse.json({
            message: "User Logout Successfully",
            status: 200,
            success: true

        })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
            path: '/'
        })

        return response;
    } catch (error) {

    }
}