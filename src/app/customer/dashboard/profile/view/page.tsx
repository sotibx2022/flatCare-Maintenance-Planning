"use client"
import React from 'react';

import Image from 'next/image';
import useCustomerData from '../../../../hooks/useCustomerData';
import Link from 'next/link';

const page = () => {
  const [customerDatas, setCustomerDatas] = useCustomerData();

  return (
    <section>
      <h1 className='primary_heading'>Customer View Profile</h1>
      <div className='profile_image'>
        <img src={customerDatas.imageUrl} alt='profile_Image' className='profile_Image'
          width={100} height={100} />
      </div>
      <form className='viewForm'>
        <div className="form_Item">
          <label>Full Name:</label>
          <input type="text" value={customerDatas.fullName} readOnly />
        </div>
        <div className="form_Item">
          <label>Email:</label>
          <input type="email" value={customerDatas.email} readOnly />
        </div>
        <div className="form_Item">
          <label>Building Number:</label>
          <input type="text" value={customerDatas.buildingNumber} readOnly />
        </div>
        <div className="form_Item">
          <label>Floor Number:</label>
          <input type="text" value={customerDatas.floorNumber} readOnly />
        </div>
        <div className="form_Item">
          <label>Room Number:</label>
          <input type="text" value={customerDatas.roomNumber} readOnly />
        </div>
        <div className="form_Item">
          <label>Phone Number:</label>
          <input type="text" value={customerDatas.phoneNumber} readOnly />
        </div>
        <div className="form_Item">
          <label>Image URL:</label>
          <input type="text" value={customerDatas.imageUrl} readOnly />
        </div>

        <Link href="/customer/dashboard/profile/edit" className='button'>Edit</Link>
      </form>
    </section>
  );
};

export default page;
