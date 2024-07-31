'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import navigationItems from '.';
import SingleNavigationItem from './SingleNavigationItem';
const Navigation = () => {
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
    <nav className="dashboardNavigation">
      <ul>
        {navigationItems.map((item, index) => (
          <SingleNavigationItem
            providedPathName={item.path}
            icon={item.icon}
            NavigationTitle={item.NavigationTitle}
            key={index}
          />
        ))}
      </ul>
      <button onClick={handleLogout} className="logoutButton">
        <FontAwesomeIcon icon={faSignOutAlt} className='logoutButtonIcon' /> Logout
      </button>
      <button onClick={returnHome} className="returnHome">
        <FontAwesomeIcon icon={faHouse} className="returnHomeIcon" /> Return Home
      </button>
    </nav>
  );
};
export default Navigation;
