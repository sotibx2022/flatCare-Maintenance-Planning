"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeliveryMethod, setNextValue } from '../../../../../Redux/formSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DeliveryMethodData } from '.';
const DeliveryMethodForm: React.FC = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<DeliveryMethodData>();
    const dispatch = useDispatch();
    const onSubmit: SubmitHandler<DeliveryMethodData> = (formData) => {
        dispatch(setDeliveryMethod(formData));
        if (formData.deliveryOption === "debitCard") {
            dispatch(setNextValue({ data: 5 }));
        } else {
            dispatch(setNextValue({ data: 6 }));
        }
    };
    const handlePrev = (value: number) => {
        dispatch(setNextValue({ data: value }));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="deliveryMethod">
                <div className="form_Item">
                    <label>
                        <input
                            type="radio"
                            value="paymentOnDelivery"
                            {...register("deliveryOption", { required: "Please select a delivery method" })}
                        />
                        Payment on Delivery
                    </label>
                </div>
                <div className="form_Item">
                    <label>
                        <input
                            type="radio"
                            value="pickupFromStore"
                            {...register("deliveryOption", { required: "Please select a delivery method" })}
                        />
                        Pickup from Store
                    </label>
                </div>
                <div className="form_Item">
                    <label>
                        <input
                            type="radio"
                            value="debitCard"
                            {...register("deliveryOption", { required: "Please select a delivery method" })}
                        />
                        Debit Card
                    </label>
                </div>
            </div>
            <button type='submit'>Next</button>
            <button type="button" onClick={() => handlePrev(3)}>Previous</button>
        </form>
    );
};
export default DeliveryMethodForm;
