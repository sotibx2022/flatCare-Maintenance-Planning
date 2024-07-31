'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PasswordInput from '../passwordInput/PasswordInput';
import useCustomerData from '../../hooks/useCustomerData';
import SubmitError from '../SubmitError';
import SubmitSuccess from '../submitSuccess';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import LoadingButton from '../../landingpage/homeNavigation/LoadingButton';
interface checkPasswordProps {
  successValue: (value: boolean) => void;
}
const CheckPassword: React.FC<checkPasswordProps> = ({ successValue }) => {
  const [customerDatas, setCustomerDatas] = useCustomerData();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get('/api/customer/findCustomer');
        const result = response.data;
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };
    getUserDetails();
  }, []);
  const [originalPassword, setOriginalPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [focus, setFocus] = useState(false);
  const [updateField, setUpdateField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const error = validatePassword(originalPassword);
    setPasswordError(error);
    setFocus(true);
  };
  const checkPassword = async () => {
    const error = validatePassword(originalPassword);
    setPasswordError(error);
    setFocus(true);
    if (error === '') {
      try {
        setLoading(true);
        const dataToSend = { originalPassword, email: customerDatas.email };
        const response = await axios.post(
          '/api/customer/checkPassword',
          dataToSend,
        );
        const result = response.data;
        if (result.success === true) {
          toast.success('Please Enter New Password');
          setSuccessMessage('Password Check Passed. Please Enter New Password');
        } else {
          toast.error(result.message);
          setErrorMessage('Invalid Password! Please Try Again');
        }
        setLoading(false);
        successValue(result.success);
      } catch (error) {
        setLoading(false);
        console.error('Error checking password:', error);
      }
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalPassword(e.target.value);
    setFocus(false);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <h1 className="primary_heading" style={{ marginBottom: '1rem' }}>
        Customer Change Password
      </h1>
      <label>Enter Original Password</label>
      <div
        className="form_Item"
        style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <FontAwesomeIcon icon={faLock} className="input_icon_left" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Original Password"
            value={originalPassword}
            name="password"
            onChange={changeHandler}
            onBlur={blurHandler}
            style={{ paddingLeft: '30px' }}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="input_icon_right"
            onClick={toggleShowPassword}
          />
        </div>
        <button onClick={checkPassword}>
          {loading ? <LoadingButton /> : 'Check'}
        </button>
      </div>
      {focus && passwordError && <SubmitError message={passwordError} />}
      {successMessage && <SubmitSuccess message={successMessage} />}
      {errorMessage && <SubmitError message={errorMessage} />}
    </div>
  );
};
export default CheckPassword;
