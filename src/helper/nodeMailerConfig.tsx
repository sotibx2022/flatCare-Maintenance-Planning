import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});