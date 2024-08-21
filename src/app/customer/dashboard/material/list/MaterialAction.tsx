import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import SubmitError from '../../../../ui/SubmitError';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { postMaterialReview } from './api';
import { toast } from 'react-toastify';
import { CombinedData } from './api';
import LoadingButton from '../../../../landingpage/homeNavigation/LoadingButton';
interface MaterialActionProps {
    orderNumber: string;
    hideMaterialAction: (value: boolean) => void;
    heading: string,
}
interface ReviewFormData {
    orderNumber: string,
    remarks: string,
}
const MaterialAction: React.FC<MaterialActionProps> = ({ orderNumber, hideMaterialAction, heading }) => {
    const mutation = useMutation({
        mutationFn: postMaterialReview,
        onSuccess: (result) => {
            hideMaterialAction(true);
            toast.success(result.message)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const handleClose = () => {
        hideMaterialAction(true);
    };
    const { register, handleSubmit, formState: { errors } } = useForm<ReviewFormData>();
    const submitHandler = (data: ReviewFormData) => {
        const combinedData = {
            ...data,
            heading: heading,
        }
        mutation.mutate(combinedData)
    }
    return (
        <div>
            <div className="bg-primaryLight max-w-[300px] p-[2rem] rounded-lg relative">
                <FontAwesomeIcon
                    icon={faXmark}
                    className="absolute top-[-1rem] right-[-1rem] menuIcon cursor-pointer"
                    onClick={handleClose}
                />
                <h1 className='primary_heading'>{heading} Material</h1>
                <p className='text-sm pb-2'>
                    This order is in the planner's workflow and cannot be deleted.
                </p>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="form_Item">
                        <label>Material Order Number</label>
                        <input type="text" value={orderNumber} readOnly {...register("orderNumber")} />
                    </div>
                    <div className="form_Item">
                        <label>Modification Remarks</label>
                        <textarea
                            rows={5}
                            {...register("remarks", {
                                required: "This Field is Required."
                            })}
                            placeholder="Please explain what changes you want to perform to this order so that the planner will take the action accordingly."
                        ></textarea>
                        {errors.remarks?.message && <SubmitError message={errors?.remarks?.message} />}
                    </div>
                    <div className="buttons-wrapper flex gap-2">
                        <button type='submit'>{mutation.isPending ? <LoadingButton /> : "Submit"}</button>
                        <button onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default MaterialAction;
