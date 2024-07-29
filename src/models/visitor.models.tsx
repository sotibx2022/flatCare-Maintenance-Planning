import mongoose, { Document, Schema } from "mongoose";
interface VisitorInterface extends Document {
    email: string
}
const visitorSchema = new Schema<VisitorInterface>({
    email: {
        type: String,
        required: true,
        unique: true
    }
})
export const Visitor = mongoose.models.Visitor || mongoose.model<VisitorInterface>("Visitor", visitorSchema)