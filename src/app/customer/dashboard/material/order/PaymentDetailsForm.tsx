"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextValue, setPaymentDetails } from '../../../../../Redux/formSlice'
import { useForm } from 'react-hook-form'
import { PaymentDetailsData } from '.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SubmitError from '../../../../ui/SubmitError'
const PaymentDetailsForm = () => {
    const dispatch = useDispatch();
    const { paymentDetails } = useSelector((state: any) => state.form)
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<PaymentDetailsData>(
        { mode: 'all' }
    );
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
    const formatCardNumber = (value: string): string => {
        const numericValue = value.replace(/\D/g, '');
        return numericValue.match(/.{1,4}/g)?.join(' ') || '';
    };
    const cardNumberHandler = register("cardNumber", {
        required: {
            value: true,
            message: "Card Number is Required"
        },
        validate: {
            isValidLength: (value: string) => {
                // Remove non-numeric characters to check length
                const numericValue = value.replace(/\D/g, '');
                if (numericValue.length === 16) {
                    return true; // Valid length
                }
                return "Card Number must be exactly 16 digits long";
            },
            isNumeric: (value: string) => {
                // Ensure the value contains only numbers
                const numericValue = value.replace(/\D/g, '');
                if (/^\d{16}$/.test(numericValue)) {
                    return true; // Valid format
                }
                return "Card Number must be exactly 16 digits long";
            }
        },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value as string;
            const formattedNumber = formatCardNumber(value);
            setValue("cardNumber", formattedNumber, { shouldValidate: true });
        }
    });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-[80vw] max-w-[500px]'>
            <div className="debitCardInformations">
                <div className="form_Item">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        placeholder="e.g., 1234 5678 9012 3456"
                        {...cardNumberHandler}
                    />
                    {errors.cardNumber?.message && <SubmitError message={errors.cardNumber?.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="cardHolderName">Card Holder Name</label>
                    <input type='text' id="cardHolderName" placeholder='eg. Ram Bahadur Darji'
                        {...register("cardHolderName", { required: { value: true, message: "Card Holder Name is Required" } })} />
                    {errors.cardHolderName?.message && <SubmitError message={errors.cardHolderName?.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type='date' id="expiryDate" placeholder='eg. 08/2024'
                        {...register("expiryDate", { required: { value: true, message: "Expiry Date is Required" } })} />
                    {errors.expiryDate?.message && <SubmitError message={errors.expiryDate?.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="cvvNumber">CVV Number</label>
                    <input
                        type='text'
                        id="cvvNumber"
                        placeholder='eg. 451'
                        {...register("cvvNumber", {
                            required: { value: true, message: "CVV Number is Required" },
                            pattern: {
                                value: /^\d{3}$/,
                                message: "CVV Number must be exactly 3 digits long"
                            }
                        })}
                    />
                    {errors.cvvNumber?.message && <SubmitError message={errors.cvvNumber?.message} />}
                </div>
            </div>
            <div className='buttonsWrapper flex justify-between items-center'>
                <button type='button'>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => handlePrev(4)} />
                </button>
                <button type='submit'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </form>
    )
}
export default PaymentDetailsForm