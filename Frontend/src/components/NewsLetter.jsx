import React, { useEffect, useState } from 'react'
import '../CSS/NewsLetter.css'
import { IoIosMail } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const NewsLetter = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [newsData, setNewsData] = useState({
        email: ""
    })

    const handleChange = (e) => {
        setNewsData({
            ...newsData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await axios.post("http://localhost:5000/api/auth/subscribe-us", newsData);

            if (response.data.success === true) {
                toast.success("Subscribed successfully!")
                setNewsData({
                    email: ""
                })
                navigate("/");
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }, 100);

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
        <div className='NewsLetter-cont'>
            <div className="NewsLetter-box">
                <h2>Stay in the <span style={{ color: "#51b1e9" }}>Anime</span> Loop</h2>
                <p>Get the latest anime updates, new releases, trending shows, and exciting recommendations delivered straight to your inbox.</p>
                <form onSubmit={handleSubmit}>
                    <div className='NewsLetter-input-cont'>
                        <IoIosMail className='mail-icon' />
                        <input type="email" placeholder='Enter your email address' required onChange={handleChange} name='email' value={newsData.email} />
                    </div>
                    <button disabled={loading}>{loading ? "..." : "Subscribe"}</button>
                </form>
                <p>No spam. Just anime, updates, and recommendations.</p>
            </div>
        </div>
    )
}
