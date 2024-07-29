import { NextRequest, NextResponse } from "next/server";
import { ConnectToDb } from "../../../../helper/connectToDb";
import { Visitor } from "../../../../models/visitor.models";
export async function GET() {
    try {
        await ConnectToDb()
        const visitors = await Visitor.find();
        if (visitors) {
            return NextResponse.json({ message: "Visitors Found", success: true, status: 200, visitors })
        } else {
            return NextResponse.json({ message: "Visitiors Not Found", success: false, status: 400 })
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, success: false, status: 400 })
        } else {
            return NextResponse.json({ message: "An Unknown Error Occured", status: 500, success: false })
        }
    }
}
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await ConnectToDb();
        const { email } = await request.json();
        const visitor = await Visitor.findOne({ email });
        if (visitor) {
            return NextResponse.json({ message: "You Already Requested for Demo. Please Wait for Email", status: 400, success: false })
        } else {
            const newVisitor = new Visitor({ email })
            await newVisitor.save();
            return NextResponse.json({ message: "Your Request Received. We will Back to you soon", success: true, status: 200 })
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, success: false, status: 400 })
        } else {
            return NextResponse.json({ message: "An Unknown Error Occured", success: false, status: 500 })
        }
    }
}