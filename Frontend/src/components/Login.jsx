import React, { useEffect, useState } from 'react'
import '../CSS/Login.css'
import loginImg from '../assets/images/login-img.png'
import signupImg from '../assets/images/signup-img.png'
import { FaLock, FaUser } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

export const Login = ({ form, showForm }) => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [currentForm, setCurrentForm] = useState("Login");

    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleSignUpChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value
        });
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await axios.post("https://animex-discovery-platform.onrender.com/api/auth/register", signUpData);

            if (response.data.success === false) {
                return toast.error("User already exists!")
            } else {
                toast.success("Account created successfully!")
                setSignUpData({
                    name: "",
                    email: "",
                    password: ""
                })

                setCurrentForm("Login")
            }

        } catch (error) {
            console.log(
                "Signup Error:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false)
        }
    }

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)

            const response = await axios.post("https://animex-discovery-platform.onrender.com/api/auth/login", loginData);

            if (response.data.success === false) {
                return toast.error("Invalid email or password!")
            } else {

                const token = response.data.token;
                const user = response.data.user;

                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))

                window.dispatchEvent(new Event("userLogin"));

                toast.success("Login successfully!");

                setLoginData({
                    email: "",
                    password: ""
                });

                showForm(false);
                navigate("/");


            }

        } catch (error) {
            console.log(
                "Login Error:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (form) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [form])

    return form && (
        <>

            

            <div className='Accounts-cont-overlay' onClick={() => showForm(false)}></div>
            <div className='Accounts-cont'>

                {currentForm === "Login" ? <div className='Login-cont'>

                    <span style={{ display: "flex", justifyContent: "end" }} onClick={() => showForm(false)}><RxCross2 color='#f8f8f8' style={{ cursor: "pointer" }} /></span>

                    <div className="login-img">
                        <img src={loginImg} alt="loginImg" />
                    </div>


                    <h1>Welcome Back, <span style={{ color: "#51b1e9" }}>Anime</span> Fan!</h1>
                    <p>Log in to continue your anime journey.</p>
                    <form onSubmit={handleLogin}>
                        <div className='input-cont'>
                            <IoMail />
                            <input type="email" required placeholder='Enter your email' name='email' value={loginData.email} onChange={handleLoginChange} />
                        </div>
                        <div className='input-cont'>
                            <FaLock />
                            <input type="password" autoComplete='false' required placeholder='Enter your password' name='password' value={loginData.password} onChange={handleLoginChange} />
                        </div>
                        <div className='remember-forgot-cont'>
                            <div className='remember-me'>
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </div>
                            <div>
                                <Link to={"/forgot-password"} onClick={() => showForm(false)}><p className='forgot-pass'>Forgot Password?</p></Link>
                            </div>
                        </div>
                        <div>
                            <button type='submit' disabled={loading}>{loading ? "Please wait..." : "Login"}</button>
                        </div>
                    </form>
                    <p style={{ marginTop: "15px", fontSize: "13px" }}>New to ANIMEX? <span style={{ color: "#51b1e9", cursor: "pointer" }} onClick={() => setCurrentForm("Signup")}>Create Account</span></p>

                </div>
                    :
                    <div className='Signup-cont'>

                        <span style={{ display: "flex", justifyContent: "end" }} onClick={() => showForm(false)}><RxCross2 color='#f8f8f8' style={{ cursor: "pointer" }} /></span>

                        <div className="Signup-img">
                            <img src={signupImg} alt="signupImg" />
                        </div>

                        <h1>Join the <span style={{ color: "#51b1e9" }}>ANIMEX</span> Universe!</h1>
                        <p>Create your account and unlock your anime world.</p>
                        <form onSubmit={handleSignUp}>
                            <div className='input-cont'>
                                <FaUser />
                                <input type="text" required placeholder='Enter your username' name='name' value={signUpData.name} onChange={handleSignUpChange} />
                            </div>
                            <div className='input-cont'>
                                <IoMail />
                                <input type="email" required placeholder='Enter your email' name='email' value={signUpData.email} onChange={handleSignUpChange} />
                            </div>
                            <div className='input-cont'>
                                <FaLock />
                                <input type="password" autoComplete='false' required placeholder='Enter your password' name='password' value={signUpData.password} onChange={handleSignUpChange} />
                            </div>

                            <div>
                                <button type='submit' disabled={loading}>{loading ? "Please wait..." : "Create Account"}</button>
                            </div>
                        </form>
                        <p style={{ marginTop: "15px", fontSize: "13px" }}>Already have an account? <span style={{ color: "#51b1e9", cursor: "pointer" }} onClick={() => setCurrentForm("Login")}>Login</span></p>

                    </div>
                }

            </div>
        </>
    )
}
