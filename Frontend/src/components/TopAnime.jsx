import React, { useEffect, useState } from 'react'
import '../CSS/TopAnime.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { AnimeCard } from './AnimeCard'

export const TopAnime = () => {

    const [topAnime, setTopAnime] = useState([])

    const getTopAnime = async () => {
        try {
            const res = await fetch("https://kitsu.io/api/edge/anime?sort=-averageRating");

            const data = await res.json();

            setTopAnime(data.data.slice(0, 12));

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTopAnime();
    }, [])

    return (
        <>
            <div className='TopAnime-section'>
                <h2>Top <span style={{ color: '#51b1e9' }}>Anime</span></h2>
                <p>Discover the anime everyone’s watching right now.</p>
                <div className='anime-card' >
                    {topAnime.map((anime) => (
                        <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={"/anime/top-collection"}><button>View All <FaArrowRightLong /></button></Link>
                </div>
            </div>
        </>
    )
}
