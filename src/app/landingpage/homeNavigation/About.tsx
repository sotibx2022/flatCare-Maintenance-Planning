'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../homeNavigation/landingPage.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import SoftwareFeatures from '../softwareFeatures/SoftwareFeatures';
import "./../../globals.css";
import "./../../layout.css";
const About = () => {
  const router = useRouter();
  return (
    <section id="about-section" className="responsive_flex">
      <div className="about-card">
        <div className="about-img">
          <img
            src="/assets/images/heroimage.jfif"
            alt="FlatCate Maintenance Planning..."
          />
        </div>
      </div>
      <div className="about-us">
        <h1 className="primary_heading">FlatCare Maintenance Planning</h1>
        <p className="main_paragraph">
          Effortless maintenance for a hassle-free life.
        </p>
        <SoftwareFeatures />
        <Link href="/customer/signup" className="callToAction">
          <FontAwesomeIcon icon={faRocket} />
          Start Now
        </Link>
      </div>
    </section>
  );
};
export default About;
