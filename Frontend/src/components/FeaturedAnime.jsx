import React from 'react'
import '../CSS/FeaturedAnime.css'
import { allFeaturedAnime } from '../assets/FeaturedAnime'
import { Link } from 'react-router-dom'

export const FeaturedAnime = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", color: "#f8f8f8", marginTop: "50px" }}>Anime <span style={{ color: '#51b1e9' }}>Spotlight</span></h2>
      <div className='FeaturedAnime-section'>

        {allFeaturedAnime.map((anime, index) => (
          <div className="FeaturedAnime-cont" key={index}>
            <div className='FeaturedAnime-video-cont'>
              <video src={anime.video} alt="featuredBg" preload="metadata" playsInline autoPlay muted loop />
            </div>
            <div className="FeaturedAnime-content">
              <h2>{anime.title}</h2>
              <p>{anime.desc} <span className='FeaturedAnime-desc'>{anime.desc2}</span></p>
              <p>{anime.genre}</p>
              <Link to={anime.link}><button>{anime.linkTitle}</button></Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
