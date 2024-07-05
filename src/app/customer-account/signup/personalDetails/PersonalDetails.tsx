"use client";
import React, { useState, useEffect } from 'react';
import { CustomerData } from '../../types';
import dummyprofile from "@/../../public/assets/images/dummyprofile.png"
interface PersonalDetailsProps {
  personalDetailsValue: (currentFullName: string,  currentPhoneNumber: string,currentImageUrl: string, next: number) => void;
  customerDatas: CustomerData;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ personalDetailsValue, customerDatas }) => {
  const { fullName, phoneNumber, imageUrl } = customerDatas;

  // Initialize state with empty strings or numbers
  const [currentFullName, setCurrentFirstName] = useState<string>(fullName || "");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>(phoneNumber || "");
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl || "");
  const [errors, setErrors] = useState<{ fullName?: string; phoneNumber?: string; imageUrl?: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const[focus,setFocus] = useState<{fullName?:boolean;phoneNumber?:boolean;imageUrl?:boolean}>({
    fullName:false,
    phoneNumber:false,
    imageUrl:false
  });
  

  useEffect(() => {
    validateForm();
  }, [currentFullName, currentPhoneNumber, currentImageUrl]);

  const validateForm = () => {
    let newErrors: { fullName?: string; phoneNumber?: string; imageUrl?: string } = {};

    if (!currentFullName) {
      newErrors.fullName = "Full Name is required";
    }

    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!currentPhoneNumber || !phoneNumberRegex.test(currentPhoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be a valid 10-digit number";
    }

    if (!currentImageUrl) {
      newErrors.imageUrl = "Image URL is required";
    }

    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0);
  };

  const handleNext = () => {
    let next: number = 2; // Next step value for SoftwareAccessDetails
  
    personalDetailsValue(currentFullName, currentPhoneNumber, currentImageUrl, next);
    
  };
const blurHandler=(e:React.FocusEvent<HTMLInputElement>) =>{
const{name,value} = e.target;
setFocus({...focus,[name]:true})
}
  return (
    <div className='container'>
      <div className='stepInputs_Wrapper'>
      <div className="form_item">
  <label>Full Name</label>
  <input
    type="text"
    name="fullName"
    placeholder="Full Name"
    value={currentFullName}
    onChange={(e) => setCurrentFirstName(e.target.value)}
    onBlur={(e) => blurHandler(e)}
  />
  {errors.fullName && focus.fullName && <span className='error_message'>{errors.fullName}</span>}
</div>

<div className="form_item">
  <label>Phone Number</label>
  <input
    type="text"
    name="phoneNumber"
    placeholder="Phone Number"
    value={currentPhoneNumber}
    onChange={(e) => setCurrentPhoneNumber(e.target.value)}
    onBlur={(e) => blurHandler(e)}
  />
  {(errors.phoneNumber && focus.phoneNumber) && <span className='error_message'>{errors.phoneNumber}</span>}
</div>

<div className="form_item">
  <label>Image URL</label>
  <input
    type="text"
    name="imageUrl"
    placeholder="Image URL"
    value={currentImageUrl}
    onChange={(e) => setCurrentImageUrl(e.target.value)}
    onBlur={(e) => blurHandler(e)}
  />
  {errors.imageUrl && focus.imageUrl && <span className='errorMessage'>{errors.imageUrl}</span>}
</div>
<div className='image_preview'>
  <img src={currentImageUrl ? currentImageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1rNuFRQJ0m9EkNrwaJtyxCSEfY7Rz35rC_g&s"} />
</div>


      <button onClick={handleNext} disabled={isButtonDisabled}>Next</button>
    </div>
    </div> 
  );
};

export default PersonalDetails;
