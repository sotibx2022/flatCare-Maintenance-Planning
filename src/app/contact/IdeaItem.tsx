import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import "../contact/contact.css";
interface IdeaItemProps {
  title: string;
  paragraph: string;
  icon: IconProp; // Use IconProp here
  className: string;
}
const IdeaItem: React.FC<IdeaItemProps> = ({ title, paragraph, icon, className }) => {
  return (
    <div className={`idea-item ${className}`}>
      <FontAwesomeIcon icon={icon} aria-hidden="true" className='ideaIcon' />
      <h6 className='primary_heading'>{title}</h6>
      <p className="section-paragraph">{paragraph}</p>
    </div>
  );
};
export default IdeaItem;
