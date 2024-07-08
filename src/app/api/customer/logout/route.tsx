import { NextResponse } from "next/server";
import { ConnectToDb } from "../../../../helper/connectToDb";

export async function POST(response: NextResponse) {
    ConnectToDb()
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