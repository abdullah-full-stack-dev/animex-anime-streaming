import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tranporter from "../config/nodemailer.js";
import { randomBytes } from "crypto";

const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.send({
                success: false,
                message: "User already exists!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.send({
            success: true,
            message: "User register successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (error) {

        console.log("Signup Error:", error.message);

        res.send({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.send({
                success: false,
                message: "Invalid email or password!"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordCorrect) {
            return res.send({
                success: false,
                message: "Invalid email or password!"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
            }
            , process.env.JWT_SECRET,

            { expiresIn: "7d" }
        )

        res.send({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });


    } catch (error) {

        console.log("Login Error:", error.message);

        res.send({
            success: false,
            message: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send({
                success: false,
                message: "User not found!"
            })
        }

        // Generate random token
        const resetToken = randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`

        // Sending Mail

        await tranporter.sendMail({
            from: {
                name: process.env.MAIL_FROM_NAME,
                address: process.env.MAIL_FROM,
            },
            to: user.email,
            subject: "Animex - Reset Your Password",
            html: `
                <h2>Reset Your Password</h2>

                <p>Hello ${user.name},</p>

                <p>
                    We received a request to reset your Animex password.
                </p>

                <p>
                    Click the button below to create a new password:
                </p>

                <a
                    href="${resetUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #51B1E9;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    "
                >
                    Reset Password
                </a>

                <p>
                    This link will expire in 15 minutes.
                </p>

                <p>
                    If you did not request this, you can safely ignore this email.
                </p>
            `
        })

        res.send({
            success: true,
            message: "Password reset link sent to your email!"
        });



    } catch (error) {

        console.log("Forgot Password Error:", error.message);
        res.send({
            success: false,
            message: error.message
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.send({
                success: false,
                message: "Invalid or expired reset token!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.send({
            success: true,
            message: "Password reset successfully!"
        });

    } catch (error) {
        console.log("Reset Password Error:", error.message);
        res.send({
            success: false,
            message: error.message
        });
    }
}

export { register, login, forgotPassword, resetPassword };