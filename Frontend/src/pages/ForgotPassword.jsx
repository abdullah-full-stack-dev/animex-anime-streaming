import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/ForgotPassword.css";
import { IoIosMail } from "react-icons/io";

const ForgotPassword = ({showForm}) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const backendUrl = "http://localhost:5000";

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!email) {
            setError("Please enter your email");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${backendUrl}/api/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                setMessage(data.message);
                setEmail("");

            } else {

                setError(data.message);
            }

        } catch (error) {

            console.log("Forgot Password Error:", error);

            setError("Something went wrong. Please try again.");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-section">

            <div className="forgot-password-cont">

                <h2>Forgot Password?</h2>

                <p>
                    Enter your email address and we'll send you
                    a link to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-cont">
                        <IoIosMail className='forgot-password-input-icon' />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="success-message">
                            {message}
                        </p>
                    )}

                    <button type="submit" disabled={loading}>

                        {loading
                            ? "Sending..."
                            : "Send Reset Link"
                        }

                    </button>

                </form>

                <Link to="/" onClick={()=>showForm(true)}>
                    <button className="back-to-login">Back to Login</button>
                </Link>

            </div>

        </div>
    );
};

export default ForgotPassword;