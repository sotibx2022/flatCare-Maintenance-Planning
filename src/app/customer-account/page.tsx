"use client"
import React, { useState } from 'react';
import PersonalDetails from './signup/personalDetails/PersonalDetails';
import SoftwareAccessDetails from './signup/softwareaccessDetails/SoftwareAccessDetails';
import LocationDetails from './signup/locationDetails/LocationDetails';
import { CustomerData } from './types';

let steps =[
  { step: 1, title: 'Customer Details' },
  { step: 2, title: 'Software Access Details' },
  { step: 3, title: 'Location Details' }
]

const Page: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Renamed 'next' to 'currentStep' for clarity
  const [customerDatas, setCustomerDatas] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    userName: '',
    imageUrl: '',
    email: '',
    password: '',
    confirmPassword: '',
    buildingNumber: '',
    floorNumber: '',
    roomNumber: '',
    phoneNumber: ''
  });

  const handlePersonalDetailsSubmit = (firstName: string, lastName: string, phoneNumber: string, imageUrl: string, nextStep: number) => {
    setCustomerDatas(prevData => ({
      ...prevData,
      firstName,
      lastName,
      phoneNumber,
      imageUrl
    }));
    setCurrentStep(nextStep);
  };

  const handleSoftwareAccessSubmit = (email: string, password: string, confirmPassword: string, nextStep: number) => {
    setCustomerDatas(prevData => ({
      ...prevData,
      email,
      password,
      confirmPassword
    }));
    setCurrentStep(nextStep);
  };

  const handleLocationDetailsSubmit = (buildingNumber: string, floorNumber: string, roomNumber: string, nextStep: number) => {

    setCustomerDatas(prevData => ({
      ...prevData,
      buildingNumber,
      floorNumber,
      roomNumber
    }));
    setCurrentStep(nextStep);
  };

  return (
    <div>
      <div>
        <div>
         {steps.map(item => (
            <h1 key={item.step} className={currentStep === item.step ? "active_step" : ""}>
              {item.title}
            </h1>
          ))}
        </div>
      </div>
      {currentStep === 1 && <PersonalDetails personalDetailsValue={handlePersonalDetailsSubmit} customerDatas={customerDatas} />}
      {currentStep === 2 && <SoftwareAccessDetails softwareAccessValue={handleSoftwareAccessSubmit} customerDatas={customerDatas} />}
      {currentStep === 3 && <LocationDetails locationDetailsValues={handleLocationDetailsSubmit} customerDatas={customerDatas} />}
    </div>
  );
};

export default Page;
