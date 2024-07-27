import React from 'react';
import "./../../globals.css";
import "./landingPage.css";
import About from './About';
import Services from './Services';
import CommonFooter from '../../ui/footer/commonFooter/CommonFooter';
import UserModel from './UserModel';
const LandingPage = () => {
  return (
    <div>
      <div className="container">
        <About />
        <Services />
        <UserModel />
      </div>
      <CommonFooter />
    </div>
  );
};
export default LandingPage;
