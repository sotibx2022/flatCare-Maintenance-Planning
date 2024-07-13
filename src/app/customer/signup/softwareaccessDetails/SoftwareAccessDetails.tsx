"use client";
import React, { useState, useEffect } from 'react';
import { CustomerData } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SubmitError from '../../../ui/SubmitError';

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
  const [showPassword, setShowPassword] = useState(true);
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
    } else if (currentPassword.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(currentPassword)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(currentPassword)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/\d/.test(currentPassword)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(currentPassword)) {
      newErrors.password = "Password must contain at least one special character";
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
        <div className="form_Item">
          <label>Email</label>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon icon={faEnvelope} style={{
              position: 'absolute',
              color: '#29030d', top: '50%', left: '10px', transform: 'translateY(-50%)'
            }} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              onBlur={(e) => blurHandler(e)}
              style={{ paddingLeft: '30px' }}
            />
          </div>
          {errors.email && focus.email && <SubmitError message={errors.email} />}
        </div>

        <div className="form_Item">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon icon={faLock} style={{
              position: 'absolute',
              color: '#29030d', top: '50%', left: '10px', transform: 'translateY(-50%)'
            }} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onBlur={(e) => blurHandler(e)}
              style={{ paddingLeft: '30px' }}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              style={{
                position: 'absolute',
                color: '#29030d', top: '50%', right: '10px', transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {errors.password && focus.password && <SubmitError message={errors.password} />}
        </div>

        <div className="form_Item">
          <label>Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon icon={faLock} style={{
              position: 'absolute',
              color: '#29030d', top: '50%', left: '10px', transform: 'translateY(-50%)'
            }} />
            <input
              type={showPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm Password'
              value={currentConfirmPassword}
              onChange={(e) => setConfirmCurrentPassword(e.target.value)}
              onBlur={(e) => blurHandler(e)}
              style={{ paddingLeft: '30px' }}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              style={{
                position: 'absolute',
                color: '#29030d', top: '50%', right: '10px', transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}

            />
          </div>
          {errors.confirmPassword && focus.confirmPassword && <SubmitError message={errors.confirmPassword} />}
        </div>

        <div className='buttonsWrapper' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handlePrev}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <button onClick={handleNext} disabled={isButtonDisabled}><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
      </div>
    </div>
  );

};

export default SoftwareAccess;
