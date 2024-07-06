import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <h2>  Profile</h2>
        <li><Link href="/customer/dashboard/profile/view">View Profile</Link></li>
        <li><Link href="/customer/dashboard/profile/edit">Edit Profile</Link></li>
        <li><Link href="/customer/dashboard/profile/changepassword">Change Password</Link></li>
        <h2>Manage Notifications</h2>
        <li><Link href="/customer/dashboard/notifications/create">Create Notification</Link></li>
        <li><Link href="/customer/dashboard/notifications/edit">Edit Notification</Link></li>
        <li><Link href="/customer/dashboard/notifications/search">Search Notifications</Link></li>
        <li><Link href="/customer/dashboard/notifications/list">List Notifications</Link></li>
        <h2>Settings</h2>
        <li><Link href="/customer/dashboard/settings/switchUserMode">Switch User Mode</Link></li>
        <li>Logout</li>
        <h2>Change Theme</h2>
        <li>White</li>
        <li>Black</li>
      </ul>
    </nav>
  );
};

export default Navigation;
