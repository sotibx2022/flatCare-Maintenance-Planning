import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import logo from "../../../../../public/assets/images/logo.png"

const CommonHeader = () => {
  return (
    <header className='Header_wrapper'>
      <div className='container flex_items'>
        <div className="logo_area">

          <Image src={logo} alt="Company Logo" width={100} height={50} className='logo' />
        </div>

        <nav className="navigation_area">
          <ul>
            <li className='menu_item'><Link href="/">Home</Link></li>
            <li className='menu_item'><Link href="/technician">Technician Account</Link></li>
            <li className='menu_item'><Link href="/customer/login">Customer Account</Link></li>
            <li className='menu_item'><Link href="/planner">Planner Account</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default CommonHeader
