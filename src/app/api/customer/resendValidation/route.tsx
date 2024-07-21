import { NextRequest, NextResponse } from "next/server";
import { Customer } from "../../../../models/customer.models";
import bcrypt from "bcryptjs";
import { sendEmailToCustomer } from "../../../../helper/sendEmailToCustomer";
import EmailVerificationTemplate from "../../../emailTemplates/EmailVerificationTemplate";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const formData = await request.json();
        const { email, password } = formData as { email: string; password: string };
        // Validate presence of email and password
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required.", status: 400, success: false });
        }
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return NextResponse.json({ message: "No customer found with the provided email.", status: 400, success: false });
        }
        // Compare passwords
        const isValidPassword = await bcrypt.compare(password, customer.password);
        if (!isValidPassword) {
            return NextResponse.json({ message: "Invalid password. Please enter a valid password or reset it.", status: 400, success: false });
        }
        // Check if customer is already verified
        if (customer.isVerified) {
            return NextResponse.json({ message: "Your account is already verified. Please log in to access the dashboard.", status: 200, success: true });
        }
        // Convert verifyTokenExpiry to Date if it is not already
        const verifyTokenExpiry = customer.verifyTokenExpiry ? new Date(customer.verifyTokenExpiry) : null;
        const currentDate = new Date();
        // Check if verification token is expired
        const isExpired = verifyTokenExpiry && verifyTokenExpiry < currentDate;
        console.log(isExpired);
        console.log("verifyTokenExpiry", verifyTokenExpiry);
        console.log("currentDate", currentDate);
        if (!isExpired) {
            return NextResponse.json({ message: "Your previous verification token is not expired yet.", status: 400, success: false });
        }
        // Generate new verification token and link
        const verifyToken = customer.getVerificationToken();
        const verificationLink = `http://localhost:3000/customer/verify-customer?userId=${customer._id}&verifyToken=${verifyToken.toString()}`;
        const message = EmailVerificationTemplate(verificationLink);
        // Send verification email
        await sendEmailToCustomer(email, "Customer Re-Verification", message);
        // Save the customer with the updated verification token
        await customer.save();
        return NextResponse.json({ message: "Verification link sent successfully.", status: 200, success: true });
    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ message: "An error occurred while processing your request.", status: 500, success: false });
    }
}
