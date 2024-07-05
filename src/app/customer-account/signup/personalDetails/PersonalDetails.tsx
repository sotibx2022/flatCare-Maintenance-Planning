"use client";
import React, { useState } from 'react';

interface CustomerData {
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl: string;
  email: string;
  password: string;
  confirmPassword: string;
  buildingNumber: string;
  floorNumber: string;
  roomNumber: string;
  phoneNumber: number;
}

interface PersonalDetailsProps {
  personalDetailsValue: (currentFirstName: string, currentLastName: string, currentImageUrl: string, currentPhoneNumber: number, next: number) => void;
  customerDatas: CustomerData;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ personalDetailsValue, customerDatas }) => {
  const { firstName, lastName, phoneNumber, imageUrl } = customerDatas;

  // Initialize state with empty strings or numbers
  const [currentFirstName, setCurrentFirstName] = useState<string>(firstName || "");
  const [currentLastName, setCurrentLastName] = useState<string>(lastName || "");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<number | "">(phoneNumber || "");
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl || "");

  const handleNext = () => {
    let next: number = 2; // Next step value for SoftwareAccessDetails
    personalDetailsValue(currentFirstName, currentLastName, currentImageUrl, Number(currentPhoneNumber), next); // Ensure phoneNumber is converted to number
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={currentFirstName}
        onChange={(e) => setCurrentFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={currentLastName}
        onChange={(e) => setCurrentLastName(e.target.value)}
      />
      <input
        type="number"
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
