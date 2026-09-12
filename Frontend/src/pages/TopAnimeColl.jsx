import React, { useEffect, useState } from 'react'
import '../CSS/TopAnimeColl.css'
import { AnimeCard } from '../components/AnimeCard';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';

export const TopAnimeColl = () => {

    const [topAnimeColl, setTopAnimeColl] = useState([])
    const [visible, setVisible] = useState(12)

    const [loading, setLoading] = useState(false)

    const getTopAnimeColl = async () => {
        try {
            setLoading(true)

            const res = await fetch("https://kitsu.io/api/edge/anime?sort=-averageRating");

            const data = await res.json();

            setTopAnimeColl(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const handleViewMore = () => {
        setVisible(prev => prev + 8)
    }

    useEffect(() => {
        getTopAnimeColl();
    }, [])

    return (
        <>
            <Helmet>
                <title>Top Anime Collection - ANIMEX</title>
            </Helmet>

            {loading ? <div className="loading"> <p>Loading...</p> </div>
                :
                <>
                    <div className='TopAnimeColl-section'>
                        <h2>Top <span style={{ color: '#51b1e9' }}>Anime</span> Collection</h2>
                        <p>Discover the anime everyone’s watching right now.</p>
                        <div className='anime-card' >
                            {topAnimeColl.slice(0, visible).map((anime) => (
                                <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                            ))}
                        </div>
                        {visible < topAnimeColl.length && (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <button onClick={handleViewMore}>View more <FaArrowRightLong /></button>
                            </div>
                        )}
                    </div>
                </>}
        </>
    )
}
