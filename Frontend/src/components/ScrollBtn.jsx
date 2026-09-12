import React, { useEffect, useState } from 'react'
import { FaArrowUpLong } from 'react-icons/fa6';

export const ScrollBtn = () => {

    const [visible, setvisible] = useState(false)

    useEffect(() => {

        const visibility = () => {
            if (window.scrollY > 500) {
                setvisible(true)
            }

            else {
                setvisible(false)
            }
        };
        window.addEventListener("scroll", visibility);
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div >
            {visible && (
                <button style={{ position: "fixed", right: "1rem", bottom: "1rem", zIndex: "999", padding: "10px 12px", border: "none", background: "#51b1e9", borderRadius: "4px", cursor: "pointer" }} onClick={scrollUp}>
                    <FaArrowUpLong size={15} />
                </button>
            )}


        </div>
    )
}
