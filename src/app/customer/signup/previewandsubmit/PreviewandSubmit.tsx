'use client';
import React, { useEffect, useState } from 'react';
import { CustomerData } from '../../types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import SubmitSuccess from '../../../ui/submitSuccess';
import SubmitError from '../../../ui/SubmitError';
import ProfileImage from '../../../ui/ProfileImage';
import { onChange } from 'react-toastify/dist/core/store';
import LoadingButton from '../../../landingpage/homeNavigation/LoadingButton';
interface CustomerDataProps {
  customerDatas: CustomerData;
  previewDetailsValue: (nextValue: number) => void;
}
const PreviewandSubmit: React.FC<CustomerDataProps> = ({
  customerDatas,
  previewDetailsValue,
}) => {
  const {
    fullName,
    email,
    password,
    buildingNumber,
    floorNumber,
    roomNumber,
    phoneNumber,
  } = customerDatas;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploadError, setUplaodError] = useState<string>('');
  const handlePrev = () => {
    previewDetailsValue(3);
  };
  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSubmitted(true)
    if (file === null) {
      setUplaodError('Please Upload Profile Image First');
    } else {
      try {
        setLoading(true);
        const formData = new FormData();
        if (file) {
          formData.append('file', file);
        }
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('buildingNumber', buildingNumber);
        formData.append('roomNumber', roomNumber);
        formData.append('floorNumber', floorNumber);
        formData.append('phoneNumber', phoneNumber);
        const response = await axios.post('/api/customer/signup', formData, {
          headers: { 'content-type': 'multipart/form-data' },
        });
        const result = response.data;
        if (result.success) {
          router.push(
            `/customer/registrationSuccess?name=${fullName}&email=${email}`,
          );
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        setLoading(false);
      } catch (error) {
        toast.error('Error Submitting Form');
      }
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    }
  };
  return (
    <div className="container">
      <div className="stepInputs_Wrapper">
        {submitted && uploadError && <SubmitError message={uploadError} />}
        {submitted && success && !loading && (
          <SubmitSuccess message="User Registered ! Please Wait for Redirection" />
        )}
        <ProfileImage
          onChange={onChange}
          title="Upload Profile Picture"
          imageUrl={imageUrl}
        />
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
          <input
            type="text"
            value={`Building Number : ${buildingNumber}, Floor Number : ${floorNumber}, Room Number:${roomNumber}`}
            readOnly
          />
        </div>
        <div
          className="buttonsWrapper"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <button onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={submitHandler} disabled={submitted && loading}>
            {loading ? <LoadingButton /> : 'Submit'}
          </button>
        </div>
        <h1
          className="primary_heading"
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Step <span className="step_number">4</span> of <span>4</span>
        </h1>
      </div>
    </div>
  );
};
export default PreviewandSubmit;
