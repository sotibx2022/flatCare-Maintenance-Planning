'use client';
import React, { useState } from 'react';
import CheckEmail from '../../ui/checkEmail/CheckEmail';
import UpdatePassword from '../../ui/updatePassword/UpdatePassword';
import SubmitSuccess from '../../ui/submitSuccess';
import SubmitError from '../../ui/SubmitError';
import "../../globals.css";
import Link from 'next/link';
const page = () => {
  const [successValue, setSuccessValue] = useState(false);
  const [email, setEmail] = useState('');
  const handleReceiveValue = (data: { success: boolean; email: string }) => {
    setSuccessValue(data.success);
    setEmail(data.email);
  };
  return (
    <section
      className="container"
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="form_container">
        {successValue && (
          <SubmitSuccess message="Email Check Passed ! Please Enter New Password" />
        )}
        {successValue ? (
          <UpdatePassword email={email} />
        ) : (
          <CheckEmail successValue={handleReceiveValue} />
        )}
        {!successValue && (
          <SubmitError message="Please Enter Your Email First" />
        )}
        <div style={{ marginTop: '20px' }}>
          <p className="secondary_heading">
            Account not created?{' '}
            <Link href="/customer/signup" style={{ color: '#007bff' }}>
              Register
            </Link>
          </p>
          <p className="secondary_heading">
            Account Already Created?{' '}
            <Link href="/customer/login" style={{ color: '#007bff' }}>
              Login
            </Link>
          </p>
          <p className="secondary_heading">
            Not Verified Yet?{' '}
            <Link
              href="/customer/resendValidation"
              style={{ color: '#007bff' }}
            >
              Verify
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default page;
