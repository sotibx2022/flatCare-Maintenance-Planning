"use client"
import React from 'react'
import OrderIdentification from './OrderIdentification'
import MaterialsList from './MaterialsList'
import OrderedBy from './OrderedBy'
import OrderedFor from './OrderedFor'
import DeliveryDetails from './DeliveryDetails'
import DeliveryMethod from './DeliveryMethod'
import PaymentDetails from './PaymentDetails'
import { useQuery } from '@tanstack/react-query'
import { getSingleMaterialData } from './api'
import { PreviewSubmitProps } from '../order'
import { useParams } from 'next/navigation'
const SingleOrderDetails = () => {
    const parmas = useParams();
    console.log(parmas);
    // const {data:PreviewSubmitProps,isPending,isError} = useQuery({queryKey:['material'],queryFn:getSingleMaterialData("materialId")})
    const edit = true;
    return (
        <div>
            <div>
                <h1 className='primary_heading'>This Feature is Under Development..</h1>
                <div className="orderIdentification">
                    <h1 className='subHeading'>Order Identification</h1>
                    <OrderIdentification />
                </div>
                <div className="materialsWrapper">
                    <h1 className='subHeading'>Order Identification</h1>
                </div>
                <div className="orderedBy">
                    <h1 className='subHeading'>Order Identification</h1>
                    <OrderedBy />
                </div>
                <div className="orderedFor">
                    <h1 className='subHeading'>Order Identification</h1>
                    <OrderedFor />
                </div>
                <div className="deliveryDetails">
                    <h1 className='subHeading'>Order Identification</h1>
                    <DeliveryDetails />
                </div>
                <div className="deliveryMethod">
                    <h1 className='subHeading'>Order Identification</h1>
                    <DeliveryMethod />
                </div>
                <div className="paymentDetails">
                    <h1 className='subHeading'>Order Identification</h1>
                    <PaymentDetails />
                </div>
            </div>
        </div>
    )
}
export default SingleOrderDetails