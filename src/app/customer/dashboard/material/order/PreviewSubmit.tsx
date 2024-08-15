"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNextValue } from '../../../../../Redux/formSlice'
import { PreviewSubmitProps } from '.';
<<<<<<< HEAD
=======
import { MaterialDetailsData } from '.';
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MaterialLists from './MaterialLists';
import OrderedBy from './OrderedBy';
import OrderedFor from './OrderedFor';
import DeliveryDetails from './DeliveryDeatils';
import CardDetails from './CardDetails';
import DeliveryMethod from './DeliveryMethod';
import { toast } from 'react-toastify';
import ResponsiveMaterialList from './ResponsiveMaterialLists';
import ResponsiveOrderBy from './ResponsiveOrderBy';
import ResponsiveOrderFor from './ResponsiveOrderFor';
import ResponsiveDeliveryDetails from './ResponsiveDeliveryDetails';
import ResponsiveCardDetails from './ResponsiveCardDetails';
<<<<<<< HEAD
import { useMutation } from '@tanstack/react-query';
import { postMaterial } from './api';
import { usePostMaterial } from '../../../../hooks/usePostMaterial';
import LoadingButton from '../../../../landingpage/homeNavigation/LoadingButton';
=======
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
const PreviewSubmit: React.FC<PreviewSubmitProps> = ({ materials,
  orderedBy,
  orderedFor,
  deliveryDetails,
  deliveryMethod,
  paymentDetails }) => {
<<<<<<< HEAD
  const { mutate: postMaterial, isPending } = usePostMaterial();
=======
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
  const dispatch = useDispatch()
  const [screenWidth, setScreenWidth] = useState(0)
  const findScreenWidth = () => {
    const availablescreenWidth = window.innerWidth;
    setScreenWidth(availablescreenWidth)
  }
  useEffect(() => {
    findScreenWidth();
    window.addEventListener('resize', findScreenWidth);
    return (() => {
      window.removeEventListener('resize', findScreenWidth)
    })
  }, [])
<<<<<<< HEAD
  const handleSubmit = () => {
    const materialData: PreviewSubmitProps = { materials, orderedBy, orderedFor, paymentDetails, deliveryDetails, deliveryMethod }
    postMaterial(materialData);
  }
=======
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
  const handlePrev = () => {
    if (deliveryMethod === "debitCard") {
      dispatch(setNextValue({ data: 5 }))
    } else {
      dispatch(setNextValue({ data: 4 }))
    }
  }
<<<<<<< HEAD
=======
  const handleSubmit = () => {
    toast.success("Materials Requirement Posted Successfully.")
  }
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
  return (
    <div className='w-[80vw] max-w-[600px] previewSubmitContainer'>
      <div >
        <div className="materials_area">
          <h1 className='subHeading'>Materials</h1>
          {screenWidth > 800 ? <MaterialLists materials={materials} /> : <ResponsiveMaterialList materials={materials} />}
        </div>
        <div className="orderedByArea">
          <h1 className='subHeading'>Ordered By</h1>
          {screenWidth > 550 ? <OrderedBy orderedBy={orderedBy} /> : <ResponsiveOrderBy orderedBy={orderedBy} />}
        </div>
        <div className="OrderedForArea">
          <h1 className='subHeading'>Ordered For</h1>
          {screenWidth > 550 ? <OrderedFor orderedFor={orderedFor} /> : <ResponsiveOrderFor orderedFor={orderedFor} />}
        </div>
        <div className="deliveryDetailsArea">
          <h1 className='subHeading'>Delivery Details</h1>
          {screenWidth > 480 ? <DeliveryDetails deliveryDetails={deliveryDetails} /> : <ResponsiveDeliveryDetails deliveryDetails={deliveryDetails} />}
        </div>
        <div className="paymentMethodsArea">
          <h1 className='subHeading'>Delivery Method</h1>
          <DeliveryMethod deliveryMethod={deliveryMethod} />
        </div>
        {deliveryMethod === "debitCard" &&
          <div className='paymentDetailsArea'>
            <h1 className='subHeading'>Payment Details</h1>
            {screenWidth > 775 ? <CardDetails paymentDetails={paymentDetails} /> : <ResponsiveCardDetails paymentDetails={paymentDetails} />}
          </div>}
      </div>
      <div className='buttonsWrapper flex justify-between items-center mt-2'>
        <button type='button' onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
<<<<<<< HEAD
        <button onClick={handleSubmit} disabled={isPending}>
          {isPending ? <LoadingButton /> : <FontAwesomeIcon icon={faArrowRight} />}
=======
        <button onClick={handleSubmit}>
          <FontAwesomeIcon icon={faArrowRight} />
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
        </button>
      </div>
    </div>
  )
}
export default PreviewSubmit