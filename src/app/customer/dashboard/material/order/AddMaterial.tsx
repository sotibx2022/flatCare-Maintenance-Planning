"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMaterial } from "../../../../../Redux/formSlice";
import { useForm } from 'react-hook-form';
import { unitOfMeasureOptions } from '.';
import { MaterialDetailsData } from '.';
import SubmitError from '../../../../ui/SubmitError';
import { validateNumber, validateWords } from './CommonFunctions';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface AddMaterialProps {
    setshowAddMaterialForm: (value: boolean) => void;
}
const AddMaterial: React.FC<AddMaterialProps> = ({ setshowAddMaterialForm }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<MaterialDetailsData>({
        mode: 'all' // Validate on both blur and change
    });
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    // Ensure that 'data' parameter is correctly handled
    const onSubmit = (data: MaterialDetailsData) => {
        console.log("Form data submitted:", data); // Debugging line
        dispatch(addMaterial({ data }));
        setSubmitted(true);
        setshowAddMaterialForm(false);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form_Item">
                    <label htmlFor="materialName">Material Name</label>
                    <input
                        type='text'
                        id="materialName"
                        placeholder='eg. 2 Inch Pipe for Bathroom'
                        {...register("materialName", {
                            required: "Material Name field is required !!",
                            validate: (value) => validateWords("Material Name", value, 3, 6)
                        })}
                    />
                    {errors.materialName?.message && <SubmitError message={errors.materialName.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="materialDescription">Material Description</label>
                    <textarea
                        id="materialDescription"
                        placeholder='2 Inch UPVC Pipe for Bathroom. Material Code: PIPE2IN-2024. Please ensure all pipes are labeled as 2 inches and are of high quality.'
                        rows={5}
                        {...register("materialDescription", {
                            required: "Material Description is Required.",
                            validate: (value) => validateWords("Material Description", value, 6, 50)
                        })}
                    />
                    {errors.materialDescription?.message && <SubmitError message={errors.materialDescription.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="materialQuantity">Quantity</label>
                    <input
                        type='text'
                        id="materialQuantity"
                        placeholder='2'
                        {...register("materialQuantity", {
                            required: "Material Quantity is required.",
                            validate: (value) => validateNumber("Quantity", value)
                        })}
                    />
                    {errors.materialQuantity?.message && <SubmitError message={errors.materialQuantity.message} />}
                </div>
                <div className="form_Item">
                    <label htmlFor="unitOfMeasure">Unit of Measure</label>
                    <select
                        id="unitOfMeasure"
                        {...register("unitOfMeasure", {
                            required: "Please select one unit of measure."
                        })}
                    >
                        {unitOfMeasureOptions.map((item, index) => (
                            <option value={item.value} key={index}>{item.label}</option>
                        ))}
                    </select>
                    {errors.unitOfMeasure?.message && <SubmitError message={errors.unitOfMeasure.message} />}
                </div>
                <button type="submit" className='min-w-[12rem] flex justify-start'>
                    <FontAwesomeIcon icon={faPlusCircle} className='mr-1' /> Add Material
                </button>
            </form>
        </>
    );
};
export default AddMaterial;
