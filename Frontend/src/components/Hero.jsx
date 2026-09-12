import React from 'react'
import '../CSS/Hero.css'
import bg from '../assets/videos/bg.mp4'
import { RiFlashlightFill } from 'react-icons/ri'
import { IoTv } from 'react-icons/io5'
import { BiSolidMoviePlay } from 'react-icons/bi'
import { FaGlobe, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'


export const Hero = () => {
    return (
        <>
            <div className='hero-section'>
                <video src={bg} playsInline autoPlay muted loop></video>
                <div className='hero-cont'>

                    <div className="hero-content">

                        <h1>Your <span style={{ color: "#51b1e9" }}>Anime</span>. Your <span style={{ color: "#51b1e9" }} >World</span>.</h1>
                        <p>Dive into an endless world of anime.</p>
                        <b>Watch your favorite <span style={{ color: "#51b1e9" }}>series</span>, discover new adventures, and experience every story in one place.</b>
                        <div>
                            <a href="#topAndUpcomming"><button className='hero-btn play'><FaPlay /> Start Watching </button></a>
                            <Link to={"/anime/our-collection"}><button className='hero-btn explore'><FaGlobe /> Explore Anime</button></Link>
                        </div>

                        <p className='hero-highlights'><BiSolidMoviePlay /> 10,000+ Anime • <RiFlashlightFill /> Fast Streaming • <IoTv /> HD Quality</p>

                    </div>

                </div>
            </div>
        </>
    )
}
