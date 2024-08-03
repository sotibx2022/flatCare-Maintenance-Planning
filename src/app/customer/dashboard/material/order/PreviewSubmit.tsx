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
const PreviewSubmit: React.FC<PreviewSubmitProps> = ({ materials,
  orderedBy,
  orderedFor,
  deliveryDetails,
  deliveryMethod,
  paymentDetails }) => {
  const dispatch = useDispatch()
  console.log(paymentDetails.expiryDate);
  console.log(typeof paymentDetails.expiryDate)
  const handlePrev = () => {
    if (deliveryMethod === "debitCard") {
      dispatch(setNextValue({ data: 5 }))
    } else {
      dispatch(setNextValue({ data: 4 }))
    }
  }
  const handleSubmit = () => {
  }
  return (
    <>
      <div>
        <h1>Preview and Submit</h1>
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
      <h1
        className="primary_heading"
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem'
        }}
      >
        Step <span className="step_number">6</span> of <span>6</span>
      </h1>
      <div className='buttonsWrapper flex justify-between items-center mt-2'>
        <button type='button' onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={handleSubmit}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  )
}
export default PreviewSubmit