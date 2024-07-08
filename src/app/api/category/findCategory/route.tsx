import { NextRequest, NextResponse } from "next/server";
import { Category } from "../../../../models/category.models";
import { ConnectToDb } from "../../../../helper/connectToDb";

export async function GET(request: NextRequest) {
    ConnectToDb()
    try {
        const categories = await Category.find();
        return NextResponse.json({ name: "Binaya", categories })
    } catch (error) {

    }

}