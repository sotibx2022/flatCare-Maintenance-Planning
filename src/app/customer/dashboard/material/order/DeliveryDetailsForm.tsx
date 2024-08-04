"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeliveryDetails, setNextValue } from '../../../../../Redux/formSlice'
import { useForm } from 'react-hook-form'
import { DeliveryDetailsData } from '.'
import useCustomerData from '../../../../hooks/useCustomerData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SubmitError from '../../../../ui/SubmitError'
const DeliveryDetailsForm = () => {
    const dispatch = useDispatch();
    const [customerDataLoading, customerDatas, setCustomerDatas] = useCustomerData();
    const { deliveryDetails } = useSelector((state: any) => state.form)
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<DeliveryDetailsData>({ mode: 'all' })
    useEffect(() => {
        setValue("buildingNumber", deliveryDetails.buildingNumber || customerDatas.buildingNumber);
        setValue("floorNumber", deliveryDetails.floorNumber || customerDatas.floorNumber);
        setValue("roomNumber", deliveryDetails.roomNumber || customerDatas.roomNumber);
    }, [customerDatas, deliveryDetails])
    const onSubmit = (deliveryDetailsData: DeliveryDetailsData) => {
        dispatch(setNextValue({ data: 4 }))
        dispatch(setDeliveryDetails({ deliveryDetailsData }))
    }
    const handlePrev = (value: number) => {
        dispatch(setNextValue({ data: value }))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-[80vw] max-w-[500px]'>
            <div className='deliveryAddressContainer'>
                <h2 className='secondary_heading'>Delivery Address</h2>
                <small className='text-primaryDark'>Below details are provided on the basis of customer's accommodation details while registering to the system.</small>
                <div className="form_Item">
                    <label htmlFor="buildingNumber">Building Number</label>
                    <input
                        type='text'
                        id="buildingNumber"
                        placeholder='Building Number'
                        {...register("buildingNumber", {
                            required: {
                                value: true,
                                message: "Building Number is Required."
                            },
                            pattern: {
                                value: /^[A-Za-z0-9\s]+$/, // Allows letters, numbers, and spaces
                                message: "Building Number can only contain letters, numbers, and spaces."
                            }
                        })}
                    />
                    {errors.buildingNumber?.message && <SubmitError message={errors.buildingNumber?.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="floorNumber">Floor Number</label>
                    <input
                        type='text'
                        id="floorNumber"
                        placeholder='Floor Number'
                        {...register("floorNumber", {
                            required: {
                                value: true,
                                message: "Floor Number is Required."
                            },
                            pattern: {
                                value: /^[A-Za-z0-9\s]+$/, // Allows letters, numbers, and spaces
                                message: "Floor Number can only contain letters, numbers, and spaces."
                            }
                        })}
                    />
                    {errors.floorNumber?.message && <SubmitError message={errors.floorNumber?.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                        type='text'
                        id="roomNumber"
                        placeholder='Room Number'
                        {...register("roomNumber", {
                            required: {
                                value: true,
                                message: "Room Number is Required."
                            },
                            pattern: {
                                value: /^[A-Za-z0-9\s]+$/, // Allows letters, numbers, and spaces
                                message: "Room Number can only contain letters, numbers, and spaces."
                            }
                        })}
                    />
                    {errors.roomNumber?.message && <SubmitError message={errors.roomNumber?.message} />}
                </div>
            </div>
            <div className='buttonsWrapper flex justify-between items-center'>
                <button type='button' onClick={() => handlePrev(2)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button type='submit'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </form>
    )
}
export default DeliveryDetailsForm