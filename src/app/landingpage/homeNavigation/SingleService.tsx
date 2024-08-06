import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import '../homeNavigation/landingPage.css';
interface SingleServiceProps {
  title: string;
  altTag: string;
  serviceDescription: string[];
  subTitle: string,
  icon: IconDefinition; // IconDefinition type from FontAwesome
}
const SingleService: React.FC<SingleServiceProps> = ({
  title,
  altTag,
  serviceDescription,
  icon,
  subTitle
}) => {
  return (
    <div className="service-item">
      <div className="item-title">
        <FontAwesomeIcon icon={icon} className="borderChange" />
        <div className="primary_heading">{title}</div>
      </div>
      <h5>{subTitle}</h5>
      <ul>
        {serviceDescription.map((servicePoint, index) => {
          return <li key={index}>
            <p> <span>0{index + 1}</span> {servicePoint}</p></li>
        })}
      </ul>
    </div>
  );
};
export default SingleService;
