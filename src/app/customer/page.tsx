import React from 'react'
import Call2Action from '../landingpage/homeNavigation/Call2Action'
import "../../app/landingpage/homeNavigation/landingPage.css";
import CommonHeader from '../ui/header/commonHeader/CommonHeader';
import CommonFooter from '../ui/footer/commonFooter/CommonFooter';
const page = () => {
    return (
        <>
            <CommonHeader />
            <div style={{ height: '50vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Call2Action type="Start Now" link="/customer/login" />
            </div>
            <CommonFooter />
        </>
    )
}
export default page