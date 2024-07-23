import React from 'react';
import CommonHeader from './ui/header/commonHeader/CommonHeader';
import CommonFooter from './ui/footer/commonFooter/CommonFooter';
import HomeNavigation from './landingpage/homeNavigation/HomeNavigation';
import LandingPage from './landingpage/homeNavigation/LandingPage';
import UserModel from './landingpage/homeNavigation/UserModel';
import SoftwareFeatures from './landingpage/softwareFeatures/SoftwareFeatures';
const page = () => {
  return (
    <div>
      <div>
        <LandingPage />
      </div>
    </div>
  );
};
export default page;
