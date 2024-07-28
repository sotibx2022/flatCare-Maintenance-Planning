import React from 'react';
import "./../../globals.css";
import "../homeNavigation/landingPage.css";
import About from './About';
import Services from './Services';
import CommonFooter from '../../ui/footer/commonFooter/CommonFooter';
import UserModel from './UserModel';
import Features from '../Features';
import Pricing from './Pricing';
const LandingPage = () => {
  return (
    <>
      <div className="container">
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
