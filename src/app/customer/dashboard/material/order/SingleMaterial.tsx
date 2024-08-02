"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMaterial } from '../../../../../Redux/formSlice'
import { MaterialDetailsData } from '.';
import EditMaterial from './EditMaterial';
const SingleMaterial = () => {
    const materials = useSelector((state: any) => state.form.materials)
    const dispatch = useDispatch()
    const [addMaterial, setAddMaterial] = useState(false)
    const [editForm, setEditForm] = useState(false);
    const [editIndex, setEditIndex] = useState<number>(0)
    const handleRemoveMaterial = (index: number) => {
        dispatch(removeMaterial({ data: index }))
    }
    const editHandler = (index: number) => {
        setEditForm(true)
        setEditIndex(index)
    }
    const sendIndicator = (value: boolean) => {
        setEditForm(value)
    }
    if (editForm) {
        return <EditMaterial index={editIndex} setEditForm={sendIndicator} />
    } else {
        return (
            <div>
                {materials.length > 1 && materials.slice(1).map((material: MaterialDetailsData, index: number) => {
                    return <div key={index}>
                        <h1> {material.materialName}</h1>
                        <h1>{material.materialDescription}</h1>
                        <h1>{material.materialQuantity}</h1>
                        <h1>{material.unitOfMeasure}</h1>
                        <button onClick={() => { handleRemoveMaterial(index) }}>remove</button>
                        <button onClick={() => editHandler(index)}>Edit</button>
                    </div>
                })
                }
            </div>
        )
    }
}
export default SingleMaterial