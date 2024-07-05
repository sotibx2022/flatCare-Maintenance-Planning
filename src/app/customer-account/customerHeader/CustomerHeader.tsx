"use client";
import React from 'react';
import logo from "@/../../public/assets/images/logo.png";
import Image from 'next/image';

const CustomerHeader: React.FC = () => {
  return (
    <div className='container flex_items customerHeader_wrapper'>
      <div className='logo_area'>
        <Image src={logo} className='logo' alt='Logo' />
      </div>
      <div className='navigation_area'>
      <ul>
      <li><a href="/">Home</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/pricing">How it works</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
      </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
