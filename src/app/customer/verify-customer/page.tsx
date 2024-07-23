'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
const containerStyle: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};
const loadingStyle: React.CSSProperties = {
  color: '#007bff',
  textAlign: 'center',
};
const successStyle: React.CSSProperties = {
  backgroundColor: '#d4edda',
  border: '1px solid #c3e6cb',
  borderRadius: '5px',
  padding: '10px',
  marginTop: '10px',
};
const successTextStyle: React.CSSProperties = {
  color: '#155724',
};
const errorStyle: React.CSSProperties = {
  backgroundColor: '#f8d7da',
  border: '1px solid #f5c6cb',
  borderRadius: '5px',
  padding: '10px',
  marginTop: '10px',
};
const errorTextStyle: React.CSSProperties = {
  color: '#721c24',
};
const Page = () => {
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState('');
  const searchParams = useSearchParams();
  const verifyToken = searchParams.get('verifyToken');
  const userId = searchParams.get('userId');
  const router = useRouter();
  const initialized = React.useRef(false);
  useEffect(() => {
    if (!initialized.current && verifyToken && userId) {
      verifyTokenAsync();
    }
    initialized.current = true;
  }, [userId, verifyToken]);
  const verifyTokenAsync = async () => {
    const dataToSend = { verifyToken: verifyToken, userId: userId };
    try {
      const response = await axios.post(
        '/api/customer/verify-email',
        dataToSend,
      );
      const result = response.data;
      if (result.success) {
        setSuccess(result.message);
        router.push('/customer/login');
      } else {
        setFailure(result.message);
      }
    } catch (error) {
      setFailure(
        'An error occurred while verifying the email. Please refresh the Page.',
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={containerStyle}>
      {loading && <h1 style={loadingStyle}>Loading...</h1>}
      {!loading && success && (
        <div style={successStyle}>
          <h2 style={successTextStyle}>Success</h2>
          <p>{success}</p>
        </div>
      )}
      {!loading && failure && (
        <div style={errorStyle}>
          <h2 style={errorTextStyle}>Error</h2>
          <p>{failure}</p>
        </div>
      )}
    </div>
  );
};
export default Page;
