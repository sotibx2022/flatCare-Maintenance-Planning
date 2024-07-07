"use client"
import React from 'react';
import Link from 'next/link';
import "../navigation/navigation.css";
import { usePathname } from 'next/navigation';

const Navigation = () => {

  const pathName = usePathname()

  return (
    <nav className='dashboardNavigation'>
      <ul>
        <li className={pathName === "/customer/dashboard/main" ? "active" : ""}>
          <Link href="/customer/dashboard/main">Dashboard</Link>
        </li>
        <h2>Profile</h2>
        <li className={pathName === "/customer/dashboard/profile/view" ? "active" : ""}>
          <Link href="/customer/dashboard/profile/view">View Profile</Link>
        </li>
        <li className={pathName === "/customer/dashboard/profile/edit" ? "active" : ""}>
          <Link href="/customer/dashboard/profile/edit">Edit Profile</Link>
        </li>
        <li className={pathName === "/customer/dashboard/profile/changepassword" ? "active" : ""}>
          <Link href="/customer/dashboard/profile/changepassword">Change Password</Link>
        </li>
        <h2>Manage Notifications</h2>
        <li className={pathName === "/customer/dashboard/notifications/create" ? "active" : ""}>
          <Link href="/customer/dashboard/notifications/create">Create Notification</Link>
        </li>
        <li className={pathName === "/customer/dashboard/notifications/edit" ? "active" : ""}>
          <Link href="/customer/dashboard/notifications/edit">Edit Notification</Link>
        </li>
        <li className={pathName === "/customer/dashboard/notifications/search" ? "active" : ""}>
          <Link href="/customer/dashboard/notifications/search">Search Notifications</Link>
        </li>
        <li className={pathName === "/customer/dashboard/notifications/list" ? "active" : ""}>
          <Link href="/customer/dashboard/notifications/list">List Notifications</Link>
        </li>
        <h2>Settings</h2>
        <li className={pathName === "/customer/dashboard/settings/switchUserMode" ? "active" : ""}>
          <Link href="/customer/dashboard/settings/switchUserMode">Switch User Mode</Link>
        </li>
        <h2>Change Theme</h2>
        <li className="change_theme flex_items">
          <span className="white"></span>
          <span className="black"></span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
