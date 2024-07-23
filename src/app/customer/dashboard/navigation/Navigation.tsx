'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/../../public/assets/images/logo.png';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faEdit,
  faKey,
  faListAlt,
  faSignOutAlt,
  faTachometerAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
const Navigation = () => {
  const router = useRouter();
  const pathName = usePathname();
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
  return (
    <nav className="dashboardNavigation">
      <ul>
        <li className={pathName === '/customer/dashboard/main' ? 'active' : ''}>
          <Link href="/customer/dashboard/main">
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </Link>
        </li>
        <li
          className={
            pathName === '/customer/dashboard/profile/view' ? 'active' : ''
          }
        >
          <Link href="/customer/dashboard/profile/view">
            <FontAwesomeIcon icon={faUser} /> View Profile
          </Link>
        </li>
        <li
          className={
            pathName === '/customer/dashboard/profile/edit' ? 'active' : ''
          }
        >
          <Link href="/customer/dashboard/profile/edit">
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </Link>
        </li>
        <li
          className={
            pathName === '/customer/dashboard/profile/changepassword'
              ? 'active'
              : ''
          }
        >
          <Link href="/customer/dashboard/profile/changepassword">
            <FontAwesomeIcon icon={faKey} /> Change Password
          </Link>
        </li>
        <ul>
          <li
            className={
              pathName === '/customer/dashboard/notifications/create'
                ? 'active'
                : ''
            }
          >
            <Link href="/customer/dashboard/notifications/create">
              <FontAwesomeIcon icon={faBell} /> Create Notification
            </Link>
          </li>
          <li
            className={
              pathName === '/customer/dashboard/notifications/list'
                ? 'active'
                : ''
            }
          >
            <Link href="/customer/dashboard/notifications/list">
              <FontAwesomeIcon icon={faListAlt} /> List Notifications
            </Link>
          </li>
        </ul>
      </ul>
      <button onClick={handleLogout} className="logoutButton">
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </nav>
  );
};
export default Navigation;
