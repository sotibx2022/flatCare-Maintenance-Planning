"use client"
import React from 'react';

import Image from 'next/image';
import useCustomerData from '../../../../hooks/useCustomerData';
import Link from 'next/link';

const page = () => {
  const [customerDatas, setCustomerDatas] = useCustomerData();

  return (
    <section>
      <h1 className='heading_primary'>Customer View Profile</h1>
      <img src={customerDatas.imageUrl} alt='profile_Image' className='profile_Image'
        width={100} height={100}/>
      <form className='viewForm'>
        <div className="formItem">
          <label>Full Name:</label>
          <input type="text" value={customerDatas.fullName} readOnly />
        </div>
        <div className="formItem">
          <label>Email:</label>
          <input type="email" value={customerDatas.email} readOnly />
        </div>
        <div className="formItem">
          <label>Building Number:</label>
          <input type="text" value={customerDatas.buildingNumber} readOnly />
        </div>
        <div className="formItem">
          <label>Floor Number:</label>
          <input type="text" value={customerDatas.floorNumber} readOnly />
        </div>
        <div className="formItem">
          <label>Room Number:</label>
          <input type="text" value={customerDatas.roomNumber} readOnly />
        </div>
        <div className="formItem">
          <label>Phone Number:</label>
          <input type="text" value={customerDatas.phoneNumber} readOnly />
        </div>
        <div className="formItem">
          <label>Image URL:</label>
          <input type="text" value={customerDatas.imageUrl} readOnly />
        </div>
       
        <Link href="http://localhost:3000/customer/dashboard/profile/edit">Edit</Link>
      </form>
    </section>
  );
};

export default page;
