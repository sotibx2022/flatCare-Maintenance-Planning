"use client"
import React, { useState } from 'react'
import { CustomerData } from '../../types'
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface CustomerDataProps {
  customerDatas: CustomerData,
  previewDetailsValue: (nextValue: number) => void;
}

const PreviewandSubmit: React.FC<CustomerDataProps> = ({ customerDatas, previewDetailsValue }) => {
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
  const[loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePrev = () => {

    previewDetailsValue(3)
  }
  async function submitHanler(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    try {
      setLoading(true);
      const {confirmPassword, ...dataToSend} = customerDatas;
      const response = await axios.post("/api/customeraccount/signup", dataToSend);
    const result = response.data;
    if(result){
      setLoading(false)
      alert(result.message)
    }
    
    if (result.success) {
      router.push("/customer-account")
    }
  }
    catch (error) {
      setLoading(false)
    }
    
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
        {loading ? <button>Loading</button>:<button onClick={submitHanler} type='submit'>Submit</button>}
        
      </div>
    </div>
  )
}

export default PreviewandSubmit