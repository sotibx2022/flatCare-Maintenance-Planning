"use client"
import React, { useEffect, useState } from 'react';
import MaterialDetailsForm from './MaterialDetailsForm';
import ReceipentsDetailsForm from './ReceipentsDetailsForm';
import DeliveryDetailsForm from './DeliveryDetailsForm';
import PaymentDetailsForm from './PaymentDetailsForm';
import DeliveryMethodForm from './DeliveryMethodForm';
import { useSelector } from 'react-redux';
import PreviewSubmit from './PreviewSubmit';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StepsCounter from '../../../../ui/StepsCounter';
const Page = () => {
    const nextValue = useSelector((state: any) => state.form.nextValue)
    const [dividerWidth, setDividerWidth] = useState(0)
    const { materials, orderedBy, orderedFor, deliveryDetails, deliveryMethod, paymentDetails } = useSelector((state: any) => state.form)
    const allProps = {
        materials,
        orderedBy,
        orderedFor,
        deliveryDetails,
        deliveryMethod,
        paymentDetails
    }
    const calculateDividerWidth = () => {
        const orderSection = document.querySelector(".orderMaterialSection");
        if (orderSection) {
            const totalWidth = orderSection.getBoundingClientRect().width;
            const dividerWidth = totalWidth / 5
            setDividerWidth(dividerWidth)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', calculateDividerWidth);
        calculateDividerWidth();
        return () => {
            window.removeEventListener('resize', calculateDividerWidth);
        };
    }, []);
    return (
        <div className='w-[80vw] max-w-[500px]'>
            <h1 className='primary_heading'>
                <FontAwesomeIcon icon={faCaretRight} className='mx-1' />
                {nextValue === 1 && <span className=' px-1'>Add Material</span>}
                {nextValue === 2 && <span className='  px-1'>Add Recipient Details</span>}
                {nextValue === 3 && <span className='  px-1'>Add Delivery Details</span>}
                {nextValue === 4 && <span className='  px-1'>Add Delivery Method</span>}
                {nextValue === 5 && <span className='  px-1'>Add Payment Details</span>}
                {nextValue === 6 && <span className='  px-1'>Preview and Submit</span>}
            </h1>
            <div className='dividerWrapper flex'>
                <div
                    className="h-1 rounded-sm relative bg-helper"
                    style={{ width: `${dividerWidth * 6}px` }}
                >
                    <div className='absolute top:0 left-0 h-full progress bg-primaryDark duration-300' style={{ width: `${dividerWidth * nextValue}px` }}></div>
                </div>
            </div>
            <section className='orderMaterialSection w-[80vw] max-w-[500px]'>
                {nextValue === 1 && <MaterialDetailsForm />}
                {nextValue === 2 && <ReceipentsDetailsForm />}
                {nextValue === 3 && <DeliveryDetailsForm />}
                {nextValue === 4 && <DeliveryMethodForm />}
                {nextValue === 5 && <PaymentDetailsForm />}
                {nextValue === 6 && <PreviewSubmit {...allProps} />}
            </section>
            <StepsCounter currentStep={nextValue} totalSteps={6} />
        </div>
    );
};
export default Page;
