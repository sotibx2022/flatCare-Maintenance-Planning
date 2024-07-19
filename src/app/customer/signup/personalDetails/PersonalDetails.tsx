"use client";
import React, { useState, useEffect } from 'react';
import { CustomerData } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SubmitError from '../../../ui/SubmitError';
interface PersonalDetailsProps {
  personalDetailsValue: (currentFullName: string, currentPhoneNumber: string, next: number) => void;
  customerDatas: CustomerData;
}
const PersonalDetails: React.FC<PersonalDetailsProps> = ({ personalDetailsValue, customerDatas }) => {
  const { fullName, phoneNumber, imageUrl } = customerDatas;
  // Initialize state with empty strings or numbers
  const [currentFullName, setCurrentFirstName] = useState<string>(fullName || "");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>(phoneNumber || "");
  const [errors, setErrors] = useState<{ fullName?: string; phoneNumber?: string; imageUrl?: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [focus, setFocus] = useState<{ fullName?: boolean; phoneNumber?: boolean; imageUrl?: boolean }>({
    fullName: false,
    phoneNumber: false,
    imageUrl: false
  });
  useEffect(() => {
    validateForm();
  }, [currentFullName, currentPhoneNumber]);
  const validateForm = () => {
    let newErrors: { fullName?: string; phoneNumber?: string; imageUrl?: string } = {};
    if (!currentFullName) {
      newErrors.fullName = "Full Name is required";
    }
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!currentPhoneNumber || !phoneNumberRegex.test(currentPhoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be a valid 10-digit number";
    }
    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0);
  };
  const handleNext = () => {
    let next: number = 2; // Next step value for SoftwareAccessDetails
    personalDetailsValue(currentFullName, currentPhoneNumber, next);
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFocus({ ...focus, [name]: true })
  }
  return (
    <div className='container'>
      <div className='stepInputs_Wrapper'>
        <div className="form_Item">
          <label>Full Name</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={currentFullName}
              onChange={(e) => setCurrentFirstName(e.target.value)}
              onBlur={(e) => blurHandler(e)}
              style={{ paddingLeft: '30px' }} // Adjusted paddingLeft for input
            />
            <FontAwesomeIcon
              icon={faUser}
              className='input_icon_left'
            />
          </div>
          {errors.fullName && focus.fullName && <SubmitError message={errors.fullName} />}
        </div>
        <div className="form_Item">
          <label>Phone Number</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={currentPhoneNumber}
              onChange={(e) => setCurrentPhoneNumber(e.target.value)}
              onBlur={(e) => blurHandler(e)}
              style={{ paddingLeft: '30px' }} // Adjusted paddingLeft for input
            />
            <FontAwesomeIcon
              icon={faPhone}
              className='input_icon_left'
            />
          </div>
          {errors.phoneNumber && focus.phoneNumber && <SubmitError message={errors.phoneNumber} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleNext} disabled={isButtonDisabled}><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
        <h1 className='primary_heading' style={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>Step <span className='step_number'>1</span> of <span>4</span></h1>
      </div>
    </div>
  )
};
export default PersonalDetails;