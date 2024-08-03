import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editMaterial } from "../../../../../Redux/formSlice"
import { useForm } from 'react-hook-form';
import { unitOfMeasureOptions } from '.';
import { MaterialDetailsData } from '.';
import SingleMaterial from './SingleMaterial';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
interface EditMaterialInterface {
    index: number,
    edit?: boolean
    setEditForm: (value: boolean) => void;
}
const EditMaterial: React.FC<EditMaterialInterface> = ({ index, setEditForm, edit }) => {
    useGSAP(() => {
        gsap.to(".editMaterialFormContainer", {
            top: 0,
            duration: 0.5,
        })
    })
    const materials = useSelector((state: any) => state.form.materials);
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<MaterialDetailsData>()
    const [material, setMaterial] = useState<MaterialDetailsData>({ materialName: '', materialDescription: '', materialQuantity: '', unitOfMeasure: '' })
    useEffect(() => {
        const selectedMaterial = materials.find((_: MaterialDetailsData, i: number) => {
            return i === index + 1;
        })
        setMaterial(selectedMaterial)
        if (selectedMaterial) {
            setValue('materialName', selectedMaterial.materialName);
            setValue('materialDescription', selectedMaterial.materialDescription);
            setValue('materialQuantity', selectedMaterial.materialQuantity);
            setValue('unitOfMeasure', selectedMaterial.unitOfMeasure);
        }
    }, [index, materials])
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    const onSubmit = (data: MaterialDetailsData) => {
        dispatch(editMaterial({ data, index }));
        setSubmitted(true)
        setEditForm(false)
    }
    const closeHandler = () => {
        setEditForm(false);
    }
    return (
        <div className='editMaterialFormContainer fixed flex justify-center items-center bg-black bg-opacity-80 -top-full left-0 w-full h-full z-1000'>
            {!submitted && <form onSubmit={handleSubmit(onSubmit)} className='bg-[#d7daf1] p-8 relative'>
                <h1 className='primary_heading'>{edit ? "Edit Material" : "View Material"}</h1>
                <div className="form_Item">
                    <label htmlFor="materialName" className='none'>Material Name</label>
                    <input type='text' id="materialName" placeholder='eg. 2 Inch Pipe for Bathroom'
                        {...register("materialName", {
                            required: {
                                value: true,
                                message: "Material Name field is required !!"
                            }
                        })}
                        readOnly={!edit} />
                </div>
                <div className="form_Item">
                    <label htmlFor="materialDescription">Material Description</label>
                    <textarea id="materialDescription" placeholder='2 Inch UPVC Pipe for Bathroom. Material Code: PIPE2IN-2024. Please ensure all pipes are labeled as 2 inches and are of high quality.' rows={5}
                        {...register("materialDescription", {
                            required: {
                                value: true,
                                message: "Material Description is Required."
                            }
                        })}
                        readOnly={!edit}></textarea>
                </div>
                <div className="form_Item">
                    <label htmlFor="materialQuantity">Quantity</label>
                    <input type='text' id="materialQuantity" placeholder='2'
                        {...register("materialQuantity", {
                            required: {
                                value: true,
                                message: "Material Quantity is required."
                            }
                        })}
                        readOnly={!edit} />
                </div>
                <div className="form_Item">
                    <label htmlFor="unitOfMeasure">Unit of Measure</label>
                    <select id="unitOfMeasure"  {...register("unitOfMeasure", {
                        required: {
                            value: true,
                            message: 'Pleae Select One Unit of Measure.'
                        }
                    })}
                        disabled={!edit}>
                        {unitOfMeasureOptions.map((item: { value: string, label: string }, index: number) => {
                            return <option value={item.value} key={index}>{item.label}</option>
                        })}
                    </select>
                </div>
                <FontAwesomeIcon icon={faTimes} onClick={closeHandler} className='menuIcon
                absolute -top-4 right-0' />
                {edit && <button type='submit'>Submit</button>}
            </form>}
        </div>
    )
}
export default EditMaterial