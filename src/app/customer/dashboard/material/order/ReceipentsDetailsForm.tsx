"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextValue, setOrderBy, setOrderFor } from '../../../../../Redux/formSlice'
import { useForm } from 'react-hook-form';
import { OrderedForData } from '.';
import useCustomerData from '../../../../hooks/useCustomerData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SubmitError from '../../../../ui/SubmitError';
const ReceipentsDetailsForm = () => {
    const [customerDataLoading, customerDatas, setCustomerDatas] = useCustomerData();
    const { orderedFor } = useSelector((state: any) => state.form)
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<OrderedForData>({
        mode: 'all'
    })
    useEffect(() => {
        setValue("receipentName", customerDataLoading ? "Loading..." : (customerDatas.fullName || orderedFor.receipentName));
        setValue("receipentEmail", customerDataLoading ? "Loading..." : (customerDatas.email || orderedFor.receipentEmail));
        setValue("receipentPhone", customerDataLoading ? "Loading..." : (customerDatas.phoneNumber || orderedFor.receipentPhone));
    }, [customerDatas, orderedFor, customerDataLoading])
    const requiredData = {
        orderedByName: customerDatas.fullName,
        orderedByEmail: customerDatas.email,
        orderedByPhone: customerDatas.phoneNumber
    }
    const onSubmit = (formData: OrderedForData) => {
        dispatch(setNextValue({ data: 3 }))
        dispatch(setOrderFor(formData))
        dispatch(setOrderBy(requiredData))
    }
    const handlePrev = (value: number) => {
        dispatch(setNextValue({ data: 1 }))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='orderForInformation w-[80vw] max-w-[500px]'>
                <h2 className='secondary_heading'>Ordered For</h2>
                <small className='text-primaryDark'>Please change the Recipient details if you are ordering for someone else.</small>
                <div className="form_Item">
                    <label htmlFor="recipientName">Recipient Name</label>
                    <input
                        type='text'
                        id="recipientName"
                        placeholder='Recipient Name'
                        {...register("receipentName", {
                            required: {
                                value: true,
                                message: "Recipient Name is Required."
                            },
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Recipient Name should only contain letters and spaces."
                            }
                        })}
                    />
                    {errors.receipentName?.message && <SubmitError message={errors.receipentName?.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="recipientEmail">Recipient Email</label>
                    <input
                        type='text'
                        id="recipientEmail"
                        placeholder='Recipient Email'
                        {...register("receipentEmail", {
                            required: {
                                value: true,
                                message: "Recipient Email is Required."
                            },
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address."
                            }
                        })}
                    />
                    {errors.receipentEmail?.message && <SubmitError message={errors.receipentEmail?.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="recipientPhone">Recipient Phone</label>
                    <input
                        type='text'
                        id="recipientPhone"
                        placeholder='Recipient Phone'
                        {...register("receipentPhone", {
                            required: {
                                value: true,
                                message: "Recipient Phone is Required."
                            },
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Phone number should be exactly 10 digits."
                            }
                        })}
                    />
                    {errors.receipentPhone?.message && <SubmitError message={errors.receipentPhone?.message} />}
                </div>
            </div>
            <div className='buttonsWrapper flex justify-between items-center'>
                <button type='button'>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => handlePrev(1)} />
                </button>
                <button type='submit'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </form>
    );
}
export default ReceipentsDetailsForm