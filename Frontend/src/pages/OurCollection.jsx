import React, { useEffect, useState } from 'react'
import '../CSS/OurCollection.css'
import { AnimeCard } from '../components/AnimeCard'
import { Helmet } from 'react-helmet-async'

export const OurCollection = () => {

    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)

    const animePerPage = 12

    const [animeList, setAnimeList] = useState([])

    const getAllAnime = async () => {
        try {
            setLoading(true)
            const offset = (currentPage - 1) * animePerPage

            const res = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=${offset}`);

            const data = await res.json();

            setAnimeList(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllAnime();
    }, [currentPage])



    return (
        <>
            <Helmet>
                <title>Anime Collection - ANIMEX</title>
            </Helmet>

            <div className='OurCollection-section'>

                {loading ? <div className="loading"> <p>Loading...</p> </div>
                    :
                    <>
                        <h2>Explore Our <span style={{ color: '#51b1e9' }}>Collection</span> </h2>
                        <p>Discover a world of unforgettable anime, legendary characters, epic adventures, and stories worth watching again and again.</p>
                        <div className='anime-card' >
                            {animeList.map((anime) => (
                                <AnimeCard anime={anime} id={anime.id} key={anime.id} />
                            ))}
                        </div>

                        <div className="pagination">
                            <div>
                                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>

                                <span className='pageNo'>{currentPage}</span>

                                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                            </div>
                        </div>


                    </>}



            </div>
        </>
    )
}
