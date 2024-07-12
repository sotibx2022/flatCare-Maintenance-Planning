"use client"
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DarkModeContext } from '../../../../useContext/themeContext';


const Navigation = () => {
  const { dispatch } = useContext(DarkModeContext);

  const pathName = usePathname()

  return (
    <nav className='dashboardNavigation'>
      <ul>
        <li className={pathName === "/customer/dashboard/main" ? "active" : ""}>
          <Link href="/customer/dashboard/main">Dashboard</Link>
        </li>
        <h2 className='secondary_heading'>Profile</h2>
        <li className={pathName === "/customer/dashboard/profile/view" ? "active" : ""}>
          <Link href="/customer/dashboard/profile/view">View Profile</Link>
        </li>
        <li className={pathName === "/customer/dashboard/profile/edit" ? "active" : ""}>
          <Link href="/customer/dashboard/profile/edit">Edit Profile</Link>
        </li>
        <li className={pathName === "/customer/dashboard/profile/changepassword" ? "active" : ""}>
          <Link href="/customer/dashboard/profile/changepassword">Change Password</Link>
        </li>
        <h2 className='secondary_heading'>Manage Notifications</h2>
        <li className={pathName === "/customer/dashboard/notifications/create" ? "active" : ""}>
          <Link href="/customer/dashboard/notifications/create">Create Notification</Link>
        </li>
        <li className={pathName === "/customer/dashboard/notifications/list" ? "active" : ""}>
          <Link href="/customer/dashboard/notifications/list">List Notifications</Link>
        </li>
        <h2 className='secondary_heading'>Settings</h2>
        <li className={pathName === "/customer/dashboard/settings/switchUserMode" ? "active" : ""}>
          <Link href="/customer/dashboard/settings/switchUserMode">Switch User Mode</Link>
        </li>
        <h2 className='secondary_heading'>Change Theme</h2>
        <div className="change_theme flex_items">
          <span className="lightModeBox" onClick={() => { dispatch({ type: 'LIGHTMODE' }) }}></span>

          <span className="darkModeBox" onClick={() => { dispatch({ type: 'DARKMODE' }) }}></span>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
