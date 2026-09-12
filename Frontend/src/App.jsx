import React, { useState } from 'react'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Login } from './components/Login'
import { TopAnimeColl } from './pages/TopAnimeColl'
import { AnimeDetail } from './pages/AnimeDetail'
import { Genre } from './pages/Genre'
import { TrendingAnimeColl } from './pages/TrendingAnimeColl'
import { SearchPage } from './pages/SearchPage'
import { Footer } from './components/Footer'
import { OurCollection } from './pages/OurCollection'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import { Policy } from './pages/Policy'
import { ScrollBtn } from './components/ScrollBtn'
import ScrollToTop from './components/ScrollToTop'
import { Slide, ToastContainer } from 'react-toastify'
import { NewReleasedColl } from './pages/NewReleasedColl'
import { WishList } from './pages/WishList'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => {

  const [form, showForm] = useState(false);

  return (
    <div>
      <Navbar showForm={showForm} />
      <ToastContainer theme="dark" transition={Slide} pauseOnHover={false} autoClose={2000} hideProgressBar style={{zIndex:"9999999"}} />
      <ScrollToTop />
      <Login form={form} showForm={showForm} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/anime/:animeId' element={<AnimeDetail />} />
        <Route path='/anime/top-collection' element={<TopAnimeColl />} />
        <Route path='/anime/trending-collection' element={<TrendingAnimeColl />} />
        <Route path='/anime/new-released' element={<NewReleasedColl />} />
        <Route path="/genre/:genreId" element={<Genre />} />
        <Route path="/anime/our-collection" element={<OurCollection />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/animex/contact" element={<Contact />} />
        <Route path="/animex/about" element={<About />} />
        <Route path="/animex/policy" element={<Policy />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/forgot-password" element={<ForgotPassword showForm={showForm} />} />
        <Route path="/reset-password/:token" element={<ResetPassword showForm={showForm} />} />
      </Routes>
      <ScrollBtn />
      <Footer />

    </div>
  )
}

export default App