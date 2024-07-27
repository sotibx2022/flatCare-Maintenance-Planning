import React from 'react';
import "./../../globals.css";
import "../homeNavigation/landingPage.css";
import About from './About';
import Services from './Services';
import CommonFooter from '../../ui/footer/commonFooter/CommonFooter';
import UserModel from './UserModel';
import Features from '../Features';
const LandingPage = () => {
  return (
    <div>
      <div className="container">
        <About />
        <Services />
        <UserModel />
        <Features />
      </div>
      <CommonFooter />
    </div>
  );
};
export default LandingPage;
