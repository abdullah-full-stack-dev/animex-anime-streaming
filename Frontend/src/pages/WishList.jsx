import React, { useContext } from 'react'
import "../CSS/WishList.css";
import { Link } from 'react-router-dom';
import { WishListContext } from '../assets/context/WishListContext';
import { AnimeCard } from '../components/AnimeCard';
import { Helmet } from 'react-helmet-async';

export const WishList = () => {

    const { wishListItems, removeFromWishList } = useContext(WishListContext);

    return (
        <>
            <Helmet>
                <title>Your Wishlist - ANIMEX</title>
            </Helmet>

            <div className='wishlist-section'>

                {wishListItems.length === 0 ? (
                    <div className='empty-wishlist-cont'>
                        <div className='empty-wishlist addHeight'>
                            <h2>Your Wishlist is Empty!</h2>
                            <p>Save your favorite anime here and <br /> watch them later.</p>
                            <Link to={"/anime/our-collection"}><button>Continue Browsing</button></Link>
                        </div>
                    </div>
                ) :
                    (
                        <div>
                            <h2 className='wishlist-title'>Your <span style={{ color: '#51b1e9' }}>Wishlist</span></h2>
                            <div className='anime-card' >
                                {wishListItems.map((anime) => (
                                    <div key={anime.id} className='wishlist-card-wrapper'>

                                        <AnimeCard
                                            anime={anime}
                                            id={anime.id} />

                                        <span className='remove-wishlist' title='remove from wishlist' onClick={() => removeFromWishList(anime.id)}>X</span>
                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

            </div>
        </>
    )
}
