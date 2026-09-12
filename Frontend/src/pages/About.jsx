import React from 'react'
import '../CSS/About.css'
import aboutImg from '../assets/images/about-img.png'
import { Helmet } from 'react-helmet-async'

export const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us - ANIMEX</title>
            </Helmet>
            <div className='About-section'>
                <div className="About-cont">
                    <div className='about-img-cont'>
                        <img src={aboutImg} alt="aboutImg" />
                    </div>

                    <div className="About-content">
                        <h2>About <span style={{ color: "#51b1e9" }}>ANIMEX</span></h2>
                        <b>Your World of Anime, All in One Place.</b>
                        <p>Welcome to ANIMEX — a place built for anime fans who love discovering new stories, unforgettable characters, and exciting adventures.</p>
                        <p>ANIMEX is your ultimate destination for discovering anime. Explore popular titles, trending shows, different genres, and detailed anime information — all in one simple and immersive platform. Whether you're a longtime otaku or just starting your anime journey, there's always something new to discover at ANIMEX.</p>
                        <p>Explore a growing collection of anime across different genres, discover popular and trending titles, search for your favorite shows, and dive deeper into detailed anime information — all through a clean and immersive experience.</p>
                        <h2>What <span style={{ color: "#51b1e9" }}>ANIMEX</span> Offers</h2>
                        <p>Explore Anime - Discover anime from different genres and categories.</p>
                        <p>Trending & Popular - Find out what anime fans are watching.</p>
                        <p>Smart Search - Quickly find your favorite anime.</p>
                        <p>Detailed Information - Explore ratings, genres, descriptions, and more.</p>
                        <p>Anime Collection - Keep discovering new favorites.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
