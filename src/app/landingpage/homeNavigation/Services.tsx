"use client";
import React, { useEffect } from 'react';
import SingleService from './SingleService';
import { services } from '.';
import '../homeNavigation/landingPage.css';
import SoftwareFeatures from '../softwareFeatures/SoftwareFeatures';
const Services: React.FC = () => {
  return (
    <section id="services-section">
      <div className="section-heading">
        <ul className="bouncing-ball">
          {["S", "E", "R", "V", "I", "C", "E", "S"].map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      </div>
      <div className="service-area">
        <p className="section-paragraph">
          Successfully maintaining a flat goes beyond individual efforts. Our dedicated team is here to manage and provide the comprehensive maintenance services you need, ensuring everything runs smoothly.
        </p>
        <SoftwareFeatures />
        <div className="services-list">
          {services.map((service, index) => (
            <div className='individualService' key={index}>
              <SingleService
                title={service.title}
                subTitle={service.serviceSubtitle}
                altTag={service.altTag}
                serviceDescription={service.serviceDescription}
                icon={service.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
