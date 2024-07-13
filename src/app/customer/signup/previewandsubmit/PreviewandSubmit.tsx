"use client"
import React, { useState } from 'react'
import { CustomerData } from '../../types'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dummyProfile from "@/../../public/assets/images/dummyprofile.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import SubmitSuccess from '../../../ui/submitSuccess';
import SubmitError from '../../../ui/SubmitError';
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
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handlePrev = () => {

    previewDetailsValue(3)
  }
  async function submitHanler(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    try {
      setSubmitted(true)
      setLoading(true);
      const { confirmPassword, ...dataToSend } = customerDatas;
      const response = await axios.post("/api/customer/signup", dataToSend);
      const result = response.data;
      if (result) {
        setLoading(false)

      }

      if (result.success) {
        setSuccess(true)
        toast.success(result.message)
        router.push("/customer/dashboard/main")
      } else {
        setSuccess(false);
        toast.error(result.message)
      }
    }
    catch (error) {
      setLoading(false)
    }

  }
  return (
    <div className='container'>

      <div className='stepInputs_Wrapper'>

        {submitted && success && !loading && <SubmitSuccess message="User Registered ! Please Wait for Redirection" />}
        {submitted && !success && !loading && <SubmitError message="Please Login ! Provided Email already Registered" />}

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
          <input type="text" value={`Building Number : ${buildingNumber}, Floor Number : ${floorNumber}, Room Number:${roomNumber}`} readOnly />
        </div>

        <div className="form_Item">
          <label>Profile Image</label>
          {/* Assuming there's an <img> tag or some other way to display the profile image */}
        </div>

        <img src={imageUrl} alt="Profile" style={{ maxWidth: '200px', maxHeight: '200px' }} />

        <div className='buttonsWrapper' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button onClick={handlePrev}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <button onClick={submitHanler} disabled={submitted && loading}>{loading ? "Loading" : "Submit"}</button>
        </div>

      </div>
    </div>
  )
}

export default PreviewandSubmit