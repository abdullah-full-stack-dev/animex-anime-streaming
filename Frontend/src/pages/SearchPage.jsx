import React, { useState } from 'react'
import '../CSS/SearchPage.css'
import searchImg from '../assets/images/search-img.png'
import { AnimeCard } from '../components/AnimeCard'
import { Helmet } from 'react-helmet-async'

export const SearchPage = () => {

    const [search, setSearch] = useState("")

    const [animeList, setAnimeList] = useState([])

    const [loading, setLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault();
        FetchAnime(search)
    }

    const FetchAnime = async (searchText) => {

        try {
            setLoading(true)
            const res = await fetch(
                `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(searchText)}`
            )

            const data = await res.json()

            setAnimeList(data.data)

        } catch (error) {
            console.error("Search Error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Search Anime - ANIMEX</title>
            </Helmet>
            <div className={`SearchPage-section ${animeList.length > 0 ? "" : "addHeight"}`}>
                <div className="SearchPage-cont">
                    <div className='search-img-cont'>
                        <img src={searchImg} alt="searchImg" />
                    </div>
                    <h2>Search Your Favorite <span style={{ color: '#51b1e9' }}>Anime</span></h2>
                    <p>Search for anime by title and explore detailed information, ratings, and more.</p>
                    <div className='search-input-cont'>
                        <form onSubmit={handleSearch}>
                            <input type="search" placeholder='Search Anime...' required value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button type='submit'>Search</button>
                        </form>
                    </div>

                    {loading ? <div style={{ marginTop: "20px", textAlign: "center", color: "#f8f8f8" }}>Loading...</div>
                        :
                        <div className="anime-card">
                            {animeList.map((anime) => (
                                <AnimeCard
                                    key={anime.id}
                                    anime={anime}
                                    id={anime.id}
                                />
                            ))}

                        </div>}

                </div>
            </div>
        </>
    )
}
