import mongoose, { Schema, Document } from 'mongoose';
export interface CategoryDocument extends Document {
  name: string;
}
const categorySchema: Schema<CategoryDocument> = new Schema({
  name: String,
});
export const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);
