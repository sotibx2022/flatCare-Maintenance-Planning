import { NextRequest, NextResponse } from 'next/server';
import { Notification } from '../../../models/notification.models';
import { ConnectToDb } from '../../../helper/connectToDb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { sendEmailToCustomer } from '../../../helper/sendEmailToCustomer';
import { Customer } from '../../../models/customer.models';
import NotificationCreatedTemplate from '../../emailTemplates/NotificationCreatedTemplate';
// GET request handler to return all notifications
export async function GET(request: NextRequest) {
  try {
    ConnectToDb(); // Connect to MongoDB
    const tokenCookie: RequestCookie | undefined = request.cookies.get('token');
    let userId;
    if (tokenCookie) {
      const token = tokenCookie.value;
      const decodedToken = jwt.verify(
        token,
        process.env.SECRET_KEY!,
      ) as JwtPayload;
      userId = decodedToken.userId;
    }
    const notifications = await Notification.find({ userId: userId });
    // Return the notifications as JSON response
    return NextResponse.json({
      message: 'Notifications Found Successfully',
      status: 200,
      success: true,
      notifications: notifications,
    });
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error('Error fetching notifications:', error);
    return NextResponse.json({
      message: 'Failed to fetch notifications',
      status: 500,
      success: false,
    });
  }
}
export async function POST(request: NextRequest) {
  try {
    ConnectToDb(); // Connect to MongoDB
    // Extract token from cookies
    const tokenCookie: RequestCookie | undefined = request.cookies.get('token');
    if (!tokenCookie) {
      return NextResponse.json({
        message: 'User not authenticated',
        status: 401,
        success: false,
      });
    }
    const token = tokenCookie.value;
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY!,
    ) as JwtPayload;
    const userId = decodedToken.userId;
    const customer = await Customer.findOne({ _id: userId });
    if (!userId) {
      return NextResponse.json({
        message: 'User ID not found in token',
        status: 401,
        success: false,
      });
    }
    // Extract notification data from the request body
    const {
      notificationTitle,
      notificationDescription,
      notificationPriority,
      notificationCategory,
      address,
      createdBy,
    } = await request.json();
    const { roomNumber, flatNumber, buildingNumber } = address;
    // Create a new instance of Notification model
    const newNotification = new Notification({
      notificationTitle,
      notificationDescription,
      notificationPriority,
      notificationCategory,
      createdBy,
      userId,
      address: {
        buildingNumber,
        flatNumber,
        roomNumber,
      },
    });
    // Save the new notification to the database
    const createdNotification = await newNotification.save();
    if (customer && createdNotification) {
      const message = NotificationCreatedTemplate(notificationTitle);
      await sendEmailToCustomer(
        customer.email,
        'Notification Created',
        message,
      );
    }
    // Return success response
    return NextResponse.json({
      message: 'Notification created successfully',
      status: 201,
      success: true,
      notification: createdNotification,
    });
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error('Error saving notification:', error);
    return NextResponse.json({
      message: 'Failed to create notification',
      status: 500,
      success: false,
    });
  }
}
