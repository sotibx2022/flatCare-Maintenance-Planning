import mongoose, { Document, Schema } from "mongoose";
interface MaterialReviewDocument extends Document {
    orderNumber: string;
    heading: string;
    remarks: string[];
}
const MaterialReviewSchema = new Schema<MaterialReviewDocument>({
    orderNumber: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    remarks: [
        {
            type: String,
            required: true,
        }
    ]
}, { timestamps: true });
export const MaterialReview = mongoose.models.MaterialReview || mongoose.model<MaterialReviewDocument>("MaterialReview", MaterialReviewSchema);
