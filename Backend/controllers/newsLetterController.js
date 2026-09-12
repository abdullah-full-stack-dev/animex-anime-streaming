import tranporter from "../config/nodemailer.js";
import NewsLetter from "../models/newsLetter.js";

const subscribeUs = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.send({
                success: false,
                message: "Please fill out required field!"
            })
        }

        const newsLetter = await NewsLetter.create({
            email
        })

        // Sending Mail

        await tranporter.sendMail({
            from: {
                name: process.env.MAIL_FROM_NAME,
                address: process.env.MAIL_FROM,
            },
            to: email,
            subject: "Animex - Subscription",
            html: `
                <h2>Subscription</h2>

                <p>Hello ${email},</p>

                <p>
                    Thank you for subscribing us.
                </p>
            `
        })

        res.send({
            success: true,
            message: "Subscribed successfully!",
            newsLetter
        })

    } catch (error) {

        console.log("News Letter error: ", error.message);

        res.send({
            success: false,
            message: error.message
        })
    }
}

export { subscribeUs };