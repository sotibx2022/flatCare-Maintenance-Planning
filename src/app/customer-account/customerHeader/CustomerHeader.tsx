"use client";
import React, { useEffect, useState } from 'react';
import logo from "@/../../public/assets/images/logo.png";
import Image from 'next/image';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const CustomerHeader: React.FC = () => {
  const [token, setToken] = useState<string | null>(null); // Initialize token with null
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("/api/customeraccount/findToken");
        const result = response.data;
        if (result.success) {
          setToken(result.token);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken(); // Immediately fetch token when component mounts
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/customeraccount/logout");
      const result = response.data;
      alert(result.message);
      if (result.success) {
        setToken(null); // Clear token state immediately
        router.push("/customer-account/login"); // Redirect to login page after logout
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='container flex_items customerHeader_wrapper'>
      <div className='logo_area'>
        <Image src={logo} className='logo' alt='Logo' priority={true} />
      </div>
      <div className='navigation_area'>
        <ul>
          <li className='menu_item'><Link href="/">Home</Link></li>
          <li className='menu_item'><Link href="/features">Features</Link></li>
          <li className='menu_item'><Link href="/pricing">How it works</Link></li>
          <li className='menu_item'><Link href="/about">About Us</Link></li>
          <li className='menu_item'><Link href="/contact">Contact</Link></li>
          {pathname === "/customer-account" ? (
            <li className='menu_item' onClick={handleLogout}>Logout</li>
          ) : (
            <>
              <li className='menu_item'><Link href="/login">Login</Link></li>
              <li className='menu_item'><Link href="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
