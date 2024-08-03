"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeliveryMethod, setNextValue } from '../../../../../Redux/formSlice';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { DeliveryMethodData } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faBox, faCreditCard, faStore } from '@fortawesome/free-solid-svg-icons';
import SubmitError from '../../../../ui/SubmitError';
const DeliveryMethodForm: React.FC = () => {
    const { register, formState: { errors }, handleSubmit, setValue, control } = useForm<DeliveryMethodData>();
    const dispatch = useDispatch();
    const { deliveryMethod } = useSelector((state: any) => state.form);
    const deliveryOption = useWatch({ control, name: "deliveryOption" })
    useEffect(() => {
        setValue('deliveryOption', deliveryMethod.deliveryOption)
    }, [deliveryMethod])
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
            <div className="deliveryMethod my-8 ">
                <div className='flex flex-col justify-start items-center md:flex-row md:justify-between' >
                    <div className="radioItem">
                        <input
                            type="radio"
                            value="paymentOnDelivery"
                            id='radioItem1'
                            {...register("deliveryOption", { required: "Please select a delivery method" })}
                        />
                        <label htmlFor="radioItem1">Payment on Delivery</label>
                    </div>
                    <div className="radioItem">
                        <input
                            type="radio"
                            value="pickupFromStore"
                            id='radioItem2'
                            {...register("deliveryOption", { required: "Please select a delivery method" })}
                        />
                        <label htmlFor='radioItem2'>Pickup from Store</label>
                    </div>
                    <div className="radioItem">
                        <input
                            type="radio"
                            value="debitCard"
                            id='radioItem3'
                            {...register("deliveryOption", { required: "Please select a delivery method" })}
                        />
                        <label htmlFor='radioItem3'>Debit Card</label>
                    </div>
                </div>
                {errors.deliveryOption?.message && <SubmitError message={errors.deliveryOption?.message} />}
                <div className="paragraphswrapper relative my-8">
                    <p className={`absolute top-0 left-0 flex items-center space-x-2 transition-transform duration-300 ease-in-out ${deliveryOption === "paymentOnDelivery" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                        <FontAwesomeIcon icon={faBox} />
                        <span>Pay for your order upon delivery at your doorstep.</span>
                    </p>
                    <p className={`absolute top-0 left-0 flex items-center space-x-2 transition-transform duration-300 ease-in-out ${deliveryOption === "pickupFromStore" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                        <FontAwesomeIcon icon={faStore} />
                        <span>Pick up your order directly from our store at your convenience.</span>
                    </p>
                    <p className={`absolute top-0 left-0 flex items-center space-x-2 transition-transform duration-300 ease-in-out ${deliveryOption === "debitCard" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                        <FontAwesomeIcon icon={faCreditCard} />
                        <span>Pay using your debit card during checkout.</span>
                    </p>
                </div>
            </div>
            <h1
                className="primary_heading mt-16"
                style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                Step <span className="step_number">4</span> of <span>4</span>
            </h1>
            <div className='buttonsWrapper flex justify-between items-center'>
                <button type='button' onClick={() => handlePrev(3)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button type='submit'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </form>
    );
};
export default DeliveryMethodForm;
