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
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePrev = () => {

    previewDetailsValue(3)
  }
  async function submitHanler(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    try {
      setLoading(true);
      const { confirmPassword, ...dataToSend } = customerDatas;
      const response = await axios.post("/api/customer/signup", dataToSend);
      const result = response.data;
      if (result) {
        setLoading(false)
        alert(result.message)
      }

      if (result.success) {
        router.push("/customer/dashboard/main")
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


        <div className="form_Item">
          <label>Full Name</label>
          <input type="text" value={fullName} readOnly />
        </div>

        <div className="form_Item">
          <label>Email</label>
          <input type="text" value={email} readOnly />
        </div>

        <div className="form_Item">
          <label>Phone Number</label>
          <input type="text" value={phoneNumber} readOnly />
        </div>

        <div className="form_Item">
          <label>Address</label>
          <input type="text" value={`${buildingNumber}, ${floorNumber}, ${roomNumber}`} readOnly />
        </div>

        <div className="form_Item">
          <label>Profile Image</label>
          {/* Assuming there's an <img> tag or some other way to display the profile image */}
          <img src={profileImageUrl} alt="Profile" />
        </div>

        <img src={imageUrl} alt="Profile" style={{ maxWidth: '200px', maxHeight: '200px' }} />

        <button onClick={handlePrev}>Prev</button>
        {loading ? <button>Loading</button> : <button onClick={submitHanler} type='submit'>Submit</button>}

      </div>
    </div>
  )
}

export default PreviewandSubmit