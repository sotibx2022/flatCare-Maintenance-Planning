'use client';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SubmitError from '../SubmitError';
import SubmitSuccess from '../submitSuccess';
import axios from 'axios';
import { toast } from 'react-toastify';
interface checkEmailProps {
  successValue: (data: { success: boolean; email: string }) => void;
}
const CheckEmail: React.FC<checkEmailProps> = ({ successValue }) => {
  const [emailError, setEmailError] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Invalid email format. Please enter a valid email address.';
    }
    return '';
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalEmail(e.target.value);
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const error = validateEmail(originalEmail);
    setEmailError(error);
    setFocus(true);
  };
  const checkEmail = async () => {
    const error = validateEmail(originalEmail);
    setEmailError(error);
    setFocus(true);
    if (error === '') {
      try {
        setLoading(true);
        const response = await axios.post('/api/customer/checkemail', {
          originalEmail: originalEmail,
        });
        const result = response.data;
        if (result.success === true) {
          toast.success('Please Enter New Password');
          setSuccessMessage('Eamil Check Passed. Please Enter New Password');
          const data = {
            success: true,
            email: originalEmail,
          };
          successValue(data);
        } else {
          toast.error(result.message);
          setErrorMessage('Invalid Email! Please Register');
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error checking password:', error);
      }
    }
  };
  return (
    <div>
      <h1 className="primary_heading" style={{ marginBottom: '1rem' }}>
        Customer Change Password
      </h1>
      <label>Enter Original Email</label>
      <div
        className="form_Item"
        style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
      >
        <div style={{
          position: 'relative', width: '100%', marginTop: '0.1rem'
        }}>
          <FontAwesomeIcon icon={faLock} className="input_icon_left" />
          <input
            type="text"
            placeholder="Original Email"
            value={originalEmail}
            name="email"
            onChange={changeHandler}
            onBlur={blurHandler}
            style={{ paddingLeft: '30px', paddingRight: '30px' }}
          />
        </div>
        <button onClick={checkEmail}>{loading ? 'Validating' : 'Check'}</button>
      </div>
      {focus && emailError && <SubmitError message={emailError} />}
      {successMessage && <SubmitSuccess message={successMessage} />}
      {errorMessage && <SubmitError message={errorMessage} />}
    </div >
  );
};
export default CheckEmail;
