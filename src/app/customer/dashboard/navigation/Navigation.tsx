'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import navigationItems from '.';
import SingleNavigationItem from './SingleNavigationItem';
interface NavigationProps {
  hideSideBar: boolean
}
const Navigation: React.FC<NavigationProps> = ({ hideSideBar }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/customer/logout');
      const result = response.data;
      if (result.success) {
        toast.success(result.message);
        router.push('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const returnHome = () => {
    router.push("/");
  }
  return (
    <nav className={hideSideBar ? "hideSideBar" : "showSideBar"}>
      <div className='sideBarContainer'>
        <ul className='flex flex-col gap-4'>
          {navigationItems.map((item, index) => (
            <SingleNavigationItem
              providedPathName={item.path}
              icon={item.icon}
              NavigationTitle={item.NavigationTitle}
              key={index}
              hideSideBar={hideSideBar}
            />
          ))}
        </ul>
        <div className={hideSideBar ? "sideBarButtonsWrapperOnHideSideBar" : "sideBarButtonsWrapperOnShowSideBar"}>
          <button onClick={handleLogout} className="logoutButton">
            <FontAwesomeIcon icon={faSignOutAlt} className='logoutButtonIcon' />
            <p className='buttonText'>Logout</p>
          </button>
          <button onClick={returnHome} className="returnHome">
            <FontAwesomeIcon icon={faHouse} className="returnHomeIcon" />
            <p className='buttonText'>Return Home</p>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
