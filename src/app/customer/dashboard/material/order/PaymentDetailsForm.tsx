"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextValue, setPaymentDetails } from '../../../../../Redux/formSlice'
import { useForm } from 'react-hook-form'
import { PaymentDetailsData } from '.'
const PaymentDetailsForm = () => {
    const dispatch = useDispatch();
    const { paymentDetails } = useSelector((state: any) => state.form)
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<PaymentDetailsData>();
    useEffect(() => {
        setValue("cardNumber", paymentDetails.cardNumber)
        setValue("cardHolderName", paymentDetails.cardHolderName)
        setValue("expiryDate", paymentDetails.expiryDate)
        setValue("cvvNumber", paymentDetails.cvvNumber)
    }, [paymentDetails])
    const onSubmit = (paymentDetailsData: PaymentDetailsData) => {
        dispatch(setNextValue({ data: 6 }))
        dispatch(setPaymentDetails({ paymentDetailsData }))
    }
    const handlePrev = (value: number) => {
        dispatch(setNextValue({ data: value }))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="debitCardInformations">
                <div className="form_Item">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type='text' id="cardNumber" placeholder='eg. 1234 5678 9012 3456'
                        {...register("cardNumber", { required: { value: true, message: "Card Number is Required" } })} />
                </div>
                <div className="form_Item">
                    <label htmlFor="cardHolderName">Card Holder Name</label>
                    <input type='text' id="cardHolderName" placeholder='eg. Ram Bahadur Darji'
                        {...register("cardHolderName", { required: { value: true, message: "Card Holder Name is Required" } })} />
                </div>
                <div className="form_Item">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type='date' id="expiryDate" placeholder='eg. 08/2024'
                        {...register("expiryDate", { required: { value: true, message: "Expiry Date is Required" } })} />
                    <small>The expiry date needs to be in MM/YYYY format</small>
                </div>
                <div className="form_Item">
                    <label htmlFor="cvvNumber">CVV Number</label>
                    <input type='number' id="cvvNumber" placeholder='eg. 451'
                        {...register("cvvNumber", { required: { value: true, message: "CVV Number is Required" } })} />
                </div>
            </div>
            <button type='submit'>Next</button>
            <button onClick={() => handlePrev(4)}>Previous</button>
        </form>
    )
}
export default PaymentDetailsForm