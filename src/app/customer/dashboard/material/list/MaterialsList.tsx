"use client"
import React from 'react'
import { PreviewSubmitProps } from '../order'
import { useForm } from 'react-hook-form'
interface MaterialListProps {
    editValue?: boolean,
    materials?: PreviewSubmitProps
}
const MaterialsList: React.FC<MaterialListProps> = ({ materials, editValue }) => {
    console.log(materials)
    const { register, formState: { errors } } = useForm({
        mode: "all"
    })
    return (
        <div>
            <div className="singleMaterial">
                <div className="form_Item">
                    <label>Material Name</label>
                    <input type='text' {...register("materialName", {
                        required: "Material Name is Required"
                    })} />
                </div>
                <div className="form_Item">
                    <label>Material Description</label>
                    <textarea
                        {...register("materialDescription", {
                            required: {
                                value: true,
                                message: "Material Description is Required."
                            }
                        })}
                    />
                </div>
                <div className="form_Item">
                    <label>Material Quantity</label>
                    <input type='text' {...register("materialQuantity", {
                        required: "Material Quantity is required."
                    })} />
                </div>
                <div className="form_Item">
                    <label>Material Unit</label>
                    <input type='text' {...register("unitOfMeasure", {
                        required: "Material Unit is required."
                    })} />
                </div>
                <div className="form_Item">
                    <label>Material Request Number</label>
                    <input type='text' readOnly />
                </div>
            </div>
        </div>
    )
}
export default MaterialsList