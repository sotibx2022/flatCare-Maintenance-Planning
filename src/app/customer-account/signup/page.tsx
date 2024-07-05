"use client"
import React, { useState } from 'react';


import { CustomerData } from '../types';

import PersonalDetails from './personalDetails/PersonalDetails';

import LocationDetails from './locationDetails/LocationDetails';
import PreviewandSubmit from './previewandsubmit/PreviewandSubmit';
import SoftwareAccessDetails from './softwareaccessDetails/SoftwareAccessDetails';


let steps = [
  { step: 1, title: 'Customer Details' },
  { step: 2, title: 'Software Access Details' },
  { step: 3, title: 'Location Details' },
  { step: 4, title: 'Preview and Submit' }
];

const Page: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerDatas, setCustomerDatas] = useState<CustomerData>({
    fullName:'',
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

  const handlePersonalDetailsSubmit = (fullName:string, phoneNumber: string, imageUrl: string, nextStep: number) => {
    
    setCustomerDatas(prevData => ({
      ...prevData,
      fullName,
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

  const handlePreviewDetails = (nextValue: number) => {
    setCurrentStep(nextValue);
  };

  return (
    <div className='container'>
      <div className='steps'>
        {steps.map(item => (
          <h1 key={item.step} className={currentStep === item.step ? "active_step" : "normal_step"}>
            {item.title}
          </h1>
        ))}
      </div>
      {currentStep === 1 && <PersonalDetails personalDetailsValue={handlePersonalDetailsSubmit} customerDatas={customerDatas} />}
      {currentStep === 2 && <SoftwareAccessDetails softwareAccessValue={handleSoftwareAccessSubmit} customerDatas={customerDatas} />}
      {currentStep === 3 && <LocationDetails locationDetailsValues={handleLocationDetailsSubmit} customerDatas={customerDatas} />}
      {currentStep === 4 && <PreviewandSubmit previewDetailsValue={handlePreviewDetails} customerDatas={customerDatas} />}
    </div>
  );
};

export default Page;
