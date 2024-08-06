"use client"
import Lottie from 'lottie-react';
import React from 'react';
import loadingPage from "@/../../public/assets/animations/loadingPage.json"
const loading = () => {
  return (
    <div className="loadingContainer">
      <Lottie
        animationData={loadingPage}
        loop={true}
        autoplay={true}
        className='lottieAnimation' />
    </div>
  );
};
export default loading;
