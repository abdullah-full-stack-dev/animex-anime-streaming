import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/ResetPassword.css";
import { FaLock } from "react-icons/fa";

const ResetPassword = ({ showForm }) => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const backendUrl = "https://animex-discovery-platform.onrender.com";

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!password || !confirmPassword) {
            setError("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${backendUrl}/api/auth/reset-password/${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                setMessage(data.message);

                setPassword("");
                setConfirmPassword("");

                setTimeout(() => {
                    navigate("/");
                    showForm(true)
                }, 2000);

            } else {

                setError(data.message);
            }

        } catch (error) {

            console.log("Reset Password Error:", error);

            setError(
                "Something went wrong. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="reset-password-section">

            <div className="reset-password-cont">

                <h2>Reset Password</h2>

                <p>
                    Create a new password for your Animex account.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-cont">
                        <FaLock className='reset-password-input-icon' />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <div className="input-cont">
                        <FaLock className='reset-password-input-icon' />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
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

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Resetting..."
                            : "Reset Password"
                        }

                    </button>

                </form>

                <Link to="/" onClick={() => showForm(true)}>
                    <button className="back-to-login">Back to Login</button>
                </Link>

            </div>

        </div>
    );
};

export default ResetPassword;