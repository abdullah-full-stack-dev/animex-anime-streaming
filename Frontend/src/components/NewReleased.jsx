import React, { useEffect, useState } from 'react'
import '../CSS/NewReleased.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { AnimeCard } from './AnimeCard'

export const NewReleased = () => {

    const [newReleased, setNewReleased] = useState([])

    const getNewReleased = async () => {
        try {
            const res = await fetch("https://kitsu.io/api/edge/anime?sort=-startDate");

            const data = await res.json();

            setNewReleased(data.data.slice(0,6));

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNewReleased();
    }, [])

    return (
        <>
            <div className='NewReleased-section'>
                <h2>New <span style={{ color: '#51b1e9' }}>Released</span></h2>
                <p>Discover the newest anime till now.</p>
                <div className='anime-card' >
                    {newReleased.map((anime) => (
                        <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={"/anime/new-released"}><button>View All <FaArrowRightLong /></button></Link>
                </div>
            </div>
        </>
    )
}
