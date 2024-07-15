import React from 'react';
import "./../commonFooter/commonFooter.css";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone, faRss } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGooglePlusG, faInstagram, faLinkedinIn, faPinterest, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
const maintenanceCategories = [
    {
        categoryTitle: "Plumbing",
        categoryIcon: "🚰"
    },
    {
        categoryTitle: "Electrical",
        categoryIcon: "💡"
    },
    {
        categoryTitle: "Carpentry",
        categoryIcon: "🔨"
    },
    {
        categoryTitle: "Painting",
        categoryIcon: "🎨"
    },
    {
        categoryTitle: "Pest Control",
        categoryIcon: "🐜"
    },
    {
        categoryTitle: "Appliance Repair",
        categoryIcon: "🔧"
    },

    {
        categoryTitle: "Waste Management",
        categoryIcon: "🚮"
    },

];

const CommonFooter = () => {
    return (
        <footer className='footer'>
            <div className='dividerSVG'>
                <svg viewBox="0 0 1440 320" id="footer-svg">
                    <path fill="#a73754" fill-opacity="1" d="M0,0L30,32C60,64,120,128,180,154.7C240,181,300,171,360,154.7C420,139,480,117,540,122.7C600,128,660,160,720,181.3C780,203,840,213,900,186.7C960,160,1020,96,1080,90.7C1140,85,1200,139,1260,170.7C1320,203,1380,213,1410,218.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
                </svg>
            </div>
            <div className='footerItems container'>
                <div className='identity'>
                    <h1 className='footer_title'>Brand</h1>
                    <img src="/assets/images/herobg.svg" />
                    <div className="social">
                        <ul>
                            <li><FontAwesomeIcon icon={faLinkedinIn} className="linkedIn" /></li>
                            <li className="twitter"><FontAwesomeIcon icon={faTwitter} className='twitter' /></li>
                            <li className="pinterest"><FontAwesomeIcon icon={faInstagram} className='instagram' /></li>
                            <li className="google"><FontAwesomeIcon icon={faFacebook} className='facebook' /></li>
                            <li className="rss"><FontAwesomeIcon icon={faYoutube} className='youtube' /></li>
                        </ul>
                    </div>

                </div>
                <div className='categoreis_wrapper'>
                    <h1 className='footer_title'>Categories</h1>
                    {maintenanceCategories.map((category, index) => {
                        return <Link href={`/${category.categoryTitle.toLocaleLowerCase().replace(/ /g, '-')}`} className='category_wrapper flex_items' key={index}>
                            <p className='categoryItem'>{category.categoryTitle}</p>
                        </Link>
                    })}
                </div>

                <div>
                    <div className='contact'>
                        <h1 className='footer_title'>Contact</h1>
                        <div>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className='footerIcon' /> <span>FlatCare Maintenance Planning</span></div>
                        <div><FontAwesomeIcon icon={faMapMarkerAlt} className='footerIcon' /><span>Chitwan, Nepal</span></div>
                        <div><FontAwesomeIcon icon={faEnvelope} className='footerIcon' /><span>connect@flatcare.com.np</span></div>
                        <div><FontAwesomeIcon icon={faPhone} className='footerIcon' /><span>9864890402</span></div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default CommonFooter