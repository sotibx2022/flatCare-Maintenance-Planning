"use client"
import React from 'react';
import MaterialDetailsForm from './MaterialDetailsForm';
import ReceipentsDetailsForm from './ReceipentsDetailsForm';
import DeliveryDetailsForm from './DeliveryDetailsForm';
import PaymentDetailsForm from './PaymentDetailsForm';
import DeliveryMethodForm from './DeliveryMethodForm';
import { useSelector } from 'react-redux';
import PreviewSubmit from './PreviewSubmit';
const Page = () => {
    const nextValue = useSelector((state: any) => state.form.nextValue)
    const { materials, orderedBy, orderedFor, deliveryDetails, deliveryMethod, paymentDetails } = useSelector((state: any) => state.form)
    const allProps = {
        materials,
        orderedBy,
        orderedFor,
        deliveryDetails,
        deliveryMethod,
        paymentDetails
    }
    return (
        <div>
            <h1 className='primary_heading'>Order Material</h1>
            <section className='min-w-[50vw]'>
                {nextValue === 1 && <MaterialDetailsForm />}
                {nextValue === 2 && <ReceipentsDetailsForm />}
                {nextValue === 3 && <DeliveryDetailsForm />}
                {nextValue === 4 && <DeliveryMethodForm />}
                {nextValue === 5 && <PaymentDetailsForm />}
                {nextValue === 6 && <PreviewSubmit {...allProps} />}
            </section>
        </div>
    );
};
export default Page;
