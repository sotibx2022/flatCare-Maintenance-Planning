"use client"
import React, { useState } from 'react';
import useCustomerData from '../../../../hooks/useCustomerData';
import axios from 'axios';
import Image from 'next/image';
import dummyProfile from "@/../../public/assets/images/dummyprofile.png"

const EditCustomerProfile = () => {
  const [customerDatas,setCustomerDatas] = useCustomerData();
  const[loading,setLoading] = useState(false)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDatas(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const response = await axios.put("/api/customer/updateProfile", customerDatas);
      const result = response.data.updatedCustomer;
  
      setCustomerDatas(prevCustomerDatas => ({
        ...prevCustomerDatas,
        fullName: result.fullName,
        email: result.email,
        imageUrl: result.imageUrl,
        buildingNumber: result.buildingNumber,
        floorNumber: result.floorNumber,
        roomNumber: result.roomNumber,
        phoneNumber: result.phoneNumber
      }));
  
      console.log("Customer details updated successfully.");
    } catch (error) {
      setLoading(false);
      console.error("Error updating customer details:", error);
      // Handle error state or display error message to user
    }
  };
  
  return (
    <section>
      <h1 className='heading_primary'>Customer Edit Profile</h1>
      <img
  src={customerDatas.imageUrl ?? dummyProfile}
  alt='profileImage'
  className='profile_Image'
/>
      <form className='editForm' onSubmit={handleSubmit}>
        <div className="formItem">
          <label>Full Name:</label>
          <input type="text" value={customerDatas.fullName} name='fullName' onChange={handleInputChange}/>
        </div>
        <div className="formItem">
          <label>Email:</label>
          <input type="email" value={customerDatas.email} name="email" onChange={handleInputChange}/>
        </div>
        <div className="formItem">
          <label>Building Number:</label>
          <input type="text" value={customerDatas.buildingNumber} name="buildingNumber" onChange={handleInputChange}/>
        </div>
        <div className="formItem">
          <label>Floor Number:</label>
          <input type="text" value={customerDatas.floorNumber} name="floorNumber" onChange={handleInputChange}/>
        </div>
        <div className="formItem">
          <label>Room Number:</label>
          <input type="text" value={customerDatas.roomNumber} name="roomNumber" onChange={handleInputChange}/>
        </div>
        <div className="formItem">
          <label>Phone Number:</label>
          <input type="text" value={customerDatas.phoneNumber} name="phoneNumber" onChange={handleInputChange}/>
        </div>
        <div className="formItem">
          <label>Image URL:</label>
          <input type="text" value={customerDatas.imageUrl} name="imageUrl" onChange={handleInputChange}/>
        </div>
        <button type="submit">{loading?"Loading...":"Submit"}</button>
      </form>
    </section>
  );
};

export default EditCustomerProfile;
