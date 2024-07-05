"use client";
import React, { useState, useEffect } from 'react';
import { CustomerData } from '../../types';

interface SoftwareAccessProps {
  softwareAccessValue: (email: string, password: string, confirmPassword: string, next: number) => void;
  customerDatas: CustomerData;
}

const SoftwareAccess: React.FC<SoftwareAccessProps> = ({ softwareAccessValue, customerDatas }) => {
  const { email, password, confirmPassword } = customerDatas;
  
  const [currentEmail, setCurrentEmail] = useState(email || "");
  const [currentPassword, setCurrentPassword] = useState(password || "");
  const [currentConfirmPassword, setConfirmCurrentPassword] = useState(confirmPassword || "");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [focus, setFocus] = useState<{ email?: boolean; password?: boolean; confirmPassword?: boolean }>({
    email: false,
    password: false,
    confirmPassword: false
  });

  useEffect(() => {
    validateForm();
  }, [currentEmail, currentPassword, currentConfirmPassword]);

  const validateForm = () => {
    let newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!currentEmail || !emailRegex.test(currentEmail)) {
      newErrors.email = "Invalid email address";
    }

    if (!currentPassword) {
      newErrors.password = "Password is required";
    }

    if (currentPassword !== currentConfirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0);
  };

  const handleNext = () => {
    let next: number = 3;
    softwareAccessValue(currentEmail, currentPassword, currentConfirmPassword, next);
  };

  const handlePrev = () => {
    let next: number = 1;
    softwareAccessValue(currentEmail, currentPassword, currentConfirmPassword, next);
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFocus({ ...focus, [name]: true });
  };

  return (
    <div className='container'>
    <div className='stepInputs_Wrapper'>
      <div className="form_item">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          onBlur={(e) => blurHandler(e)}
        />
        {errors.email && focus.email && <span className='error_message'>{errors.email}</span>}
      </div>

      <div className="form_item">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          onBlur={(e) => blurHandler(e)}
        />
        {errors.password && focus.password && <span className='error_message'>{errors.password}</span>}
      </div>

      <div className="form_item">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={currentConfirmPassword}
          onChange={(e) => setConfirmCurrentPassword(e.target.value)}
          onBlur={(e) => blurHandler(e)}
        />
        {errors.confirmPassword && focus.confirmPassword && <span className='error_message'>{errors.confirmPassword}</span>}
      </div>

      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext} disabled={isButtonDisabled}>Next</button>
    </div>
    </div>
  );
};

export default SoftwareAccess;
