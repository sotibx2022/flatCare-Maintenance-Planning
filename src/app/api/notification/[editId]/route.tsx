import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ConnectToDb } from "../../../../helper/connectToDb";
import { Notification } from "../../../../models/notification.models";
export async function GET(request: NextRequest, response: NextResponse) {
    ConnectToDb();

    const editId = response.params.editId;
    const notification = await Notification.find({ _id: editId })
    if (notification) {
        return NextResponse.json({
            message: "Notification Found Successfully",
            status: 200,
            success: true,
            notification
        })
    }


    return NextResponse.json({
        message: "notification Not found",
        success: false,
        status: 400
    });
}


export async function PUT(request: NextRequest) {
    try {
        // Connect to the database
        await ConnectToDb();

        // Parse the request body
        const { editId, data } = await request.json();

        // Update the notification
        const selectedNotification = await Notification.findOneAndUpdate(
            { _id: editId },
            {
                notificationTitle: data.notificationTitle,
                notificationDescription: data.notificationDescription,
                notificationCategory: data.notificationCategory,
                notificationPriority: data.notificationPriority
            },
            { new: true } // Return the updated document
        );

        if (!selectedNotification) {
            return NextResponse.json({
                message: "Notification Not Found",
                status: 400,
                success: false
            });
        }

        // Return success response
        return NextResponse.json({
            message: "Notification successfully updated",
            status: 200,
            success: true,
            data: selectedNotification
        });
    } catch (error) {
        console.error("Error updating notification:", error);
        return NextResponse.json({
            message: "An error occurred while updating the notification",
            status: 500,
            success: false
        });
    }
}
