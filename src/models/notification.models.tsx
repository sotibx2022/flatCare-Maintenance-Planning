import mongoose, { Schema, Document, Model } from "mongoose";
interface NotificationDocument extends Document {
    notificationTitle: string;
    notificationNumber: number;
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
    notificationNumber: {
        type: Number,
        required: true,
        unique: true
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
// Pre-save hook to assign notificationNumber if it's new
notificationSchema.pre<Document>('save', async function (next) {
    let doc = this as NotificationDocument;
    if (doc.isNew) {
        try {
            const latestNotification = await Notification.findOne().sort({ notificationNumber: -1 });
            doc.notificationNumber = latestNotification ? latestNotification.notificationNumber + 1 : 1;
        } catch (error) {
            console.error('Error finding latest notification:', error);
            throw error; // Handle or rethrow the error as needed
        }
    }
    next();
});
// Static method to ensure all notifications have a notificationNumber assigned
notificationSchema.statics.ensureNotificationNumbers = async function () {
    try {
        const noNumberNotifications = await Notification.find({ notificationNumber: { $exists: false } });
        let nextNotificationNumber = 1;
        for (let notification of noNumberNotifications) {
            notification.notificationNumber = nextNotificationNumber;
            await notification.save();
            nextNotificationNumber++;
        }
        console.log('Notification numbers assigned successfully.');
    } catch (error) {
        console.error('Error assigning notification numbers:', error);
        throw error; // Handle or rethrow the error as needed
    }
};
export const Notification: Model<NotificationDocument> = mongoose.models.Notification || mongoose.model<NotificationDocument>("Notification", notificationSchema);
