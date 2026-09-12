import React, { useEffect, useState } from 'react'
import '../CSS/TopAndLatest.css'
import { AnimeCard } from './AnimeCard'

export const TopAndLatest = () => {

    const [topAiring, setTopAiring] = useState([])

    const [latest, setLatest] = useState([])

    const [upcoming, setUpcoming] = useState([])

    const [finished, setFinished] = useState([])

    const [loading, setLoading] = useState(false)

    const getTopAiring = async () => {
        try {
            setLoading(true)
            const res = await fetch("https://kitsu.io/api/edge/anime?filter[status]=current&sort=-averageRating&page[limit]=5");
            const data = await res.json();
            setTopAiring(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const getLatest = async () => {
        try {
            setLoading(true)
            const res = await fetch("https://kitsu.io/api/edge/anime?sort=-startDate&page[limit]=5");
            const data = await res.json();
            setLatest(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const getUpcoming = async () => {
        try {
            setLoading(true)
            const res = await fetch("https://kitsu.io/api/edge/anime?filter[status]=upcoming&page[limit]=5");
            const data = await res.json();
            setUpcoming(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const getFinished = async () => {
        try {
            setLoading(true)
            const res = await fetch("https://kitsu.io/api/edge/anime?filter[status]=finished&page[limit]=5");
            const data = await res.json();

            setFinished(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTopAiring();
    }, [])

    useEffect(() => {
        getLatest();
    }, [])

    useEffect(() => {
        getUpcoming();
    }, [])

    useEffect(() => {
        getFinished();
    }, [])

    return (
        <div className='TopAndLatest-section' id='topAndUpcomming'>

            {loading ? <div className='loading'>Loading...</div>

                :
                <>
                    <div className="TopAndLatest-cont">

                        <div className='anime-card2' >
                            <h2>Top <span style={{ color: "#51b1e9" }}>Airing</span></h2>
                            {topAiring.map((anime) => (
                                <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                            ))}
                        </div>

                        <div className='anime-card2' >
                            <h2>Latest <span style={{ color: "#51b1e9" }}>Released</span></h2>
                            {latest.map((anime) => (
                                <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                            ))}
                        </div>

                        <div className='anime-card2' >
                            <h2>Upcoming <span style={{ color: "#51b1e9" }}>Anime</span></h2>
                            {upcoming.map((anime) => (
                                <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                            ))}
                        </div>

                        <div className='anime-card2' >
                            <h2>Finished <span style={{ color: "#51b1e9" }}>Anime</span></h2>
                            {finished.map((anime) => (
                                <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                            ))}
                        </div>
                    </div>
                </>
            }

        </div >
    )
}
