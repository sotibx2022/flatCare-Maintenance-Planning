import { NextRequest, NextResponse } from "next/server";
import { ConnectToDb } from "../../../../helper/connectToDb";
import { Notification } from "../../../../models/notification.models";
import { isTokenExpired } from "../../../../helper/isTokenExpired";
export async function GET(request: NextRequest, response: NextResponse) {
    try {
        ConnectToDb();
        isTokenExpired(request, response);
        const allNotifications = await Notification.find();
        return NextResponse.json({
            message: "Notifications Found Succcessfully",
            status: 200, success: true, allNotifications
        })
    } catch (error) {
    }
}
