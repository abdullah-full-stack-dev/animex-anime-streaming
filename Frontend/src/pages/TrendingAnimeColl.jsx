import React, { useEffect, useState } from 'react'
import '../CSS/TrendingAnimeColl.css'
import { AnimeCard } from '../components/AnimeCard'
import { Helmet } from 'react-helmet-async'

export const TrendingAnimeColl = () => {

    const [loading, setLoading] = useState(false)

    const [trendingAnimeColl, setTrendingAnimeColl] = useState([])

    const getTrendingAnimeColl = async () => {
        try {
            setLoading(true)

            const res = await fetch("https://kitsu.io/api/edge/trending/anime");

            const data = await res.json();

            setTrendingAnimeColl(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getTrendingAnimeColl();
    }, [])

    return (
        <>
            <Helmet>
                <title>Trending Anime Collection - ANIMEX</title>
            </Helmet>

            {loading ? <div className="loading"> <p>Loading...</p> </div>

                :
                <>
                    <div className='TrendingAnimeColl-section'>
                        <h2>Trending <span style={{ color: '#51b1e9' }}>Anime</span> Collection</h2>
                        <p>Discover the trending anime of today's.</p>
                        <div className='anime-card' >
                            {trendingAnimeColl.map((anime) => (
                                <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                            ))}
                        </div>
                    </div>
                </>
            }
        </>
    )
}
