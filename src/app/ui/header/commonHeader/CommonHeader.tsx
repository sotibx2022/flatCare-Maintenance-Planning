import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import logo from "../../../../../public/assets/images/logo.png"
import "../commonHeader/commonHeader.css";
const CommonHeader = () => {
  return (
    <div className='container'>
      <header className="common_header">
        <div className="logo">
          <Image src={logo} alt="Company Logo" width={100} height={50} />
        </div>
        <nav className="account_navigation">
          <ul>
            <li><Link href="/technician-account">Technician Account</Link></li>
            <li><Link href="/customer-account">Customer Account</Link></li>
            <li><Link href="/planner-account">Planner Account</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default CommonHeader
