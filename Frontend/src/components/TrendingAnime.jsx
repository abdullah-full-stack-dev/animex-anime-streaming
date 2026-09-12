import React, { useEffect, useState } from 'react'
import '../CSS/TrendingAnime.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { AnimeCard } from './AnimeCard'

export const TrendingAnime = () => {

    const [trendingAnime, setTrendingAnime] = useState([])

    const getTrendingAnime = async () => {
        try {
            const res = await fetch("https://kitsu.io/api/edge/trending/anime");

            const data = await res.json();

            setTrendingAnime(data.data.slice(0, 6));

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTrendingAnime();
    }, [])

    return (
        <>
            <div className='TrendingAnime-section'>
                <h2>Trending <span style={{ color: '#51b1e9' }}>Anime</span></h2>
                <p>Discover the trending anime of today's.</p>
                <div className='anime-card' >
                    {trendingAnime.map((anime) => (
                        <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={"/anime/trending-collection"}><button>View All <FaArrowRightLong /></button></Link>
                </div>
            </div>
        </>
    )
}
