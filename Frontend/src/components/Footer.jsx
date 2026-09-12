import React from 'react'
import '../CSS/Footer.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { PiInstagramLogoFill } from 'react-icons/pi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className='Footer-section'>
      <div className="Footer-cont">
        <div className='footer-logo'>
          <NavLink to={"/"}><h1 className={`animated-text`}>ANIMEX</h1></NavLink>

        </div>
        <p>Animex is your ultimate destination for discovering anime, exploring popular characters, tracking the latest releases, and <br />finding your next favorite series.</p>
        <div className='footer-links-cont'>

          <div>
            <p>Quick Links</p>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/anime/our-collection"}>Anime</Link></li>
            <li><a href="#genres" onClick={()=>navigate("/#genres")} >Genres</a></li>
          </div>

          <div>
            <p>Explore</p>
            <li><Link to={"/anime/trending-collection"}>Trending Anime</Link></li>
            <li><a href="#topAndUpcomming" onClick={()=>navigate("/#topAndUpcomming")} >Top Airing</a></li>
            <li><a href="#topAndUpcomming" onClick={()=>navigate("/#topAndUpcomming")} >Upcoming Anime</a></li>
          </div>

          <div>
            <p>Support</p>
            <li><Link to={"/animex/about"}>About Us</Link></li>
            <li><Link to={"/animex/contact"}>Contact Us</Link></li>
            <li><Link to={"/animex/policy"}>Privacy Policy</Link></li>
          </div>

        </div>

        <div className='footer-social-icons'>
          <p>Follow us and stay connected with the anime world.</p>
          <a href="https://www.instagram.com/a.k_7750/" target='_blank'><PiInstagramLogoFill /></a>
          <a href="https://www.linkedin.com/in/abdullah-khan-9a2647406/" target='_blank'><FaLinkedin /></a>
          <a href="https://github.com/abdullah-full-stack-dev" target='_blank'><FaGithub /></a>
        </div>

        <p className='copyrights'>© 2026 Animex. All rights reserved.</p>
      </div>
    </div>
  )
}
