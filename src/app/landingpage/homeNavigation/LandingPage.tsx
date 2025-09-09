import React from 'react';
import "./../../globals.css";
import CommonFooter from '../../ui/footer/commonFooter/CommonFooter';
import UserModel from './UserModel';
import Features from '../Features';
import CommonHeader from '../../ui/header/commonHeader/CommonHeader';
import { Hero } from './Hero';
import { SoftwareFeatures } from '../softwareFeatures/SoftwareFeatures';
const LandingPage = () => {
  return (
    <>
      <div className="container">
        <CommonHeader />
        <Hero />
        <SoftwareFeatures />
        <UserModel />
        <Features />
      </div>
      <CommonFooter />
    </>
  );
};
export default LandingPage;
