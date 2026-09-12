import React, { useEffect, useState } from 'react'
import '../CSS/Genre.css'
import { useParams } from 'react-router-dom'
import { AnimeCard } from '../components/AnimeCard'
import { Helmet } from 'react-helmet-async'

export const Genre = () => {

    const { genreId } = useParams()
    const [animeList, setAnimeList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const getGenreAnime = async () => {

            try {

                setLoading(true)

                const res = await fetch(
                    `https://kitsu.io/api/edge/anime?filter[genres]=${genreId}&page[limit]=20`
                )

                if (!res.ok) {
                    throw new Error(`API Error: ${res.status}`)
                }

                const data = await res.json()

                setAnimeList(data.data || [])

            } catch (error) {

                console.error("Genre Error:", error)
                setAnimeList([])

            } finally {
                setLoading(false)
            }

        }

        if (genreId) {
            getGenreAnime()
        }

    }, [genreId])


    return (
        <>
            <Helmet>
                <title>Genres Anime - ANIMEX</title>
            </Helmet>

            <div className="genre-section">

                {loading ?
                    <div className="loading"> <p>Loading...</p> </div>
                    :
                    <>
                        <h2>
                            <span style={{ color: "#51b1e9" }}>{genreId?.charAt(0).toUpperCase() + genreId?.slice(1)}</span> Anime
                        </h2>
                        <div className="anime-card">

                            {animeList.map((anime) => (
                                <AnimeCard
                                    key={anime.id}
                                    anime={anime}
                                    id={anime.id}
                                />
                            ))}

                        </div>
                    </>}

            </div>
        </>
    )
}