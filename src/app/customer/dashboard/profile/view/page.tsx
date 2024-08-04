'use client';
import React from 'react';
import Image from 'next/image';
import useCustomerData from '../../../../hooks/useCustomerData';
import Link from 'next/link';
import ProfileImage from '../../../../ui/ProfileImage';
import '../../dashboardBlock/dashboardBlock.css';
const Page = () => {
  const [customerDataLoading, customerDatas, setCustomerDatas] = useCustomerData();
  return (
    <section>
      <h1 className="primary_heading">Customer View Profile</h1>
      <div className="profileViewWrapper">
        <ProfileImage imageUrl={customerDatas.imageUrl} readOnly={true} />
        <div className="viewProfileTable">
          <table>
            <tbody>
              <tr>
                <th>Full Name:</th>
                <td>{customerDataLoading ? "Loading..." : customerDatas.fullName}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{customerDataLoading ? "Loading..." : customerDatas.email}</td>
              </tr>
              <tr>
                <th>Building Number:</th>
                <td>{customerDataLoading ? "Loading..." : customerDatas.buildingNumber}</td>
              </tr>
              <tr>
                <th>Floor Number:</th>
                <td>{customerDataLoading ? "Loading..." : customerDatas.floorNumber}</td>
              </tr>
              <tr>
                <th>Room Number:</th>
                <td>{customerDataLoading ? "Loading..." : customerDatas.roomNumber}</td>
              </tr>
              <tr>
                <th>Phone Number:</th>
                <td>{customerDataLoading ? "Loading..." : customerDatas.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
          <Link href="/customer/dashboard/profile/edit" className="button">
            Edit
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Page;
