"use client";
import React, { useState } from 'react';
import { CustomerData } from '../../types';

interface PersonalDetailsProps {
  personalDetailsValue: (currentFullName: string,  currentImageUrl: string, currentPhoneNumber: string, next: number) => void;
  customerDatas: CustomerData;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ personalDetailsValue, customerDatas }) => {
  const { fullName, phoneNumber, imageUrl } = customerDatas;

  // Initialize state with empty strings or numbers
  const [currentFullName, setCurrentFirstName] = useState<string>(fullName || "");
 
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>(phoneNumber || ""); // Initialize with empty string
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl || "");

  const handleNext = () => {
    let next: number = 2; // Next step value for SoftwareAccessDetails
    personalDetailsValue(currentFullName,  currentImageUrl, currentPhoneNumber, next); // phoneNumber is now treated as string
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Full Name"
        value={currentFullName}
        onChange={(e) => setCurrentFirstName(e.target.value)}
      />
     
      <input
        type="text" // Change input type to text
        placeholder="Phone Number"
        value={currentPhoneNumber}
        onChange={(e) => setCurrentPhoneNumber(e.target.value)}
      />
      <input
        type='text'
        placeholder='Image Url'
        value={currentImageUrl}
        onChange={(e) => setCurrentImageUrl(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default PersonalDetails;
