import React, { useEffect, useState } from 'react'
import '../CSS/NewReleasedColl.css'
import { AnimeCard } from '../components/AnimeCard'

export const NewReleasedColl = () => {

    const [loading, setLoading] = useState(false)

    const [newReleasedColl, setNewReleasedColl] = useState([])

    const getNewReleasedAnimeColl = async () => {
        try {
            setLoading(true)

            const res = await fetch("https://kitsu.io/api/edge/anime?sort=-startDate");

            const data = await res.json();

            setNewReleasedColl(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getNewReleasedAnimeColl();
    }, [])

    return (
        <>
            {loading ? <div className="loading"> <p>Loading...</p> </div>

                :
                <>
                    <div className='NewReleasedColl-section'>
                        <h2>New <span style={{ color: '#51b1e9' }}>Anime</span> Collection</h2>
                        <p>Discover the newset anime till now.</p>
                        <div className='anime-card' >
                            {newReleasedColl.map((anime) => (
                                <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                            ))}
                        </div>
                    </div>
                </>
            }
        </>
    )
}
