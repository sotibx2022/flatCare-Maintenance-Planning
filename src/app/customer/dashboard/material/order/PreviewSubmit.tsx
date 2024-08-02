"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextValue } from '../../../../../Redux/formSlice'
import { PreviewSubmitProps } from '.';
import { MaterialDetailsData } from '.';
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
  }
  return (
    <>
      <div>
        <h1>Preview and Submit</h1>
        <div className="materials_area">
          <table className='singleMaterialConteiner'>
            <thead>
              <tr>
                <td>SN</td>
                <td>Material Name</td>
                <td>Quantity</td>
                <td>Unit</td>
              </tr>
            </thead>
            <tbody>
              {materials.slice(1).map((material: MaterialDetailsData, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{material.materialName}</td>
                  <td>{material.materialQuantity}</td>
                  <td>{material.unitOfMeasure}</td>
                  <td>{material.materialDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="orderedByArea">
          <h1>Ordered By</h1>
          <p><span>Name</span>{orderedBy.orderedByName}</p>
          <p><span>Email</span>{orderedBy.orderedByEmail}</p>
          <p><span>Phone</span>{orderedBy.orderedByPhone}</p>
        </div>
        <div className="OrderedForArea">
          <h1>Ordered For</h1>
          <p><span>Name</span>{orderedFor.receipentName}</p>
          <p><span>Email</span>{orderedFor.receipentEmail}</p>
          <p><span>Phone</span>{orderedFor.receipentPhone}</p>
        </div>
        <div className="deliveryDetailsArea">
          <h1>Delivery Details</h1>
          <p><span>Building Number</span>{deliveryDetails.buildingNumber}</p>
          <p><span>Floor Number</span>{deliveryDetails.floorNumber}</p>
          <p><span>Room Number</span>{deliveryDetails.roomNumber}</p>
        </div>
        <div className="paymentMethodsArea">
          <h1>Delivery Method</h1>
          <p className={deliveryMethod === "paymentOnDelivery" ? "bg-red-400" : "bg-gray-50"}>payment On Delivery</p>
          <p className={deliveryMethod === "pickupFromStore" ? "bg-red-400" : "bg-gray-50"}>pickup From Store</p>
          <p className={deliveryMethod === "debitCard" ? "bg-red-400" : "bg-gray-50"}>debit Card</p>
        </div>
        <div className="paymentDetailsArea">
          <h1>Payment Details</h1>
          <p><span>Card Number</span>{paymentDetails.cardNumber}</p>
          <p><span>Card Holder Name</span>{paymentDetails.cardHolderName}</p>
          <p><span>CVV Number</span>{paymentDetails.cvvNumber}</p>
          {/* <p><span>Card Expiry</span>{paymentDetails.expiryDate.toLocaleDateString()}</p> */}
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handlePrev}>Previous</button>
    </>
  )
}
export default PreviewSubmit