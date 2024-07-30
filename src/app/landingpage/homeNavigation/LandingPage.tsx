import React from 'react';
import "./../../globals.css";
import "../homeNavigation/landingPage.css";
import About from './About';
import Services from './Services';
import CommonFooter from '../../ui/footer/commonFooter/CommonFooter';
import UserModel from './UserModel';
import Features from '../Features';
import Pricing from './Pricing';
import CommonHeader from '../../ui/header/commonHeader/CommonHeader';
const LandingPage = () => {
  return (
    <>
      <div className="container">
        <CommonHeader />
        <About />
        <Services />
        <UserModel />
        <Features />
        <Pricing />
      </div>
      <CommonFooter />
    </>
  );
};
export default LandingPage;
