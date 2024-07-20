import mongoose, { Schema, Document } from "mongoose";
import crypto from 'crypto';
export interface CustomerDocument extends Document {
  fullName: string;
  imageUrl: string;
  fileName: String;
  fileSize: Number,
  fileType: String,
  imageUniqueName: String,
  email: string;
  password: string;
  passwordHistory: Array<{ password: string; createdAt: Date }>;
  buildingNumber: string;
  floorNumber: string;
  roomNumber: string;
  phoneNumber: string;
  isPlanner: boolean;
  isTechnician: boolean;
  isVerified: boolean;
  isApproved: boolean;
  isCustomer: boolean;
  verifyToken: string | null;
  verifyTokenExpiry: Date | null;
  getVerificationToken(): string;
}
const customerSchema: Schema<CustomerDocument> = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true
  },
  imageUniqueName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true
  },
  passwordHistory: [
    {
      password: { type: String, required: true },
      createdAt: { type: Date, default: new Date() }
    }
  ],
  buildingNumber: {
    type: String,
    required: true
  },
  floorNumber: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isPlanner: {
    type: Boolean,
    default: false,
  },
  isTechnician: {
    type: Boolean,
    default: false,
  },
  isCustomer: {
    type: Boolean,
    default: true,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    type: String,
  }
}, {
  timestamps: true
});
customerSchema.methods.getVerificationToken = function () {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  this.verifyToken = crypto.createHash('sha256')
    .update(verificationToken).digest('hex');
  this.verifyTokenExpiry = new Date(Date.now() + 30 * 60 * 1000);
  return verificationToken;
};
export const Customer = mongoose.models.Customer as mongoose.Model<CustomerDocument> || mongoose.model<CustomerDocument>("Customer", customerSchema) 