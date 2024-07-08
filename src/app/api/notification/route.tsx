import { NextResponse } from "next/server";
import { Notification } from "../../../models/notification.models";
import { ConnectToDb } from "../../../helper/connectToDb";

// GET request handler to return all notifications
export async function GET(request: NextResponse) {
    try {
        ConnectToDb(); // Connect to MongoDB

        // Retrieve all notifications from the database
        const notifications = await Notification.find();

        // Return the notifications as JSON response
        return NextResponse.json({
            message: "Notifications Found Successfully",
            status: 200,
            success: true,
            notifications: notifications,
        });
    } catch (error) {
        // Handle any errors that occur during the operation
        console.error("Error fetching notifications:", error);
        return NextResponse.json({
            message: "Failed to fetch notifications",
            status: 500,
            success: false,

        });
    }
}

// POST request handler to save a single notification in the DB
export async function POST(request: NextResponse) {
    try {
        ConnectToDb(); // Connect to MongoDB

        // Extract notification data from the request body
        const {
            notificationTitle,
            notificationDescription,
            notificationPriority,
            notificationCategory,
            createdBy,
            address,
        } = await request.json();
        const { roomNumber, flatNumber, buildingNumber } = address;
        // Create a new instance of Notification model
        const newNotification = new Notification({
            notificationTitle,
            notificationDescription,
            notificationPriority,
            notificationCategory,
            createdBy,
            address: {
                buildingNumber,
                flatNumber,
                roomNumber,
            }
        });

        // Save the new notification to the database
        const createdNotification = await newNotification.save();

        // Return success response
        return NextResponse.json({
            message: "Notification created successfully",
            status: 201,
            success: true,
            notification: createdNotification,
        });
    } catch (error) {
        // Handle any errors that occur during the operation
        console.error("Error saving notification:", error);
        return NextResponse.json({
            message: "Failed to create notification",
            status: 500,
            success: false,

        });
    }
}
