"use client"
import React from 'react';

import Image from 'next/image';
import useCustomerData from '../../../../hooks/useCustomerData';
import Link from 'next/link';

const page = () => {
  const [customerDatas, setCustomerDatas] = useCustomerData();

  return (
    <section>
      <h1 className='primary_heading' style={{ marginBottom: '1rem' }}>Customer View Profile</h1>
      <div className='profileViewWrapper' style={{ display: 'flex', justifyContent: 'space-between', gap: "1rem", flexDirection: 'row-reverse' }}>
        <div className='profile_image'>
          <img src={customerDatas.imageUrl} alt='profile_Image' className='profile_Image' width={100} height={100} />
        </div>
        <div className='viewProfileTable' style={{ maxWidth: '600px' }}>
          <table>
            <tbody style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', width: 'auto', minWidth: '100px' }}>
              <tr style={{ borderLeft: '2px solid var(--primaryDark)', padding: '10px' }}>
                <th style={{ width: '200px', textAlign: 'left' }}>Full Name:</th>
                <td style={{ textAlign: 'left' }}>{customerDatas.fullName}</td>
              </tr>
              <tr style={{ borderLeft: '2px solid var(--primaryDark)', padding: '10px' }}>
                <th style={{ width: '200px', textAlign: 'left' }}>Email:</th>
                <td style={{ textAlign: 'left' }}>{customerDatas.email}</td>
              </tr>
              <tr style={{ borderLeft: '2px solid var(--primaryDark)', padding: '10px' }}>
                <th style={{ width: '200px', textAlign: 'left' }}>Building Number:</th>
                <td style={{ textAlign: 'left' }}>{customerDatas.buildingNumber}</td>
              </tr>
              <tr style={{ borderLeft: '2px solid var(--primaryDark)', padding: '10px' }}>
                <th style={{ width: '200px', textAlign: 'left' }}>Floor Number:</th>
                <td style={{ textAlign: 'left' }}>{customerDatas.floorNumber}</td>
              </tr>
              <tr style={{ borderLeft: '2px solid var(--primaryDark)', padding: '10px' }}>
                <th style={{ width: '200px', textAlign: 'left' }}>Room Number:</th>
                <td style={{ textAlign: 'left' }}>{customerDatas.roomNumber}</td>
              </tr>
              <tr style={{ borderLeft: '2px solid var(--primaryDark)', padding: '10px' }}>
                <th style={{ width: '200px', textAlign: 'left' }}>Phone Number:</th>
                <td style={{ textAlign: 'left' }}>{customerDatas.phoneNumber}</td>
              </tr>
              <tr style={{ borderLeft: '2px solid var(--primaryDark)', padding: '10px' }}>
                <th style={{ width: '200px', textAlign: 'left' }}>Image URL:</th>
                <td style={{ textAlign: 'left' }}>{customerDatas.imageUrl}</td>
              </tr>
            </tbody>


          </table>
          <Link href="/customer/dashboard/profile/edit" className='button' style={{ marginTop: '20px', important: 'true' }}>Edit</Link>

        </div>
      </div>
    </section>

  );
};

export default page;
