"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetForm, setNextValue } from '../../../../../Redux/formSlice'
import { PreviewSubmitProps } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MaterialLists from './MaterialLists';
import OrderedBy from './OrderedBy';
import OrderedFor from './OrderedFor';
import DeliveryDetails from './DeliveryDeatils';
import CardDetails from './CardDetails';
import DeliveryMethod from './DeliveryMethod';
import ResponsiveMaterialList from './ResponsiveMaterialLists';
import ResponsiveOrderBy from './ResponsiveOrderBy';
import ResponsiveOrderFor from './ResponsiveOrderFor';
import ResponsiveDeliveryDetails from './ResponsiveDeliveryDetails';
import ResponsiveCardDetails from './ResponsiveCardDetails';
import { usePostMaterial } from '../../../../hooks/usePostMaterial';
import LoadingButton from '../../../../landingpage/homeNavigation/LoadingButton';
const PreviewSubmit: React.FC<PreviewSubmitProps> = ({ materials,
  orderedBy,
  orderedFor,
  deliveryDetails,
  deliveryMethod,
  paymentDetails }) => {
  const { mutate: postMaterial, isPending } = usePostMaterial();
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
  const handleSubmit = () => {
    const materialData: PreviewSubmitProps = { materials, orderedBy, orderedFor, paymentDetails, deliveryDetails, deliveryMethod }
    postMaterial(materialData);
    dispatch(resetForm());
  }
  const handlePrev = () => {
    if (deliveryMethod === "debitCard") {
      dispatch(setNextValue({ data: 5 }))
    } else {
      dispatch(setNextValue({ data: 4 }))
    }
  }
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
        <button onClick={handleSubmit} disabled={isPending}>
          {isPending ? <LoadingButton /> : <FontAwesomeIcon icon={faArrowRight} />}
        </button>
      </div>
    </div>
  )
}
export default PreviewSubmit