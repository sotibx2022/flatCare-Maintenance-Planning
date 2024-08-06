// sendEmailToCustomer.ts
import nodemailer from 'nodemailer';
// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: parseInt(process.env.PORT as string),
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
});
// Function to send email to customer
export async function sendEmailToCustomer(
  email: string,
  subject: string,
  htmlContent: string,
) {
  console.log(
    process.env.HOST,
    process.env.PORT,
    process.env.USERNAME,
    process.env.PASSWORD,
    process.env.EMAIL,
  );
  try {
    // Email options
    const mailOptions = {
      from: 'sbinayaraj@gmail.com',
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
