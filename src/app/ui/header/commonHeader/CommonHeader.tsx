'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faExpand, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const CommonHeader = () => {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const toggleResponsiveMenu = () => {
    setShowResponsiveMenu(!showResponsiveMenu);
  };
  useGSAP(() => {
    gsap.to(".navigation_area", {
      x: showResponsiveMenu ? -300 : 0,
      opacity: 1,
      duration: 1,
    });
  }, [showResponsiveMenu]);
  return (
    <>
      <div className="Header_wrapper container">
        <div className="logo_area">
          <Link href='/'>
            <img
              src="/assets/images/logo.png"
              alt="Company Logo"
              className="logo"
            />
          </Link>
        </div>
        <FontAwesomeIcon icon={faBars} className="icon menuIcon" onClick={toggleResponsiveMenu} />
      </div>
      <nav className="navigation_area">
        <FontAwesomeIcon icon={faTimes} className="icon close-icon menuIcon" onClick={toggleResponsiveMenu} />
        <ul>
          <li className="menu_item">
            <Link href="/">Home</Link>
          </li>
          <li className="menu_item">
            <Link href="/technician">Technician</Link>
          </li>
          <li className="menu_item">
            <Link href="/customer/login">Customer</Link>
          </li>
          <li className="menu_item">
            <Link href="/planner">Planner</Link>
          </li>
          <li className="menu_item">
            <Link href="/planner">How It Works</Link>
          </li>
          <li className="menu_item">
            <Link href="/planner">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default CommonHeader;
