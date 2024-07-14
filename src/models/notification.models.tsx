import mongoose, { Schema, Document } from "mongoose";

interface NotificationDocument extends Document {

    notificationTitle: string;
    notificationDescription: string;
    notificationCategory: string;
    notificationPriority: string;
    createdBy: string;
    userId: mongoose.Schema.Types.ObjectId;
    address: {
        roomNumber: string;
        flatNumber: string;
        buildingNumber: string;
    };
}

const notificationSchema: Schema<NotificationDocument> = new Schema({

    notificationTitle: {
        type: String,
        required: true,
    },
    notificationDescription: {
        type: String,
        required: true,
    },
    notificationCategory: {
        type: String,
        required: true,
    },
    notificationPriority: {
        type: String,
        enum: ["Normal", "Urgent", "Emergency"],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    address: {
        roomNumber: { type: String, required: true },
        flatNumber: { type: String, required: true },
        buildingNumber: { type: String, required: true },
    }
}, { timestamps: true });



export const Notification = mongoose.models.Notification || mongoose.model<NotificationDocument>("Notification", notificationSchema);
