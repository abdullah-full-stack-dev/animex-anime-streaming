import React from 'react'
import { Hero } from '../components/Hero'
import { TopAnime } from '../components/TopAnime'
import { TrendingAnime } from '../components/TrendingAnime'
import { FeaturedAnime } from '../components/FeaturedAnime'
import { GenreCard } from '../components/GenreCard'
import { TopAndLatest } from '../components/TopAndLatest'
import { NewsLetter } from '../components/NewsLetter'
import { NewReleased } from '../components/NewReleased'
import { Helmet } from 'react-helmet-async'

export const Home = () => {
  return (
    <div>

      <Helmet>
        <title>ANIMEX - Watch Anime Online</title>
      </Helmet>

      <meta
        name="description"
        content="Discover popular, trending and latest anime on ANIMEX. Explore anime details, genres, characters and more."
      />

      <meta
        name="keywords"
        content="anime, watch anime, anime streaming, latest anime, popular anime, ANIMEX"
      />

      <Hero />
      <FeaturedAnime />
      <TrendingAnime />
      <NewReleased />
      <TopAnime />
      <GenreCard />
      <TopAndLatest />
      <NewsLetter />
    </div>
  )
}
