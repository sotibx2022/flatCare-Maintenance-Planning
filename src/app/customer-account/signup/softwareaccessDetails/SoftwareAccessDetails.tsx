"use client";
import React, { useState } from 'react';
import { CustomerData } from '../../types';
interface SoftwareAccessProps {
  softwareAccessValue: (email: string, password: string, confirmPassword: string, next: number) => void;
  customerDatas:CustomerData
}

const SoftwareAccess: React.FC<SoftwareAccessProps> = ({ softwareAccessValue,customerDatas }) => {
    const {email,password,confirmPassword} = customerDatas;
  const [currentEmail, setCurrentEmail] = useState(email||"");
  const [currentPassword, setcurrentPassword] = useState(password||"");
  const [currentConfirmPassword, setConfirmCurrentPassword] = useState(confirmPassword||"");

  const handleNext = () => {
    let next: number = 3;
    softwareAccessValue(currentEmail, currentPassword, currentConfirmPassword, next);
  };
const handlePrev=() =>{
    let next:number = 1
    softwareAccessValue(currentEmail, currentPassword, currentConfirmPassword, next);
}
  return (
    <div>
      <input 
        type="email" 
        placeholder="Email" 
        value={currentEmail} 
        onChange={(e) => setCurrentEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={currentPassword} 
        onChange={(e) => setcurrentPassword(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Confirm Password" 
        value={currentConfirmPassword} 
        onChange={(e) => setConfirmCurrentPassword(e.target.value)}
      />
      
      <button onClick={handlePrev}> Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SoftwareAccess;
