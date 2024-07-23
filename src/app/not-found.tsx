'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import '../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
const NotFound = () => {
  const router = useRouter();
  return (
    <div className="notFoundConatiner">
      <div className="notFoundError">
        <h1>
          404{' '}
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="icon notFoundIcon"
          />
        </h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <button className="homeButton" onClick={() => router.push('/')}>
          Go to Home
        </button>
      </div>
    </div>
  );
};
export default NotFound;
