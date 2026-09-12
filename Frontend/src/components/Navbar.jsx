import React, { useContext, useEffect, useState } from 'react'
import '../CSS/Navbar.css'
import { FaUserAlt } from 'react-icons/fa'
import { RiSearch2Fill } from 'react-icons/ri'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { TiThMenu } from 'react-icons/ti'
import { IoMdArrowDropdown } from 'react-icons/io'
import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { GoHeartFill } from 'react-icons/go'
import { WishListContext } from '../assets/context/WishListContext'
import { toast } from 'react-toastify'

export const Navbar = ({ showForm }) => {

    const { wishListItems } = useContext(WishListContext);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [showNavbar, setShowNavbar] = useState(false);
    const [navbarBg, setNavbarBg] = useState(false);

    const [genres, setGenres] = useState([])

    const [menu, setMenu] = useState(false);
    const [subMenu, showSubMenu] = useState(false)

    useEffect(() => {

        const getGenres = async () => {

            try {

                const res = await fetch(
                    "https://kitsu.io/api/edge/genres"
                )

                if (!res.ok) {
                    throw new Error(`API Error: ${res.status}`)
                }

                const data = await res.json()

                setGenres(data.data || [])

            } catch (error) {

                console.error("Genre API Error:", error)
                setGenres([])

            }

        }

        getGenres()

    }, [genres])


    useEffect(() => {
        if (menu) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [menu])

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        window.dispatchEvent(new Event("userLogout"));

        setUser(null);
        toast.success("Logout successfully!")
        navigate("/");
    };



    useEffect(() => {
        const getUser = () => {
            const storedUser = localStorage.getItem("user");

            if (storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        // Initial check
        getUser();

        // Login ke baad update
        window.addEventListener("userLogin", getUser);

        return () => {
            window.removeEventListener("userLogin", getUser);
        };
    }, []);


    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 50) {
                setShowNavbar(true);
                setNavbarBg(false);
            } else {
                setNavbarBg(true)

                // Scroll Down
                if (currentScrollY > lastScrollY) {
                    setShowNavbar(false);
                }
                // Scroll Up
                else {
                    setShowNavbar(true);
                }
                lastScrollY = currentScrollY;
            }

        }

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])


    return (
        <>
            <div className={`navbar-cont ${showNavbar ? "show" : "hide"} ${navbarBg ? "bg" : ""}`}>
                <nav>
                    <div>
                        <NavLink to={"/"}><h1 className={`animated-text`}>ANIMEX</h1></NavLink>
                    </div>
                    <ul >
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/anime/trending-collection"}>Trending</NavLink></li>
                        <li><NavLink to={"/anime/our-collection"}>Anime</NavLink></li>
                        <li className={`genres-cont`} onClick={() => showSubMenu(!subMenu)}>
                            <span className='genres'>Genres <IoMdArrowDropdown className={`arrow-icon ${subMenu ? "rotate-icon" : ""}`} /></span>
                            <ul className={`genres-child ${subMenu ? "show-sub-menu" : ""}`}>

                                <div>
                                    {genres.map((genre) => (

                                        <Link to={`/genre/${encodeURIComponent(genre.attributes.name.toLowerCase())}`} key={genre.id}>
                                            <li>{genre.attributes.name}</li>
                                        </Link>

                                    ))}
                                </div>

                            </ul>
                        </li>

                        <li>
                            <NavLink to={"/wishlist"}>
                                <div className='wishlist-icon-cont'>
                                    <GoHeartFill style={{ display: "flex" }} />
                                    <span className='wishlist-icon'>{wishListItems.length}</span>
                                </div>
                            </NavLink>
                        </li>

                    </ul>
                    <div className='nav-icon-cont'>
                        <Link to={"/search"}>
                            <li className='search-cont'>
                                <RiSearch2Fill />
                            </li>
                        </Link>

                        {user ? (
                            <div className="user-wrapper">
                                <div className="user-avatar">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>

                                <button
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : <li className="user-icon" onClick={() => showForm(true)}><FaUserAlt size={16} /></li>}

                        <li><TiThMenu className={`menu-icon`} onClick={() => setMenu(true)} /></li>
                    </div>

                </nav>


                <div className={`sub-menu-overlay ${subMenu ? "show-sub-menu-overlay" : ""} `} onClick={() => showSubMenu(false)}></div>

                {/* Mobile menu container */}
                <div className={`menu-overlay ${menu ? "show-menu" : ""}`} onClick={() => setMenu(false)}></div>
                <div className={`meu-cont ${menu ? "show-menu" : ""}`}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "18px 0 30px" }}>
                        <NavLink to={"/"}><h1 className={`animated-text`}>ANIMEX</h1></NavLink>
                        <IoArrowBackCircleSharp color='#f8f8f8' size={28} onClick={() => setMenu(false)} />
                    </div>
                    <NavLink to={"/"} onClick={() => setMenu(false)}> <li>Home</li> </NavLink>
                    <NavLink to={"/anime/trending-collection"} onClick={() => setMenu(false)}> <li>Trending</li> </NavLink>
                    <NavLink to={"/anime/our-collection"} onClick={() => setMenu(false)}> <li>Anime</li> </NavLink>

                    <li className='mobile-genres-cont' onClick={() => showSubMenu(!subMenu)}>
                        <div className='mobile-genres'>Genres <IoMdArrowDropdown className={`arrow-icon ${subMenu ? "rotate-icon" : ""}`} /></div>
                        <ul className={`mobile-genres-child ${subMenu ? "show-genres" : ""}`}>
                            <div>
                                {genres.map((genre) => (

                                    <Link to={`/genre/${encodeURIComponent(genre.attributes.name.toLowerCase())}`} key={genre.id} onClick={() => setMenu(false)}>
                                        <li>{genre.attributes.name}</li>
                                    </Link>

                                ))}
                            </div>
                        </ul>
                    </li>
                    <NavLink to={"/animex/policy"} onClick={() => setMenu(false)}><li>Policy</li></NavLink>
                    <NavLink to={"/wishlist"} onClick={() => setMenu(false)}><li>Wishlist ({wishListItems.length}) </li></NavLink>

                </div>

            </div>
        </>
    )
}
