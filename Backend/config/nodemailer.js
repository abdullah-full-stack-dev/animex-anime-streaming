import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const tranporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS

    }

})

export default tranporter;