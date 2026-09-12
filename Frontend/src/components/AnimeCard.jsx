import React from 'react'
import '../CSS/AnimeCard.css'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

export const AnimeCard = ({ anime, id }) => {
  return (

    <Link to={`/anime/${id}`} className='anime-card-cont'>

      <div className='anime-img-cont' >
        <img src={anime.attributes.posterImage.original} style={{ objectFit: "cover" }} />
        <span className='anime-type' >
          <span>{anime.attributes.showType}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><FaStar color='gold' /> {anime.attributes.averageRating || 5.9}</span>
        </span>
      </div>
      <p className='anime-title'>{anime.attributes.canonicalTitle}</p>

    </Link>
  )
}
