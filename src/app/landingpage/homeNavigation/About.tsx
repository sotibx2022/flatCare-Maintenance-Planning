'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../homeNavigation/landingPage.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import "./../../globals.css";
import "./../../layout.css";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PortfolioCounter from './PortfolioCounter';
import Rating from './Rating';
const About = () => {
  const router = useRouter();
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 1 } })
    tl.to(".about-us", {
      transform: 'translateX(0)',
      duration: 1,
    })
    tl.to(".about-card", {
      opacity: 1,
      scale: 1,
      rotate: 360,
    })
  }, [])
  return (
    <>
      <section id="about-section" className="responsive_flex">
        <div className="about-card">
          <div className="about-img">
            <img
              src="/assets/images/heroimage.png"
              alt="FlatCate Maintenance Planning..."
            />
          </div>
        </div>
        <div className="rating-section">
          <div className="rating-summary">
            <h1 className="primary_heading">FlatCare Maintenance Planning</h1>
            <p className="review-text">"Outstanding service! Our maintenance needs are always handled efficiently and professionally. Highly recommended!"</p>
            <Rating />
            <Link href="/customer/signup" className="callToAction">
              <FontAwesomeIcon icon={faRocket} />
              Start Now
            </Link>
          </div>
        </div>
      </section>
      <PortfolioCounter />
    </>
  );
};
export default About;
