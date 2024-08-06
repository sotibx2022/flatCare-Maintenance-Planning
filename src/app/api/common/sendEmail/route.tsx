import { NextRequest, NextResponse } from "next/server";
import { sendContactMessage } from "../../../../helper/sendContactMessage";
import { ContactEmailTemplate } from "../../../emailTemplates/ContactEmailTemplate";
export async function POST(request: NextRequest) {
    try {
        // Parse JSON request body
        const { formDatas } = await request.json();
        const { name, email, subject, reason, message } = formDatas;
        // Check for required fields
        if (!name || !email || !subject || !message || !reason) {
            return NextResponse.json({
                message: "Please enter all the required details.",
                status: 400,
                success: false
            });
        } else {
            return NextResponse.json({
                message: "Your message has been sent to the admin.",
                status: 200,
                success: true
            });
        }
    } catch (error) {
        console.error('Error handling POST request:', error);
        return NextResponse.json({
            message: "An error occurred while sending the message.",
            status: 500,
            success: false
        });
    }
}
