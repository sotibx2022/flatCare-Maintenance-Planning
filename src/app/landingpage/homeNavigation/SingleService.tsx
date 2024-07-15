import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCogs, faWrench, faDatabase, faSearch, IconName } from '@fortawesome/free-solid-svg-icons'; // Import relevant icons
import "../homeNavigation/landingPage.css";
interface SingleServiceProps {
    title: string;
    imageSrc: string;
    altTag: string;
    serviceDescription: string;
    icon: IconDefinition; // IconDefinition type from FontAwesome
}

const SingleService: React.FC<SingleServiceProps> = ({ title, imageSrc, altTag, serviceDescription, icon }) => {
    return (
        <div className="service-item">
            <div className="item-image">
                <img src={imageSrc} alt={altTag} className="service-item-img" />
            </div>

            <p className="section-paragraph">
                {serviceDescription}
            </p>
            <div className="item-title">
                <h4 className="service-sub-heading">
                    <FontAwesomeIcon icon={icon} className='borderChange' />
                    <div className='primary_heading'>{title}</div>
                </h4>
            </div>
        </div>
    );
}

export default SingleService;
