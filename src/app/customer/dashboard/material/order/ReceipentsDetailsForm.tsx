"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextValue, setOrderBy, setOrderFor } from '../../../../../Redux/formSlice'
import { useForm } from 'react-hook-form';
import { OrderedForData } from '.';
import useCustomerData from '../../../../hooks/useCustomerData';
const ReceipentsDetailsForm = () => {
    const [customerDatas, setCustomerDatas] = useCustomerData();
    const { orderedFor } = useSelector((state: any) => state.form)
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<OrderedForData>()
    useEffect(() => {
        setValue("receipentName", orderedFor.receipentName);
        setValue("receipentEmail", orderedFor.receipentEmail);
        setValue("receipentPhone", orderedFor.receipentPhone);
    }, [orderedFor])
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
            <div className='orderForInformation'>
                <h2>Ordered For</h2>
                <small>Please change the Recipient details if you are ordering for someone else.</small>
                <div className="form_Item">
                    <label htmlFor="recipientName">Recipient Name</label>
                    <input type='text' id="recipientName" placeholder='Recipient Name'
                        {...register("receipentName", {
                            required: {
                                value: true,
                                message: "Receipent Name is Required."
                            }
                        })} />
                </div>
                <div className="form_Item">
                    <label htmlFor="recipientEmail">Recipient Email</label>
                    <input type='text' id="recipientEmail" placeholder='Recipient Email'
                        {...register("receipentEmail", {
                            required: {
                                value: true,
                                message: "Receipient Email is Required."
                            }
                        })} />
                </div>
                <div className="form_Item">
                    <label htmlFor="recipientPhone">Recipient Phone</label>
                    <input type='number' id="recipientPhone" placeholder='Recipient Phone'
                        {...register("receipentPhone", {
                            required: {
                                value: true,
                                message: "Receipent Phone is Required."
                            }
                        })} />
                </div>
            </div>
            <button type="submit">Next</button>
            <button onClick={() => handlePrev(1)}>Previous</button>
        </form>
    )
}
export default ReceipentsDetailsForm