'use client';
import React, { useEffect, useState } from 'react';
import '../homeNavigation/landingPage.css';
import { useRouter } from 'next/navigation';
import "./../../globals.css";
import "./../../layout.css";
import gsap from 'gsap';
import PortfolioCounter from './PortfolioCounter';
import Rating from './Rating';
import Call2Action from './Call2Action';
import Lottie from 'lottie-react';
import herobackground from "@/../../public/assets/animations/herobackground.json";
import LoadingComponent from '../../ui/LoadingComponent';
const About = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.to(".rating-section", {
      transform: 'translateX(0)',
      duration: 1,
      opacity: 1,
    });
    tl.to(".about-card", {
      opacity: 1,
      scale: 1,
      rotate: 360,
    });
  }, []);
  return (
    <>
      <section id="about-section" className="responsive_flex">
        <div className="about-card">
          <div className="about-img">
            <Lottie animationData={herobackground} autoPlay={true} />
          </div>
        </div>
        <div className="rating-section">
          <div className="rating-summary">
            <h1 className="primary_heading">
              FlatCare <span>Maintenance</span> Planning
            </h1>
            <p className="review-text">
              "Outstanding service! Our maintenance needs are always handled efficiently and professionally. Highly recommended!"
            </p>
            <Rating />
            <Call2Action type="Start Now" link="/customer/login" />
          </div>
        </div>
      </section>
      <PortfolioCounter />
    </>
  );
};
export default About;
