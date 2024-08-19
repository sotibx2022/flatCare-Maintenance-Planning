"use client"
import React, { useEffect } from 'react'
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
import axios from 'axios'
import LoadingComponent from '../../../../ui/LoadingComponent'
import { OrderIdentificationProps } from './OrderIdentification'
import SingleMaterial from '../order/SingleMaterial'
const SingleOrderDetails = () => {
    const parmas = useParams();
    const materialId = parmas.materialId
    const findMaterialDetails = async () => {
        const response = await axios.get(`/api/material/${materialId}`);
        return response.data.material
    }
    const { data: materialData = {}, isPending: isFetching } = useQuery({ queryKey: ['materialData'], queryFn: findMaterialDetails })
    const { orderedBy, orderedFor, deliveryDetails, _id, materials, createdAt, updatedAt, materialOrderNumber } = materialData;
    const identificationDatas = {
        createdAt,
        updatedAt,
        materialOrderNumber,
    }
    return (
        <div>
            {isFetching ? <LoadingComponent /> : <div>
                <div className="orderIdentification">
                    <h1 className='subHeading'>Order Identification</h1>
                    <OrderIdentification {...identificationDatas} />
                </div>
                <div className="materialsWrapper">
                    <h1 className='subHeading'>Materials</h1>
                </div>
                <div className="orderedBy">
                    <h1 className='subHeading'>Ordered By</h1>
                    <OrderedBy />
                </div>
                <div className="orderedFor">
                    <h1 className='subHeading'>Ordered For</h1>
                    <OrderedFor />
                </div>
                <div className="deliveryDetails">
                    <h1 className='subHeading'>Delievry Details</h1>
                    <DeliveryDetails />
                </div>
                <div className="deliveryMethod">
                    <h1 className='subHeading'>Delivery Method</h1>
                    <DeliveryMethod />
                </div>
                <div className="paymentDetails">
                    <h1 className='subHeading'>Payment Details</h1>
                    <PaymentDetails />
                </div>
            </div>}
        </div>
    )
}
export default SingleOrderDetails