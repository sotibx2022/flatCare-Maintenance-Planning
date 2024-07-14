import { NextRequest, NextResponse } from "next/server";
import { Customer, CustomerDocument } from "../../../../models/customer.models";
import { ConnectToDb } from "../../../../helper/connectToDb";
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    ConnectToDb();

    try {
        const { email, newPassword } = await request.json();
        const customer = await Customer.findOne({ email: email });

        if (customer) {

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            console.log(customer.passwordHistory)

            const isRepeated = customer.passwordHistory.some((passwordObj) => passwordObj.password === hashedNewPassword);
            console.log(isRepeated)
            if (!isRepeated) {

                customer.password = hashedNewPassword;
                customer.passwordHistory.push({ password: hashedNewPassword, createdAt: new Date() });


                if (customer.passwordHistory.length > 5) {
                    customer.passwordHistory.shift();
                }


                await customer.save();

                return NextResponse.json({
                    message: "Password updated successfully",
                    success: true,
                    status: 200
                });
            } else {
                return NextResponse.json({
                    message: "This password has been used before. Please choose a different one.",
                    success: false,
                    status: 400
                });
            }
        } else {
            return NextResponse.json({
                message: "Customer not found for the provided email.",
                success: false,
                status: 404
            });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({
            message: "Error updating password.",
            success: false,
            status: 500
        });
    }
}
