// sendEmailToCustomer.ts
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.password
    },
});
// Function to send email to customer
export async function sendEmailToCustomer(email: string, subject: string, htmlContent: string) {
    try {
        // Email options
        const mailOptions = {
            from: process.env.email,
            to: email,
            subject: subject,
            html: htmlContent,
        };
        // Send the email
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result.response);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Throw the error so it can be handled in the API route
    }
}
