import React from 'react'
import '../CSS/GenreCard.css'
import { Link } from 'react-router-dom'

export const GenreCard = () => {
    return (
        <div className='GenreCard-section' id='genres'>
            <h2>Browse by <span style={{ color: "#51b1e9" }}>Genre</span></h2>
            <div className="GenreCard-cont">
                <Link to={"/genre/action"}><div className="GenreCard">Action</div></Link>
                <Link to={"/genre/adventure"}><div className="GenreCard">Adventure</div></Link>
                <Link to={"/genre/comedy"}><div className="GenreCard">Comedy</div></Link>
                <Link to={"/genre/drama"}><div className="GenreCard">Drama</div></Link>
                <Link to={"/genre/sci-Fi"}><div className="GenreCard">Sci-Fi</div></Link>
                <Link to={"/genre/space"}><div className="GenreCard">Space</div></Link>
                <Link to={"/genre/mystery"}><div className="GenreCard">Mystery</div></Link>
                <Link to={"/genre/magic"}><div className="GenreCard">Magic</div></Link>
                <Link to={"/genre/supernatural"}><div className="GenreCard">Supernatural</div></Link>
                <Link to={"/genre/police"}><div className="GenreCard">Police</div></Link>
            </div>
        </div>
    )
}
