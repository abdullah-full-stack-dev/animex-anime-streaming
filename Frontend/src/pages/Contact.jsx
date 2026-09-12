import React, { useEffect, useState } from 'react'
import '../CSS/Contact.css'
import contactImg from '../assets/images/contact-img.png'
import { FaUserAlt } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'
import { AiFillMessage } from 'react-icons/ai'
import { BsPatchExclamationFill } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export const Contact = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await axios.post("http://localhost:5000/api/auth/contact-us", contactData);

            if (response.data.success === true) {
                toast.success("Your enquiry has been submitted successfully!")
                setContactData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                })
                navigate("/");

            } else {
                return toast.error("Error, Please try again later!")
            }


        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [loading])

    return (
        <>
            <Helmet>
                <title>Contact Us - ANIMEX</title>
            </Helmet>

            <div className='Contact-section'>
                <div className='Contact-info-cont'>
                    <div className='contact-img-cont'>
                        <img src={contactImg} alt="contactImg" />
                    </div>
                    <h2>Contact Info</h2>
                    <p>Email : <span style={{ color: "#51b1e9" }}>support@animex.com</span></p>
                    <h2>Your feedback helps make ANIMEX better.</h2>
                    <p>Have an anime you want to see on <span style={{ color: "#51b1e9" }}>ANIMEX</span>? Let us know!</p>
                </div>
                <div className="Contact-cont">
                    <h2>Got Questions? <span style={{ color: "#51b1e9" }}>Let’s Talk!</span></h2>
                    <p>Have a question, suggestion, or feedback about ANIMEX? We’d love to hear from you.</p>

                    <form onSubmit={handleSubmit}>
                        <div className='Contact-input-cont'>
                            <FaUserAlt className='contact-input-icons' />
                            <input type="text" placeholder='Your Name' required onChange={handleChange} name='name' value={contactData.name} />
                        </div>
                        <div className='Contact-input-cont'>
                            <IoIosMail className='contact-input-icons' />
                            <input type="email" placeholder='Your Email' required onChange={handleChange} name='email' value={contactData.email} />
                        </div>
                        <div className='Contact-input-cont'>
                            <BsPatchExclamationFill className='contact-input-icons' />
                            <input type="text" placeholder='Subject' required onChange={handleChange} name='subject' value={contactData.subject} />
                        </div>
                        <div className='Contact-input-cont'>
                            <AiFillMessage className='contact-input-icons' />
                            <input type="text" placeholder='Your Message' required onChange={handleChange} name='message' value={contactData.message} />
                        </div>

                        <button type='submit' disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
                    </form>


                </div>

            </div>
        </>
    )
}
