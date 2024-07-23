import React from 'react';
import SingleService from './SingleService';
import {
  faDatabase,
  faSearch,
  faTools,
  faWrench,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import '../homeNavigation/landingPage.css';
interface Service {
  title: string;
  imageSrc: string;
  altTag: string;
  serviceDescription: string;
  icon: IconDefinition; // Icon should be of type IconDefinition from FontAwesome
}
const services: Service[] = [
  {
    title: 'Preventive Maintenance',
    imageSrc: '/assets/images/serviceImg1.jpg',
    altTag: 'Preventive Maintenance',
    serviceDescription:
      'Ensure the longevity of your equipment and facilities with our proactive preventive maintenance services. We implement scheduled inspections and repairs to minimize downtime and maximize efficiency.',
    icon: faTools, // Tools icon
  },
  {
    title: 'Asset Management',
    imageSrc: '/assets/images/serviceImg2.jpg',
    altTag: 'Asset Management',
    serviceDescription:
      'Optimize your asset lifecycle management with our comprehensive solutions. From acquisition to disposal, we help you track, maintain, and utilize your assets effectively to achieve your operational goals.',
    icon: faDatabase, // Database icon
  },
  {
    title: 'Emergency Repairs',
    imageSrc: '/assets/images/serviceImg3.jpg',
    altTag: 'Emergency Repairs',
    serviceDescription:
      'Rapid response and expert emergency repair services to handle unexpected breakdowns and ensure minimal disruption to your operations. Count on us for prompt and reliable service when you need it most.',
    icon: faWrench, // Wrench icon
  },
  {
    title: 'Facility Inspection',
    imageSrc: '/assets/images/serviceImg4.jpg',
    altTag: 'Facility Inspection',
    serviceDescription:
      'Comprehensive facility inspection services to identify potential issues and ensure compliance with safety and regulatory standards. Our detailed reports and recommendations help you maintain a safe and efficient environment.',
    icon: faSearch, // Search icon
  },
];
const Services: React.FC = () => {
  return (
    <section id="services-section">
      <div className="section-heading">
        <ul className="bouncing-ball">
          <li>S</li>
          <li>E</li>
          <li>R</li>
          <li>V</li>
          <li>I</li>
          <li>C</li>
          <li>E</li>
          <li>S</li>
        </ul>
      </div>
      <div className="service-area">
        <p className="section-paragraph">
          Personal contribution is not enough to start and complete any custom
          project from scratch to live. I have a dedicated team to provide the
          services included below.
        </p>
        <div className="services-list">
          {services.map((service, index) => (
            <SingleService
              title={service.title}
              imageSrc={service.imageSrc}
              altTag={service.altTag}
              serviceDescription={service.serviceDescription}
              key={index}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
