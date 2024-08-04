"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import { setNextValue } from '../../../../../Redux/formSlice'
import { PreviewSubmitProps } from '.';
import { MaterialDetailsData } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MaterialLists from './MaterialLists';
import OrderedBy from './OrderedBy';
import OrderedFor from './OrderedFor';
import DeliveryDetails from './DeliveryDeatils';
import CardDetails from './CardDetails';
import DeliveryMethod from './DeliveryMethod';
import { toast } from 'react-toastify';
const PreviewSubmit: React.FC<PreviewSubmitProps> = ({ materials,
  orderedBy,
  orderedFor,
  deliveryDetails,
  deliveryMethod,
  paymentDetails }) => {
  const dispatch = useDispatch()
  const handlePrev = () => {
    if (deliveryMethod === "debitCard") {
      dispatch(setNextValue({ data: 5 }))
    } else {
      dispatch(setNextValue({ data: 4 }))
    }
  }
  const handleSubmit = () => {
    toast.success("Materials Requirement Posted Successfully.")
  }
  return (
    <div className='w-[80vw] max-w-[500px]'>
      <div >
        <div className="materials_area">
          <h1 className='subHeading'>Materials</h1>
          <MaterialLists materials={materials} />
        </div>
        <div className="orderedByArea">
          <h1 className='subHeading'>Ordered By</h1>
          <OrderedBy orderedBy={orderedBy} />
        </div>
        <div className="OrderedForArea">
          <h1 className='subHeading'>Ordered For</h1>
          <OrderedFor orderedFor={orderedFor} />
        </div>
        <div className="deliveryDetailsArea">
          <h1 className='subHeading'>Delivery Details</h1>
          <DeliveryDetails deliveryDetails={deliveryDetails}></DeliveryDetails>
        </div>
        <div className="paymentMethodsArea">
          <h1 className='subHeading'>Delivery Method</h1>
          <DeliveryMethod deliveryMethod={deliveryMethod} />
        </div>
        {deliveryMethod === "debitCard" &&
          <div className='paymentDetailsArea'>
            <h1 className='subHeading'>Payment Details</h1>
            <CardDetails paymentDetails={paymentDetails} />
          </div>}
      </div>
      <div className='buttonsWrapper flex justify-between items-center mt-2'>
        <button type='button' onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={handleSubmit}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  )
}
export default PreviewSubmit