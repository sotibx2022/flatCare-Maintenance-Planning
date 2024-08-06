import { NextResponse } from 'next/server';
import { Category } from '../../../../models/category.models';
import { ConnectToDb } from '../../../../helper/connectToDb';
export async function GET() {
  ConnectToDb();
  try {
    const categories = await Category.find();
    return NextResponse.json({ categories });
  } catch (error) {
    console.log("error")
  }
}
