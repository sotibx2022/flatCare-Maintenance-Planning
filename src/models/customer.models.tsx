import mongoose, { Schema, Document } from "mongoose";
export interface CustomerDocument extends Document {
  fullName: string,
  imageUrl: string,
  email: string;
  password: string;
  buildingNumber: string;
  floorNumber: string;
  roomNumber: string;
  phoneNumber: string;
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
  }
}, {
  timestamps: true
});



export const Customer = mongoose.models.Customer as mongoose.Model<CustomerDocument> || mongoose.model<CustomerDocument>("Customer", customerSchema) 