import tranporter from "../config/nodemailer.js";
import Contact from "../models/Contact.js";

const contactUs = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.send({
                success: false,
                message: "Please fill out all fields!"
            })
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        })

        // Sending Mail

        await tranporter.sendMail({
            from: {
                name: process.env.MAIL_FROM_NAME,
                address: process.env.MAIL_FROM,
            },
            to: email,
            subject: "Animex - Enquiry",
            html: `
                <h2>Your enquiry has been submitted!</h2>

                <p>Hello ${name},</p>

                <p>
                    Thank you for contacting us,
                    we have received your message.
                    We will reach out you soon...
                </p>
            `
        })

        res.send({
            success: true,
            message: "Your enquiry has been submitted successfully!",
            contact
        })

    } catch (error) {

        console.log("Contact error: ", error.message);

        res.send({
            success: false,
            message: error.message
        })
    }
}

export { contactUs };