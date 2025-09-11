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
    console.log('Connecting to MongoDB...');
    await ConnectToDb(); // Connect to MongoDB
    console.log('MongoDB connection established.');
    // Extract token from cookies
    const tokenCookie: RequestCookie | undefined = request.cookies.get('token');
    console.log('Token cookie:', tokenCookie);
    if (!tokenCookie) {
      console.log('No token found in cookies.');
      return NextResponse.json({
        message: 'User not authenticated',
        status: 401,
        success: false,
      });
    }
    const token = tokenCookie.value;
    console.log('Token value:', token);
    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
      console.log('Decoded token:', decodedToken);
    } catch (err) {
      console.error('Error verifying token:', err);
      return NextResponse.json({
        message: 'Invalid token',
        status: 401,
        success: false,
      });
    }
    const userId = decodedToken.userId;
    console.log('User ID from token:', userId);
    const customer = await Customer.findOne({ _id: userId });
    console.log('Customer found:', customer);
    if (!customer) {
      console.log('No customer found for this user ID.');
      return NextResponse.json({
        message: 'User ID not found in token',
        status: 401,
        success: false,
      });
    }
    // Extract notification data from the request body
    const body = await request.json();
    console.log('Request body:', body);
    const { dataToSend } = body;
    console.log('Data to send:', dataToSend);
    const {
      notificationTitle,
      notificationDescription,
      notificationPriority,
      notificationCategory,
      address,
      createdBy,
    } = dataToSend;
    console.log('Notification details:', {
      notificationTitle,
      notificationDescription,
      notificationPriority,
      notificationCategory,
      address,
      createdBy,
    });
    const { roomNumber, flatNumber, buildingNumber } = address;
    console.log('Address details:', { buildingNumber, flatNumber, roomNumber });
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
    console.log('New Notification instance created:', newNotification);
    // Save the new notification to the database
    const createdNotification = await newNotification.save();
    console.log('Notification saved to DB:', createdNotification);
    // Return success response
    return NextResponse.json({
      message: 'Notification created successfully',
      status: 201,
      success: true,
      notification: createdNotification,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({
      message: 'Failed to create notification',
      status: 500,
      success: false,
    });
  }
}
