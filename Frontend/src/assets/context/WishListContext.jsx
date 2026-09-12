import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const WishListContext = createContext();

const WishListContextProvider = (props) => {

    const [wishListItems, setWishListItems] = useState(() => {
        const savedWishList = localStorage.getItem("wishlist");

        return savedWishList
            ? JSON.parse(savedWishList)
            : [];
    });

    const addToWishList = (anime) => {

        const existing = wishListItems.find(
            (item) => item.id === anime.id
        );

        const token = localStorage.getItem("token");

        if (!token) {
            toast.info("Please login first to add items to wishlist!");
            return;
        }

        if (existing) {
            toast.info("Anime already exists in your wishlist!");
            return;
        }

        setWishListItems((prev) => [
            ...prev,
            anime
        ]);

        toast.success("Added to wishlist!");
    };

    const removeFromWishList = (animeId) => {

        setWishListItems((prev) =>
            prev.filter((item) => item.id !== animeId)
        );

        toast.success("Removed from wishlist!");
    };

    useEffect(() => {
        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishListItems)
        );
    }, [wishListItems]);

    const value = {
        addToWishList,
        wishListItems,
        setWishListItems,
        removeFromWishList
    };

    return (
        <WishListContext.Provider value={value}>
            {props.children}
        </WishListContext.Provider>
    );
};

export default WishListContextProvider;