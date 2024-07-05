"use client"
import React from 'react'
import { CustomerData } from '../../types'
interface CustomerDataProps {
    customerDatas: CustomerData,
    previewDetailsValue: (nextValue:number)=>void;
  }
  
const PreviewandSubmit:React.FC<CustomerDataProps> = ({customerDatas,previewDetailsValue})=>{
    const {
        firstName,
        lastName,
        userName,
        imageUrl,
        email,
        password,
        confirmPassword,
        buildingNumber,
        floorNumber,
        roomNumber,
        phoneNumber
      } = customerDatas;

      
        const handlePrev=() =>{
            
            previewDetailsValue(3)
        }
  return (
    <div>
  
    <h2>Preview and Submit</h2>
    <div>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>User Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Address:</strong> {buildingNumber}, {floorNumber}, {roomNumber}</p>
        <p><strong>Profile Image:</strong></p>
        <img src={imageUrl} alt="Profile" style={{ maxWidth: '200px', maxHeight: '200px' }} />
      </div>
  <button onClick={handlePrev}>Prev</button>
  <button>Submit</button>
    </div>
  )
}

export default PreviewandSubmit