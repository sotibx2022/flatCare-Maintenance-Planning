import nodemailer from "nodemailer";
// Create a transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' service
    auth: {
        user: "sbinayaraj@gmail.com", // Your Gmail email address
        pass: "GReece@2024" // Your Gmail password or App Password
    }
});
// Function to send contact message
export async function sendContactMessage(
    name: string,
    email: string,
    subject: string,
    message: string,
    reason: string,
    htmlContent: string
) {
    try {
        const mailOptions = {
            from: `"${name}" <${email}>`, // Ensure the 'from' field is correctly formatted
            to: 'sbinayaraj@gmail.com', // Recipient email address
            subject: subject,
            html: htmlContent
        };
        // Await the result of sendMail
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result); // Log the result if needed
        return result;
    } catch (error) {
        console.error('Error sending email:', error); // Log the error for debugging
        throw new Error('Error sending email');
    }
};
