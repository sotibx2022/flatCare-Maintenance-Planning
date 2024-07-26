import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ConnectToDb } from '../../../../helper/connectToDb';
import { Notification } from '../../../../models/notification.models';
import { isTokenExpired } from '../../../../helper/isTokenExpired';
import { useSearchParams } from 'next/navigation';
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    ConnectToDb();
    isTokenExpired(request, response);
    const { editId } = response.params;
    if (!editId) {
      return NextResponse.json({
        message: 'Edit ID is missing',
        success: false,
        status: 400,
      });
    }
    // Find the notification by ID
    const notification = await Notification.find({ _id: editId });
    if (notification.length > 0) {
      return NextResponse.json({
        message: 'Success',
        notification,
        success: true,
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: 'Notification not found',
        success: false,
        status: 404,
      });
    }
  }
  catch (error) {
    console.error('Error in GET handler:', error);
    // Return a generic error response
    return NextResponse.json({
      message: 'Internal Server Error',
      success: false,
      status: 500,
    });
  }
}
export async function PUT(request: NextRequest) {
  try {
    // Connect to the database
    await ConnectToDb();
    // Parse the request body
    const { editId, data } = await request.json();
    // Find the existing notification
    const existingNotification = await Notification.findById(editId);
    if (!existingNotification) {
      return NextResponse.json({
        message: 'Notification Not Found',
        status: 400,
        success: false,
      });
    }
    // Check if the details are unchanged
    if (
      existingNotification.notificationTitle === data.notificationTitle &&
      existingNotification.notificationDescription ===
      data.notificationDescription &&
      existingNotification.notificationCategory === data.notificationCategory &&
      existingNotification.notificationPriority === data.notificationPriority
    ) {
      return NextResponse.json({
        message:
          'There is nothing to change. Notification details are already the same.',
        status: 400,
        success: false,
      });
    }
    // Update the notification
    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: editId },
      {
        notificationTitle: data.notificationTitle,
        notificationDescription: data.notificationDescription,
        notificationCategory: data.notificationCategory,
        notificationPriority: data.notificationPriority,
      },
      { new: true }, // Return the updated document
    );
    // Return success response
    return NextResponse.json({
      message: 'Notification successfully updated',
      status: 200,
      success: true,
      data: updatedNotification,
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({
      message: 'An error occurred while updating the notification',
      status: 500,
      success: false,
    });
  }
}
export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    await ConnectToDb(); // Connect to the database
    const url = new URL(request.url);
    const editId = url.searchParams.get('editId');
    // Check if the notification exists
    const existingNotification = await Notification.findById(editId);
    if (!existingNotification) {
      return NextResponse.json({
        message: 'Notification Not Found',
        status: 404, // Corrected status code to indicate resource not found
        success: false,
      });
    }
    // Delete the notification
    const deletedNotification = await Notification.deleteOne({ _id: editId });
    return NextResponse.json({
      message: 'Notification Deleted Successfully',
      status: 200,
      success: true,
      deletedNotification,
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json({
      message: 'An error occurred while deleting the notification',
      status: 500,
      success: false,
    });
  }
}
