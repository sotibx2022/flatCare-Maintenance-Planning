"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeliveryDetails, setNextValue } from '../../../../../Redux/formSlice'
import { useForm } from 'react-hook-form'
import { DeliveryDetailsData } from '.'
import useCustomerData from '../../../../hooks/useCustomerData'
const DeliveryDetailsForm = () => {
    const dispatch = useDispatch();
    const [customerDatas, setCustomerDatas] = useCustomerData();
    const { deliveryDetails } = useSelector((state: any) => state.form)
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<DeliveryDetailsData>()
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='deliveryAddressContainer'>
                <h2 className='secondary_Heading'>Delivery Address</h2>
                <small>Below details are provided on the basis of customer's accommodation details while registering to the system. User can change the details.</small>
                <div className="form_Item">
                    <label htmlFor="buildingNumber">Building Number</label>
                    <input type='text' id="buildingNumber" placeholder='Building Number'
                        {...register("buildingNumber", {
                            required: {
                                value: true,
                                message: "Building Number is Required."
                            }
                        })} />
                </div>
                <div className="form_Item">
                    <label htmlFor="floorNumber">Floor Number</label>
                    <input type='text' id="floorNumber" placeholder='Floor Number'
                        {...register("floorNumber", {
                            required: {
                                value: true,
                                message: "Floor Number is Required."
                            }
                        })}
                    />
                </div>
                <div className="form_Item">
                    <label htmlFor="roomNumber">Room Number</label>
                    <input type='text' id="roomNumber" placeholder='Room Number'
                        {...register("roomNumber", {
                            required: {
                                value: true,
                                message: "Room Number is Required."
                            }
                        })} />
                </div>
            </div>
            <button type='submit'>Next</button>
            <button onClick={() => handlePrev(2)}>Previous</button>
        </form>
    )
}
export default DeliveryDetailsForm