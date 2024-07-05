"use client"
import React from 'react'
import { CustomerData } from '../../types'
interface CustomerDataProps {
    customerDatas: CustomerData,
    previewDetailsValue: (nextValue:number)=>void;
  }
  
const PreviewandSubmit:React.FC<CustomerDataProps> = ({customerDatas,previewDetailsValue})=>{
    const {
        fullName,
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
    <div className='container'>
  <div className='stepInputs_Wrapper'>
    <h2>Preview and Submit</h2>
    

        <p><strong>Full Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Address:</strong> {buildingNumber}, {floorNumber}, {roomNumber}</p>
        <p><strong>Profile Image:</strong></p>
        <img src={imageUrl} alt="Profile" style={{ maxWidth: '200px', maxHeight: '200px' }} />
      
  <button onClick={handlePrev}>Prev</button>
  <button>Submit</button>
    </div>
    </div>
  )
}

export default PreviewandSubmit