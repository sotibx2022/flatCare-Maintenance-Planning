"use client"
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gsap from 'gsap'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const CommonHeader = () => {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const router = useRouter()
  const toggleResponsiveMenu = () => {
    setShowResponsiveMenu(!showResponsiveMenu);
  };
  useEffect(() => {
    gsap.to(".navigation_area", {
      x: showResponsiveMenu ? -300 : 0,
      opacity: 1,
      duration: 1,
    });
  }, [showResponsiveMenu]);
  return (
    <div>
      <div className="Header_wrapper container">
        <div className="logo_area">
          <img
            src="/assets/images/logo.png"
            alt="Company Logo"
            className="logo"
            onClick={() => router.push("/")}
          />
        </div>
        <FontAwesomeIcon icon={faBars} className="icon menuIcon" onClick={toggleResponsiveMenu} />
      </div>
      <div className="navigation_area">
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
            <Link href="/howitworks">How It Works</Link>
          </li>
          <li className="menu_item">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default CommonHeader