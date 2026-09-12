import React, { useContext, useEffect, useState } from 'react'
import '../CSS/AnimeDetail.css'
import { useParams } from 'react-router-dom'
import { IoHeartSharp } from 'react-icons/io5'
import { AnimeCard } from '../components/AnimeCard'
import { WishListContext } from '../assets/context/WishListContext'
import { Helmet } from 'react-helmet-async'

export const AnimeDetail = () => {

  const { addToWishList } = useContext(WishListContext);

  const { animeId } = useParams()
  const [animeDetail, setAnimeDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedLoading, setRelatedLoading] = useState(true)

  const [relatedAnime, setRelatedAnime] = useState([])

  const getGenreAnimeDetail = async () => {
    try {
      setLoading(true)

      const res = await fetch(`https://kitsu.io/api/edge/anime/${animeId}`);

      const data = await res.json();

      setAnimeDetail(data.data);

    } catch (error) {
      console.error(error);
      setAnimeDetail(null)
    } finally {
      setLoading(false)

    }
  }

  const getRelatedAnime = async () => {
    try {
      setRelatedLoading(true)

      const res = await fetch(`https://kitsu.io/api/edge/anime?filter[genres]=action,adventure&page[limit]=12`);
      if (!res.ok) {
        console.log("Recommendations API Error:", res.status)
        setRelatedAnime([])
        return
      }

      const data = await res.json();

      setRelatedAnime(data.data)

    } catch (error) {
      console.error(error);
    } finally {
      setRelatedLoading(false)
    }
  }



  useEffect(() => {
    if (!animeId) return
    getGenreAnimeDetail();
  }, [animeId])

  useEffect(() => {
    getRelatedAnime();
  }, [animeId])

  if (loading) { return (<div className="loading"> <p>Loading...</p> </div>) }
  if (!animeDetail) { return (<div className="loading"> <p>Anime not found.</p> </div>) }

  const animeTitle =
    animeDetail.attributes.titles?.en ||
    animeDetail.attributes.titles?.en_jp ||
    animeDetail.attributes.canonicalTitle;


  return (
    <>

      <Helmet>
        <title>Anime Details - ANIMEX</title>
      </Helmet>

      <div className='AnimeDetail-section'>
        <div className="AnimeDetail-cont">

          <div className='mobile-view-img-content'>
            <div className="AnimeDetails-img">
              <img src={animeDetail.attributes.posterImage.original} alt="anime-img" />
            </div>
            <div className="AnimeDetails-content2 mobile-view">
              <ul>
                <div>
                  <li>Type: {animeDetail.attributes.showType}</li>
                  <li>Duration: {animeDetail.attributes.episodeLength}</li>
                  <li>Episodes: {animeDetail.attributes.episodeCount}</li>
                  <li>Status: {animeDetail.attributes.status}</li>
                </div>
                <div>
                  <li>Source: {animeDetail.type}</li>
                  <li>Start Date: {animeDetail.attributes.startDate}</li>
                  <li>End Date: {animeDetail.attributes.endDate}</li>
                </div>
              </ul>
            </div>
          </div>



          <div className="AnimeDetails-content">
            <h2 className='title'>{animeDetail.attributes.canonicalTitle}</h2>
            <span className='title_synonyms'>{animeDetail.attributes.titles.en}, {animeDetail.attributes.titles.en_jp}</span>
            <div className='rating_score'>
              <span>{animeDetail.attributes.ageRating}, </span>
              <span>{animeDetail.attributes.averageRating}</span>
            </div>
            <div className='AnimeDetails'>
              <p>{animeDetail.attributes.description}</p>

            </div>

            <div className='AnimeDetails_btns'>
              <button onClick={() => addToWishList(animeDetail)}><IoHeartSharp /> Add to Watchlist</button>
              <a href={`https://www.crunchyroll.com/search?q=${encodeURIComponent(animeTitle)}`} target='_blank' rel="noopener noreferrer"><button>▶ Watch Now</button></a>
            </div>

            <div className="AnimeDetails-content2">
              <ul>
                <div>
                  <li>Type: {animeDetail.attributes.showType}</li>
                  <li>Duration: {animeDetail.attributes.episodeLength}</li>
                  <li>Episodes: {animeDetail.attributes.episodeCount}</li>
                  <li>Status: {animeDetail.attributes.status}</li>
                </div>
                <div>
                  <li>Source: {animeDetail.type}</li>
                  <li>Start Date: {animeDetail.attributes.startDate}</li>
                  <li>End Date: {animeDetail.attributes.endDate}</li>
                </div>
              </ul>
            </div>

          </div>

        </div>


        {relatedLoading ? (

          <div className="loading">
            <p>Loading...</p>
          </div>

        ) : relatedAnime.length > 0 ? (

          <div className="relatedAnime-section">

            <h2>
              You May Also <span style={{ color: '#51b1e9' }}>Like</span>
            </h2>

            <div className="anime-card">

              {relatedAnime.map((anime) => (

                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  id={anime.id}
                />

              ))}

            </div>

          </div>

        ) : (

          <h2 className="no-related-message">
            No related anime available.
          </h2>

        )}

      </div>
    </>
  )
}
