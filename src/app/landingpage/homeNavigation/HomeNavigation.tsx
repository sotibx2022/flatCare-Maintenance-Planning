import {
  faCalendar,
  faCogs,
  faEnvelope,
  faHome,
  faInfoCircle,
  faThList,
  faUser,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import MenuItem from './MenuItem';
import '../homeNavigation/landingPage.css';
const menuItems = [
  { icon: faHome, name: 'Home' },
  { icon: faWrench, name: 'Technician' },
  { icon: faUser, name: 'Customer' },
  { icon: faCalendar, name: 'Planner' },
  { icon: faThList, name: 'Features' },
  { icon: faCogs, name: 'FAQ' },
  { icon: faInfoCircle, name: 'About' },
  { icon: faEnvelope, name: 'Contact' },
];
const HomeNavigation = () => {
  return (
    <div className="menu_area">
      <ul>
        {menuItems.map((item, index) => {
          return <MenuItem icon={item.icon} name={item.name} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default HomeNavigation;
