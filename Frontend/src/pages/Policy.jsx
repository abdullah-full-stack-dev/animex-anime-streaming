import React from 'react'
import '../CSS/Policy.css'
import { Helmet } from 'react-helmet-async'

export const Policy = () => {
    return (
        <>
            <Helmet>
                <title>Our Policy - ANIMEX</title>
            </Helmet>

            <div className='Policy-section'>
                <div className="Policy-cont">
                    <div>
                        <h2>1. Privacy <span style={{ color: "#51b1e9" }}>Policy</span></h2>
                        <b>Your Privacy Matters</b>
                        <p>ANIMEX respects your privacy. We only collect information that is necessary to provide and improve our services. Any information submitted through our contact or newsletter forms is handled responsibly and is not sold or shared for advertising purposes.</p>
                    </div>
                    <div>
                        <h2>2. Terms & <span style={{ color: "#51b1e9" }}>Conditions</span></h2>
                        <b>Using ANIMEX</b>
                        <p>By using ANIMEX, you agree to use the website responsibly and for lawful purposes. The content and features provided on ANIMEX are intended for personal and informational use.</p>
                    </div>
                    <div>
                        <h2>3. Content <span style={{ color: "#51b1e9" }}>Disclaimer</span></h2>
                        <b>Anime Information Disclaimer</b>
                        <p>ANIMEX provides anime-related information such as titles, descriptions, genres, ratings, images, and other metadata through third-party APIs and publicly available sources. We do not claim ownership of third-party anime content, characters, artwork, or trademarks.</p>
                    </div>
                    <div>
                        <h2>4. Animex <span style={{ color: "#51b1e9" }}>Copyright</span></h2>
                        <b>Respecting Creators</b>
                        <p>All anime titles, characters, logos, artwork, and related intellectual property belong to their respective owners. ANIMEX does not claim ownership of copyrighted material belonging to third parties.</p>
                    </div>
                    <div>
                        <h2>5. External <span style={{ color: "#51b1e9" }}>Links</span></h2>
                        <b>Third-Party Services</b>
                        <p>ANIMEX may contain links to external websites or services. These websites have their own privacy policies and terms, and ANIMEX is not responsible for their content or practices.</p>
                    </div>
                    <div>
                        <h2>6. Changes to <span style={{ color: "#51b1e9" }}>Policies</span></h2>
                        <b>Policy Updates</b>
                        <p>We may update these policies from time to time to improve our website and services. Any changes will be reflected on this page.</p>
                    </div>

                    <p className='tagLine'>ANIMEX — Discover. Explore. Enjoy Anime.</p>
                </div>
            </div>
        </>
    )
}
